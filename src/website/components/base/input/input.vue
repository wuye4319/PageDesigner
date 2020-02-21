
<template>
  <div class="form-warp" :style="{width:comAttr.width}">
    <a-form :layout="comAttr.formLayout" :form="form">
      <a-form-item
        :label="comAttr.label"
        :help="comAttr.help"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          @blur="onBlur"
          @focus="onFocus"
          @change="onChange"
          :disabled="comAttr.disabled"
          :placeholder="comAttr.placeHolder"
          v-decorator="['value', { initialValue:comAttr.value,rules: [{ required: comAttr.required, message: comAttr.errorTip }] }]"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input } from 'ant-design-vue';
@Component({
  name: 'input-component',
  components: {
    AInput: Input,
    AForm: Form,
    AFormItem: Form.Item
  }
})
export default class inputComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;
  comAttr: any = this.compData.compAttr;
  form:any;
  created(): void {
    this.form = this.$form.createForm(this);
  }
  check() {
    let ks = false;
    this.form.validateFields(err => {
      ks = !err;
    });
    return ks;
  }
  get formItemLayout() {
    const { formLayout } = this.comAttr;
    return formLayout === 'inline'
      ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }
      : {};
  }
  getValue() {
    return this.form.getFieldsValue().value;
  }
  setValue(str:string) {
    this.form.setFieldsValue({ value: str });
    return true;
  }
  getDesc() {
    return this.comAttr.help;
  }
  setDesc(str:string) {
    this.comAttr.help = str;
    return this.comAttr.help;
  }
  onBlur() {
    this.trigFunc('blur', this.compData.actionModel);
  }
  onFocus() {
    this.trigFunc('focus', this.compData.actionModel);
  }
  onChange() {
    this.trigFunc('change', this.compData.actionModel);
  }
}
</script>

<style lang="less" scoped>
/*deep*/.ant-form-item{display: block}
.form-warp{text-align: left}
</style>


<template>
  <div class="form-warp" :style="{width:comAttr.width}">
    <a-form :layout="comAttr.formLayout" :form="form">
      <a-form-item
        :label="comAttr.label"
        :help="comAttr.help"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-textarea
          :key="'sfsfsf'+ntextarea"
          @blur="onBlur"
          @focus="onFocus"
          @change="onChange"
          :autosize="autoSize"
          :maxLength="counter"
          :disabled="comAttr.disabled"
          :placeholder="comAttr.placeHolder"
          v-decorator="['value', { initialValue:comAttr.value,rules: [{ required: comAttr.required, message: comAttr.errorTip }] }]"
        />
        <span class="tip" v-if="comAttr.counter">{{ strNum }}/{{ comAttr.maxLength }}</span>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input } from 'ant-design-vue';
@Component({
  name: 'textarea-component',
  components: {
    ATextarea: Input.TextArea,
    AForm: Form,
    AFormItem: Form.Item
  }
})
export default class inputComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;
  comAttr: any = this.compData.compAttr;
  form:any;
  strNum:number=0;
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
  ntextarea:number=0;
  ntextareaKs:boolean=true;
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
    this.comAttr.label = str;
    return this.comAttr.help;
  }
  get autoSize() {
    this.$nextTick(() => {
      if (this.ntextareaKs) {
        this.ntextareaKs = false;
      } else {
        ++this.ntextarea;
      }
    })
    return { minRows: this.comAttr.minRows, maxRows: this.comAttr.maxRows }
  }
  get counter() {
    return this.comAttr.counter ? this.comAttr.maxLength : -1
  }
  onBlur() {
    this.trigFunc('blur', this.compData.actionModel);
  }
  onFocus() {
    this.trigFunc('focus', this.compData.actionModel);
  }

  onChange() {
    this.$nextTick(() => {
      this.strNum = this.form.getFieldsValue().value.length
    })
    this.trigFunc('change', this.compData.actionModel);
  }
}
</script>

<style lang="less" scoped>
/*deep*/.ant-form-item{display: block}
.form-warp{text-align: left}
.tip{text-align: right;height: 0;display: block;position: relative;top: -26px;padding-right: 10px;}
</style>

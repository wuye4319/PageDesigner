<template>
  <div class="form-warp" :style="{width:comAttr.width}">
    <a-form :layout="comAttr.formLayout" :form="form">
      <a-form-item
        :label="comAttr.label"
        :help="comAttr.help"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          @change="onChange"
          :disabled="comAttr.disabled"
          v-decorator="['value', {initialValue:comAttr.value, rules: [{ required: comAttr.required, message: comAttr.errorTip }] }]"
        >
          <a-radio
            v-for="o in comAttr.option"
            :value="o.value"
            :style="comAttr.vertical?radioStyle:{}"
            :key="o.value"
          >{{ o.title }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Radio } from 'ant-design-vue';
@Component({
  name: 'select-component',
  components: {
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    AForm: Form,
    AFormItem: Form.Item
  }
})
export default class radioComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;
  comAttr: any = this.compData.compAttr;
  radioStyle:any= {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  form: any;
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
  setValue(str: string) {
    this.form.setFieldsValue({ value: str });
    return true;
  }
  onChange() {
    this.trigFunc('change', this.compData.actionModel);
  }
}
</script>

<style lang="less" scoped>
/*deep*/
.ant-form-item {
  display: block;
}
.form-warp{text-align: left}
</style>

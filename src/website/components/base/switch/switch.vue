
<template>
  <div class="form-warp" :style="{width:comAttr.width}">
    <a-form :layout="comAttr.formLayout">
      <a-form-item
        :label="comAttr.label"
        :help="comAttr.help"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-switch
          @change="onChange"
          :disabled="comAttr.disabled"
          v-model="comAttr.value"

          a-switch
        >
        </a-switch></a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Switch } from 'ant-design-vue';
@Component({
  name: 'input-component',
  components: {
    ASwitch: Switch,
    AForm: Form,
    AFormItem: Form.Item
  }
})
export default class inputComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;
  comAttr: any = this.compData.compAttr;
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
    return this.comAttr.value;
  }
  setValue(ks:boolean) {
    this.comAttr.value = !!ks;
    return true;
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

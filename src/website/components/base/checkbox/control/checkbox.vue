<template>
  <div>
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">最大宽度:</div>
        </a-list-item-meta>
        <a-input v-model="compAttr.width"/>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">默认值(数组):</div>
        </a-list-item-meta>
        <a-input v-model="valueArr" @blur="valueChange"/>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">选项(数组):</div>
        </a-list-item-meta>
        <a-textarea v-model="option" @blur="optinChange"/>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示标题:</div>
        </a-list-item-meta>
        <a-switch v-model="showTitle" @change="titleChange"></a-switch>
      </a-list-item>
      <a-list-item v-if="showTitle">
        <a-list-item-meta>
          <div slot="description">标题:</div>
        </a-list-item-meta>
        <a-input v-model="compAttr.label"/>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">标题排列:</div>
        </a-list-item-meta>
        <a-select class="borderSelect" v-model="compAttr.formLayout">
          <a-select-option value="inline">横向排列</a-select-option>
          <a-select-option value="vertical">纵向排列</a-select-option>
        </a-select>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">选项纵向排列:</div>
        </a-list-item-meta>
        <a-switch v-model="compAttr.vertical"></a-switch>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">描述信息:</div>
        </a-list-item-meta>
        <a-input v-model="compAttr.help"/>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">错误提示:</div>
        </a-list-item-meta>
        <a-input v-model="compAttr.errorTip"/>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">是否必填:</div>
        </a-list-item-meta>
        <a-switch v-model="compAttr.required"></a-switch>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">只读:</div>
        </a-list-item-meta>
        <a-switch v-model="compAttr.disabled"></a-switch>
      </a-list-item>
    </a-list>
    <api-user-tip :apiList="apiList"></api-user-tip>
  </div>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { apiUserTip } from '@/website/components/common'; // 线设置
import { List, Input, Select, Switch } from 'ant-design-vue';
@Component({
  name: 'active-component',
  components: {

    apiUserTip,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ATextarea: Input.TextArea,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASwitch: Switch
  }
})
export default class activeComponent extends Vue {
  @Prop({ type: Object, default: { compAttr: {} } })
  compData;
  compAttr: any = this.compData.compAttr;
  showTitle: boolean = this.compAttr.label !== '';
  option:string='';
  valueArr:string='';
  created() {
    this.option = JSON.stringify(this.compAttr.option);
    this.valueArr = JSON.stringify(this.compAttr.value);
  }
  optinChange() {
    try {
      this.compAttr.option = JSON.parse(this.option);
    } catch (error) {
      this.$message.error('请输入合法JSON数组');
      this.option = JSON.stringify(this.compAttr.option);
    }
  }
  valueChange() {
    try {
      this.compAttr.value = JSON.parse(this.valueArr);
    } catch (error) {
      this.$message.error('请输入合法数组');
      this.valueArr = JSON.stringify(this.compAttr.value);
    }
  }
  titleChange(v) {
    this.compAttr.label = this.showTitle ? '标题' : '';
  }
  apiList:any[]=[
    { dsc: '//获取选择框的值', api: 'getValue():string' },
    { dsc: '//设置选择框的值', api: 'setValue(str:string)' },
    { dsc: '//检查用户选择（必填时有效）', api: 'check():boolean' },
  ]
}
</script>

<style lang="less" scoped>
.borderSelect {
  width: 100%;
}
</style>

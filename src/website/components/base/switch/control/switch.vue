<template>
  <div>
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">最大宽度:</div>
        </a-list-item-meta>
        <a-input v-model="compAttr.width"/>
      </a-list-item>
      <a-list-item >
        <a-list-item-meta>
          <div slot="description">默认值:</div>
        </a-list-item-meta>
        <a-switch v-model="compAttr.value" />
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
        <a-input v-model="compAttr.label" />
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
  created() {}
  titleChange(v) {
    this.compAttr.label = this.showTitle ? '标题' : '';
  }
  apiList:any[]=[
    { dsc: '//获取开关的值', api: 'getValue():boolean' },
    { dsc: '//设置开关的值', api: 'setValue(ks:boolean)' },
  ]
}
</script>

<style lang="less" scoped>
.borderSelect {
  width: 100%;
}
</style>

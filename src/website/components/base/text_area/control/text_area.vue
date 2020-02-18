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
          <div slot="description">默认行数:</div>
        </a-list-item-meta>
        <a-input-number :min="1" v-model="compAttr.minRows" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">最大行数:</div>
        </a-list-item-meta>
        <a-input-number :min="1" v-model="compAttr.maxRows" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">默认值:</div>
        </a-list-item-meta>
        <a-input v-model="compAttr.value" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">计数器:</div>
        </a-list-item-meta>
        <a-switch v-model="compAttr.counter" />
      </a-list-item>
      <a-list-item v-if="compAttr.counter">
        <a-list-item-meta>
          <div slot="description">字数上限:</div>
        </a-list-item-meta>
        <a-input-number :min="1" v-model="compAttr.maxLength" />
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
          <div slot="description">默认提示:</div>
        </a-list-item-meta>
        <a-input v-model="compAttr.placeHolder"/>
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
import { List, Input, Select, Switch, Slider, InputNumber } from 'ant-design-vue';
@Component({
  name: 'active-component',
  components: {
    apiUserTip,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    AInputNumber: InputNumber,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASwitch: Switch,
    ASlider: Slider
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
    { dsc: '//获取输入框的值', api: 'getValue():string' },
    { dsc: '//设置输入框的值', api: 'setValue(str:string)' },
    { dsc: '//获取输入框标题', api: 'getDesc():string' },
    { dsc: '//得到输入框标题', api: 'setDesc(str:string)' },
    { dsc: '//检查用户输入（必填时有效）', api: 'check():boolean' },
  ]
}
</script>

<style lang="less" scoped>
.borderSelect {
  width: 100%;
}
</style>

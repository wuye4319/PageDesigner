<template>
  <div class="compAttr tag-component">
    <a-list itemLayout="horizontal">

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示标签:</div>
        </a-list-item-meta>
        <a-switch v-model="visible" @change="changeVal('visible')"/>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">标签排列:</div>
        </a-list-item-meta>
        <a-select v-model="rank" @change="changeVal('rank')">
          <a-select-option value="row">横向排列</a-select-option>
          <a-select-option value="column">纵向排列</a-select-option>
        </a-select>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">最大宽度:</div>
        </a-list-item-meta>
        <a-input v-model="maxWidth" @blur="changeVal('maxWidth')"/>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">状态(普通/只读):</div>
        </a-list-item-meta>
        <a-switch v-model="closable" @change="changeVal('closable')"/>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">描述信息:</div>
        </a-list-item-meta>
        <a-input v-model="desc" @blur="changeVal('desc')"/>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">是否必填:</div>
        </a-list-item-meta>
        <a-switch v-model="required" @change="changeVal('required')"/>
      </a-list-item>

      <!-- <a-list-item>
        <a-list-item-meta>
          <div slot="description">标签颜色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="color"
          @change="changeVal('color')"
        />
      </a-list-item> -->

    </a-list>
    <!-- api描述提示 -->
    <api-user-tip :apiList="apiList"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { colorPicker } from '@/website/components/common'; // 颜色选择器
import { List, Input, Switch, Select } from 'ant-design-vue';
import { apiUserTip } from '@/website/components/common'; // api提示

const webSite = namespace('webSite');

@Component({
  name: 'active-component',
  components: {
    colorPicker,
    apiUserTip,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    aSwitch: Switch,
    aSelect: Select,
    aSelectOption: Select.Option,
    aInput: Input
  }
})
export default class activeComponent extends Vue {
  @Prop() compData: any
  @Prop()
  compIndex: number

  color:string = '' // 标签颜色
  rank: string = 'row' // 排列方式
  maxWidth: string = '' // 最大宽度
  visible: boolean = true // 显示开关
  closable: boolean = true // 关闭开关
  desc: string = '' // 描述信息
  required: boolean = false // 必填
  pageData: any = this.compData.compAttr
  apiList:any[]=[ // api提示
    { dsc: '//获取值', api: 'getValue():string[]' },
    { dsc: '//设置值', api: 'setValue(value: string || string[])' }
  ]

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData)) {
      this[key] = this.pageData[key];
    }
  }

  changeVal(name) {
    this.pageData[name] = this[name];
  }
}
</script>

<style lang="less" scoped>
.compAttr{
  padding: 0 8px;
  /deep/.ant-list-item-content{
    flex: 1.5;
  }
}
</style>

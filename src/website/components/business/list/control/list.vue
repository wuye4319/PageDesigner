
<template>
  <div class="myList">
    <list-control
      :compData="compData"
      :compIndex="compIndex"
      :compsDataParent="compsDataParent"
      @change="listChange"
      :options="options"
    />
    <!-- api描述提示 -->
    <api-user-tip :apiList="apiList"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import listControl from './list-control.vue'; // 列表的分类和排序控制
import { apiUserTip } from '@/website/components/common'; // api提示

const webSite = namespace('webSite');

interface ListData {
  'list-classify': boolean;
  'list-sort': boolean;
  on: string;
}

@Component({
  name: 'list-component',
  components: {
    listControl,
    apiUserTip
  }
})
export default class listComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any;
  @Prop() compsDataParent: any;

  compAttr: any = this.compData.compAttr;

  options: object = {
    'classify-compName': 'list-classify', // 分类组件名称
    'sort-compName': 'list-sort', // 排序组件名称
    'classify-switch': true, // 分类组件开关
    'sort-switch': true, // 排序组件开关
    'classify-key': 'list-classify', // 分类组件绑定值名称
    'sort-key': 'list-sort', // 排序组件绑定值名称
    'classify-status': this.compAttr['list-classify'], // 分类组件绑定值状态
    'sort-status': this.compAttr['list-sort'] // 排序组件绑定值状态
  };
  apiList:any[]=[
    { dsc: '//更新排序', api: 'updateOrder():object[]' },
    { dsc: '//更新分类', api: 'updateFilter():object[]' }
  ]

  listChange(obj) {
    Object.assign(this.compAttr, obj);
  }
}
</script>
<style lang='less' scoped>
.myList {
  width: 100%;
  // display: flex;
  // background: #001529;
  // padding: 10px 10px;
  // justify-content: space-around;
}
</style>

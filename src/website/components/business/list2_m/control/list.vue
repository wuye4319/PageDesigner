
<template>
  <div class="compAttr">
    <!--     <div class="title">表格设置:</div>
    <a-list itemLayout="horizontal" size="small">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">边框:</div>
        </a-list-item-meta>
        <a-switch />
      </a-list-item>

    </a-list>
 -->
    <list-control
      :compData="compData"
      :compIndex="compIndex"
      :compsDataParent="compsDataParent"
      @change="listChange"
      :options="options" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import listControl from '@/website/components/business/list/control/list-control.vue';

const webSite = namespace('webSite');

@Component({
  name: 'tablectrl-component',
  components: { listControl }
})
export default class tablectrlComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any;
  @Prop() compsDataParent: any;

  compAttr: any = this.compData.compAttr;

  options: object = {
    'sort-compName': 'list-sort_m', // 排序组件名称
    'classify-switch': false, // 分类组件开关
    'sort-switch': true, // 排序组件开关
    'sort-key': 'list-sort', // 排序组件绑定值名称
    'sort-status': this.compAttr['list-sort'] // 排序组件绑定值状态
  };

  listChange(obj) {
    Object.assign(this.compAttr, obj);
  }
}
</script>
<style lang='less' scoped>
.compAttr {
  font-size: 12px;
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.5;
  }
}
.title {
  font-weight: bolder;
}
</style>

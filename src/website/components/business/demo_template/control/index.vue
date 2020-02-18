
<template>
  <div class="compAttr">
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
  name: 'democtrl-component',
  components: { listControl }
})
export default class tablectrlComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any; // 排序组件需要的
  @Prop() compsDataParent: any; // 排序组件需要的

  compAttr: any = this.compData.compAttr;
  // 排序组件需要的
  options: object = {
    'sort-compName': 'list-sort_m', // 排序组件名称
    'classify-switch': false, // 分类组件开关
    'sort-switch': true, // 排序组件开关
    'sort-key': 'list-sort', // 排序组件绑定值名称
    'sort-status': this.compAttr['list-sort'] // 排序组件绑定值状态
  };
  // 排序组件需要的
  listChange(obj) {
    Object.assign(this.compAttr, obj);
  }
}
</script>
<style lang='less' scoped>
</style>

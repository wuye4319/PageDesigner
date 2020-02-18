<template>
  <div class="layout" :style="{'min-height': minHeight}">
    <div
      class="column layout-view "
      v-for="(item,i) in compArray"
      :key="'array'+i"
      :style="Object.assign({},{'flex-grow': item.flex},item.attr.boxOptions,item.attr.flexOptions)"
    >
      <div
        class="layout-item "
        v-for="(view,j) of item.viewList"
        :key="j"
      >
        <component
          :style="item.data[j].boxOptions"
          :is="view"
          :compData="item.data[j]"
          :trigFunc="trigFunc"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Model } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

@Component({
  name: 'layout-view'
})

export default class LayoutView extends Vue {
  @Prop() compData: any
  @Prop() compIndex: any
  @Prop() trigFunc: any;

  pageData: any = this.compData

  @Inject('getCompsInfor') getCompsInfor // 获取异步组件方法

  // 将1维数组改变为多维数据进行渲染
  get compArray() {
    let childList = this.pageData.compAttr.childList;
    let childListAttr = this.pageData.compAttr.childListAttr;
    let compViewList = childList.map((item) => {
      let arr = this.loadCompList(item);
      return arr;
    });
    let flexArr = this.pageData.compAttr.typeVal.split(':');
    let compArrayBox = compViewList.map((item, i) => {
      let obj = {
        viewList: item,
        flex: flexArr[i],
        data: childList[i],
        attr: childListAttr[i]
      };
      return obj;
    });
    return compArrayBox;
  }

  get minHeight() { // 最小高度
    let minHeight = 0;
    if (this.pageData.compAttr.minHeightSwitch) {
      minHeight = this.pageData.compAttr.minHeight
    }
    return minHeight
  }

  // 动态异步加载组件
  loadCompList(comps) {
    let compsInfor = this.getCompsInfor('website/components/', comps);
    return compsInfor;
  }
}
</script>

<style lang='less' scoped>
  @import url('./layout.less');
</style>

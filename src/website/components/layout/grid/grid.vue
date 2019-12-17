<template>
  <div class="grid-component">
    <grid-layout
      :layout.sync="compInfo"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item) in compInfo"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        @drop.stop="handleContent"
      >
        <!-- <div
          :is="item.compInfo"
          :compData="item.child"
        ></div> -->
      </grid-item>
    </grid-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import VueGridLayout from 'vue-grid-layout';
import { getCompsInfor } from '@/common/utils';
import { compilation } from 'webpack';

const webSite = namespace('webSite');

@Component({
  name: 'grid-component',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  }
})
export default class gridComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: number;
  @Inject('compList') compList
  compInfor: any = {};
  compAttr: any = this.compData.compAttr;
  currCompsData: any = {};

  compArray: any = [];
  layout = this.compAttr.items;
  newViewList: any = [];

  mounted() {
  }

  get compInfo() {
    let layout = this.layout || [];
    let layEle = layout.map(item => {
      let tempItem = item;
      let compInfo = this.compList(item.children);
      tempItem.compInfo = compInfo;
      return tempItem;
    });
    return layEle || [];
  }

  handleContent(e) {
    e.stopPropagation();
    let compInfo = e.dataTransfer.getData('compInfo');
    this.currCompsData = compInfo;
    this.compAttr.childList = [JSON.parse(compInfo)];
    this.compInfor = this.compList(this.compAttr.childList)[0];
  }
}
</script>

<style lang="less" scoped>
.grid-component {
  width: 100%;
  /deep/.ant-row-flex {
    min-height: 30px;
    div {
      border: 1px solid #ccc;
    }
  }
  /deep/.vue-grid-item {
    background: #ccc;
  }
}
</style>

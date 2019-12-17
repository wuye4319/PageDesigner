<template>
  <div class="classify">
    <a-tabs v-model="activeKey" size="small" class="mytab" :tabBarStyle="{background: 'white',height: '40px',marginBottom: '8px'}" @change="tabchange" :class="{'tab-more': tabMore}">

      <!-- 组件 -->
      <template v-if="Object.keys(currCompsData).length > 0">

        <a-tab-pane tab="组件属性" key="comp" class="tab-cont bg scroll-style attr-warp">
          <box-model v-if="boxSwitch === 1" :key="new Date().getTime()" :boxOptions="currCompsData.boxOptions" />
          <interact-data v-if="currCompsData.compAttr&&currCompsData.compAttr.interactData" :compData="currCompsData">
          </interact-data>
          <component :is="currCompView" :compData="currCompsData" :compIndex="compIndex" :compsDataParent="currCompsDataParent" />
        </a-tab-pane>

        <a-tab-pane tab="数据绑定" v-if="dataSwitch === 1" key="data" class="tab-cont bg scroll-style">
          <databind :compData="currCompsData" :compIndex="compIndex" :compsDataParent="currCompsDataParent" />
        </a-tab-pane>

        <a-tab-pane tab="动作绑定" key="editor" class="tab-cont bg scroll-style">
          <actions-bind :compData="currCompsData" :compIndex="compIndex" :compsDataParent="currCompsDataParent" />
        </a-tab-pane>

      </template>

      <!-- 页面 -->
      <template v-else>
        <a-tab-pane tab="页面属性" key="page" class="tab-cont scroll-style">
          <app-style />
        </a-tab-pane>

        <a-tab-pane tab="页面事件" key="event" class="tab-cont bg scroll-style">

        </a-tab-pane>
      </template>

    </a-tabs>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Emit,
  Provide,
  Inject,
  Model
} from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { boxModel } from '@/website/components/common'; // 盒模型
import appStyle from '@/designer/components/appStyle'; // 页面属性
import databind from '@/designer/components/databind'; // 数据绑定
import interactData from '@/designer/components/interactData'; // 数据交互
import editor from '@/designer/components/editor'; // 事件逻辑
import actionsBind from '@/designer/components/actionsBind'; // 动作绑定
import actions from '../../store/actions';

const webSite = namespace('webSite');

@Component({
  name: 'classify',
  components: {
    appStyle,
    boxModel,
    databind,
    interactData,
    editor,
    actionsBind
  }
})
export default class Classify extends Vue {
  activeKey: string = 'page'; // 当前活动tab
  currCompView: any = ''; // 当前选中的control view
  currCompsData: object = {}; // 当前选中的control数据
  currCompsDataParent: object = {}; // 为layout时，currCompsData的父层
  compIndex: any = null; // 索引
  boxSwitch: number = null; // 盒模型开关
  dataSwitch: number = null; // 数据绑定开关
  actionSwitch: number = null; // 动作绑定开关

  @webSite.Getter('pageInfor')
  pageInfor;

  @webSite.Getter('compStore')
  compStore;

  @Inject('getCompsInfor') getCompsInfor;

  get tabMore() {
    let status1 = Object.keys(this.currCompsData).length > 0;
    let status2 = this.dataSwitch === 1;
    let status = status1 && status2;
    return status;
  }

  mounted() {
    this.$nextTick(() => {});
  }

  // tab改变
  tabchange(tab) {}

  // 展示control
  showDrawer(i, source?, sourceParent?) {
    if (i === 'layout') {
      this.currCompView = this.getCompsInfor(
        `website/components/`,
        source,
        true
      );
      this.currCompsData = source;
      this.currCompsDataParent = sourceParent;
    } else if (i === 'empty') {
      this.currCompView = null;
      this.currCompsData = {};
      this.dataSwitch = 0;
      this.boxSwitch = 0;
      this.actionSwitch = 0;
    } else {
      this.currCompView = this.getCompsInfor(
        `website/components/`,
        this.pageInfor[i],
        true
      );
      this.currCompsData = this.pageInfor[i];
    }
    this.compIndex = {
      i,
      source
    };

    if (Object.keys(this.currCompsData).length === 0) {
      // 属性栏切换到页面属性
      this.$nextTick(() => {
        this.activeKey = 'page';
      });
    } else {
      // 属性栏切换到组件属性
      this.$nextTick(() => {
        this.activeKey = 'comp';
      });
    }

    this.tabsShow();
  }

  // tab展示
  tabsShow() {
    if (Object.keys(this.currCompsData).length > 0) {
      let index = this.compStore.findIndex(item => {
        let status = this.currCompsData['compName'] === item.compName;
        return status;
      });
      // Object.assign(this.currCompsData,this.compStore[index])
      this.dataSwitch = this.compStore[index].dataSwitch;
      this.boxSwitch = this.compStore[index].boxSwitch;
      this.actionSwitch = this.compStore[index].actionSwitch;
    }
  }
}
</script>

<style lang='less' scoped>
.classify {
  height: 100%;
  .mytab .attr-warp {
    position: relative;
    overflow-x: hidden;
  }
}
.mytab {
  height: 100%;
  flex-direction: column;
  /deep/ .ant-tabs-nav-container {
    height: 40px;
    margin-left: 10px;
  }
  /deep/ .ant-tabs-content {
    height: calc(100% - 48px);
  }
  .tab-cont {
    height: 100%;
    overflow: auto;
    &.bg {
      background: white;
      padding: 0 10px;
    }
  }
}
.tab-more {
  /deep/ .ant-tabs-nav-container {
    font-size: 12px;
  }
  /deep/ .ant-tabs-tab {
    margin-right: 1px;
  }
}


</style>

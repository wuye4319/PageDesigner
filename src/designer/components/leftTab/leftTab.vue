<template>
  <div :class="'left-tab' + (fullScreen? ' fullChild':'')">
    <div :class="'topCtl' + (fullScreen === 'topCtl' ? ' fullScreen' : '')">
      <a-icon
        v-if="fullScreen !== 'topCtl'"
        type="fullscreen"
        class="controlIcon"
        @click="handleScreen('topCtl')"
      />
      <a-icon
        v-else
        type="fullscreen-exit"
        class="controlIcon"
        @click="cancelScreen()"
      />
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="页面" key="1">
          <slot name="pages"></slot>
        </a-tab-pane>
        <a-tab-pane tab="元素" key="2">
          <ElementList/>
        </a-tab-pane>
      </a-tabs>
    </div>
    <i class="line ant-desigener-bg-color"></i>
    <div :class="'bottomCtl' + (fullScreen === 'bottomCtl' ? ' fullScreen' : '')">
      <a-icon
        v-if="fullScreen !== 'bottomCtl'"
        type="fullscreen"
        class="controlIcon"
        @click="handleScreen('bottomCtl')"
      />
      <a-icon
        v-else
        type="fullscreen-exit"
        class="controlIcon"
        @click="cancelScreen()"
      />
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="组件" key="1">
          <slot name="compStore"></slot>
        </a-tab-pane>
        <a-tab-pane tab="共享元素" key="2">
          <CommonElement/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import PageList from '@/designer/components/leftTab/pageList';// 页面列表
import ElementList from '@/designer/components/leftTab/elementList';// 元素列表
import CommonElement from '@/designer/components/leftTab/commonElement';// 公共元素列表
import { Icon, Tabs } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'left-tab',
  components: {
    PageList,
    ElementList,
    CommonElement,
    AIcon: Icon,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane
  }
})
export default class LeftTabComponent extends Vue {
  @webSite.Getter('global')
  global;

  @webSite.Mutation('changeappInfor')
  changeappInfor;
  @webSite.Getter('pageActions') pageActions;

  fullScreen: string = '';

  handleScreen(type) {
    this.fullScreen = type;
  }
  cancelScreen() {
    this.fullScreen = '';
  }
}
</script>

<style lang='less' scoped>
.left-tab{
  height: 100%;
  background-color: white;
  &.fullChild{
    &>div{
      height: 45px;
    }
    &>.fullScreen{
      height: calc(100% - 47px);
    }
  }
  &>div{
    height: calc(50% - 1px);
    position: relative;
    .controlIcon{
      position: absolute;
      top: 2px;
      left: 2px;
      z-index: 100;
      font-size: 16px;
      cursor: pointer;
    }
  }
  &>.line{
    display: block;
    width: 100%;
    height: 2px;
    // cursor: ns-resize;
  }
  /deep/.ant-tabs{
    height: 100%;
  }
  /deep/.ant-tabs-top-content{
    height: calc(100% - 44px);
  }
  /deep/.ant-tabs-bar{
    margin: 0;
  }
  /deep/.ant-tabs-tabpane{
    height: 100%;
    overflow: auto;
  }
}
</style>

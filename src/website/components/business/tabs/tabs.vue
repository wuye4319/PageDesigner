<template>
  <div class="tabs">
    <a-tabs
      :animated="pageData.animated"
      :type="pageData.type"
      :hideAdd="pageData.hideAdd"
      :size="pageData.size"
      :tabPosition="pageData.tabPosition"
      :tabBarGutter="0"
      :defaultActiveKey="'tab'+(pageData.activeKey || '0')"
    >
      <a-tab-pane
        v-for="(pane,i) in paneData"
        :tab="pane.title"
        :key="'tab'+i"
        :closable="pane.closable"
      >
        <layout v-if="pane.content" :compData="pane.content"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import layout from '../../layout/layout/index';
import page from '../../base/text_area/control/index';
import { Tabs } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'tabs',
  components: {
    layout,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane
  }
})
export default class TabsView extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any;

  @webSite.Getter('tables')
  tables: [];

  pageData: any = this.compData.compAttr;

  get paneData() {
    let tabs: any = this.compData.compAttr.tabs;
    return tabs;
  }
  created() {
    console.log();
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-tabs-line {
  .ant-tabs-nav {
    width: 100%;
    & > div {
      display: flex;
      justify-content: space-around;
    }
    .ant-tabs-ink-bar {
      display: none !important;
    }
    .ant-tabs-tab-active {
      border-bottom: 3px solid #17bc94;
    }
  }
}
/deep/.ant-tabs-tabpane {
  /deep/& > .layout {
    padding-bottom: 0px;
  }
}
/deep/.ant-tabs-card-bar {
  .ant-tabs-nav-container {
    height: 25px !important;
    margin: 6px;
  }
  .ant-tabs-nav-scroll {
    text-align: left;
  }
  .ant-tabs-nav {
    background: rgba(23, 188, 148, 0.3);
    border-radius: 13px;
    & > div {
      display: flex;
      justify-content: flex-start;
    }
    .ant-tabs-ink-bar {
      display: none !important;
    }
    .ant-tabs-tab {
      height: 25px;
      line-height: 25px;
      background: transparent !important;
      border: none !important;
    }
    .ant-tabs-tab-active {
      background: #17bc94 !important;
      color: white !important;
      border-radius: 13px !important;
    }
  }
}
/deep/.ant-tabs-bar {
  margin: 0;
}
/deep/.ant-tabs-content {
  padding: 0;
}
.flesh {
  display: none;
}
</style>

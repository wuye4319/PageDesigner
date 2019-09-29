<template>
  <div class="myPortal">
    <a-layout>
      <a-layout-header v-if="header.show" :style="{'background': header.background}">
        <div class="logo" :style="{'color': logo.color, background: logo.background}">
          <img v-if="logo.img" width="100px" height="100%" :src="logo.img" alt="">
          <span v-if="!logo.img">{{logo.text}}</span>
        </div>
        <a-menu
          class="headerMenu"
          :mode="header.mode"
          :theme="header.theme"
          :style="{'background': header.background}"
        >
          <a-menu-item key="mail">
            <a-icon type="mail" />Navigation One
          </a-menu-item>
          <a-menu-item key="app">
            <a-icon type="appstore" />Navigation Two
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          v-if="sider.show"
          :style="{'background': sider.background}"
          :collapsible="sider.collapsible"
        >
          <a-menu
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1']"
            :mode="sider.mode"
            :theme="sider.theme"
            :style="{'background': sider.background}"
          >
            <a-menu-item key="1">
              <a-icon type="pie-chart" />
              <span>Option 1</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="desktop" />
              <span>Option 2</span>
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="inbox" />
              <span>Option 3</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content @drop="handleContent" class="content">
          <div class="portalList" v-for="(view,i) in compInfor" :key="'array'+i">
            <div v-if="typeof(view)==='function'" :is="view" :compData="compData"></div>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { compilation } from "webpack";

const webSite = namespace("webSite");

@Component({
  name: "table-component",
  components: {}
})
export default class tableComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: number;
  @Prop() compList: any;
  compInfor: any = {};
  compAttr: any = this.compData.compAttr;
  currCompsData: any = {};
  header: any = this.compAttr.header;
  sider: any = this.compAttr.sider;
  logo: any = this.compAttr.logo;
  collapsed: boolean = false;

  mounted() {
    this.compInfor = this.compList(this.compAttr.childlist);
  }

  @Watch('compAttr')
  update(){
    this.$forceUpdate();
  }

  handleContent(e) {
    e.stopPropagation();
    console.log(e.target);
    let compInfo = e.dataTransfer.getData("compInfo");
    this.currCompsData = compInfo;
    this.compAttr.childlist.push(JSON.parse(compInfo));
    this.compInfor = this.compList(this.compAttr.childlist);
  }
}
</script>
<style lang='less' scoped>
.myPortal {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 60px);
  /deep/.ant-layout {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 124px);
    /deep/.ant-layout-header {
      background: #fff;
      box-shadow: 0 2px 8px rgba(30, 85, 255, 0.1);
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      padding: 0;
    }
    /deep/.ant-layout-sider {
      color: #fff;
    }
  }
  /deep/.ant-menu-item {
    height: 100%;
  }
  .logo {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/.headerMenu {
    height: 64px;
    flex: 1;
    line-height: 64px;
    /deep/.ant-menu-item {
      line-height: 64px;
    }
  }
  /deep/.ant-menu-horizontal {
    border: none;
  }
  .content {
    padding: 20px;
  }
}
</style>

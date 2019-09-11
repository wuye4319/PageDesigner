<template>
  <div class="container">
    <div class="design-toolbar">
      <div class="design-logo">组件库</div>
      <comp-store :compData="compStore" @moveDragend="moveDragend"></comp-store>
    </div>
    <div class="design-screen">
      <div class="head-bar">
        <div class="page-nav">
          <a-select v-model="pageSelect" style="width: 120px" @change="handleChange">
            <a-select-option v-for="page in pageList" :key="page" :value="page">{{ page }}</a-select-option>
          </a-select>
        </div>
        <operate-modal :appInfor="appInfor" :createPage="createPage" :deletePage="deletePage"></operate-modal>
        <div class="screen-list">
          <ul>
            <li @click="changeScreenType(screen)" v-for="screen in screenList" :key="screen">
              <a-icon :type="screen"/>
            </li>
            <li>
              <a href="/#/website/product" target="_blank">
                <a-icon type="fullscreen"/>
              </a>
            </li>
          </ul>
        </div>
        <div class="save">
          <a-button type="primary">Save</a-button>
        </div>
      </div>
      <div class="design-iframe">
        <div class="page-container" :class="isMobile">
          <website :showDrawer="showDrawer" ref="website"></website>
        </div>
        <div class="design-attribute">
          <!-- <comp-setting :compData="pageInfor" :compIndex="compIndex"></comp-setting> -->
          <div :is="currCompView" :compData="currCompsData" :compIndex="compIndex"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { getCompsInfor } from '@/common/utils'
import { Select, Button, Input } from 'ant-design-vue'
import website from '@/website/pages/index.vue'
import layoutList from '@/designer/components/layout'
import compStore from "@/website/components/comp_store";
import compSetting from "@/website/components/settings";
import OperateModal from "../components/operateModal";

const webSite = namespace("webSite");

interface Model {
  visible: boolean;
  confirmLoading?: boolean;
  [propName: string]: any;
}

@Component({
  name: "page-index",
  components: {
    ASelete: Select,
    AButton: Button,
    AInput: Input,
    website,
    compStore,
    compSetting,
    layoutList,
    OperateModal
  }
})
export default class Pageindex extends Vue {
  $router
  $route
  $message
  $refs: {website: HTMLFormElement}
  pageSelect: string = ''
  currCompView: any = ''
  currCompsData: object = {}
  screenList = ['mobile', 'desktop']
  isMobile: string = ''
  compIndex: number = null
  compList: any = ''
  isShowLayout: object = {}
  createPage: Model = { // 新增页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    title: "", // 标题
    name: "" // 标题名称
  };
  deletePage: Model = {
    // 删除页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    options: ["Apple", "Pear", "Orange"], // 选项
    checkedList: ["Apple", "Orange"], // 选中的值
    checkAll: false, // 全选按钮
    indeterminate: true //
  };

  @webSite.Getter("pageInfor")
  pageInfor;

  @webSite.Getter("appInfor")
  appInfor: Website.pageInfor;

  @webSite.Getter("compStore")
  compStore: Website.pageInfor;

  @webSite.Action("changePage")
  changePage;

  @webSite.Mutation("removePageInfor")
  removePageInfor: any;

  @webSite.Mutation("changePageInfor")
  changePageInfor;

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  get ctrlCompList() {
    let compsInfor = getCompsInfor("website/components/", this.pageInfor, true);
    return compsInfor;
  }

  handleChange(value) {
    this.$router.push({
      path: `/designer/${value}`
    });
    this.changePage({ page: value });
  }

  created() {
    this.pageSelect = this.$router.currentRoute.params.page;
    let screen = this.$route.query.screen;
    this.changeScreenType(screen);
  }

  get viewCompList() {
    let compsInfor = getCompsInfor("website/components/", this.pageInfor);
    return compsInfor;
  }

  loadCompList(compInfor) {
    this.compList = getCompsInfor("website/components/", compInfor);
  }

  visible: boolean = false;

  showDrawer(i) {
    this.currCompView = this.ctrlCompList[i];
    this.currCompsData = this.pageInfor[i];
    this.compIndex = i;
    this.visible = true;
  }

  showLayout(key) {
    let val = this.isShowLayout[key] ? false : true
    Vue.set(this.isShowLayout, key, val)
  }

  removeComp(i) {
    this.removePageInfor(i);
  }

  changeScreenType(screen) {
    if (screen === "mobile") {
      this.isMobile = "mobile-width";
    } else {
      this.isMobile = "";
    }
  }

  moveDragend() {
    let website = this.$refs.website;
    // 重置显示节点，新、旧节点
    website.emptyNum = -1;
    website.newNum = -1;
    website.oldNum = -1;
    
  }
}
</script>
<style lang='less' scoped>
.container {
  display: -webkit-box;
  height: 100%;
  width: 100%;
  text-align: center;
}
/deep/ .ant-select-selection-selected-value {
  line-height: 28px;
}
.design-toolbar {
  width: 300px;
  height: 100%;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  .design-logo {
    @height: 60px;
    height: @height;
    line-height: @height;
    background: #585556;
    color: #fff;
  }
  .design-componet-list {
    height: 100%;
    padding-top: 50px;
    position: relative;
    .comps-close {
      margin-right: 8px;
      padding: 0 6px;
    }
    .comps-items {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-top: 5px;
      min-height: 50px;
      line-height: 50px;
    }
    > div {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-top: 5px;
      height: 50px;
      line-height: 50px;
    }
  }
  .foot-button {
    border-top: 1px solid #ddd;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    height: 60px;
  }
}
.design-screen {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  .head-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.17);
    height: 60px;
    .page-nav {
      margin-left: 10px;
    }
    .save {
      margin-right: 10px;
    }
    > div {
      line-height: 60px;
    }
    ul li {
      line-height: 60px;
      font-size: 20px;
    }
    .screen-list ul {
      width: 120px;
      display: flex;
      justify-content: space-between;
    }
  }
  .design-iframe {
    // padding: 12px;
    flex-grow: 1;
    display: flex;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    height: 100%;
    .page-container {
      flex: 1;
      height: 100%;
      overflow: auto;
      // box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(0, 0, 0, 0.1);
    }
    .mobile-width {
      width: 375px;
    }
    .design-attribute {
      width: 300px;
      height: 100%;
      border-left: 1px solid #d9d9d9;
    }
  }
}
.flip-list {
  display: block;
}
.flip-list-move {
  transition: transform 0.5s;
}
.button {
  padding-bottom: 50px;
}
.handle {
  .delete {
    margin-left: 20px;
  }
}
.model-cont {
  display: flex;
  .name {
    width: 200px;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
  }
  .desc {
    flex: 1;
  }
}
.model-checkbox {
  margin-bottom: 10px;
}
</style>

<template>
  <div class="container">
    <div class="head-bar">
      <div class="page-nav">
        <a-select v-model="pageSelect" class="page-select" @change="handleChange">
          <a-select-option v-for="page in pageList" :key="page" :value="page">{{ page }}</a-select-option>
        </a-select>
        <operate-modal :appInfor="appInfor" :createPage="createPage" :deletePage="deletePage"></operate-modal>
      </div>
      <div class="handle-button">
        <a-button class="btn" icon="eye" @click="openfullscreen">预览</a-button>
        <a-button class="btn" @click="saveInfo" icon="save">保存</a-button>
        <a-button class="btn" type="primary" icon="file">发布</a-button>
      </div>
    </div>
    <div class="design-cont">
      <!-- 组件 -->
      <div class="design-toolbar" :class="leftShow ? 'leftShow': 'leftHidden'">
        <comp-store :compData="compStore" class="compStore" @moveDragend="moveDragend"></comp-store>
        <div class="arrow-handle arrow-left handle-left" @click="leftShow = false"><a-icon type="left" /></div>
      </div>
      <!-- 内容 -->
      <div class="design-screen">
        <div class="screen-list bg-white">
          <a-radio-group v-model="screen"  @change="changeScreenType">
            <a-radio-button value="desktop">PC端设计</a-radio-button>
            <a-radio-button value="mobile">移动端设计</a-radio-button>
          </a-radio-group>
        </div>
        <div class="design-iframe bg-white" :class="isMobile">
          <website :showDrawer="showDrawer" isDesigner="true" ref="website"></website>
        </div>
        <div 
          class="arrow-handle arrow-right handle-mid-right" 
          :class="leftShow ? 'mid-left-hidden': 'mid-left-show'"
          @click="leftShow = true">
          <a-icon type="right" />
        </div>
        <div 
          class="arrow-handle arrow-left handle-mid-left" 
          :class="rightShow ? 'mid-right-hidden': 'mid-right-show'"
          @click="rightShow = true">
          <a-icon type="left" />
        </div>
      </div>
      <!-- 属性 -->
      <div class="design-attribute" :class="rightShow ? 'rightShow': 'rightHidden'">
        <!-- <comp-setting :compData="pageInfor" :compIndex="compIndex"></comp-setting> -->
        <a-tabs defaultActiveKey="1" size="small">
          <a-tab-pane tab="组件属性" key="1">
            <div :is="currCompView" :compData="currCompsData" :compIndex="compIndex"></div>
          </a-tab-pane>
          <a-tab-pane tab="页面属性" key="2">
            <page-info :pageInfo="pageInfor" :changePageInfor="changePageInfor"/>
          </a-tab-pane>
        </a-tabs>
        <div class="arrow-handle arrow-right handle-right" @click="rightShow = false"><a-icon type="right" /></div>
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
import compStore from '@/website/components/comp_store';
import compSetting from '@/website/components/settings';
// import { savePageInfo } from '@/designer/service/index';
import OperateModal from '../components/operateModal';
import pageInfo from '../components/pageInfo';
import axios from '@/common/config/axios'
import qs from 'Qs';

const webSite = namespace('webSite');

interface Model {
  visible: boolean;
  confirmLoading?: boolean;
  [propName: string]: any;
}

@Component({
  name: 'page-index',
  components: {
    ASelete: Select,
    AButton: Button,
    AInput: Input,
    website,
    compStore,
    compSetting,
    OperateModal,
    pageInfo
  }
})
export default class Pageindex extends Vue {
  $router
  $route
  $message
  $refs: { website: HTMLFormElement }
  pageSelect: string = ''
  currCompView: any = ''
  currCompsData: object = {}
  screen:string = 'desktop' // 当前是pc还是移动
  isMobile: string = ''
  compIndex: any = []
  compList: any = ''
  isShowLayout: object = {}
  createPage: Model = { // 新增页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    title: '', // 标题
    name: '' // 标题名称
  };
  deletePage: Model = {
    // 删除页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    options: ['Apple', 'Pear', 'Orange'], // 选项
    checkedList: ['Apple', 'Orange'], // 选中的值
    checkAll: false, // 全选按钮
    indeterminate: true //
  };
  leftShow:boolean = true // 组件显示和隐藏
  rightShow:boolean = true // 属性显示和隐藏

  @webSite.Getter('pageInfor')
  pageInfor;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  @webSite.Getter('compStore')
  compStore: Website.pageInfor;

  @webSite.Action('changePage')
  changePage;

  @webSite.Mutation('removePageInfor')
  removePageInfor: any;

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  // 动态异步加载组件
  get ctrlCompList() {
    let compListBox = this.pageInfor.map((item, i) => {
      let compsInfor;
      if (item.compName === 'layout') {
        compsInfor = getCompsInfor(`website/components/`, item.compAttr.childList, true);
      }else {
        compsInfor = getCompsInfor(`website/components/`, item, true);
      }
      
      return compsInfor;
    })
    return compListBox;
  }

  handleChange(value) {
    this.screen = this.appInfor[value].screen === 'mobile' ? 'mobile' : 'desktop';
    this.$router.push({
      path: `/designer/${value}`,
    });
    this.changePage({ page: value });
    this.changeScreenType();
  }

  created() {
    this.pageSelect = this.$router.currentRoute.params.page;
    this.screen = this.$route.query.screen;
    this.changeScreenType();
  }

  mounted() {
    console.log(this.pageInfor)
    this.$nextTick(() => {
      
    })
  }

  visible: boolean = false;

  showDrawer(i, c) {
    if (this.pageInfor[i].compName === 'layout') {
      this.currCompView = this.ctrlCompList[i][c];
      this.currCompsData = this.pageInfor[i].compAttr.childList[c];
    }else {
      this.currCompView = this.ctrlCompList[i];
      this.currCompsData = this.pageInfor[i];
    }
    this.compIndex = [i,c];
    this.visible = true;
  }

  savePageInfo(){
    console.log("77777")
  }

  showLayout(key) {
    let val = !this.isShowLayout[key]
    Vue.set(this.isShowLayout, key, val)
  }

  removeComp(i) {
    this.removePageInfor(i);
  }

  changeScreenType() {
    let screen = this.screen;
    if (screen === 'mobile') {
      this.isMobile = 'mobile-width';
      this.$router.push({
        query: {
          screen: 'mobile'
        }
      })
    } else {
      this.isMobile = '';
      this.$router.push({
        query: {
          screen: 'desktop'
        }
      })
    }
  }

  openfullscreen() {
    let screen = this.isMobile === 'mobile-width' ? 'mobile': 'desktop';
    window.open(`#/website/${this.pageSelect}?screen=${screen}`);
  }

  moveDragend() {
    let website = this.$refs.website;
    // 重置显示节点，新、旧节点 列 空列
    clearTimeout(website.emptyTimer);
    website.emptyNum = -1;
    website.newNum = -1;
    website.oldNum = -1;
    website.newColumn = -1;
    website.emptyColumn = -1;
  }

  saveInfo() {
    let appInfor = this.appInfor;
    appInfor[this.pageSelect].module = this.pageInfor;
    let params = {
      page: appInfor
    }
    axios.post('/page/pageconfig/default',params).then((res)=> {
      if (res && res.data === 'success' && res.msg === 'success') {
        this.$message.success('保存成功！')
      }else {
        this.$message.error('保存失败');
      }
    })
  }
}
</script>
<style lang='less' scoped>
  @import url('./index.less');
</style>

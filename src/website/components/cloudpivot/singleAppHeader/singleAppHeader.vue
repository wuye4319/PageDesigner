<template>
  <div class="app-header">
    <a-menu
      mode="horizontal"
      :defaultSelectedKeys="defaultSelectedKeys"
    >
      <template v-for="(page,idx) in navPages">
        <a-menu-item
          :key="page.name"
          :class="idx===0 && 'home_link'"
          @click="onClickAppRouter($event,page.name)">
          <a>
            {{ page.label }}
            <a-badge
              v-if="page.name === 'appTodo'"
              :count="toDo"
              :overflowCount="99"/>
            <a-badge
              v-if="page.name === 'appToread'"
              :count="toRead"
              :overflowCount="99"/>
          </a>
        </a-menu-item>
        <a-menu-item :key="idx" v-if="page.name === 'appHome'">
          <a-divider type="vertical"></a-divider>
        </a-menu-item>
      </template>
    </a-menu>
    <div
      class="slider"
      :style="{ width: `${colorBlock.width}px`, transform: `translate3d(${colorBlock.left}px, 0, 0)`}"
    ></div>
  </div>
</template>

<script lang="ts">
import '../common/scripts/environmentValue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

import axios from '../common/config/axios';

import { workflowCenterApi } from '@cloudpivot_v2/api';

import zhCN from '../common/locale/zh-CN';

import enUS from '../common/locale/en-US';

const webSite = namespace('webSite');

/**
 * 高亮滑块的样式
 * */
interface ClockBlock {
  width: number,
  left: number
}

@Component({
  name: 'singleAppHeader-component',
  components: {}
})
export default class singleAppHeaderComponent extends Vue {
  @Prop() compData: any;

  // toDo: number = 0;

  // toRead: number = 0;

  defaultSelectedKeys: Array<string> = [];

  colorBlock:ClockBlock = {
    width: 0,
    left: 0
  }

  navPages: Array<any> = [
    { name: 'appHome', label: '首页' },
    { name: 'appTodo', label: '我的待办' },
    { name: 'appToread', label: '我的待阅' },
    { name: 'appDone', label: '我的已办' },
    { name: 'appRead', label: '我的已阅' },
  ];

  get appCode() {
    return window.Environment && window.Environment.appCode
  }

  get toDo() {
    return this.global.Workflow ? this.global.Workflow.unFinishedListCount : 0
  }

  get toRead() {
    return this.global.Workflow ? this.global.Workflow.unReadListCount : 0
  }

  @webSite.Getter('global')
  global: any;

  @webSite.Action('changePage')
  changePage;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  /**
   * 初始化滑块
   * */
  initSlider(target?:any) {
    this.$nextTick(() => {
      let curRouteDom:HTMLElement;
      if (target) {
        curRouteDom = target.parentNode as HTMLElement
      } else {
        const _targetADom = document.querySelector('.app-header li a.router-link-active') as HTMLElement;
        if (_targetADom) {
          curRouteDom = _targetADom.parentNode as HTMLElement;
        } else {
          curRouteDom = document.querySelector('.app-header > ul > li.ant-menu-item.ant-menu-item-selected') as HTMLElement;
        }
      }

      if (!curRouteDom) return;
      // 1. 获取当前路由节点的宽度
      const curRouteDomWidth:number = curRouteDom.clientWidth as number;

      // 2. 获取当前路由节点的偏移
      const curRouteDomOffsetLeft:number = curRouteDom.offsetLeft as number;

      this.colorBlock.width = curRouteDomWidth; // 添加宽度
      this.colorBlock.left = curRouteDomOffsetLeft; // 往左偏移以居中
    });
  }

  // 根据当前路由判断当前选中
  setDefaultSelectedKeys() {
    const { page } = this.$route.params;
    if (!page) {
      return;
    }
    this.defaultSelectedKeys = [page];
  }

  /**
   * 获取代码待阅条数
   */
  async getTodos() {
    const res = await workflowCenterApi.getWorkCount(this.appCode);
    if (res.errcode === 0) {
      this.global.Workflow = {
        unFinishedListCount: res.data.workItemCount,
        unReadListCount: res.data.circulateItemCount,
      }
    }
  }

  /**
   * 生成页面设计器需要的路由
   */
  genarateLink(page: string) {
    const { name, params: { appID }, query } = this.$route;
    return {
      // name,
      // params: {
      //   appID,
      //   page
      // },
      path: `/${name}/${appID}/${page}`,
      query: {
        ...query,
        screen: this.appInfor[page].screen,
        appCode: this.appCode,
      }
    }
  }

  onClickAppRouter(e:any, page:string) {
    this.$router.push(this.genarateLink(page))
    this.changePage({ page: page });
    this.$nextTick(() => {
      const { target } = e.domEvent;
      this.initSlider(target)
    })
  }

  created() {
    // 初始化多语言
    this.$addLanguage('zh_CN', zhCN);
    this.$addLanguage('en_US', enUS);
  }

  beforeMount() {
    this.setDefaultSelectedKeys();
  }

  mounted() {
    // const { params: { page } } = this.$route;
    // this.changePage({ page: page })

    this.global.Workflow = {
      unFinishedListCount: 0,
      unReadListCount: 0,
    }
    this.getTodos().then(() => {
      this.initSlider();
    });
  }
}
</script>
<style lang='less' scoped>

.app-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 48px;
  background: #ffffff;
  position: relative;
  text-align: left;
  box-shadow:0px 2px 8px 0px rgba(30,85,255,0.1);
  .slider {
    position: absolute;
    bottom: 0;
    left: 0px;
    width: 0;
    height: 3px;
    border-radius: 2px;
    // background: @primary-color;
    &:extend(.cloudpivot-background-color);
    transition:  all ease .3s;
  }
  /deep/ .ant-menu {
    width: 100%;
    padding-left: 12px;
  }
  /deep/ .ant-menu-horizontal {
    border-bottom: none;
  }
  /deep/ .ant-menu-item,
  /deep/ .ant-menu-item-selected {
    margin: 0 12px;
    padding: 0;
    border: none !important;
  }
  /deep/ .ant-menu-item-selected {
    a {
      // color: @primary-color;
      &:extend(.cloudpivot-font-color);
    }
  }
  /deep/ .ant-menu-item {
    a {
      position: relative;
      text-align: center;
      cursor: pointer;
      &:hover {
        // color: @primary-color;
        &:extend(.cloudpivot-font-color);
      }
      // &.router-link-active {
      //   &::after {
      //     position: absolute;
      //     content:'';
      //     bottom: 0;
      //     left: 0;
      //     width: 100%;
      //     height: 0;
      //     border-bottom: 3px solid @primary-color;
      //   }
      // }
      /deep/ .ant-badge{
        margin-left: 0;
        margin-top: -2px;
        height: auto;
        vertical-align: middle!important;
      }
      /deep/ .ant-badge-count {
        height: 16px;
        line-height: 16px;
      }
    }
    &.home_link {
      font-size: 16px;
      font-weight: 600;
    }
  }
  /deep/ .ant-divider-vertical {
    margin: 0;
  }
}
</style>

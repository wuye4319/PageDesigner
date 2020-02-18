<template>
  <div class="app-home-content">
    <app-home-header @search="search" @clear="clear">
      <div
        class="search-result"
        slot="left"
        v-if="wd"
      >
        搜索结果
        <span>{{ searchTotal }}</span> 条
      </div>
      <div slot="right">
        <app-search
          placeHolder="搜索流程名称"
          @search="search"
          @clear="clear"
        ></app-search>
      </div>
    </app-home-header>
    <div class="app-home-content__main">
      <app-home-groups v-show="!wd" :appGroups="appGroups"></app-home-groups>
      <app-home-groups v-show="wd" :appGroups="searchGroups"></app-home-groups>
      <img v-show="wd && searchGroups.length ===0" src="./assets/search-no-data.png"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

import axios from '../common/config/axios';

import AppHomeHeader from './components/app-home-header.vue';
import AppHomeGroups from './components/app-home-groups.vue';
import AppSearch from './components/app-search.vue';
import { listApi, listParams } from '@cloudpivot_v2/api';

const webSite = namespace('webSite');

@Component({
  name: 'singleAppHome-component',
  components: {
    AppHomeHeader,
    AppHomeGroups,
    AppSearch
  }
})
export default class singleAppHomeComponent extends Vue {
  appName: string = '';

  appGroups: Array<any> = [];

  searchGroups: Array<any> = [];

  wd: string = '';

  mode = {
    Normal: 0,
    Search: 1
  };

  get appCode() {
    return window.Environment && window.Environment.appCode
  }

  get searchTotal() {
    let total = 0;
    this.searchGroups.forEach((group:any) => {
      total += group.childrens.length;
    });
    return total;
  }

  search(wd: string) {
    this.wd = wd;
    this.getSearchBizModels();
  }

  clear() {
    this.wd = '';
    this.searchGroups = [];
  }

  /**
   * 格式化数据
   */
  formatData(data:any, mode:number) {
    let res: Array<any> = [];
    if (mode === this.mode.Normal) {
      this.appGroups = [];
      res = this.appGroups;
    } else {
      this.searchGroups = [];
      res = this.searchGroups;
    }
    // 目录数据
    const folders: Array<any> = data.filter((biz:any) => biz.type === 'Folder' && biz.children && biz.children.length);
    // 应用下直接挂载的业务模型
    const bizModels: Array<any> = data.filter((biz:any) => ['BizModel', 'Page', 'Report'].includes(biz.type));

    if (bizModels.length) {
      const defaultGroup: any = {
        title: '',
        code: this.appCode,
        childrens: []
      };
      bizModels.forEach((item: any) => {
        defaultGroup.childrens.push({
          name: item.name,
          icon: item.icon,
          code: item.code,
          type: item.type,
          openMode: item.openMode,
          pcUrl: item.pcUrl,
        });
      });
      res.push(defaultGroup);
    }
    folders.forEach((folder: any) => {
      const group : any = {
        title: '',
        childrens: []
      };
      group.title = folder.name;
      group.childrens = folder.children;
      res.push(group);
    });
  }

  /**
   * 获取单应用信息，主要用户获取应用名称
   */
  async getSingleAppInfo() {
    const res = await listApi.getSingleAppInfo(this.appCode);
    if (res.errcode === 0) {
      this.appName = res.data.name;
    }
  }

  /**
   * 获取单应用分组信息
   */
  async getAppGroups() {
    const params : listParams.FolderSchema = {
      appCode: this.appCode,
      isMobile: true
    };
    const res = await listApi.getFolder(params);
    if (res.errcode === 0) {
      if (!Array.isArray(res.data)) {
        return;
      }
      this.formatData(res.data, this.mode.Normal);
    }
  }

  /**
   * 根据关键字查询表单
   */
  async getSearchBizModels() {
    const params: listParams.SearchBizModelRequest = {
      searchKey: this.wd,
      appCode: this.appCode
    };
    const res = await listApi.searchBizModels(params);
    if (res.errcode === 0) {
      if (!Array.isArray(res.data)) {
        return;
      }
      this.formatData(res.data, this.mode.Search);
    }
  }

  mounted() {
    // alert('appcode'+ this.appCode);
    if (this.appCode) {
      this.getSingleAppInfo();
      this.getAppGroups();
    }
  }
}
</script>
<style lang='less' scoped>
.app-home-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: calc(100vh - 48px);
  padding: 16px;
  background: #F4F6FC;
  overflow: hidden;
  font-size: 14px;
  text-align: left;
  /deep/ .search-result {
    line-height: 20px;
    color: rgba(0,0,0,0.65);
    span {
      // color: @primary-color;
      &:extend(.cloudpivot-font-color);
    }
  }
  &__main {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    margin-top: 16px;
    padding: 16px;
    background: #fff;
    box-shadow: 0px 2px 8px 0px rgba(30,85,255,0.1);
    border-radius: 4px;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
}
</style>

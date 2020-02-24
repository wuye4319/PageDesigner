<template>
  <div class="myapp-manage">
    <a-spin :spinning="spinning">
      <a-row class="header" :gutter="24">
        <a-col :span="5">
          <a-button @click="openModal" type="primary">
            <a-icon type="plus" />新建
          </a-button>
        </a-col>
        <a-col :span="14">
          <a-input placeholder="请输入应用名称" @change="searchName" />
        </a-col>
        <!-- <a-col :span="7">
        <a-select style="width: 100%" placeholder="请选择应用类型" @change="searchType">
          <a-select-option value>全部</a-select-option>
          <a-select-option value="mobile">移动端</a-select-option>
          <a-select-option value="desktop">PC端</a-select-option>
        </a-select>
      </a-col> -->
        <a-col :span="3">
          <a-button type="primary" @click="handleSearch">查询</a-button>
        </a-col>
      </a-row>
      <div class="header"></div>
      <div class="content">
        <a-list
          :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }"
          :dataSource="data"
          class="mylist"
          :locale="{'emptyText': '您还没有任何应用，去新建一个吧!'}">
          <a-list-item
            class="list"
            slot="renderItem"
            slot-scope="item">
            <a-card hoverable class="mycard">
              <img
                alt="example"
                :src="item.pic || defaultImg"
                slot="cover"
                @click="goDetails(item)" />
              <a-card-meta @click="goDetails(item)">
                <h4
                  :title="item.appName"
                  slot="title"
                  class="overElip">
                  <a-icon
                    v-if="item.screen === 'mobile'"
                    type="mobile"
                    style="color: #17BC94" />
                  <a-icon
                    v-if="item.screen === 'desktop'"
                    type="desktop"
                    style="color: #17BC94" />
                  {{ item.appName }}
                </h4>

                <div
                  slot="description"
                  :title="item.description"
                  class="desc overElip"
                  @click="goDetails(item)">
                  {{ item.description }}</div>
              </a-card-meta>
              <template class="ant-card-actions" slot="actions">
                <a-icon
                  type="laptop"
                  title="去设计"
                  @click="goDesigner(item)" />
                <a-icon
                  type="database"
                  title="数据中心"
                  @click="goDatabse(item)" />
                <a-icon
                  type="edit"
                  @click="handleEdit(item)"
                  title="编辑应用" />
                <a-popconfirm
                  title="将应用发布到应用市场?"
                  @confirm="addToAppstore(item)"
                  okText="确认"
                  cancelText="取消"
                  v-if="!item.isMarket">
                  <a-icon type="shop" title="发布到应用市场" />
                </a-popconfirm>
                <a-popconfirm
                  title="将该应用从应用市场下架?"
                  @confirm="deleteFromAppstore(item)"
                  okText="确认"
                  cancelText="取消"
                  v-if="item.isMarket">
                  <a-icon type="export" />
                </a-popconfirm>
                <a-icon
                  @click="shareModal(item)"
                  type="fork"
                  title="分享" />
                <a-icon
                  type="delete"
                  @click="showConfirm(item)"
                  title="删除" />
              </template>
            </a-card>
          </a-list-item>
        </a-list>
      </div>
      <create-app-modal
        :visible="visible"
        :closeModal="closeModal"
        :appData="appData"></create-app-modal>
      <a-modal
        title="分享应用"
        :visible="shareVisible"
        @ok="shareTo"
        @cancel="handleCancelShare">
        <a-row>
          <a-col>分享给：</a-col>
          <a-col>
            <a-input placeholder="请输入对方手机号" @change="sharePhoneChange" />
          </a-col>
        </a-row>
      </a-modal>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import createAppModal from '../common/createAppModal.vue';
import { columns } from '../common/columns';
import * as service from '../../service/index';
import Tools from '../../../common/utils/tools';
import { adminUrl } from '@/common/config/env';
import { List, Icon, Card, Popconfirm, Button, Row, Col, Select, Input, Modal, Spin } from 'ant-design-vue'

const utils = new Tools();
const app = namespace('app');
const defaultImg = require('../../../../static/images/appImg.png');

  @Component({
    name: 'myapp-manage',
    components: {
      createAppModal,
      aPopconfirm: Popconfirm,
      aButton: Button,
      aIcon: Icon,
      aList: List,
      aListItem: List.Item,
      aCard: Card,
      aCardMeta: Card.Meta,
      aRow: Row,
      aCol: Col,
      aSelect: Select,
      aSelectOption: Select.Option,
      aInput: Input,
      aModal: Modal,
      aSpin: Spin
    }
  })
export default class MyappManage extends Vue {
    $route;
    $router;
    $message;
    $confirm;
    visible: boolean = false;
    shareVisible: boolean = false;
    columns: any = columns;
    loading: boolean = false;
    defaultImg = defaultImg;
    data: any = [];
    selectedRowKeys: any = [];
    scrollHeight: number = window.innerHeight - 292;
    userID: string = '';
    appData: any = {};
    sharePhone: string = '';
    shareApp: any = {};
    spinning = true;

    @app.Mutation('appDetail')
    setAppDetail;

    searchParam: any = { appName: '', screen: '' };

    created() { }

    activated() {
      let userID: any = utils.getCookie('userID');
      if (!userID) {
        this.$router.push({
          path: '/login'
        });
      }
      this.userID = userID;
      this.getApps(userID, this.searchParam);
    }

    async getApps(userID, query) {
      let res = await service.getApps(userID, query);
      if (res.data.status === 200) {
        this.data = res.data.data;
        this.spinning = false;
      }
    }
    shareModal(item) {
      this.shareVisible = true;
      this.shareApp = item;
    }
    handleCancelShare() {
      this.shareApp = {};
      this.shareVisible = false;
    }
    goDetails(record) {
      this.$router.push({
        path: '/admin/myapp/appdetail?from=mine&appID=' + record.appID
      });
    }
    goDesigner(record) {
      let pageInfor = JSON.parse(record.pageInfor);
      let defaultPage: any = Object.keys(pageInfor)[0];
      let screen = pageInfor[defaultPage].screen;
      window.open(
        `${adminUrl}#/designer/${record.appID}/${defaultPage}?screen=${screen}`,
        '_self'
      );
    }
    goDatabse(record) {
      this.$router.push({
        path: '/admin/database?appID=' + record.appID
      });
    }
    handleEdit(record) {
      this.openModal();
      this.appData = record;
    }
    closeModal(message) {
      if (message === 'success') {
        this.getApps(this.userID, this.searchParam);
      }
      this.visible = false;
      this.appData = {};
    }
    openModal() {
      this.visible = true;
    }

    async deleteApp(id) {
      let res = await service.deleteApp(this.userID, {
        appID: id
      });
      if (res.data && res.data.data === 'success') {
        this.$message.success('删除成功！');
        this.getApps(this.userID, this.searchParam);
      } else {
        this.$message.error('删除失败！');
      }
    }

    sharePhoneChange(e) {
      let value = e.target.value;
      this.sharePhone = value;
    }

    async shareTo() {
      if (!this.sharePhone) {
        this.$message.warning('请输入分享的手机号');
        return;
      }
      let record = this.shareApp;
      let userID = utils.getCookie('userID');
      let params = { appID: record.appID, shareTo: this.sharePhone };
      let res: any = await service.shareApp(userID, params);
      if (res.data.data === 'success') {
        this.$message.success('分享成功');
      } else {
        this.$message.error(res.data.data);
      }
    }

    showConfirm(item) {
      let self = this;
      this.$confirm({
        title: `即将删除 ${item.appName} 应用及该应用下的所有数据对象?`,
        cancelText: '取消',
        okText: '确认',
        onOk() {
          self.deleteApp(item.appID);
        },
        onCancel() { }
      });
    }
    async handleActions(type) {
      if (type === 'deleteMore') {
        if (!this.selectedRowKeys.length) {
          this.$message.warning('请选择需要删除的应用！');
        }
      }
    }

    searchType(value) {
      this.searchParam.screen = value;
    }
    searchName(e) {
      let value = e.target.value;
      this.searchParam.appName = value || '';
    }
    handleSearch() {
      let userID = utils.getCookie('userID');
      this.getApps(userID, this.searchParam);
    }
    addToAppstore(record) {
      this.updateAppstore({ appID: record.appID, isMarket: 1 });
    }
    deleteFromAppstore(record) {
      this.updateAppstore({ appID: record.appID, isMarket: 0 });
    }
    updateAppstore(data) {
      let userID = utils.getCookie('userID');
      service.updateAppstore(userID, data).then((res: any) => {
        if (res === 'success') {
          if (data.isMarket === 0) {
            this.$message.success('应用下架成功！');
          } else {
            this.$message.success('应用发布成功！');
          }
          this.getApps(this.userID, { appName: '', screen: '' });
        } else {
          this.$message.error('应用操作失败，请重试！');
        }
      });
    }
}
</script>

<style lang='less' scoped>
  .myapp-manage {
    .header {
      margin-bottom: 12px;
    }

    .desc {
      height: 32px;
      line-height: 32px;
      width: 100%;
      margin-bottom: 0;
    }

    .overElip {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>

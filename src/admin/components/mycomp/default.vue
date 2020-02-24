<template>
  <div class="myapp-comp">
    <a-spin :spinning="spinning">
      <a-row
        class="header"
        :gutter="24"
        style="margin: 0">
        <a-input-search
          @search="handleSearcheName"
          placeholder="请输入组件名称"
          enterButton />
      </a-row>
      <a-list
        :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }"
        :dataSource="compStore"
        class="mylist"
        :locale="{'emptyText': '您还没有任何组件，去新建一个吧!'}">
        <a-list-item
          class="list"
          slot="renderItem"
          slot-scope="item">
          <a-card hoverable class="mycard">
            <img
              alt="example"
              :src="item.pic || defaultImg"
              slot="cover"
              @click="goDetail(item)" />
            <a-card-meta @click="goDetail(item)">
              <h4
                :title="item.compName + ' - ' + item.title"
                slot="title"
                class="overElip">
                {{ item.compName }}<br />
                {{ item.title }}
              </h4>
              <div
                slot="description"
                class="desc overElip"
                @click="goDetail(item)"
                :description="item.description"
                :title="item.description">{{ item.description }}</div>
            </a-card-meta>
            <template
              class="ant-card-actions"
              slot="actions"
              v-if="userType === 'manager'">
              <a-icon
                title="编辑组件"
                type="edit"
                @click="handleAttr(item)" />
            </template>
          </a-card>
        </a-list-item>
      </a-list>
      <EditeModal
        :saveComp="saveComp"
        :visible="editVisible"
        :closeModal="closeEditModal"
        :editCompAttr="editCompAttr" />
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import EditeModal from '../common/editAttrModal.vue';
import {
  getCompStore,
  saveComp,
} from '../../service/index';
import { columns } from '../common/columns';
import Tools from '../../../common/utils/tools';
import { List, Icon, Card, Row, Input, Spin } from 'ant-design-vue'

const utils = new Tools();
const defaultImg = require('../../../../static/images/compImg.png');

  @Component({
    name: 'complist-component',
    components: {
      EditeModal,
      aList: List,
      aListItem: List.Item,
      aCard: Card,
      aCardMeta: Card.Meta,
      aRow: Row,
      aIcon: Icon,
      aInputSearch: Input.Search,
      aSpin: Spin
    }
  })
export default class complistComponent extends Vue {
    $route;
    $router;
    $message;
    saveComp = saveComp;
    defaultImg = defaultImg;
    compStore: any = [];
    editVisible: boolean = false;
    editCompAttr: any = {};
    userType: string = '';
    searchParams: any = { type: 'custom', compName: '' };
    spinning: boolean = true;

    async activated() {
      let userType = utils.getCookie('userType');
      this.getCompStore('0', this.searchParams);
      this.userType = userType;
    }
    handleSearcheName(value) {
      this.searchParams = { type: '', compName: value };
      this.getCompStore('0', this.searchParams);
    }
    // 获取组件列表
    async getCompStore(user, data) {
      let res = await getCompStore(user, data);
      let compStore = (res.data.status === 200 && res.data.data) || [];
      this.compStore = compStore;
      this.spinning = false;
    }
    handleAttr(record) {
      this.editVisible = true;
      this.editCompAttr = record;
    }
    closeEditModal() {
      this.editVisible = false;
    }
    goDetail(item) {
      this.$router.push({
        path: '/admin/mycomp/detail?from=default&id=' + item.compID
      });
    }
}
</script>

<style lang='less' scoped>
  .mylist {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid #ccc;

    /deep/.ant-card-body {
      padding: 14px;
    }
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

  .list {
    min-width: 120px;

    p {
      height: 100px;
      overflow: auto;
      margin-top: 5px;
    }

    .pic {
      height: 150px;
    }
  }

  .header {
    padding-bottom: 10px;

    .operateButton {
      button {
        margin-left: 10px;
      }
    }

    .ant-form-item {
      margin: 0;
    }
  }
</style>

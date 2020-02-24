<template>
  <div class="myapp-comp">
    <a-spin :spinning="spinning">
      <a-list
        :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }"
        :dataSource="compStore"
        :locale="{'emptyText': '您还没有收藏任何组件，去应用市场看看吧！'}"
        :pagination="{
          total: compStore.length, // 总数
          showQuickJumper: true,
          onChange: page => {
            console.log(page);
          },
          pageSize: 8,
          hideOnSinglePage: true
        }"
        class="mylist">
        <a-list-item
          class="list"
          slot="renderItem"
          slot-scope="item">
          <a-card hoverable class="mycard">
            <img
              @click="goDetail(item)"
              width="120px"
              alt="example"
              :src="item.pic || defaultImg"
              slot="cover" />
            <a-card-meta @click="goDetail(item)">
              <h4
                :title="item.compName + '-' + item.title"
                class="overElip"
                slot="title">
                {{ item.compName }}<br />{{ item.title }}</h4>
              <div
                slot="description"
                class="desc overElip"
                @click="goDetail(item)"
                :title="item.description">
                {{ item.description }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <!-- <a-icon type="edit" title="编辑" /> -->
              <a-popconfirm
                title="将该组件从收藏夹中移除?"
                @confirm="handleDelete(item)"
                okText="确认"
                cancelText="取消">
                <a-icon type="delete" title="删除组件" />
              </a-popconfirm>
            </template>
          </a-card>
        </a-list-item>
      </a-list>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Upload, List, Card, Icon, Popconfirm, Spin } from 'ant-design-vue';
import UploadModal from '../common/uploadModal.vue';
import {
  getCompStore,
  deleteCompStore,
  getCompCollect,
  deleteCompCollect
} from '../../service/index';
import compStoreComponent from '../../../website/components/comp_store/comp_store.vue';
import AppState from '../../store';
import Tools from '../../../common/utils/tools';
const utils = new Tools();

const app = namespace('app');
const defaultImg = require('../../../../static/images/compImg.png');

  @Component({
    name: 'complist-component',
    components: {
      UploadModal,
      aPopconfirm: Popconfirm,
      aIcon: Icon,
      aList: List,
      aListItem: List.Item,
      aCard: Card,
      aCardMeta: Card.Meta,
      aSpin: Spin
    }
  })
export default class complistComponent extends Vue {
    $route;
    $router;
    $message;
    uploadVisible: boolean = false;
    pagination: object = {};
    defaultImg = defaultImg;
    compStore: any = [];
    visible: boolean = false;
    spinning: boolean = true;

    @app.Mutation('changeCompDetail')
    changeCompDetail;

    async activated() {
      this.getCompCollect();
    }

    // 获取组件列表
    async getCompCollect() {
      let userID = utils.getCookie('userID');
      getCompCollect(userID).then((res: any) => {
        this.compStore = res;
        this.spinning = false;
      });
    }

    // 删除组件
    async deleteComp(compName) {
      let res = await deleteCompStore('e3b0c44298fc1c1', {
        compName: compName,
        type: 'custom'
      });
      let compStore = res.data.status === 200 && res.data.data;
      this.compStore = compStore;
    }

    handleDelete(item) {
      let userID = utils.getCookie('userID');
      deleteCompCollect(userID, { compID: item.compID }).then((res: any) => {
        if (res === 'success') {
          this.$message.success('组件已从收藏夹移除');
          this.getCompCollect();
        } else {
          this.$message.error('删除失败，请重试！');
        }
      });
    }

    goDetail(item) {
      this.$router.push({
        path: '/admin/mycomp/detail?id=' + item.compID
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

<template>
  <div class="myapp-comp">
    <a-spin :spinning="spinning">
      <a-list
        :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }"
        :dataSource="data"
        class="mylist"
        :locale="{'emptyText': '您还没有收藏任何应用，去应用市场看看吧！'}">
        <a-list-item
          class="list"
          slot="renderItem"
          slot-scope="item">
          <a-card hoverable class="mycard">
            <img
              @click="goDetails(item)"
              alt="example"
              :src="item.appImg || defaultImg"
              slot="cover" />
            <a-card-meta @click="goDetails(item)">
              <h4 slot="title" class="overElip">
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
                class="desc overElip"
                @click="goDetails(item)"
                :title="item.description">
                {{ item.description }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a-popconfirm
                title="将该应用从收藏夹中移除?"
                @confirm="handleDelete(item)"
                okText="确认"
                cancelText="取消">
                <a-icon type="delete" title="删除应用" />
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
import {
  getAppCollect,
  deleteCompStore,
  deleteAppCollect
} from '../../service/index';
import Tools from '../../../common/utils/tools';
import { List, Icon, Card, Popconfirm, Spin } from 'ant-design-vue'

const utils = new Tools();
const defaultImg = require('../../../../static/images/appImg.png');
const app = namespace('app');

  @Component({
    name: 'myapp-collect',
    components: {
      aPopconfirm: Popconfirm,
      aIcon: Icon,
      aList: List,
      aListItem: List.Item,
      aCard: Card,
      aCardMeta: Card.Meta,
      aSpin: Spin
    }
  })
export default class MyappCollect extends Vue {
    $route;
    $router;
    $message;
    data: any = [];
    defaultImg: any = defaultImg;
    spinning: boolean = true;

    @app.Mutation('appDetail')
    setAppDetail;

    activated() {
      this.getAppCollect();
    }

    getAppCollect() {
      let userID = utils.getCookie('userID');
      getAppCollect(userID).then((res: any) => {
        this.data = res;
        this.spinning = false;
      });
    }

    handleDelete(item) {
      let userID = utils.getCookie('userID');
      deleteAppCollect(userID, { appID: item.appID }).then((res: any) => {
        if (res === 'success') {
          this.$message.success('应用已从收藏夹移除');
          this.getAppCollect();
        } else {
          this.$message.error('删除失败，请重试！');
        }
      });
    }

    goDetails(record) {
      this.$router.push({
        path: '/admin/myapp/appdetail?appID=' + record.appID
      });
      this.setAppDetail(record);
    }
}
</script>

<style lang='less' scoped>
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
</style>

<template>
  <div class="appshop">
    <a-list
      :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }"
      :dataSource="listData"
      class="mylist"
    >
      <a-list-item
        class="list"
        slot="renderItem"
        slot-scope="item">
        <a-card
          hoverable
          class="mycard"
          bordered>
          <img
            alt="example"
            slot="cover"
            width="120px"
            :src="defaultImg"
            @click="goDetails(item)" />
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
            <p
              slot="description"
              :title="item.description"
              class="desc overElip"
            >{{ item.description }}</p>
          </a-card-meta>
          <p style="margin: 12px 0 0 0" @click="goDetails(item)">作者：author</p>
          <template class="ant-card-actions" slot="actions">
            <a-popconfirm
              title="添加到我的收藏?"
              @confirm="addToAppCollect(item)"
              okText="确认"
              cancelText="取消"
              v-if="userID !== item.userID"
            >
              <a-icon type="star" title="收藏应用" />
            </a-popconfirm>
            <a-popconfirm
              title="加入应用列表，进行编辑?"
              @confirm="addToMyapp"
              okText="确认"
              cancelText="取消">
              <a-icon type="switcher" title="添加到我的应用" />
            </a-popconfirm>
            <a-popconfirm
              title="下架该应用?"
              @confirm="deleteFromAppstore(item)"
              okText="确认"
              cancelText="取消"
              v-if="userID === item.userID"
            >
              <a-icon type="export" title="下架应用" />
            </a-popconfirm>
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import {
  getAppStore,
  updateAppstore,
  getAppCollect,
  addAppCollect
} from '../../service/index';
import Tools from '../../../common/utils/tools';
import { List, Icon, Card, Popconfirm } from 'ant-design-vue'

const defaultImg = require('../../../../static/images/appImg.png');
const utils = new Tools();

@Component({
  name: 'appshop-component',
  components: {
    aList: List,
    aListItem: List.Item,
    aIcon: Icon,
    aCard: Card,
    aPopconfirm: Popconfirm,
    aCardMeta: Card.Meta
  }
})
export default class appshopComponent extends Vue {
  $router;
  $message;
  listData: Array<object> = [];
  userID: string;
  actions: object[] = [
    { type: 'star-o', text: '156' },
    { type: 'like-o', text: '156' },
    { type: 'message', text: '2' }
  ];
  defaultImg: any = defaultImg;

  activated() {
    this.userID = utils.getCookie('userID');
    this.getAppStore();
  }
  getAppStore() {
    getAppStore().then((res: any) => {
      if (res !== 'failed') {
        this.listData = res;
      }
    });
  }
  goDetails(record) {
    this.$router.push({
      path: '/admin/myapp/appdetail?appID=' + record.appID
    });
  }
  addToAppCollect(item) {
    // 添加到我的收藏
    let userID = utils.getCookie('userID');
    addAppCollect(userID, item).then((res: any) => {
      if (res === 'success') {
        this.$message.success('收藏成功！');
      } else if (res === 'failed') {
        this.$message.error('收藏失败，请重试！');
      } else {
        this.$message.warning(res);
      }
    });
  }
  addToMyapp() {}
  deleteFromAppstore(item) {
    let userID = utils.getCookie('userID');
    let submitData = {
      appID: item.appID,
      isMarket: 0
    };
    updateAppstore(userID, submitData).then((res: any) => {
      if (res === 'success') {
        this.$message.success('应用下架成功！');
        this.getAppStore();
      } else {
        this.$message.error('应用下架失败，请重试！');
      }
    });
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

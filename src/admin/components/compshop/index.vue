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
        slot-scope="item"
      >
        <a-card
          hoverable
          class="mycard"
          bordered
        >
          <img
            @click="goDetail(item)"
            alt="example"
            slot="cover"
            width="120px"
            :src="defaultImg"
          />
          <a-card-meta @click="goDetail(item)">
            <h4
              :title="item.compName + ' - ' + item.title"
              slot="title"
              class="overElip">
              {{ item.compName }}<br/>
              {{ item.title }}
            </h4>
            <p
              slot="description"
              :title="item.description"
              class="desc overElip"
            >{{ item.description }}</p>
          </a-card-meta>
          <p @click="goDetail(item)" style="margin: 12px 0 0 0">作者：author</p>
          <template class="ant-card-actions" slot="actions">
            <a-popconfirm
              title="添加到我的收藏?"
              @confirm="addToCompCollect(item)"
              okText="确认"
              cancelText="取消"
              v-if="userID !== item.userID"
            >
              <a-icon type="star" title="收藏组件"/>
            </a-popconfirm>
            <!-- <a-icon type="read" title="查看"/> -->
            <a-popconfirm
              title="加入组件列表，进行编辑?"
              @confirm="addToMyapp"
              okText="确认"
              cancelText="取消"
            >
              <a-icon type="switcher" title="添加到我的组件"/>
            </a-popconfirm>
            <a-popconfirm
              title="下架该组件?"
              @confirm="deleteFromAppstore(item)"
              okText="确认"
              cancelText="取消"
              v-if="userID === item.userID"
            >
              <a-icon type="export" title="下架组件"/>
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
  getCompMarket,
  updateCompMarket,
  getAppCollect,
  addCompCollect
} from '../../service/index';
import Tools from '../../../common/utils/tools';
import { Input, Modal, Button, Card, Icon, Popconfirm, List } from 'ant-design-vue';

const defaultImg = require('../../../../static/images/compImg.png');
const utils = new Tools();

@Component({
  name: 'compshop-component',
  components: {
    aModal: Modal,
    aInput: Input,
    aButton: Button,
    aIcon: Icon,
    aCard: Card,
    aCardMeta: Card.Meta,
    aPopconfirm: Popconfirm,
    aList: List,
    aListItem: List.Item,
  }
})
export default class compshopComponent extends Vue {
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
    this.getCompMarket();
  }
  getCompMarket() {
    getCompMarket().then((res: any) => {
      if (res !== 'failed') {
        this.listData = res;
      }
    });
  }
  addToCompCollect(item) {
    // 添加到我的收藏
    let userID = utils.getCookie('userID');
    addCompCollect(userID, item).then((res: any) => {
      if (res === 'success') {
        this.$message.success('收藏成功！');
      } else if (res === 'failed') {
        this.$message.error('收藏失败，请重试！');
      } else {
        this.$message.warning(res);
      }
    });
  }
  goDetail(item) {
    this.$router.push({
      path: '/admin/mycomp/detail?id=' + item.compID + '&from=shop'
    });
  }
  addToMyapp() {}
  deleteFromAppstore(item) {
    let userID = utils.getCookie('userID');
    let submitData = {
      compID: item.compID,
      isMarket: 0
    };
    updateCompMarket(userID, submitData).then((res: any) => {
      if (res === 'success') {
        this.$message.success('组件下架成功！');
        this.getCompMarket();
      } else {
        this.$message.error('组件下架失败，请重试！');
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
.overElip{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<template>
  <div style="{height: 100%}" class="compDesc">
    <div class="header">
      <div class="backBox">
        <a-button
          type="primary"
          size="small"
          @click="back">
          <a-icon type="left" />
        </a-button>
        <span style="margin-left: 10px;font-size: 14px;font-weight: bold;">{{ appDetail.appName }}</span>
      </div>
      <div class="operateButton">
        <!-- <a-button type="primary" @click="addToAppMarket">发布</a-button> -->
        <!-- <a-button type="primary" @click="addToAppMarket"></a-button> -->
        <!-- <a-button type="primary" @click="openModal">路由配置</a-button> -->
      </div>
    </div>
    <div class="page">
      <!-- <h5>应用页面</h5> -->
      <a-list :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }" class="mylist">
        <a-list-item
          style="padding: 0 6px"
          class="list"
          v-for="(item,i) in appDetail.pageInfor && JSON.parse(appDetail.pageInfor)"
          :key="item.appID"
        >
          <a-card>
            <template slot="title" style="padding: 6px 0">
              <div class="overElip" :title="i">{{ i }}</div>
              <div
                class="overElip"
                :title="item.title"
                style="font-size: 14px;color: #333333">{{ item.title }}</div>
            </template>
            <a-card-meta>
              <div slot="description">
                <div
                  v-if="item.module && item.module.length"
                  class="comps"
                  style="height: 120px;overflow: scroll"
                >
                  <a-tag
                    style="margin: 2px"
                    v-for="(comp,i) in item.module"
                    :key="comp.compName + i"
                    color="#17BC94"
                  >
                    {{ comp.compName }}
                  </a-tag>
                </div>
                <div style="height: 120px;" v-else>该页面暂无任何组件</div>
              </div>
            </a-card-meta>
            <template
              v-if="from === 'mine'"
              class="ant-card-actions"
              slot="actions">
              <a-popconfirm
                title="将该页面设置为首页吗?"
                okText="确认"
                cancelText="取消">
                <a-icon type="home" />
              </a-popconfirm>
              <a-popconfirm
                title="确认删除该页面吗?"
                okText="确认"
                cancelText="取消">
                <a-icon type="delete" />
              </a-popconfirm>
            </template>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
    <div class="setting">
      <!-- <h5>路由配置</h5> -->
    </div>
    <!-- <router-config-modal
      :data="pageList"
      :visible="visible"
      :closeModal="closeModal"
      :openModal="openModal"
    ></router-config-modal>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import showDown from 'showdown';
import RouterConfigModal from '../common/routerConfigModal.vue';
import { saveComp, getAppDetail, updateAppstore } from '../../service/index';
import Tools from '../../../common/utils/tools';
import { List, Icon, Card, Popconfirm, Button, Tag } from 'ant-design-vue'

const utils = new Tools();

@Component({
  name: 'detail-modal',
  components: {
    RouterConfigModal,
    aPopconfirm: Popconfirm,
    aButton: Button,
    aIcon: Icon,
    aList: List,
    aListItem: List.Item,
    aCard: Card,
    aCardMeta: Card.Meta,
    aTag: Tag
  }
})
export default class detailModal extends Vue {
  $route;
  $router;
  $message;
  visible = false;
  appDetail = {};
  from = '';

  activated() {
    let appID = this.$route.query.appID;
    this.from = this.$route.query.from;
    getAppDetail(appID).then((res: any) => {
      this.appDetail = res;
    });
  }
  openModal() {
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  addToAppstore(record) {
    this.updateAppstore({ appID: record.appID, isMarket: 1 });
  }
  deleteFromAppstore(record) {
    this.updateAppstore({ appID: record.appID, isMarket: 0 });
  }
  updateAppstore(data) {
    let userID = utils.getCookie('userID');
    updateAppstore(userID, data).then((res: any) => {
      if (res === 'success') {
        this.$message.success('应用下架成功！');
      } else {
        this.$message.error('应用下架失败，请重试！');
      }
    });
  }

  back() {
    this.$router.back();
  }
}
</script>

<style lang='less' scoped>
.compDesc {
  h1 {
    font-size: 22px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 14px;
  }
  label {
    margin-bottom: 10px;
  }
  blockquote {
    border-left: 6px solid #e6e6e6;
    background: #fafafa;
  }
  code {
    background: #f2f2f2;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
  .operateButton {
    button {
      margin-left: 10px;
    }
  }
}
/deep/.ant-card-head{
  padding: 0 12px;
}
/deep/.ant-card-head-title{
  padding: 8px 0;
}
/deep/.ant-card-body{
  padding: 12px;
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
</style>

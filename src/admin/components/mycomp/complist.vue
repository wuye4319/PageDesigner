<template>
  <div class="myapp-comp">
    <a-spin :spinning="spinning">
      <a-row
        class="header"
        :gutter="24"
      >
        <a-col :span="10">
          <a-button
            @click="openModal('add')"
            type="primary"
            style="margin-right: 8px"
          >
            <a-icon type="upload" />上传组件
          </a-button>
          <!-- <a-button type="primary" @click="openCompModal">
            <a-icon type="plus" />快速创建
          </a-button> -->
          <a
            style="margin-left: 10px"
            href="http://120.25.77.12:81/democomp.zip"
          >
            下载示例组件
          </a>
        </a-col>
        <!--        <a-col :span="8" :offset="6">
          <a-row
            type="flex"
            :gutter="24"
            justify="end">
            <a-col :span="16">
              <a-input-search
                @search="handleSearcheName"
                placeholder="请输入组件名称"
                enterButton />
            </a-col>
            <a-col :span="8">
              <a-button style="width:100%" @click="userMore">{{ userTip }}</a-button>
            </a-col>
          </a-row>

        </a-col> -->
      </a-row>
      <!--  <div class="more-search-warp" :class="{'more-search-show':moreShow}">
        <div class="more-search">
          <a-select
            class="seaarch"
            mode="multiple"
            :defaultValue="searchData.people"
            @change="searchPeople"
            placeholder="请选择创建者">
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
          <a-select
            class="seaarch"
            mode="multiple"
            :defaultValue="searchData.limits"
            @change="searchlimits"
            placeholder="请选择权限">
            <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{ (i + 9).toString(36) + i }}
            </a-select-option>
          </a-select>
        </div>
      </div> -->
      <a-list
        :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }"
        :dataSource="compStore"
        class="mylist"
        :locale="{'emptyText': '您还没有任何组件，去新建一个吧!'}"
      >
        <a-list-item
          class="list"
          slot="renderItem"
          slot-scope="item"
        >
          <a-card
            hoverable
            class="mycard"
          >
            <img
              alt="example"
              :src="item.compImg ? baseUrl + item.compImg : defaultImg"
              slot="cover"
              height="150px"
              @click="goDetail(item)"
            />
            <a-card-meta @click="goDetail(item)">
              <h4
                :title="item.compName + ' - ' + item.title"
                slot="title"
                class="overElip"
              >
                {{ item.compName }}
                <br />
                {{ item.title }}
              </h4>
              <div
                slot="description"
                class="desc overElip"
                @click="goDetail(item)"
                :description="item.description"
                :title="item.description"
              >{{ item.description }}</div>
            </a-card-meta>
            <template
              class="ant-card-actions"
              slot="actions"
            >
              <a-icon
                type="edit"
                @click="openModal('edit',item)"
                title="编辑组件"
              />
              <!-- <a-popconfirm
                title="将组件发布到组件市场?"
                @confirm="addToCompMarket(item)"
                okText="确认"
                cancelText="取消"
                v-if="!item.isMarket">
                <a-icon type="shop" title="发布到组件市场" />
              </a-popconfirm>
              <a-popconfirm
                title="将该组件从组件市场下架?"
                @confirm="deleteCompMarket(item)"
                okText="确认"
                cancelText="取消"
                v-if="item.isMarket">
                <a-icon type="export" title="下架组件" />
              </a-popconfirm> -->
              <!-- <a-icon
                @click="shareModal(item)"
                type="fork"
                title="分享组件" /> -->
              <a-icon
                type="delete"
                @click="showConfirm(item)"
                title="删除组件"
              />
            </template>
          </a-card>
        </a-list-item>
      </a-list>
      <!-- 新增 编辑组件 -->
      <customer-comp-modal
        v-if="visible"
        :visible="visible"
        :closeModal="closeModal"
        :getCompStore="getCompStore"
        :type="customerType"
        :editCompAttr="editCompAttr"
      />
      <CreateCompModal
        :visible="compVisible"
        :closeModal="closeCompModal"
        :getCompStore="getCompStore"
      />
      <a-modal
        title="分享组件"
        :visible="shareVisible"
        @ok="shareTo"
        @cancel="handleCancelShare"
      >
        <a-row>
          <a-col>分享给：</a-col>
          <a-col>
            <a-input
              placeholder="请输入对方手机号"
              @change="sharePhoneChange"
            />
          </a-col>
        </a-row>
      </a-modal>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import UploadModal from '../common/uploadModal.vue';
import EditeModal from '../common/editAttrModal.vue';
import CreateCompModal from '../common/createCompModal.vue';
import {
  getCompStore,
  deleteCompStore,
  saveComp,
  updateCompMarket,
  shareComp
} from '../../service/index';
import { columns } from '../common/columns';
import Tools from '../../../common/utils/tools';
import {
  List,
  Icon,
  Card,
  Popconfirm,
  Button,
  Row,
  Col,
  Select,
  Input,
  Modal,
  Spin
} from 'ant-design-vue';
import CustomerCompModal from '../common/customerCompModal.vue'; // 组件属性和文件
import { baseUrl } from '@/common/config/env';

const utils = new Tools();
const app = namespace('app');
const defaultImg = require('../../../../static/images/compImg.png');

@Component({
  name: 'complist-component',
  components: {
    UploadModal,
    EditeModal,
    CustomerCompModal,
    CreateCompModal,
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
    aInputSearch: Input.Search,
    aSpin: Spin
  }
})
export default class complistComponent extends Vue {
  $route;
  $router;
  $confirm;
  $message;
  columns: any = columns;
  uploadVisible: boolean = false;
  pagination: object = {};
  defaultImg = defaultImg;
  compStore: any = [];
  visible: boolean = false;
  compVisible: boolean = false;
  editCompAttr: any = {};
  scrollHeight = window.innerHeight - 292;
  userID: string = '';
  sharePhone: string = '';
  searchParams: any = { type: 'custom', compName: '' };
  shareVisible: boolean = false;
  shareApp: any = {};
  customerType: string = 'add'; // 自定义组件弹框类型 add新增 edit 编辑
  spinning: boolean = true;
  baseUrl = baseUrl;

  /* 更多 start */
  userTip = '更多搜索';
  moreShow = false;
  searchData = {
    people: ['a1', 'b2'],
    limits: ['a1']
  };
  userMore() {
    if (this.moreShow) {
      this.userTip = '更多搜索';
    } else {
      this.userTip = '收起';
    }
    this.moreShow = !this.moreShow;
  }
  searchPeople(value) {
    this.handleChange(value, 'people');
  }
  searchlimits(value) {
    this.handleChange(value, 'limits');
  }
  handleChange(value, type) {
    console.log(value, type);
  }
  /* 更多 end */
  @app.Mutation('changeCompDetail')
  changeCompDetail;

  async activated() {
    console.log(this.baseUrl);
    let userID = utils.getCookie('userID');
    this.getCompStore(userID, this.searchParams);
    this.userID = userID;
  }

  shareModal(item) {
    this.shareVisible = true;
    this.shareApp = item;
  }
  handleCancelShare() {
    this.shareApp = {};
    this.shareVisible = false;
  }
  handleSearcheName(value) {
    this.searchParams = { type: 'custom', compName: value };
    this.getCompStore(this.userID, this.searchParams);
  }

  sharePhoneChange(e) {
    let value = e.target.value;
    this.sharePhone = value;
  }
  // 获取组件列表
  async getCompStore(user, data) {
    let res = await getCompStore(user, data);
    let compStore = (res.data.status === 200 && res.data.data) || [];
    this.compStore = compStore;
    this.spinning = false;
  }

  // 删除组件
  async deleteComp(compName) {
    let res = await deleteCompStore(this.userID, {
      compName: compName,
      type: 'custom'
    });
    if (res.data && res.data.data === 'success') {
      this.$message.success('删除成功！');
      this.getCompStore(this.userID, this.searchParams);
    } else {
      this.$message.error('删除失败！');
    }
  }
  // 分享组件给某人
  async shareTo() {
    if (!this.sharePhone) {
      this.$message.warning('请输入分享的手机号');
      return;
    }
    let record = this.shareApp;
    let userID = utils.getCookie('userID');
    let params = { compID: record.compID, shareTo: this.sharePhone };
    let res: any = await shareComp(userID, params);
    if (res.data.data === 'success') {
      this.$message.success('分享成功');
    } else {
      this.$message.error(res.data.data);
    }
  }

  async saveComp(data) {
    let res = await saveComp(this.userID, data);
    if (res.data && res.data.status === 200) {
      this.$message.success('上传成功！');
      this.getCompStore(this.userID, this.searchParams);
    } else {
      this.$message.info('上传失败！');
    }
  }

  // 新增自定义组件
  openModal(type, record: object = {}) {
    this.visible = true;
    this.customerType = type;
    this.editCompAttr = record;
  }

  closeModal() {
    this.visible = false;
  }

  openCompModal() {
    this.compVisible = true;
  }
  closeCompModal() {
    this.compVisible = false;
  }

  handleDelete(item) {
    this.showConfirm(item);
  }

  showConfirm(item) {
    let self = this;
    this.$confirm({
      title: `确认删除 ${item.title} 组件?`,
      cancelText: '取消',
      okText: '确认',
      onOk() {
        self.deleteComp(item.compName);
      },
      onCancel() {}
    });
  }

  goDetail(item) {
    this.$router.push({
      path: '/admin/mycomp/detail?from=mine&id=' + item.compID
    });
  }
  addToCompMarket(record) {
    this.updateCompMarket({ isMarket: 1, compID: record.compID });
  }
  deleteCompMarket(record) {
    this.updateCompMarket({ isMarket: 0, compID: record.compID });
  }
  updateCompMarket(data) {
    let userID = utils.getCookie('userID');
    updateCompMarket(userID, data).then((res: any) => {
      if (res === 'success') {
        if (data.isMarket === 0) {
          this.$message.success('组件已从组件市场下架!');
        } else {
          this.$message.success('组件已发布到组件市场!');
        }
        this.getCompStore(userID, this.searchParams);
      } else {
        this.$message.error('组件操作失败，请重试!');
      }
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

.more-search-warp {
  height: 0px;
  overflow: hidden;

  .more-search {
    width: 60%;
    float: right;
  }

  .seaarch {
    width: 48%;
    margin-left: 2%;
  }
}

.more-search-show {
  height: auto;
  padding-bottom: 10px;
}
</style>

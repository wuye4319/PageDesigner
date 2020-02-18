<template>
  <div class="operateModal">
    <div class="handle">
      <a-button
        @click="openCreate"
        type="primary"
        size="small">
        <a-icon type="plus-square" />
      </a-button>
      <a-button
        type="danger"
        class="delete"
        @click="openDelete"
        size="small">
        <a-icon type="minus-square" />
      </a-button>
    </div>
    <!-- 新增对话框 -->
    <a-modal
      title="新增一个页面"
      v-model="createPage.visible"
      @ok="createOk"
      okText="新增"
      :okButtonProps="{ props: {disabled: createPageButton} }"
      cancelText="取消"
      centered
      :confirmLoading="createPage.confirmLoading">
      <a-list itemLayout="horizontal">
        <a-list-item>
          <div class="model-cont">
            <div class="name"><span class="required">*</span>路由名称(英文):</div>
            <div class="desc">
              <a-input
                placeholder="请输入需要添加的标题"
                v-model.trim="createPage.title"
                @change="titleChange" />
            </div>
          </div>
        </a-list-item>
        <a-list-item>
          <div class="model-cont">
            <div class="name"><span class="required">*</span>页面名称:</div>
            <div class="desc">
              <a-input
                placeholder="请输入需要添加的页面名称"
                v-model.trim="createPage.name"
                @change="nameChange" />
            </div>
          </div>
        </a-list-item>
        <a-list-item>
          <div class="model-cont">
            <div class="name"><span class="required">*</span>支持终端:</div>
            <div class="desc">
              <a-checkbox-group v-model="createPage.surport">
                <a-checkbox value="mobile">移动端</a-checkbox>
                <a-checkbox value="desktop">PC端</a-checkbox>
              </a-checkbox-group>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>不同终端支持不同的组件库，选择支持多终端时，则只有在这些终端上都支持的组件才会显示出来。</span>
                </template>
                <a-icon style="color: red;margin-left: 40px" type="question" />
              </a-tooltip>
            </div>
          </div>
        </a-list-item>
        <a-list-item>
          <div class="model-cont">
            <div class="name">描述:</div>
            <div class="desc">
              <a-textarea
                placeholder="请输入需要添加的描述"
                :rows="2"
                v-model="createPage.desc" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-modal>
    <!-- 删除对话框 -->
    <a-modal
      title="删除子页面"
      v-model="deletePage.visible"
      centered>
      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
        <a-checkbox
          :indeterminate="deletePage.indeterminate"
          @change="deleteCheckAll"
          :checked="deletePage.checkAll">全选</a-checkbox>
      </div>
      <br />
      <a-checkbox-group v-model="deletePage.checkedList" @change="deleteChange">
        <div
          class="model-checkbox"
          v-for="(item,i) of deletePage.options"
          :key="i">
          <a-checkbox :value="item">{{ item }}</a-checkbox>
        </div>
      </a-checkbox-group>
      <div slot="footer">
        <a-button @click="deleteCancel">取消</a-button>
        <template v-if="deletePageButton">
          <a-popconfirm
            title="你确定要删除这些页面吗?"
            @confirm="deleteOk"
            okText="确定"
            cancelText="取消">
            <a-icon
              slot="icon"
              type="question-circle-o"
              style="color: red" />
            <a-button type="danger" :loading="deletePage.confirmLoading">删除</a-button>
          </a-popconfirm>
        </template>
        <template v-else>
          <a-button
            type="danger"
            :loading="deletePage.confirmLoading"
            disabled>删除</a-button>
        </template>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import axios from '@/common/config/axios';
import { Button, Icon, Modal, List, Checkbox, Popconfirm, Input, Tooltip } from 'ant-design-vue';
interface Model {
  visible: boolean;
  confirmLoading?: boolean;
  [propName: string]: any;
}
const webSite = namespace('webSite');

@Component({
  name: 'operate-modal',
  components: {
    AButton: Button,
    AIcon: Icon,
    AModal: Modal,
    AList: List,
    AListItem: List.Item,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    APopconfirm: Popconfirm,
    AInput: Input,
    ATextarea: Input.TextArea,
    ATooltip: Tooltip
  }
})
export default class OperateModal extends Vue {
  @Prop() creatOk;
  $message;
  $router;
  createPage: Model = {
    // 新增页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    title: '', // 标题
    name: '', // 页面名称
    desc: '', // 描述
    surport: ['desktop'] // 支持的终端
  };
  deletePage: Model = {
    // 删除页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    options: [], // 选项
    checkedList: [], // 选中的值
    checkAll: false, // 全选按钮
    indeterminate: false // 全选样式
  };

  @webSite.Getter('appInfor')
  appInfor;

  @webSite.Action('handleAppInfo')
  handleAppInfo;

  @webSite.Getter('currentApps')
  currentApps;

  get createPageButton(): boolean {
    let status = this.createPage.title && this.createPage.name && this.createPage.surport.length;
    return !status;
  }

  get deletePageButton(): boolean {
    let status = this.deletePage.checkedList.length > 0;
    return status;
  }

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  // 打开新增
  openCreate() {
    this.createPage.title = '';
    this.createPage.name = '';
    this.createPage.desc = ''; // 描述
    this.createPage.visible = true;
  }

  // 只能输入英文和数字
  titleChange(e) {
    this.createPage.title = this.createPage.title.replace(/[\W]/g, '');
  }

  // 只能输入中文、英文和数字
  nameChange(e) {
    this.createPage.name = this.createPage.name.replace(
      /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, // eslint-disable-line
      ''
    ); // eslint-disable-line
  }

  // 新增页面弹框[确定]
  createOk() {
    this.createPage.confirmLoading = true;
    let appInfor = this.appInfor;
    let screen = this.createPage.surport.length >= 2 ? 'both' : this.createPage.surport[0];
    appInfor[this.createPage.title] = {
      title: this.createPage.name,
      desc: this.createPage.desc,
      screen: screen,
      module: []
    };
    let params = {
      page: appInfor
    };
    let appID = this.$router.currentRoute.params.appID;
    this.handleAppInfo({
      url: '/page/pageconfig/' + appID,
      params
    })
      .then(() => {
        this.createPage.visible = false;
        this.createPage.confirmLoading = false;
        this.$message.success('新增成功！');
        this.creatOk();
        this.createPage = {
          // 新增页面弹框
          visible: false, // 弹框开关
          confirmLoading: false, // loading开关
          title: '', // 标题
          name: '', // 页面名称
          desc: '', // 描述
          surport: ['desktop'] // 支持的终端
        }
      })
      .catch(() => {
        this.createPage.visible = false;
        this.createPage.confirmLoading = false;
        this.$message.error('新增失败，请重新尝试');
      });
  }

  // 打开删除
  openDelete() {
    this.deletePage.options = this.pageList;
    this.deletePage.checkedList = [];
    this.deletePage.visible = true;
    this.deletePage.indeterminate = false;
    this.deletePage.checkAll = false; // 全选按钮
    this.deletePage.indeterminate = false; // 全选样式
  }

  // 删除页面弹框[确定]
  deleteOk() {
    this.deletePage.confirmLoading = true;
    let appInfor = this.appInfor;
    this.deletePage.checkedList.forEach(item => {
      delete appInfor[item];
    });
    let params = {
      page: appInfor
    };
    let appID = this.$router.currentRoute.params.appID;
    this.handleAppInfo({
      url: '/page/pageconfig/' + appID,
      params
    })
      .then(() => {
        this.deletePage.visible = false;
        this.deletePage.confirmLoading = false;
        this.$message.success('删除成功！');
        if (Object.keys(params.page).length === 0) {
          let replaceUrl = `${window.location.origin}/#/designer/${appID}/default?screen=desktop`;
          window.location.replace(replaceUrl);
          (window as any).localtionreload = true;
          window.location.reload(true);
        }
      })
      .catch(() => {
        this.deletePage.visible = false;
        this.deletePage.confirmLoading = false;
        this.$message.error('删除失败，请重新尝试');
      });
  }

  // 删除页面弹框[取消]
  deleteCancel() {
    this.deletePage.visible = false;
  }
  // 删除框内数据改变
  deleteChange(checkedList) {
    this.deletePage.indeterminate =
      !!checkedList.length &&
      checkedList.length < this.deletePage.options.length;
    this.deletePage.checkAll =
      checkedList.length === this.deletePage.options.length;
  }
  // 删除框内[全选]
  deleteCheckAll(e) {
    Object.assign(this.deletePage, {
      checkedList: e.target.checked ? this.deletePage.options : [],
      indeterminate: false,
      checkAll: e.target.checked
    });
  }
}
</script>

<style lang="less" scoped>
.handle {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .delete {
    margin-left: 10px;
  }
}
.model-cont {
  width: 80%;
  display: flex;
  .name {
    display: flex;
    align-items: center;
    margin-right: 20px;
    flex: 1;
    justify-content: flex-end;
  }
  .desc {
    flex: 1.5;
  }
  .required {
    color: #f5222d;
  }
}
</style>

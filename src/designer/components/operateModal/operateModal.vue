<template>
  <div class="operateModal">
    <div class="handle">
      <a-button
        @click="openCreate"
        type="primary"
        icon="plus"
      >新增</a-button>
      <a-button
        type="dashed"
        icon="minus"
        class="delete"
        @click="openDelete"
      >删除</a-button>
    </div>
    <!-- 新增对话框 -->
    <a-modal
      title="新增一个页面"
      v-model="createPage.visible"
      @ok="createOk"
      okText="新增"
      cancelText="取消"
      centered
      :confirmLoading="createPage.confirmLoading"
    >
      <a-list itemLayout="horizontal">
        <a-list-item>
          <div class="model-cont">
            <div class="name">请输入需要添加的标题:</div>
            <div class="desc">
              <a-input placeholder="请输入需要添加的标题" v-model="createPage.title"/>
            </div>
          </div>
        </a-list-item>
        <a-list-item>
          <div class="model-cont">
            <div class="name">请输入需要添加的名称:</div>
            <div class="desc">
              <a-input placeholder="请输入需要添加的名称" v-model="createPage.name"/>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-modal>
    <!-- 删除对话框 -->
    <a-modal
      title="删除子页面"
      v-model="deletePage.visible"
      okText="删除"
      cancelText="取消"
      centered
    >
      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
        <a-checkbox
          :indeterminate="deletePage.indeterminate"
          @change="deleteCheckAll"
          :checked="deletePage.checkAll"
        >全选</a-checkbox>
      </div>
      <br/>
      <a-checkbox-group v-model="deletePage.checkedList" @change="deleteChange">
        <div
          class="model-checkbox"
          v-for="(item,i) of deletePage.options"
          :key="i"
        >
          <a-checkbox :value="item">{{ item }}</a-checkbox>
        </div>
      </a-checkbox-group>
      <div slot="footer">
        <a-button>取消</a-button>
        <a-popconfirm
          title="你确定要删除这些页面吗?"
          @confirm="deleteOk"
          @cancel="deleteCancel"
          okText="确定"
          cancelText="取消"
        >
          <a-icon
            slot="icon"
            type="question-circle-o"
            style="color: red"
          />
          <a-button type="danger" :loading="deletePage.confirmLoading">删除</a-button>
        </a-popconfirm>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Select, Button, Input, Modal } from 'ant-design-vue';

interface Model {
  visible: boolean;
  confirmLoading?: boolean;
  [propName: string]: any;
}

@Component({
  name: 'operate-modal',
  components: {}
})
export default class OperateModal extends Vue {
  $message
  createPage: Model = {
    // 新增页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    title: '', // 标题
    name: '' // 标题名称
  };
  deletePage: Model = {
    // 删除页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    options: ['Apple', 'Pear', 'Orange'], // 选项
    checkedList: ['Apple', 'Orange'], // 选中的值
    checkAll: false, // 全选按钮
    indeterminate: true //
  };

  @Prop() appInfor: any

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  mounted() {

  }
  // 打开新增
  openCreate() {
    this.createPage.title = '';
    this.createPage.name = '';
    this.createPage.visible = true;
  }

  // 新增页面弹框[确定]
  createOk() {
    this.createPage.confirmLoading = true;
    setTimeout(() => {
      this.createPage.visible = false;
      this.createPage.confirmLoading = false;
      this.$message.success('新增success');
    }, 2000);
  }

  // 打开删除
  openDelete() {
    this.deletePage.options = this.pageList;
    this.deletePage.checkedList = [];
    this.deletePage.visible = true;
  }

  // 删除页面弹框[确定]
  deleteOk() {
    this.deletePage.confirmLoading = true;
    setTimeout(() => {
      this.deletePage.visible = false;
      this.deletePage.confirmLoading = false;
      this.$message.success('删除success');
    }, 2000);
  }

  // 删除页面弹框[取消]
  deleteCancel() {
    this.deletePage.visible = false;
  }
  deleteChange(checkedList) {
    this.deletePage.indeterminate =
      !!checkedList.length &&
      checkedList.length < this.deletePage.options.length;
    this.deletePage.checkAll =
      checkedList.length === this.deletePage.options.length;
  }
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
  align-items: center;
  .delete {
    margin-left: 20px;
  }
}
</style>

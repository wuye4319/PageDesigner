<template>
  <div class="container">
    <div class="design-toolbar">
      <div class="design-logo">设计器</div>
      <div class="design-componet-list">
        <template>
          <transition-group name="flip-list" class="flip-list">
            <div
              v-for="(view,i) in pageInfor"
              :key="view.compName+i"
              class="comps-button items"
              @click="showDrawer(i)"
              draggable="true"
              @dragstart="dragstart(i)"
              @dragenter="dragenter(i)"
              @dragend="dragend(i)"
            >
              <span>{{ view.compName }}</span>
              <span class="comps-close fr" @click.stop="removeComp(i)">
                <a-icon type="close"/>
              </span>
              <span v-if="view.compName==='layout'" class="fr" @click.stop="showLayout">
                <a-icon type="caret-down"/>
              </span>
            </div>
          </transition-group>
          <div class="design-addcomps" @click="showDrawer('all')">
            <a-icon type="plus"/>
          </div>
          <a-drawer
            title="组件列表"
            placement="left"
            :closable="false"
            @close="onClose"
            :mask="false"
            width="299"
            :wrapStyle="{position:'absolute'}"
            getContainer=".design-componet-list"
            :visible="visible"
          >
            <div :is="currCompView" :compData="currCompsData" :compIndex="compIndex"></div>
            <div class="button">
              <a-button style="marginRight: 8px" @click="onClose">Cancel</a-button>
            </div>
          </a-drawer>
        </template>
      </div>
      <div class="foot-button">button</div>
    </div>
    <div class="design-screen">
      <div class="head-bar">
        <div class="page-nav">
          <a-select v-model="pageSelect" style="width: 120px" @change="handleChange">
            <a-select-option v-for="page in pageList" :key="page" :value="page">{{ page }}</a-select-option>
          </a-select>
        </div>
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
        <div class="screen-list">
          <ul>
            <li @click="changeScreenType(screen)" v-for="screen in screenList" :key="screen">
              <a-icon :type="screen"/>
            </li>
            <li>
              <a href="/#/website/product" target="_blank">
                <a-icon type="fullscreen"/>
              </a>
            </li>
          </ul>
        </div>
        <div class="save">
          <a-button type="primary">Save</a-button>
        </div>
      </div>
      <div class="design-iframe">
        <div class="page-container" :class="isMobile">
          <website></website>
        </div>
      </div>
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
              <a-input
                placeholder="请输入需要添加的标题"
                v-model="createPage.title"
              />
            </div>
          </div>
        </a-list-item>
        <a-list-item>
          <div class="model-cont">
            <div class="name">请输入需要添加的名称:</div>
            <div class="desc">
              <a-input
                placeholder="请输入需要添加的名称"
                v-model="createPage.name"
              />
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
        >
          全选
        </a-checkbox>
      </div>
      <br/>
      <a-checkbox-group v-model="deletePage.checkedList" @change="deleteChange">
        <div
          class="model-checkbox"
          v-for="(item,i) of deletePage.options"
          :key="i"
        >
          <a-checkbox :value="item">
            {{ item }}
          </a-checkbox>
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
import { getCompsInfor } from '@/common/utils'
import { Select, Button, Input } from 'ant-design-vue'
import website from '@/website/pages/index.vue'

const webSite = namespace('webSite');

interface Model {
  visible: boolean,
  confirmLoading?: boolean,
  [propName: string]: any
}

@Component({
  name: 'page-index',
  components: {
    ASelete: Select,
    AButton: Button,
    AInput: Input,
    website
  }
})
export default class Pageindex extends Vue {
  $router
  $route
  $message
  pageSelect: string = ''
  currCompView: any = ''
  currCompsData: object = {}
  screenList = ['mobile', 'desktop']
  isMobile: string = ''
  compIndex: number = null
  oldNum: number = 0
  newNum: number = 0
  createPage:Model = { // 新增页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    title: '', // 标题
    name: '' // 标题名称
  }
  deletePage:Model = { // 删除页面弹框
    visible: false, // 弹框开关
    confirmLoading: false, // loading开关
    options: ['Apple', 'Pear', 'Orange'], // 选项
    checkedList: ['Apple', 'Orange'], // 选中的值
    checkAll: false, // 全选按钮
    indeterminate: true //
  }

  @webSite.Getter('pageInfor')
  pageInfor

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor

  @webSite.Getter('compStore')
  compStore: Website.pageInfor

  @webSite.Action('changePage')
  changePage;

  @webSite.Mutation('removePageInfor')
  removePageInfor: any

  @webSite.Mutation('changePageInfor')
  changePageInfor

  get pageList() {
    let comps = Object.keys(this.appInfor)
    return comps
  }

  get ctrlCompList() {
    let compsInfor = getCompsInfor('website/components/', this.pageInfor, true)
    return compsInfor
  }

  handleChange(value) {
    this.$router.push({
      path: `/designer/${value}`,
    })
    this.changePage({ page: value })
    this.pageSelect = value
  }

  created() {
    this.pageSelect = this.$router.currentRoute.params.page
    let screen = this.$route.query.screen;
    this.changeScreenType(screen);
  }

  visible: boolean = false

  showDrawer(i) {
    if (i === 'all') {
      this.visible = true
      this.currCompView = getCompsInfor('website/components/', 'comp_store')
      this.currCompsData = this.compStore
    } else {
      this.currCompView = this.ctrlCompList[i]
      this.currCompsData = this.pageInfor[i]
      this.compIndex = i
      this.visible = true
    }
  }

  showLayout() {
    console.log('lauyout')
  }

  removeComp(i) {
    this.removePageInfor(i)
  }

  onClose() {
    this.visible = false
  }

  changeScreenType(screen) {
    if (screen === 'mobile') {
      this.isMobile = 'mobile-width'
    } else {
      this.isMobile = ''
    }
  }

  // 记录初始位置信息
  dragstart(value) {
    this.oldNum = value;
  }
  // 做最终操作
  dragend(value) {
    if (this.oldNum !== this.newNum) {
      let oldIndex = this.oldNum;
      let newIndex = this.newNum;

      let newItems = [...this.pageInfor];
      let oldVal = JSON.parse(JSON.stringify(newItems[oldIndex]));
      // 删除老的节点
      newItems.splice(oldIndex, 1);
      // 在列表中目标位置增加新的节点
      newItems.splice(newIndex, 0, oldVal);
      // this.items一改变，transition-group就起了作用
      let res = [...newItems];
      this.changePageInfor(res)
    }
  }
  // 记录移动过程中位置信息
  dragenter(value) {
    this.newNum = value;
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

  deleteChange (checkedList) {
    this.deletePage.indeterminate = !!checkedList.length && (checkedList.length < this.deletePage.options.length)
    this.deletePage.checkAll = checkedList.length === this.deletePage.options.length
  }
  deleteCheckAll (e) {
    Object.assign(this.deletePage, {
      checkedList: e.target.checked ? this.deletePage.options : [],
      indeterminate: false,
      checkAll: e.target.checked,
    })
  }
}
</script>
<style lang='less' scoped>
.container {
  display: -webkit-box;
  height: 100%;
  width: 100%;
  text-align: center;
}
/deep/ .ant-select-selection-selected-value {
  line-height: 28px;
}
.design-toolbar {
  width: 300px;
  height: 100%;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  .design-logo {
    @height: 60px;
    height: @height;
    line-height: @height;
    background: #585556;
    color: #fff;
  }
  .design-componet-list {
    height: 100%;
    padding-top: 50px;
    position: relative;
    .comps-button {
      height: 50px;
      line-height: 50px;
      .comps-close {
        margin-right: 8px;
        padding: 0 6px;
      }
    }
    .items {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-top: 5px;
      height: 50px;
      line-height: 50px;
    }
    > div {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-top: 5px;
      height: 50px;
      line-height: 50px;
    }
  }
  .foot-button {
    border-top: 1px solid #ddd;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    height: 60px;
  }
}
.design-screen {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  .head-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.17);
    height: 60px;
    .page-nav {
      margin-left: 10px;
    }
    .save {
      margin-right: 10px;
    }
    > div {
      line-height: 60px;
    }
    ul li {
      line-height: 60px;
      font-size: 20px;
    }
    .screen-list ul {
      width: 120px;
      display: flex;
      justify-content: space-between;
    }
  }
  .design-iframe {
    padding: 12px;
    flex-grow: 1;
    display: flex;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    height: 100%;
    .page-container {
      width: 100%;
      height: 100%;
      overflow: auto;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(0, 0, 0, 0.1);
    }
    .mobile-width {
      width: 375px;
    }
  }
}
.flip-list {
  display: block;
}
.flip-list-move {
  transition: transform 0.5s;
}
.button {
  padding-bottom: 50px;
}
.handle {
  .delete {
    margin-left:20px;
  }
}
.model-cont {
  display:flex;
  .name {
    width: 200px;
    text-align: right;
    display:flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
  }
  .desc {
    flex:1
  }
}
.model-checkbox {
  margin-bottom: 10px;
}
</style>

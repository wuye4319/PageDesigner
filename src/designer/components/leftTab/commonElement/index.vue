<template>
  <div>
    <MyTree
      v-if="treeData.length"
      :treeData="treeData"
      :change="handleChange"
      :actions="['edit','delete']"
      :operateTree="operateTree"
      :draggable="false"
      :initType="'common'"
      :selectedKey="selectedKey">
    </MyTree>
    <div v-else style="margin-top: 24px">
      该应用没有任何共享元素
    </div>
    <a-modal
      title="编辑元素共享"
      v-model="visible"
      centered
      :footer="null">
      <div class="model-cont">
        <div class="name"><span class="required">*</span>组件名称:</div>
        <div class="desc">
          <a-input placeholder="请输入组件名称" v-model.trim="editShareComp.title" />
        </div>
      </div>
      <div style="margin-top: 24px">共享页面：</div>
      <div
        class="model-checkbox"
        v-for="(item,i) of pageList"
        :key="i">
        <a-checkbox
          :disabled="checkStatus(item)"
          @change="handleShare"
          :checked="sharePage[item.route] ? true: false"
          :value="item.route">{{ item.pageName }}</a-checkbox>
      </div>
      <div style="margin-top: 24px">注：勾选添加共享元素到对应页面, 组件类型与页面类型不匹配则无法添加!</div>
    </a-modal>
    <a-modal
      title="删除共享元素"
      v-model="deleteVisible"
      @ok="handleOk"
      centered
      :footer="Object.keys(sharePage).length?null:true">
      <div
        style="font-weight: 500"
        v-for="(item,i) of Object.keys(sharePage)"
        :key="i">
        {{ item }}
      </div>
      <div v-if="Object.keys(sharePage).length" style="margin-top: 24px">注：以上页面正在使用该元素，无法删除</div>
      <div v-else>是否删除该共享元素？</div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import MyTree from '../myTree';
import { Modal, Input, Checkbox } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'common-comp',
  components: {
    MyTree,
    AModal: Modal,
    AInput: Input,
    ACheckbox: Checkbox

  }
})
export default class CommonCopmComponent extends Vue {
  @webSite.State('Global')
  global;
  @webSite.Getter('pageInfor')
  pageInfor: any;
  @webSite.Mutation('changePageInfor')
  changePageInfor;
  @webSite.Getter('appInfor')
  appInfor;
  @webSite.State('TempAppData')
  tempAppData: Website.pageInfor;

  @Inject('showControl') showControl; // 展示control层

  sharePage: any = [];
  visible: boolean = false;
  editShareComp: any = {};
  editIndex: any = null;
  deleteVisible: boolean = false;
  oldShare: string = '';

  get treeData(): any {
    return this.global['appShare'] || []
  }

  get pageList() {
    let pageList = [];
    let keys = Object.keys(this.appInfor)
    for (const page of keys) {
      pageList.push({
        route: page,
        pageName: this.appInfor[page].title,
        screen: this.appInfor[page].screen
      })
    }
    return pageList;
  }

  get selectedKey() {
    let selectedUid = this.tempAppData['selectedUid'] || '';
    return selectedUid
  }

  checkStatus(item) {
    console.log(this.editShareComp)
    if (this.editShareComp.isMobile === 2) {
      return false;
    }
    if (item.screen === 'mobile' && this.editShareComp.isMobile === 1) {
      return false;
    }
    if (item.screen === 'desktop' && this.editShareComp.isMobile === 0) {
      return false;
    }
    return true;
  }

  // 监听页面数据变化
  @Watch('pageInfor', { immediate: true, deep: true })
  globalChange() {
    let changedItem = {};
    let appShare = this.global['appShare'] || []; // 共享元素列表
    let pageInit = this.$route.params.page;
    let targetElement = this.getElement();
    for (let index = 0; index < appShare.length; index++) {
      const element = appShare[index];
      // 判断是否共享元素发生改变
      if (element.uid === this.selectedKey) {
        // 根据共享元素页面信息，改变对应页面中的共享元素信息
        element.compAttr = targetElement.compAttr;
        let sharePage = element.sharePage;
        for (const page in sharePage) {
          if (page !== pageInit) {
            // 遍历页面，找到对应页面中的共享元素，改变属性
            this.operatePageCommon(this.appInfor[page], element.uid, targetElement);
          }
        }
      }
    }
  }

  // 页面初次加载时，从appInfor中拿取appShare的值

  // 根据选中ID拿到元素
  getElement() {
    let res:any = {};
    this.operatePageCommon(this.pageInfor, this.selectedKey, 'get', res);
    return res;
  }

  // 判断共享元素
  operatePageCommon(pageInfor, uid, type, target?) {
    if (type === 'add') {
      this.editShareComp.shared = true;
      pageInfor.push(this.editShareComp);
      return;
    }
    for (let idx1 = 0; idx1 < pageInfor.length; idx1++) {
      const element = pageInfor[idx1];
      if (element.compAttr.uid === uid) {
        if (type === 'delete') {
          // element.shared = false;
          pageInfor.splice(idx1, 1);
          this.tempAppData['selectedUid'] = '';
        }
        if (type === 'change') {
          element.compAttr = target.compAttr;
        }
        if (type === 'get') {
          target = element;
        }
      }
      if (element.compAttr.childList) {
        for (let idx2 = 0; idx2 < element.compAttr.childList.length; idx2++) {
          const newList = element.compAttr.childList[idx2];
          this.operatePageCommon(newList, uid, type);
        }
      }
      if (element.compAttr.tabs) {
        for (let idx3 = 0; idx3 < element.compAttr.tabs.length; idx3++) {
          const newList = element.compAttr.tabs[idx3].content.compAttr.childList[0];
          this.operatePageCommon(newList, uid, type);
        }
      }
    }
  }

  operateTree(type, item, i) {
    console.log(type, item, i)
    this.editShareComp = item;
    this.sharePage = item.sharePage;
    this.editIndex = i;
    let self = this;
    if (type === 'edit') {
      this.visible = true;
    }
    if (type === 'delete') {
      if (JSON.stringify(item.sharePage) !== '{}') {
        this.deleteVisible = true;
      } else {
        this.$confirm({
          title: '确定删除该共享元素?',
          content: '删除之后将无法恢复',
          onOk() {
            self.global.appShare.splice(i, 1);
          },
          onCancel() {},
        })
      }
    }
  }

  handleShare(e) {
    let uid = this.editShareComp.compAttr.uid;
    let page = e.target.value;
    if (e.target.checked) {
      this.operatePageCommon(this.appInfor[page].module, uid, 'add')
      let data = { compIdx: this.appInfor[page].module.length };
      this.$set(this.sharePage, page, data);
    } else {
      this.operatePageCommon(this.appInfor[page].module, uid, 'delete');
      this.$set(this.sharePage, page, '');
      delete this.sharePage[page];
    }
  }

  handleOk() {
    this.global.appShare.splice(this.editIndex, 1);
  }

  // 根据uid查到组件所在层级
  async getCompPos(compList, uid, type?) {
    let len = compList.length;
    for (let idx = 0; idx < len; idx++) {
      const comp = compList[idx];
      if (comp.compAttr.uid === uid) {
        if (type === 'layout') {
          this.showControl('layout', comp, compList);
        } else {
          this.showControl(idx);
        }
      }
      if (comp.compAttr.childList) {
        const list = comp.compAttr.childList;
        for (let jdx = 0; jdx < list.length; jdx++) {
          const element = list[jdx];
          await this.getCompPos(element, uid, 'layout');
        }
      }
    }
  }

  async handleChange(item) {
    let page = this.$route.params.page;
    let compInfo:any = {};
    let shareInfo = item.sharePage[page];
    if (shareInfo) {
      this.getCompPos(this.pageInfor, item.compAttr.uid);
    } else {
      this.$message.warning('当前页面未添加此共享元素！')
    }
  }
}
</script>

<style lang='less' scoped>
.model-cont {
  width: 80%;
  display: flex;
  .name {
    display: flex;
    align-items: center;
    margin-right: 20px;
    // flex: 1;
    justify-content: flex-end;
  }
  .desc {
    flex: 1;
  }
  .required {
    color: #f5222d;
  }
}
</style>

<template>
  <div
    style="height: 100%;overflow: auto;padding-top:4px;padding-bottom: 24px"
    @drop.stop="handleDrop($event)"
    @dragover.prevent
  >
    <MyTree
      v-if="pageInfor.length"
      :treeData="pageInfor"
      :change="handleChange"
      :handleLayout="handleLayout"
      :actions="actions"
      :operateTree="operateTree"
      :drop="dropComp"
      :draggable="true"
      :selectedKey="selectedKey"
      :dropContainer="dropContainer"
      @setDropStatus="setDropStatus"
    >
    </MyTree>
    <div v-else style="margin-top: 24px">
      该页面暂未添加元素
    </div>
    <a-modal
      title="修改组件名称"
      v-model="visible"
      @ok="handleOk"
      okText="确认"
      cancelText="取消"
      centered
    >
      <div class="model-cont">
        <div class="name"><span class="required">*</span>组件名称:</div>
        <div class="desc">
          <a-input placeholder="请输入组件名称" v-model.trim="compTitle"/>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Modal, Input } from 'ant-design-vue';
import MyTree from '../myTree';

const webSite = namespace('webSite');

@Component({
  name: 'page-list',
  components: {
    MyTree,
    AModal: Modal,
    AInput: Input

  }
})
export default class PageListComponent extends Vue {
  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;
  @webSite.Getter('pageInfor')
  pageInfor: any;
  @webSite.State('Global')
  global;
  @webSite.State('TempAppData')
  tempAppData;

  @Inject('showControl') showControl; // 展示control层

  $route;
  visible: boolean = false;
  editItem: any = null;
  compTitle: string = '';
  actions: any = ['edit', 'retweet', 'delete'];
  dropContainer: boolean = true;

  get selectedKey() {
    let selectedUid = this.tempAppData['selectedUid'] || '';
    return selectedUid;
  }

  // 监听选中ID的变化，改变对应元素位子
  @Watch('tempAppData.selectedUid', { immediate: true, deep: true })
  selectedUidChange() {
  }

  setDropStatus(bol) {
    this.dropContainer = bol;
  }

  // 树操作
  operateTree(type, target, index, parent) {
    let self = this;
    if (type === 'delete') {
      if (target.compAttr.uid === this.selectedKey) {
        this.tempAppData['selectedUid'] = '';
      }
      this.showControl('empty');
      this.$confirm({
        title: '确认删除该组件吗?',
        content: '删除将无法复原',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          parent.splice(index, 1);
          if (target.shared) {
            let page = self.$router.currentRoute.params.page;
            self.global.appShare.forEach((element, i) => {
              if (element.compAttr.uid === target.compAttr.uid) {
                let data = element.sharePage;
                delete data[page];
                self.$set(element, 'sharePage', data);
              }
            });
          }
        }
      });
    }
    if (type === 'edit') {
      this.visible = true;
      this.editItem = target;
      this.compTitle = target.title;
    }
    if (type === 'retweet') {
      this.editItem = target;
      if (target.shared) {
        this.$message.warning('该元素已被共享！');
        return;
      }
      let appshare = this.global['appShare'] || [];
      let item = {};
      let page = this.$route.params.page;
      this.$set(target, 'shared', true)
      target.sharePage = { [page]: { compIdx: index } }
      appshare.push(target);
      this.$set(this.global, 'appShare', appshare);
      if (target.compAttr.childList) {
        for (let idx2 = 0; idx2 < target.compAttr.childList.length; idx2++) {
          const newList = target.compAttr.childList[idx2];
          this.setChildReweet(newList);
        }
      }
      if (target.compAttr.tabs) {
        for (let idx3 = 0; idx3 < target.compAttr.tabs.length; idx3++) {
          const newList = target.compAttr.tabs[idx3].content.compAttr.childList[0];
          this.setChildReweet(newList);
        }
      }
    }
  }

  setChildReweet(eleList) {
    for (let index = 0; index < eleList.length; index++) {
      const element = eleList[index];
      this.$set(element, 'shared', true)
      if (element.compAttr.childList) {
        for (let idx2 = 0; idx2 < element.compAttr.childList.length; idx2++) {
          const newList = element.compAttr.childList[idx2];
          this.setChildReweet(newList);
        }
      }
      if (element.compAttr.tabs) {
        for (let idx3 = 0; idx3 < element.compAttr.tabs.length; idx3++) {
          const newList = element.compAttr.tabs[idx3].content.compAttr.childList[0];
          this.setChildReweet(newList);
        }
      }
    }
  }

  handleOk() {
    if (!this.compTitle) {
      this.$message.warning('组件名称不能为空!');
      return;
    }
    this.editItem.title = this.compTitle;
    this.visible = false;
  }
  // 拖拽放置组件
  dropComp(e, index, parent, layout?) {
    try {
      JSON.parse(e.dataTransfer.getData('dragData'));
    } catch (error) {
      return;
    }
    let data = JSON.parse(e.dataTransfer.getData('dragData'));
    if (index !== '') {
      parent.splice(index, 0, data);
    } else {
      parent.push(data);
    }
    this.clearStatus('enter', this.pageInfor);
    if (layout && layout.shared) {
      this.$set(data, 'shared', true)
    }
  }
  handleDrop(e) {
    this.dropContainer = true;
    if (e.dataTransfer.getData('dragData')) {
      let data = JSON.parse(e.dataTransfer.getData('dragData'))
      this.pageInfor.push(data);
    }
  }
  // 选择组件
  async handleChange(item, i?, parent?) {
    if (item.compName === 'backTop') {
      document.querySelector('.page-container').scrollTo(0, Number(item.compAttr.scroll) + 1);
    }
    this.showControl(i);
    this.handleElement();
  }

  // 选择layout内组件
  async handleLayout(item, i?, parent?) {
    this.showControl('layout', item, parent);
    this.handleElement();
  }

  handleElement() {
    let element:any = document.querySelector('.elementD' + this.tempAppData['selectedUid']);
    element && element.scrollIntoView({ 'block': 'center' });
  }

  // 清除元素选中状态
  async clearStatus(key, data) {
    (await data) &&
      data.forEach(async element => {
        element[key] = false;
        let children = element.compAttr.childList;
        (await children) &&
          children.forEach(child => {
            child && this.clearStatus(key, child);
          });
      });
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

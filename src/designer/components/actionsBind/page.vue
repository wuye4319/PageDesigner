<template>
  <div class="page-event">
    <a-collapse :bordered="false" v-if="pageEvent['actionData'].length > 0">
      <a-collapse-panel
        v-for="(item,j) in pageEvent['actionData']"
        :header="item.eventName"
        :key="item.eventType"
        :style="customStyle"
      >
        <action-item
          v-for="(action,i) in item.actions"
          :key="i"
          :action="action"
          :eventIndex="j"
          :index="i"
          :operateAction="operateAction"
        />
      </a-collapse-panel>
    </a-collapse>

    <div class="operations">
      <a-button type="primary" @click="openActionModal">添加事件</a-button>
      <a-button type="primary" @click="openEditorModal">自定义事件</a-button>
    </div>

    <actionModal
      :visible="actionVisible"
      :openEditorModal="openEditorModal"
      :closeModal="closeActionModal"
      :actionModel="pageEvent['actionData']"
      :setActionModel="setActionModel"
      :setEditEvent="setOperateEvent"
    />
    <actionEditModal
      :editEvent="editEvent"
      :editAction="editAction"
      :actionParams="actionParams"
      :editActionIndex="editActionIndex"
      :visible="actionEVisible"
      :openEditorModal="openEditorModal"
      :closeModal="closeActionModalEdit"
      :actionModel="pageEvent['actionData']"
      :setActionModel="setActionModel"
    />
    <editorModal
      :visible="editorVisible"
      :closeModal="closeEditorModal"
      :actionModel="pageEvent['actionData']"
      :setActionModel="setActionModel"
    />

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Model } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import actionItem from './actionItem.vue'; // 动作内容
import actionModal from './actionModal.vue'; // 动作弹框
import actionEditModal from './actionEditModal.vue'; // 动作编辑框
import editorModal from './editorModal.vue'; // 编辑弹框
import { Collapse, Button } from 'ant-design-vue';
const webSite = namespace('webSite');

const eventArr = [
  { 'eventName': '页面创建后', 'eventType': 'created', 'actions': [] },
  { 'eventName': '页面销毁前', 'eventType': 'beforeDestroy', 'actions': [] }
]

@Component({
  name: 'page-event',
  components: {
    actionItem,
    actionModal,
    editorModal,
    actionEditModal,
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
    AButton: Button
  }
})

export default class PageEvent extends Vue {
  @webSite.Getter('appInfor')
  appInfor

  pageEvent:object = {} // 页面事件列表
  actionVisible: boolean = false;
  editorVisible: boolean = false;
  actionEVisible: boolean = false;
  customStyle =
    'background: #f7f7f7;border-radius: 4px;margin-top: 8px;border: 0;overflow: hidden';
  editEvent: any = null;
  operateEvent: any = null;
  editAction: any = null;
  actionParams: any = null;
  editActionIndex: any = null;

  created() {
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    let pageInfo = currentInfo['page-share'];
    if (!pageInfo['event']) {
      this.$set(pageInfo, 'event', {})
    }
    if (!pageInfo['event']['actionData']) {
      this.$set(pageInfo['event'], 'actionData', eventArr)
    }
    this.pageEvent = pageInfo['event']
  }

  operateAction(type, eventIndex, index) {
    let event:any = this.pageEvent['actionData'][eventIndex];
    if (type === 'edit') {
      this.openActionModalEdit(eventIndex, index);
    } else {
      let modals = this.pageEvent['actionData'];
      modals[0] && modals.forEach((mod:any, i) => {
        if (mod.eventType === event.eventType) {
          modals[i]['actions'].splice(index, 1);
        }
      });
      this.setActionModel(modals);
    }
  }
  setActionModel(value) {
    this.pageEvent['actionData'] = value;
  }
  setOperateEvent(event) {
    this.operateEvent = event;
  }
  openActionModal() {
    this.editEvent = null;
    this.editAction = null;
    this.actionVisible = true;
  }
  closeActionModalEdit() {
    this.actionEVisible = false;
  }
  openActionModalEdit(eventIndex, index) {
    let event: any = this.pageEvent['actionData'][eventIndex];
    this.editEvent = event;
    this.editAction = event.actions[index];
    this.actionParams =
      event.actions[index].params && JSON.parse(event.actions[index].params);
    this.editActionIndex = index;
    this.actionEVisible = true;
  }
  closeActionModal() {
    this.actionVisible = false;
    this.editAction = null;
    this.editEvent = null;
  }
  openEditorModal() {
    this.editorVisible = true;
  }
  closeEditorModal() {
    this.editorVisible = false;
  }
}
</script>

<style lang='less' scoped>
  .edit {
  width: 200px;
  height: 81px;
  padding: 21px 18px;
  margin: 0 auto;
}
.cont {
  text-align: left;
  /deep/ .arrow {
    right: 16px;
    left: auto !important;
  }
}
.app-style {
  font-size: 12px;
  /deep/.ant-collapse {
    background: transparent;
  }
  /deep/.ant-collapse-item {
    border: 0;
    margin-bottom: 8px;
    border-radius: 4px;
    background: #ffffff;
    .ant-collapse-header {
      padding: 6px 8px;
      color: #000000;
      font-size: 12px;
    }
  }
}
.operations {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  border-top: 1px solid #ccc;
  padding: 8px 16px;
  /deep/button {
    flex: 1;
    &:last-of-type {
      margin-left: 16px;
    }
  }
}
.anouce{
  height: 32px;
  line-height: 32px;
  text-align: center;
}
</style>

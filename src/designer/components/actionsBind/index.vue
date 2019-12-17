<template>
  <div class="app-style">
    <div class="cont" v-if="Object.keys(globalOptions).length > 0">
      <a-collapse :activeKey="operateEvent && operateEvent.eventType" :bordered="false" v-if="compData.actionModel && compData.actionModel.length > 0">
        <a-collapse-panel
          v-for="(item,j) in compData.actionModel"
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
        <a-button type="primary" @click="openActionModal">添加动作</a-button>
        <a-button type="primary" @click="openEditorModal">自定义动作</a-button>
      </div>
    </div>
    <actionModal
      :visible="actionVisible"
      :openEditorModal="openEditorModal"
      :closeModal="closeActionModal"
      :actionModel="compData.actionModel"
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
      :actionModel="compData.actionModel"
      :setActionModel="setActionModel"
    />
    <editorModal
      :visible="editorVisible"
      :closeModal="closeEditorModal"
      :actionModel="compData.actionModel"
      :setActionModel="setActionModel"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import actionItem from './actionItem.vue';
import actionModal from './actionModal.vue';
import actionEditModal from './actionEditModal.vue';
import editorModal from './editorModal.vue';

const webSite = namespace('webSite');

@Component({
  name: 'actions-bind',
  components: {
    actionItem,
    actionModal,
    editorModal,
    actionEditModal
  }
})
export default class actionBind extends Vue {
  @webSite.Getter('global')
  global;

  @webSite.Mutation('changeappInfor')
  changeappInfor;

  @Prop() compData;
  @Prop() compIndex;
  @Prop() compsDataParent;

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

  get globalOptions() {
    let obj = {};
    if (this.global.appStyle && Object.keys(this.global.appStyle).length) {
      obj = this.global.appStyle;
    }
    return obj;
  }
  operateAction(type, eventIndex, index) {
    let event = this.compData.actionModel[eventIndex];
    if (type === 'edit') {
      this.openActionModalEdit(eventIndex, index);
    } else {
      let modals = this.compData.actionModel;
      modals &&
        modals.forEach((mod, i) => {
          if (mod.eventType === event.eventType) {
            modals[i].actions.splice(index - 1, 1);
          }
        });
      this.setActionModel(modals);
    }
  }
  setActionModel(value) {
    this.compData.actionModel = value;
  }
  setOperateEvent(event){
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
    let event: any = this.compData.actionModel[eventIndex];
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
</style>

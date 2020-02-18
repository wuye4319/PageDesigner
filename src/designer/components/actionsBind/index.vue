<template>
  <div class="actionstyle">
    <div class="cont" v-if="Object.keys(globalOptions).length > 0">
      <div class="anouce" v-if="!compData.actionModel || !compData.actionModel.actionData">
        组件暂未提供事件绑定
      </div>
      <a-collapse
        v-if="compData.actionModel && compData.actionModel.actionData"
        :activeKey="operateEvent && operateEvent.eventType"
        :bordered="false">
        <a-collapse-panel
          v-for="(item,j) in compData.actionModel.actionData"
          :header="item.eventName"
          :key="item.eventType"
          :style="customStyle"
        >
          <template v-if="item.actions.length">
            <action-item
              v-for="(action,i) in item.actions"
              :key="i"
              :action="action"
              :eventIndex="j"
              :index="i"
              :operateAction="operateAction"
            />
          </template>
          <template v-else>
            暂未绑定动作，<span
              style="cursor: pointer"
              class="ant-desigener-font-color"
              @click="openActionModal">去绑定</span>
          </template>
        </a-collapse-panel>
      </a-collapse>
      <div v-if="compData.actionModel && compData.actionModel.actionData" class="operations">
        <a-button type="primary" @click="openActionModal">添加动作</a-button>
        <a-button type="primary" @click="openEditorModal">自定义动作</a-button>
      </div>
    </div>
    <actionModal
      :visible="actionVisible"
      :openEditorModal="openEditorModal"
      :closeModal="closeActionModal"
      :actionModel="compData.actionModel.actionData"
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
      :actionModel="compData.actionModel.actionData"
      :setActionModel="setActionModel"
    />
    <editorModal
      :visible="editorVisible"
      :closeModal="closeEditorModal"
      :actionModel="compData.actionModel.actionData"
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
import ViewHandle from '../../../../npm/website/components/view_handle/index.vue';
import { Collapse, Button } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'actions-bind',
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
export default class actionBind extends Vue {
  @webSite.Getter('global')
  global;

  @webSite.Mutation('changeappInfor')
  changeappInfor;
  @webSite.Getter('pageActions') pageActions;

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
    let event = this.compData.actionModel.actionData[eventIndex];
    if (type === 'edit') {
      this.openActionModalEdit(eventIndex, index);
    } else {
      let modals = this.compData.actionModel.actionData;
      modals[0] && modals.forEach((mod, i) => {
        if (mod.eventType === event.eventType) {
          modals[i].actions.splice(index, 1);
        }
      });
      this.setActionModel(modals);
    }
  }
  setActionModel(value) {
    this.compData.actionModel.actionData = value;
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
    let event: any = this.compData.actionModel.actionData[eventIndex];
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
.actionstyle {
  font-size: 12px;
  /deep/.ant-collapse {
    background: transparent;
  }
  /deep/.ant-collapse-item {
    border: 0;
    margin-bottom: 8px;
    border-radius: 4px;
    background: #ffffff;
    /deep/.ant-collapse-header {
      padding: 6px 8px;
      color: #000000;
      font-size: 12px;
    }
  }
  /deep/.ant-collapse-arrow{
    left: auto !important;
    right: 16px;
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
.cont {
  text-align: left;
}
</style>

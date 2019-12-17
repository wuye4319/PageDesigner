<template>
  <div class="event-box">
    <a-modal
      title="新建事件动作"
      :visible="visible"
      @cancel="handleCancle"
      :footer="null"
      width="700px"
      :destroyOnClose="true"
      :forceRender="true"
    >
      <div class="topOperation">
        <label>
          事件触发：
          <a-select
            labelInValue
            @change="handleChange"
            placeholder="请选择绑定事件"
            v-if="actionModel && actionModel.length"
          >
            <a-select-option
              v-for="(item,i) in actionModel"
              :key="i"
              :value="item.eventType"
            >{{ item.eventName }}</a-select-option>
          </a-select>
        </label>
        <label>
          响应动作：
          <a-select labelInValue @change="handleActionChange" placeholder="请选择响应动作">
            <a-select-option
              v-for="(item,i) in actions"
              :key="item.actionFunc + i"
              :value="item.actionFunc"
            >{{ item.actionName }}</a-select-option>
            <a-select-option value="customAction" @click="openEditorModalN">自定义动作</a-select-option>
          </a-select>
        </label>
      </div>
      <div class="operateContent">
        <div v-if="selectedAction && selectedAction.actionFunc === 'openUrl'">
          <div class="title">参数设置</div>
          <div class="content">
            <div class="title">网站地址</div>
            <a-input :allowClear="true" v-model="siteUrl" placeholder="请输入地址" />
            <div class="title">地址类型</div>
            <a-radio-group v-model="siteType">
              <a-radio value="externalLink">外部链接</a-radio>
              <a-radio value="stationRouting">站内路由</a-radio>
            </a-radio-group>
            <div class="title">打开方式</div>
            <a-radio-group v-model="openType">
              <a-radio value="newTab">新开页面</a-radio>
              <a-radio value="self">本页打开</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div v-else-if="selectedAction.actionFunc">
          <div class="title">参数设置(json)</div>
          <MyEditor
            height="calc(80vh - 275px)"
            editorHeight="calc(80vh - 275px)"
            language="json"
            :codes="javascriptCodes"
            @onMounted="javascriptOnMounted"
            @onCodeChange="javascriptOnCodeChange"
            :isSave="true"
          />
        </div>
        <div v-else></div>
      </div>
      <div class="submitBtn">
        <a-button type="primary" @click="handledSubmit">确认</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import MyEditor from '../editor';
const webSite = namespace('webSite');

@Component({
  components: {
    MyEditor
  }
})
export default class Editor extends Vue {
  @Prop() visible;
  @Prop() closeModal;
  @Prop() events;
  @Prop() actionModel;
  @Prop() setActionModel;
  @Prop() openEditorModal;
  @Prop() setEditEvent;

  @webSite.Getter('actions') actions;

  selectedAction: any = {};
  changedEvent: any = {};
  siteUrl: string = '';
  siteType: string = '';
  openType: string = '';

  // ----编辑器逻辑
  javascriptCodes: string = ' ';
  jsonParams: string = '';
  jsEditor = null;

  javascriptOnMounted(edit) {
    this.jsEditor = edit;
  }

  javascriptOnCodeChange(value, event) {
    this.jsonParams = value;
  }
  // ------编辑器逻辑
  handleCancle() {
    this.closeModal();
    this.siteUrl = '';
    this.siteType = '';
    this.openType = '';
    this.selectedAction = {};
    this.changedEvent = {};
  }
  openEditorModalN() {
    this.closeModal();
    this.openEditorModal();
  }

  handleChange(value) {
    this.changedEvent = { eventType: value.key, eventName: value.label };
    this.setEditEvent(this.changedEvent);
  }
  handleActionChange(value) {
    this.selectedAction = { actionFunc: value.key, actionName: value.label };
  }
  handledSubmit() {
    let selectedAction = this.selectedAction;
    let params = selectedAction.actionFunc != 'openUrl' ? this.jsonParams : JSON.stringify({
      openType: this.openType,
      siteType: this.siteType,
      siteUrl: this.siteUrl
    });
    let changedEvent = this.changedEvent;
    let modals = this.actionModel;
    modals.forEach((mod, i) => {
      if (mod.eventType === changedEvent.eventType) {
        mod.actions.push({
          actionName: selectedAction.actionName,
          actionFunc: selectedAction.actionFunc,
          params: params
        });
      }
      modals[i] = mod;
    });
    this.setActionModel(modals);
    this.handleCancle();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.event-box {
  padding-top: 30px;
}
.topOperation {
  display: flex;
  flex-direction: row;
  align-items: center;
  label {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 8px;
    div {
      flex: 1;
    }
  }
}
.operateContent {
  margin: 8px 0;
  .title {
    height: 32px;
    line-height: 32px;
    background: #eee;
    border-radius: 4px;
    padding: 0 8px;
    margin: 8px 0;
  }
  .content {
    padding: 0 8px;
  }
}
.submitBtn {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
</style>

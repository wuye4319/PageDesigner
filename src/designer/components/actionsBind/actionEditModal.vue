<template>
  <div class="event-box">
    <a-modal
      title="修改事件动作"
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
            placeholder="请选择绑定事件"
            v-if="actionModel && actionModel.length"
            :disabled="editEvent && editEvent.eventType ? true: false"
            :defaultValue="{key: editEvent && editEvent.eventType || ''}"
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
          <a-select
            labelInValue
            @change="handleActionChange"
            placeholder="请选择响应动作"
            :defaultValue="{key: editAction && editAction.actionFunc || ''}"
          >
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
        <div
          v-if="!selectedAction.actionFunc && editAction && editAction.actionFunc === 'openUrl' || selectedAction.actionFunc && selectedAction.actionFunc === 'openUrl'"
        >
          <div class="title">参数设置</div>
          <div class="content">
            <div class="title">网站地址</div>
            <a-input
              @change="changeSiteUrl"
              :defaultValue="actionParams && actionParams.siteUrl || ''"
              placeholder="请输入地址"
            />
            <div class="title">地址类型</div>
            <a-radio-group
              @change="changeSiteType"
              :defaultValue="actionParams && actionParams.siteType || ''"
            >
              <a-radio value="externalLink">外部链接</a-radio>
              <a-radio value="stationRouting">站内路由</a-radio>
            </a-radio-group>
            <div class="title">打开方式</div>
            <a-radio-group
              @change="changeOpenType"
              :defaultValue="actionParams && actionParams.openType || ''"
            >
              <a-radio value="newTab">新开页面</a-radio>
              <a-radio value="self">本页打开</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div v-else>
          <div class="title">参数设置(json)</div>
          <MyEditor
            height="calc(80vh - 275px)"
            editorHeight="calc(80vh - 275px)"
            language="json"
            :codes="JSON.stringify(this.actionParams)"
            @onMounted="javascriptOnMounted"
            @onCodeChange="javascriptOnCodeChange"
            :isSave="true"
          />
        </div>
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
  @Prop() editEvent;
  @Prop() editAction;
  @Prop() actionParams;
  @Prop() editActionIndex;

  @webSite.Getter('actions') actions;

  selectedAction: any = {}; // 选中的动作

  siteUrl: string = '';
  siteType: string = '';
  openType: string = '';

  // ----编辑器逻辑
  // javascriptCodes: string = this.actionParams ? JSON.stringify(this.actionParams) : ' ';
  jsonParams: string = '';
  jsEditor = null;

  javascriptOnMounted(edit) {
    this.jsEditor = edit;
  }

  javascriptOnCodeChange(value, event) {
    this.jsonParams = value;
  }
  // ------编辑器逻辑

  changeSiteUrl(e) {
    this.siteUrl = e.target.value;
  }
  changeSiteType(e) {
    this.siteType = e.target.value;
  }
  changeOpenType(e) {
    this.openType = e.target.value;
  }
  handleCancle() {
    this.closeModal();
    this.siteUrl = '';
    this.siteType = '';
    this.openType = '';
    this.selectedAction = {};
    // this.javascriptCodes = ' ';
    this.jsonParams = '';
  }
  openEditorModalN() {
    this.closeModal();
    this.openEditorModal();
  }

  handleActionChange(value) {
    this.selectedAction = { actionFunc: value.key, actionName: value.label };
  }
  handledSubmit() {
    let selectedAction = this.selectedAction.actionFunc
      ? this.selectedAction
      : this.editAction; // 最终动作
    // 动作为默认动作
    let params: any = '';
    if (selectedAction.actionFunc === 'openUrl') {
      params = JSON.stringify({
        openType: this.openType || this.actionParams.openType,
        siteType: this.siteType || this.actionParams.siteType,
        siteUrl: this.siteUrl || this.actionParams.siteUrl
      });
    } else {
      params = this.jsonParams ? this.jsonParams.trim().split('\\').join(''): JSON.stringify(this.actionParams);
    }
    let modals = this.actionModel;
    modals.forEach((mod, i) => {
      if (mod.eventType === this.editEvent.eventType) {
        let newaction = {
          actionName: selectedAction.actionName,
          actionFunc: selectedAction.actionFunc,
          params: params
        };
        this.$set(mod.actions, this.editActionIndex, newaction);
        this.$set(modals, i, mod);
      }
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

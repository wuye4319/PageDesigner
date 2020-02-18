<template>
  <div class="event-box">
    <a-modal
      title="新建事件动作"
      :visible="visible"
      @cancel="handleCancle"
      :footer="null"
      width="700px"
      :destroyOnClose="true">
      <div class="topOperation">
        <label>
          事件触发：
          <a-select
            labelInValue
            @change="handleChange"
            placeholder="请选择绑定事件"
            v-if="actionModel && actionModel.length">
            <a-select-option
              v-for="(item,i) in actionModel"
              :key="i"
              :value="item.eventType">{{ item.eventName }}</a-select-option>
          </a-select>
        </label>
        <label>
          响应动作：
          <a-select
            labelInValue
            @change="handleActionChange"
            placeholder="请选择响应动作">
            <a-select-opt-group label="系统响应动作">
              <a-select-option
                v-for="(item,i) in defaultFunctions"
                :key="item.actionFunc + i"
                :value="item.actionFunc">{{ item.actionName }}</a-select-option>
            </a-select-opt-group>
            <a-select-opt-group label="自定义响应动作">
              <template v-for="(item,i) in pageFunctions">
                <a-select-option
                  v-if="item.actionFunc"
                  :key="item.actionFunc + i"
                  :value="item.actionFunc">{{ item.actionName }}</a-select-option>
              </template>
            </a-select-opt-group>
            <template v-for="(item) in pageFunctions">
              <a-select-opt-group
                :key="Object.keys(item)[0]"
                :label="Object.keys(item)[0]"
                v-if="!item.actionFunc">
                <a-select-option
                  v-for="(func) in item[Object.keys(item)[0]]"
                  :key="Object.keys(item)[0]+'.' + func.actionFunc"
                  :value="Object.keys(item)[0]+'.'+func.actionFunc">{{ func.actionName }}</a-select-option>
              </a-select-opt-group>
            </template>
            <a-select-option value="customAction" @click="openEditorModalN">自定义动作</a-select-option>
          </a-select>
        </label>
      </div>
      <div class="operateContent">
        <div v-if="selectedAction && selectedAction.actionFunc === 'openUrl'">
          <div class="title">参数设置</div>
          <div class="content">
            <div class="title">地址类型</div>
            <a-radio-group v-model="siteType" @change="changeType">
              <a-radio value="externalLink">外部链接</a-radio>
              <a-radio value="stationRouting">站内路由</a-radio>
            </a-radio-group>
            <div class="title">网站地址</div>
            <a-select
              v-if="siteType === 'stationRouting'"
              v-model="siteUrl"
              size="default"
              placeholder="请选择连接页面"
              style="width: 100%">
              <a-select-option
                v-for="page in pageList"
                :key="page"
                :value="page">{{ page }}</a-select-option>
            </a-select>
            <a-input
              v-if="siteType === 'externalLink'"
              placeholder="请输入地址"
              v-model="siteUrl">
              <a-select
                slot="addonBefore"
                defaultValue="http://"
                style="width: 90px"
                v-model="linkPrefix">
                <a-select-option value="http://">http://</a-select-option>
                <a-select-option value="https://">https://</a-select-option>
              </a-select>
            </a-input>
            <div class="title">打开方式</div>
            <a-radio-group v-model="openType">
              <a-radio value="_blank">新开页面</a-radio>
              <a-radio value="_self">本页打开</a-radio>
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
            :isSave="true" />
        </div>
        <div v-else></div>
      </div>
      <div class="submitBtn">
        <a-button
          type="primary"
          @click="handledSubmit"
          :disabled="!(this.changedEvent.eventName && this.selectedAction.actionName) || (this.selectedAction.actionFunc==='openUrl' && (!this.siteUrl || !this.openType || !this.siteUrl))">确认</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import MyEditor from '../editor';
import commonMixin from '@/common/mixin';
import { Modal, Select, Radio, Input, Button } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'action-modal',
  components: {
    MyEditor,
    AModal: Modal,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASelectOptGroup: Select.OptGroup,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    AButton: Button,
    AInput: Input
  },
  mixins: [commonMixin]
})
export default class ActionModal extends Vue {
  @Prop() visible;
  @Prop() closeModal;
  @Prop() events;
  @Prop() actionModel;
  @Prop() setActionModel;
  @Prop() openEditorModal;
  @Prop() setEditEvent;

  @webSite.Getter('pageActions') pageActions;
  @webSite.Getter('defaultActions') defaultActions;
  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  selectedAction: any = {};
  changedEvent: any = {};
  siteUrl: string = '';
  siteType: string = '';
  openType: string = '';
  linkPrefix: string = 'https://';

  // ----编辑器逻辑
  javascriptCodes: string = '{}';
  jsonParams: string = '{}';
  jsEditor = null;

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  get pageFunctions() {
    if (!this.pageActions) {
      return [];
    }
    // 获取所有的方法名，必须先执行
    let funcList = this.getFunctionName(this.pageActions, '');
    return funcList;
  }
  get defaultFunctions() {
    if (!this.defaultActions) {
      return [];
    }
    // 获取所有的方法名，必须先执行
    let funcList = this.getFunctionName(this.defaultActions, '(系统)');
    return funcList;
  }
  javascriptOnMounted(edit) {
    this.jsEditor = edit;
  }

  javascriptOnCodeChange(value, event) {
    this.jsonParams = value;
  }
  // ------编辑器逻辑
  changeType() {
    this.siteUrl = '';
  }
  handleCancle() {
    this.closeModal();
    this.siteType = '';
    this.openType = '';
    this.linkPrefix = 'https://';
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
    if (value.key === 'customAction') {
      return;
    }
    this.selectedAction = { actionFunc: value.key, actionName: value.label };
  }
  handledSubmit() {
    let selectedAction = this.selectedAction;
    let params =
      selectedAction.actionFunc !== 'openUrl'
        ? this.jsonParams
        : JSON.stringify({
          openType: this.openType,
          siteType: this.siteType,
          siteUrl:
            this.siteType === 'stationRouting'
              ? this.siteUrl
              : this.linkPrefix + this.siteUrl
        });
    let changedEvent = this.changedEvent;
    let modals = this.actionModel;
    modals[0] &&
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

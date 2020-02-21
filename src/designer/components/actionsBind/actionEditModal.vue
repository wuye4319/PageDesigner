<template>
  <div class="event-box">
    <a-modal
      title="修改事件动作"
      :visible="visible"
      @cancel="handleCancle"
      :footer="null"
      width="700px"
      :destroyOnClose="true"
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
            <a-select-opt-group label="系统响应动作">
              <a-select-option
                v-for="(item,i) in defaultFunctions"
                :key="item.actionFunc + i"
                :value="item.actionFunc"
              >{{ item.actionName }}</a-select-option>
            </a-select-opt-group>
            <a-select-opt-group label="自定义响应动作">
              <template v-for="(item,i) in pageFunctions">
                <a-select-option
                  v-if="item.actionFunc"
                  :key="item.actionFunc + i"
                  :value="item.actionFunc"
                >{{ item.actionName }}</a-select-option>
              </template>
            </a-select-opt-group>
            <template v-for="(item) in pageFunctions">
              <a-select-opt-group
                :key="Object.keys(item)[0]"
                :label="Object.keys(item)[0]"
                v-if="!item.actionFunc"
              >
                <a-select-option
                  v-for="(func) in item[Object.keys(item)[0]]"
                  :key="Object.keys(item)[0]+'.' + func.actionFunc"
                  :value="Object.keys(item)[0]+'.'+func.actionFunc"
                >{{ func.actionName }}</a-select-option>
              </a-select-opt-group>
            </template>
            <a-select-option value="customAction" @click="openEditorModalN">自定义动作</a-select-option>
          </a-select>
        </label>
      </div>
      <div class="operateContent">
        <div
          v-if="selectedAction && selectedAction.actionFunc === 'openUrl' || editAction && editAction.actionFunc === 'openUrl'"
        >
          <div class="title">参数设置</div>
          <div class="content">
            <div class="title">地址类型</div>
            <a-radio-group @change="changeSiteType" :defaultValue="actionParams.siteType">
              <a-radio value="externalLink">外部链接</a-radio>
              <a-radio value="stationRouting">站内路由</a-radio>
            </a-radio-group>
            <div class="title">网站地址</div>
            <a-select
              v-if="siteType === 'stationRouting' || !siteType && actionParams.siteType === 'stationRouting'"
              size="default"
              placeholder="请选择连接页面"
              style="width: 100%"
              :defaultValue="actionParams.siteUrl.indexOf('//') !== -1 ? []:actionParams.siteUrl"
              @change="changeSiteUrl"
            >
              <a-select-option
                v-for="page in pageList"
                :key="page"
                :value="page"
              >{{ page }}</a-select-option>
            </a-select>
            <a-input
              v-if="siteType === 'externalLink' || !siteType && actionParams.siteType === 'externalLink'"
              placeholder="请输入地址"
              @change="changeSiteUrl"
              :defaultValue="actionParams.siteUrl.indexOf('//') !== -1 && actionParams.siteUrl.split('//')[1] || null"
            >
              <a-select
                slot="addonBefore"
                style="width: 90px"
                :defaultValue="actionParams.siteUrl.indexOf('//') !== -1 && actionParams.siteUrl.split('//')[0]+'//' || linkPrefix"
                @change="changePrefix"
              >
                <a-select-option value="http://">http://</a-select-option>
                <a-select-option value="https://">https://</a-select-option>
              </a-select>
            </a-input>
            <div class="title">打开方式</div>
            <a-radio-group :defaultValue="actionParams.openType" @change="changeOpenType">
              <a-radio value="_blank">新开页面</a-radio>
              <a-radio value="_self">本页打开</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div v-else>
          <div class="title">参数设置(json)</div>
          <MyEditor
            height="calc(80vh - 275px)"
            editorHeight="calc(80vh - 275px)"
            language="json"
            :codes="JSON.stringify(actionParams)"
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
import commonMixin from '@/common/mixin';
import MyEditor from '../editor';
import { Modal, Select, Radio, Input, Button } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
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

  @webSite.Getter('pageActions') pageActions;
  @webSite.Getter('defaultActions') defaultActions;
  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  selectedAction: any = {}; // 选中的动作

  siteUrl: string = '';
  siteType: string = '';
  openType: string = '';
  linkPrefix: string = 'http://';

  // ----编辑器逻辑
  // javascriptCodes: string = this.actionParams ? JSON.stringify(this.actionParams) : ' ';
  jsonParams: string = '';
  jsEditor = null;

  get initParam() {
    this.siteUrl = this.actionParams.siteUrl;
    this.openType = this.actionParams.openType;
    this.linkPrefix = this.actionParams.linkPrefix;
    return this.actionParams;
  }

  javascriptOnMounted(edit) {
    this.jsEditor = edit;
  }

  javascriptOnCodeChange(value, event) {
    this.jsonParams = value;
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
  // ------编辑器逻辑
  changeSiteUrl(e) {
    this.siteUrl = e.target ? e.target.value : e;
  }
  changeSiteType(e) {
    this.siteUrl = '';
    this.siteType = e.target.value;
    if (this.siteType === 'externalLink') {
      this.linkPrefix = 'http://';
    }
  }
  changeOpenType(e) {
    this.openType = e.target.value;
  }
  changePrefix(value) {
    this.linkPrefix = value
  }
  handleCancle() {
    this.closeModal();
    this.siteType = '';
    this.openType = '';
    this.linkPrefix = 'http://';
    this.selectedAction = {};
    this.jsonParams = '';
  }
  openEditorModalN() {
    this.closeModal();
    this.openEditorModal();
  }

  handleActionChange(value) {
    this.jsonParams = '';
    if (value.key === 'customAction') {
      this.selectedAction = {};
    } else {
      this.selectedAction = { actionFunc: value.key, actionName: value.label };
    }
  }
  handledSubmit() {
    let selectedAction = this.selectedAction.actionFunc
      ? this.selectedAction
      : this.editAction; // 最终动作
    // 动作为默认动作
    let params: any = '';
    if (selectedAction.actionFunc === 'openUrl') {
      let siteType = this.siteType || this.actionParams.siteType;
      let siteUrl = this.siteUrl || this.actionParams.siteUrl;
      params = JSON.stringify({
        openType: this.openType || this.actionParams.openType,
        siteType: siteType,
        siteUrl: siteType === 'stationRouting'
          ? siteUrl
          : this.linkPrefix + siteUrl
      });
    } else {
      params = this.jsonParams
        ? this.jsonParams
          .trim()
          .split('\\')
          .join('')
        : JSON.stringify(this.actionParams);
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

<template>
  <div class="event-editor">
    <a-modal
      class="event-modal"
      title="自定义动作"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancle"
      width="80%"
      style="height: 80%"
    >
      <MyEditor
        height="calc(80vh - 132px)"
        editorHeight="calc(80vh - 132px)"
        :language="'typescript'"
        :codes="pageStr"
        @onMounted="javascriptOnMounted"
        @onCodeChange="javascriptOnCodeChange"
      />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import MyEditor from '../editor';
import { savePageActions } from '../../service';
import { Modal } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  components: {
    MyEditor,
    AModal: Modal
  }
})
export default class Editor extends Vue {
  $route;
  @Prop() visible;
  @Prop() closeModal;
  @Prop() events;
  @Prop() actionModel;
  @Prop() setActionModel;

  @webSite.Mutation('pageActions') setPageActions;
  @webSite.Getter('pageActions') pageActions;

  javascriptCodes = '';
  jsEditor = null;

  get pageStr() {
    this.javascriptCodes = this.pageActions;
    return this.pageActions;
  }

  javascriptOnMounted(edit) {
    this.jsEditor = edit;
  }

  javascriptOnCodeChange(value) {
    this.javascriptCodes = value
  }

  handleOk(e) {
    this.closeModal();
    this.savePageActions();
  }

  savePageActions() {
    let appID = this.$route.params.appID;
    let pageName = this.$route.path.split('/')[3];
    let params = {
      appID: appID,
      pageName: pageName,
      actionsStr: this.javascriptCodes
    }
    savePageActions(params).then((res: any) => {
      this.setPageActions(this.javascriptCodes);
      if (res && res.data === 'success') {
        this.$message.success('代码保存成功！');
        this.setPageActions(this.javascriptCodes);
      }
    });
  }

  handleCancle() {
    this.closeModal();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.event-modal {
  padding-bottom: 0;
  /deep/.ant-modal-content {
    height: 100%;
  }
}
/deep/.ant-modal-body {
  height: calc(100% - 55px) !important;
}
</style>

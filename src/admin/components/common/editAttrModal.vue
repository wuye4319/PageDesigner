<template>
  <div>
    <a-modal
      class="myModal"
      :title="'自定义组件属性(' + editCompAttr.compName + ' - ' + editCompAttr.title + ')'"
      :visible="visible"
      @cancel="handleCancle"
      @ok="handleOk"
      :closable="true"
      okText="确认"
      cancelText="取消"
      width="700px"
    >
      <div class="edit-content">
        <p style="margin-bottom: 8px;">注: 请输入json格式的数据</p>
        <a-row style="margin-bottom: 12px">
          <a-col :span="3">默认属性:</a-col>
          <a-col :span="20">
            <a-textarea
              :row="6"
              style="height: 200px"
              v-model="editCompAttr.compAttr"
              placeholder="请输入自定义组件属性"
            ></a-textarea>
          <!-- <MyEditor
            height="200px"
            editorHeight="200px"
            language="json"
            :codes="editCompAttr.compAttr"
            @onCodeChange="changeCompAttr"
          /> -->
          </a-col>
        </a-row>
        <!-- <h4> 组件默认数据:</h4> -->
        <a-row style="margin-bottom: 12px">
          <a-col :span="3">数据模型:</a-col>
          <a-col :span="20">
            <a-textarea
              :row="6"
              style="height: 200px"
              v-model="editCompAttr.dataModel"
              placeholder="请输入自定义组件属性"
            ></a-textarea>
          <!-- <MyEditor
            height="200px"
            editorHeight="200px"
            language="json"
            :codes="editCompAttr.dataModel"
            @onCodeChange="changeDataModel"
          /> -->
          </a-col>
        </a-row>
        <!-- <h4> 组件默认数据:</h4> -->
        <a-row>
          <a-col :span="3">事件模型:</a-col>
          <a-col :span="20">
            <a-textarea
              :row="6"
              style="height: 200px"
              v-model="editCompAttr.actionModel"
              placeholder="请输入自定义组件属性"
            ></a-textarea>
          <!-- <MyEditor
            height="200px"
            editorHeight="200px"
            language="json"
            :codes="editCompAttr.actionModel"
            @onCodeChange="changeActionModel"
          /> -->
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Upload, Form, Input, Modal, Col, Row } from 'ant-design-vue';
import { editComp } from '../../service/index';
import Tools from '../../../common/utils/tools';
import MyEditor from './editor';

const utils = new Tools();

@Component({
  name: 'upload-modal',
  components: {
    MyEditor,
    aModal: Modal,
    aTextarea: Input.TextArea,
    aCol: Col,
    aRow: Row
  }
})
export default class UploadModal extends Vue {
  @Prop() visible;
  @Prop() closeModal;
  @Prop() saveComp;
  @Prop() editCompAttr;

  $form;
  $message;
  fileList: any = [];
  confirmLoading: boolean = false;
  submitData: any = {};
  compAttr: any = this.editCompAttr.compAttr;

  // ----编辑器逻辑
  javascriptCodes: string = '{}';
  jsonParams: string = '';

  changeCompAttr(value, event) {
    console.log(value)
    // this.editCompAttr.compAttr = value;
  }

  changeDataModel(value, event) {
    console.log(value)
    // this.editCompAttr.dataModel = value;
  }

  changeActionModel(value, event) {
    console.log(value)
    // this.editCompAttr.actionModel = value;
  }

  async handleOk() {
    let userID = utils.getCookie('userID');
    if (this.isJSON(this.editCompAttr.compAttr)) {
      let res = await editComp(userID, this.editCompAttr);
      if (res.data.data === 'success') {
        this.$message.success('保存成功！');
        this.closeModal();
      } else {
        this.$message.error('请重试');
      }
    } else {
      this.$message.error('请输入正确的json格式数据');
    }
  }

  isJSON(str) {
    if (typeof str === 'string') {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  async handleCancle() {
    this.closeModal();
  }
}
</script>

<style lang='less' scoped>
.edit-content{
  height: calc(90vh - 200px);
  overflow: auto;
}
/deep/.ant-modal-body{
  padding: 12px;
}
</style>

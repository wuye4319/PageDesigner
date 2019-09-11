<template>
  <div>
    <a-modal
      class="uploadModal"
      title="编辑组件"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      :confirmLoading="confirmLoading"
    >

    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation, namespace } from "vuex-class";
import { Upload, Form, Input, Modal} from "ant-design-vue";

@Component({
  name: "upload-modal"
})
export default class UploadModal extends Vue {
  $form;
  fileList: any = [];
  form: any;
  visible: boolean = false;
  confirmLoading: boolean = false;

  beforeCreate () {
    this.form = this.$form.createForm(this);
  }
  handleChange(info) {
    console.log(info);
  }

  handleOk() {}

  handleCancle(){
    this.visible = false;
    this.form.resetFields();
  }

  handleUpload() {
    this.visible = !this.visible;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.confirmLoading = true;
    this.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // this.confirmLoading = false;
      }
    });
  }
}
</script>

<style lang='less' scoped>
.my-upload{
  width: 128px;
  height: 128px;
  border: 1px dashed #d9d9d9;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  .icon-upload{
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div>
    <div class="my-upload" @click="handleUpload">
      <a-icon type="upload" class="icon-upload" />
      <p>上传组件</p>
    </div>
    <a-modal
      class="uploadModal"
      title="上传组件"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      :confirmLoading="confirmLoading"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="组件名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" 
          >
          <a-input
          placeholder="请输入组件名称"
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: '请输入组件名称!' }],
            }
          ]"
        />

        </a-form-item>
        <a-form-item label="组件描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-textarea placeholder="请输入组件描述" :autosize="{ minRows: 2, maxRows: 2 }" />
        </a-form-item>
        <a-form-item label="组件缩略图" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input />
        </a-form-item>
        <a-form-item label="添加vue文件" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
            :defaultFileList="fileList"
            v-decorator="['file',{rules: [{ required: true, message: '请选择要上传的组件!' }]}]"
            @change="handleChange"
          >
            <a-button>
              <a-icon type="upload" />upload
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">上传</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation, namespace } from "vuex-class";
import { Upload, Form, Input,Modal} from "ant-design-vue";

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

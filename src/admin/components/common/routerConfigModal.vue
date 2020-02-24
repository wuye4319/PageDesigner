<template>
  <div>
    <a-modal
      class="uploadModal"
      title="路由配置"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      :confirmLoading="confirmLoading"
      width="700px"
    >
      <a-form :form="form">
        <a-form-item
          :label="item.title"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
          v-for="item in data"
          :key="item.id"
        >
          <a-input
            placeholder="请输入页面路由"
            v-decorator="[
              item.id,
              {
                rules: [{ required: true, message: '请输入组件英文名称!' },
                        {validator: validateCompName,}
                ],
              }
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button type="primary" html-type="submit">保存</a-button>
          <a-button @click="handleCancle">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Upload, Form, Input, Modal, Button } from 'ant-design-vue';

@Component({
  name: 'upload-modal',
  components: {
    aModal: Modal,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button
  }
})
export default class UploadModal extends Vue {
  $form;
  $message;
  fileList: any = [];
  form: any;
  confirmLoading: boolean = false;
  submitData: any = {};

  @Prop() visible;
  @Prop() closeModal;
  @Prop() data;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  handleOk() { }

  handleCancle() {
    this.closeModal();
    this.form.resetFields();
  }

  // 校验组件名称
  validateCompName(rule, value, cbfn) {
    const form = this.form;
    if (value) {
      let reg = /[a-zA-Z]$/g;
      let res = reg.test(value);
      if (!res) {
        cbfn('只能输入英文字母');
      }
      cbfn();
    }
    cbfn();
  }
}
</script>

<style lang='less' scoped>
.my-upload {
  width: 100%;
  height: 128px;
  border: 1px dashed #d9d9d9;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
  .icon-upload {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>

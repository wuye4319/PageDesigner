<template>
  <div>
    <a-modal
      class="uploadModal"
      title="修改用户信息"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      width="700px"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="昵称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            placeholder="请输入昵称"
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入昵称!' }
                ],
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="生日"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-date-picker
            @change="dateChange"
            placeholder="请选择您的出生日期"
            v-decorator="[
              'userAge'
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button type="primary" html-type="submit">确认</a-button>
          <a-button @click="closeModal" style="margin-left: 12px">取消</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Form, Input, Modal, Button, DatePicker } from 'ant-design-vue';
import { editUserInfo } from '../../service/index';
import { baseUrl } from '@/common/config/env';
import Tools from '../../../common/utils/tools';

const utils = new Tools();
@Component({
  name: 'upload-modal',
  components: {
    aModal: Modal,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aDatePicker: DatePicker
  }
})
export default class UploadModal extends Vue {
  $form;
  $message;
  fileList: any = [];
  form: any;
  confirmLoading: boolean = false;
  baseUrl = baseUrl;
  submitData: any = {};

  @Prop() getCompStore;
  @Prop() visible;
  @Prop() closeModal;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  handleOk() {}

  handleCancle() {
    this.closeModal();
    this.form.resetFields();
  }

  dateChange() {}

  // 上传图片
  handleImgChange(file) {
    this.submitData.compImg = file.file.name.split('.')[0];
  }

  handleUpload() {
    this.visible = !this.visible;
  }

  async handleSubmit(e) {
    e.preventDefault();
    let userID = utils.getCookie('userID');
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let data = {
          userName: values.userName,
          userAge: values.userAge
        };
        editUserInfo(userID, data).then((res:any) => {
          if (res === 'success') {
            this.$message.success('用户信息修改成功！');
            this.closeModal();
            utils.setCookie('userName', values.userName);
          } else {
            this.$message.info('修改失败！');
          }
        });
      }
    });
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

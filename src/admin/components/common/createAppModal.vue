<template>
  <div>
    <a-modal
      class="uploadModal"
      :title="appData.appName?'编辑应用':'创建应用'"
      :visible="visible"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      width="700px">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
          :validate-status="appNameStatus.validateStatus"
          :help="appNameStatus.errorMsg">
          <a-input
            placeholder="请输入应用名称"
            v-decorator="[
              'appName',
              {
                initialValue: appData.appName,
                rules: [{ required: true }],
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="注入脚本："
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-textarea
            placeholder="请输入需要注入的脚本"
            v-decorator="[
              'jsCode',
              {
                initialValue: appData.jsCode,
              }
            ]"></a-textarea>
        </a-form-item>
        <a-form-item
          label="描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-textarea
            placeholder="请输入应用描述"
            v-decorator="[
              'description',
              {
                initialValue: appData.description,
              }
            ]"></a-textarea>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button @click="handleCancle" style="margin-right: 12px">取消</a-button>
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Upload, Form, Input, Modal, Select, Button } from 'ant-design-vue';
import * as service from '../../service/index';
import Tools from '../../../common/utils/tools';

const utils = new Tools();
  @Component({
    name: 'upload-modal',
    components: {
      aModal: Modal,
      aForm: Form,
      aFormItem: Form.Item,
      aInput: Input,
      aSelect: Select,
      aSelectOption: Select.Option,
      aTextarea: Input.TextArea,
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
    appNameStatus: any = {
      validateStatus: 'success',
      errorMsg: null
    }
    appDescriptionStatus: any = {
      validateStatus: 'success',
      errorMsg: null
    }

    @Prop() visible;
    @Prop() closeModal;
    @Prop() appData;

    beforeCreate() {
      this.form = this.$form.createForm(this);
    }

    handleOk() { }

    handleCancle() {
      this.closeModal();
      this.appNameStatus = {
        validateStatus: 'success',
        errorMsg: null
      };
      this.appDescriptionStatus = {
        validateStatus: 'success',
        errorMsg: null
      };
      this.form.resetFields();
    }

    validateNameLength(value, type) {
      if (type === 'appName') {
        if (!value) {
          this.appNameStatus = {
            validateStatus: 'error',
            errorMsg: '应用名称不能为空!'
          };
          return false;
        }
        if (value.length <= 50) {
          this.appNameStatus = {
            validateStatus: 'success',
            errorMsg: null
          };
          return true;
        } else {
          this.appNameStatus = {
            validateStatus: 'error',
            errorMsg: '应用名称长度不能超过50!'
          };
          return false;
        }
      }
      if (type === 'description') {
        if (!value || value.length <= 200) {
          this.appDescriptionStatus = {
            validateStatus: 'success',
            errorMsg: null
          };
          return true;
        } else {
          this.appDescriptionStatus = {
            validateStatus: 'error',
            errorMsg: '应用描述最多可输入200个字符!'
          };
          return false;
        }
      }
    }

    async handleSubmit(e) {
      let userID = utils.getCookie('userID');
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        let nameAble = this.validateNameLength(values.appName, 'appName');
        let descAble = this.validateNameLength(values.description, 'description');
        if (!err) {
          if (!nameAble || !descAble) { return; }
          let res: any = {};
          console.log(values, this.appData)
          if (this.appData.appName) {
            res = await service.editApp(this.appData.appID, values);
          } else {
            res = await service.addApp(userID, values);
          }
          if (res.data.status === 200) {
            this.$message.success('应用保存成功！');
            this.closeModal('success');
            this.form.resetFields();
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
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

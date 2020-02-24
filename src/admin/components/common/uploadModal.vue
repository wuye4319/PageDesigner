<template>
  <div>
    <!-- <div class="my-upload" @click="handleUpload">
      <a-icon type="upload" class="icon-upload"/>
      <p>上传组件</p>
    </div>-->
    <a-modal
      class="uploadModal"
      title="上传组件"
      :visible="visible"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      :confirmLoading="confirmLoading"
      width="700px">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-input
            placeholder="请输入组件名称"
            v-decorator="[
              'compName',
              {
                rules: [{ required: true, message: '请输入组件英文名称!' },
                        {validator: validateCompName,}
                ],
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="标题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-input
            placeholder="请输入组件标题"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: '请输入组件标题!' }],
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-textarea
            placeholder="请输入组件描述"
            :autosize="{ minRows: 2, maxRows: 2 }"
            v-decorator="[
              'compDesc',
              {
                rules: [{ message: '请输入组件描述!' }],
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="缩略图"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-upload
            :action="baseUrl + '/upload/imgfile/' + userID"
            listType="picture"
            v-decorator="['imgFile',
                          {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                          },]"
            @change="handleImgChange">
            <a-button>
              <a-icon type="upload" />uploadImg
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="组件文件"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-upload
            :action="baseUrl + '/upload/upload/' + userID"
            listType="picture"
            v-decorator="['vuefile',
                          {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                            rules: [{ required: true, message: '请选择要上传的组件!' }]
                          }]">
            <a-button>
              <a-icon type="upload" />upload
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="控制器文件"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-upload
            :action="baseUrl + '/upload/ctrl/' + userID"
            listType="picture"
            v-decorator="['ctrlfile',
                          {valuePropName: 'fileList',
                           getValueFromEvent: normFile}
            ]">
            <a-button>
              <a-icon type="upload" />upload
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Upload, Form, Input, Modal, Button, Icon } from 'ant-design-vue';
import { saveComp } from '../../service/index';
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
      aIcon: Icon,
      aTextarea: Input.TextArea,
      aUpload: Upload
    }
  })
export default class UploadModal extends Vue {
    $form;
    $message;
    fileList: any = [];
    imgFiles: any = [];
    ctrlfiles: any = [];
    form: any;
    confirmLoading: boolean = false;
    baseUrl = baseUrl;
    submitData: any = {};
    userID: string = '';

    @Prop() getCompStore;
    @Prop() visible;
    @Prop() closeModal;

    beforeCreate() {
      this.form = this.$form.createForm(this);
    }

    activated() {
      this.userID = utils.getCookie('userID');
    }

    handleCancle() {
      this.closeModal();
      this.form.resetFields();
      this.fileList = [];
      this.imgFiles = [];
      this.ctrlfiles = [];
    }
    normFile(e) {
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }
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
            compName: values.compName,
            compDesc: values.compDesc,
            compImg: this.submitData.compImg,
            type: 'custom',
            title: values.title,
            compAttr: {},
          };
          let res = await saveComp(userID, data);
          if (res.data && res.data.status === 200) {
            this.$message.success('上传成功！');
            this.handleCancle();
            this.getCompStore(userID, { type: 'custom', compName: '' });
          } else {
            this.$message.info('上传失败！');
          }
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

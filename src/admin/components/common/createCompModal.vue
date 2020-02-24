<template>
  <div>
    <a-modal
      class="uploadModal"
      title="快速创建组件"
      :visible="visible"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      width="700px"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            placeholder="请输入组件名称"
            v-decorator="[
              'compName',
              {
                rules: [{ required: true, message: '请输入组件英文名称!' },
                        {validator: validateCompName,}
                ],
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="标题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            placeholder="请输入组件标题"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: '请输入组件标题!' }],
              }
            ]"
          />
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
import { Upload, Form, Input, Modal, Button } from 'ant-design-vue';
import * as service from '../../service/index';
import Tools from '../../../common/utils/tools';

const utils = new Tools();
@Component({
  name: 'createComp-modal',
  components: {
    aModal: Modal,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button
  }
})
export default class CreateCompModal extends Vue {
  $form;
  $message;
  fileList: any = [];
  form: any;
  confirmLoading: boolean = false;
  submitData: any = {};

  @Prop() visible;
  @Prop() closeModal;
  @Prop() getCompStore;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  handleOk() {}

  handleCancle() {
    this.closeModal();
    this.form.resetFields();
  }

  async handleSubmit(e) {
    let userID = utils.getCookie('userID');
    e.preventDefault();
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let data = {
          compName: values.compName,
          type: 'custom',
          title: values.title,
          fileRoute: values.fileRoute,
          userID: userID,
          isMobile: 0
        };
        let res = await service.addComp(userID, data);
        if (res.data && res.data.status === 200) {
          this.$message.success('创建成功！');
          this.handleCancle();
          this.getCompStore(userID, { type: 'custom', compName: '' });
        } else {
          this.$message.info('创建失败，请重试！');
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
</style>

<template>
  <div>
    <a-modal
      class="uploadModal"
      title="新建数据对象"
      :visible="visible"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      width="700px"
    >
      <a-form :form="form" @submit="handleSubmit">
        <!-- <a-form-item label="数据对象名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input placeholder="请输入表英文名称" v-decorator="[
            'tableName',
            {
              rules: [{ required: true, message: '请输入数据对象英文名称!' },
                      {validator: validateCompName,}
              ],
            }
          ]" />
        </a-form-item>-->
        <a-form-item label="数据对象名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            placeholder="请输入数据对象别名"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: '请输入数据对象别名!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea
            placeholder="请输入表描述"
            v-decorator="[
              'description',
              {
              }
            ]"
          ></a-textarea>
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
import * as service from '@/admin/service/index';
import ajax from '@/admin/service/tables';

@Component({
  name: 'cTable',
  components: {
    aModal: Modal,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aTextarea: Input.TextArea,
  }
})
export default class CreateCompModal extends Vue {
  @Prop() visible;
  @Prop() closeModal;
  @Prop() success;

  form: any;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  handleCancle() {
    this.closeModal('visible');
    this.form.resetFields();
  }

  async handleSubmit(e) {
    let appID = this.$route.query.appID;
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        ajax.addTable(appID, values).then((res: any) => {
          if (ajax.tool(res, this)) {
            this.$message.success('创建成功');
            this.success(appID, true);
            this.closeModal('visible');
            this.form.resetFields();
          }
        });
      }
    });
  }
  // 校验组件名称
  /*  validateCompName(rule, value, cbfn) {
    const form = this.form;
    if (value) {
      let reg = /[a-zA-Z]$/g;
      let res: any = reg.test(value);
      if (!res) {
        cbfn('只能输入英文字母');
      }
      cbfn();
    }
    cbfn();
  } */
}
</script>

<style lang='less' scoped>
</style>

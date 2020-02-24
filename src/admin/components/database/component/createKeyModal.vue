<template>
  <div>
    <a-modal
      class="uploadModal"
      title="添加字段"
      :visible="visible"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      width="700px"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="字段名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            placeholder="请输入字段名"
            v-decorator="[
              'column_name',
              {
                rules: [{ required: true, message: '输入的字段名不合法!' },
                        {validator: validateCompName,}
                ],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="字段类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select v-decorator="['data_type',{initialValue:'string'}]">
            <a-select-option value="string">字符串</a-select-option>
            <a-select-option value="float">数值型</a-select-option>
            <a-select-option value="int">布尔</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-textarea
            placeholder="请输入备注"
            v-decorator="[
              'column_comment'
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
import ajax from '@/admin/service/tables';
import { Form, Input, Modal, Button, Select } from 'ant-design-vue';

@Component({
  name: 'createComp-key-modal',
  components: {
    aModal: Modal,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aTextarea: Input.TextArea,
    aSelect: Select,
    aSelectOption: Select.Option
  }
})
export default class CreateCompModal extends Vue {
  @Prop() visible;
  @Prop() closeModal;
  @Prop() success;
  @Prop() tableName;

  form: any;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  handleCancle() {
    this.closeModal('addstructV');
    this.form.resetFields();
  }

  async handleSubmit(e) {
    let tableName = this.tableName;
    e.preventDefault();
    this.form.validateFields((err, values) => {
      console.log(err, values, 'fff');
      if (!err) {
        ajax.addTableColunm(tableName, values).then((res: any) => {
          if (ajax.tool(res, this)) {
            this.$message.success('增加成功');
            this.success(tableName, true);
            this.closeModal('addstructV');
            this.form.resetFields();
          }
        });
      }
    });
  }

  // 校验组件名称
  validateCompName(rule, value, cbfn) {
    const form = this.form;
    if (value) {
      let reg = /(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/;
      let res: any = reg.test(value);
      if (!res) {
        cbfn('输入的字段名不合法');
      }
      cbfn();
    }
    cbfn();
  }
}
</script>

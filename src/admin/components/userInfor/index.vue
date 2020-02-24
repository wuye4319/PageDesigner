<template>
  <div style="{height: 100%}" class="compDesc">
    <div class="header">
      <div class="backBox">
        <a-button
          type="primary"
          size="small"
          @click="back"
        >
          <a-icon type="left"/>
        </a-button>
        <span style="margin-left: 10px;font-size: 14px;font-weight: bold;">个人信息编辑</span>
      </div>
    </div>
    <div class="userForm">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="我的昵称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            placeholder="请输入昵称"
            v-decorator="[
              'userName',
              {
                initialValue: userInfo.userName || '',
                rules: [{ required: true, message: '请输入昵称!' }
                ],
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input
            placeholder="请输入昵称"
            disabled
            v-decorator="[
              'userPhone',{
                initialValue: userInfo.userPhone || '',
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="我的生日"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-date-picker
            @change="handleDate"
            placeholder="请选择您的出生日期"
            v-decorator="[
              'userAge',
              {
                initialValue: moment(this.userInfo.userAge),
              }
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import Tools from '../../../common/utils/tools';
import { editUserInfo } from '../../service/index';
import moment from 'moment';
import { Form, Icon, Input, Button, DatePicker } from 'ant-design-vue'

const utils = new Tools();

@Component({
  name: 'userinfo',
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aIcon: Icon,
    aDatePicker: DatePicker
  }
})
export default class UserInfor extends Vue {
  $route;
  $router;
  $message;
  $form;
  visible = false;
  form: any;
  userInfo: any = {};
  moment: any = moment;
  userAge: any = '';
  initialDate: any;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  created() {
    let userName = utils.getCookie('userName');
    let userPhone = utils.getCookie('userPhone');
    let userAge = utils.getCookie('userAge');
    this.userAge = userAge;
    this.userInfo = {
      userName,
      userPhone,
      userAge
    };
  }

  back() {
    this.$router.back();
  }

  handleDate(value, datestr) {
    this.userAge = datestr;
  }

  async handleSubmit(e) {
    e.preventDefault();
    let userID = utils.getCookie('userID');
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let data = {
          userName: values.userName,
          userAge: this.userAge
        };
        editUserInfo(userID, data).then((res: any) => {
          if (res === 'success') {
            this.$message.success('用户信息修改成功！');
            utils.setCookie('userName', values.userName);
            utils.setCookie('userAge', this.userAge);
            this.back();
          } else {
            this.$message.info('修改失败！');
          }
        });
      }
    });
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
  .operateButton {
    button {
      margin-left: 10px;
    }
  }
}
.userForm {
  width: 80%;
  margin: 0 auto;
}
</style>

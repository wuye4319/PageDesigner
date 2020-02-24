<template>
  <div class="loginContain">
    <!-- <a-tabs defaultActiveKey="1">
    <a-tab-pane key="1">-->
    <div class="loginbox">
      <!-- <a-input v-model="loginName" placeholder="请输入用户名">
        <a-icon slot="prefix" type="user"/>
      </a-input> -->
      <div class="logo"></div>
      <a-input v-model="loginPhone" placeholder="请输入手机号">
        <a-icon slot="prefix" type="mobile"/>
      </a-input>
      <a-button
        @click="handleLogin"
        type="primary"
        class="loginbt"
      >登录</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { getUserInfo, addUserInfo } from '../service/index';
import Tools from '../../common/utils/tools';
import { Tabs, Icon, Input, Button } from 'ant-design-vue'

const utils = new Tools();
const login = namespace('login')

@Component({
  name: 'detail-modal',
  components: {
    aTabs: Tabs,
    aTabsPane: Tabs.TabPane,
    aIcon: Icon,
    aInput: Input,
    aButton: Button
  }
})
export default class detailModal extends Vue {
  $route;
  $router;
  $message;
  loginName: any = '';
  loginPhone: any = '';

  @login.Getter('userInfo')
  userInfo;

  @login.Action('userInfo')
  getUserInfo;

  handleLogin() {
    // if (!this.loginName) {
    //   this.$message.error('请输入用户名');
    //   return;
    // }
    if (!this.loginPhone) {
      this.$message.error('请输入用户手机号');
      return;
    }
    if (!(/^1[3456789]\d{9}$/.test(this.loginPhone))) {
      this.$message.error('手机号码有误，请重填');
      return false;
    }
    let loginData = { userPhone: this.loginPhone };
    getUserInfo(this.loginPhone).then((res: any) => {
      if (res === 'failed') {
        addUserInfo(loginData).then((result: any) => {
          if (result !== 'failed') {
            utils.setCookie('userID', result.userID);
            utils.setCookie('userType', result.userType);
            utils.setCookie('userName', result.userName);
            utils.setCookie('userPhone', result.userPhone);
            this.$router.push({
              path: `/admin`
            });
            window.sessionStorage.setItem('userInfo', JSON.stringify(loginData));
          } else {
            this.$message.error('登录失败，请重试！');
          }
        });
      } else {
        utils.setCookie('userID', res.userID);
        utils.setCookie('userName', res.userName);
        utils.setCookie('userType', res.userType);
        utils.setCookie('userPhone', res.userPhone);
        utils.setCookie('userAge', res.userAge);
        window.sessionStorage.setItem('userInfo', JSON.stringify(res));
        this.$router.push({
          path: `/admin`
        });
      }
    });
  }
}
</script>

<style lang='less' scoped>
.loginContain {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  // background: linear-gradient(#17bc94, #17bc9452);
  background: url("../../../static/images/timg.jpeg") no-repeat center;
  background-size: cover;
  color: white;
  .ant-tabs {
    width: 60%;
  }
  .ant-tabs-nav {
    width: 100%;
  }
  .loginbox {
    width: 300px;
    height: 400px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20%;
    background-color: rgba(255, 255, 255, .3);
    border-radius: 4px;
    span {
      margin-bottom: 12px;
    }
  }
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: url("../../../static/images/defaultHeader.jpeg") no-repeat center;
    background-size: cover;
    margin-bottom: 20px;
  }
  .loginbt {
    width: 100%;
    margin-top: 24px;
  }
}
</style>

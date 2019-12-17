<template>
  <div class="back-admin">
    <a-button
      class="back-btn"
      type="primary"
      @click="openModal"
    >
      <a-icon type="left"/>
    </a-button>

    <a-modal
      v-model="visible"
      :bodyStyle="bodyStyle"
      :footer="null"
      :width="416"
    >
      <div class="back-cont">
        <a-icon type="question-circle" class="ant-desigener-font-warning-color back-icon"/>
        <span class="text">你确定要离开设计器页面吗?</span>
      </div>
      <div class="back-footer">
        <!-- <a-button class="back-footer-btn">取消</a-button>  -->
        <a-button
          class="back-footer-btn"
          type="danger"
          @click="backAdmin"
        >直接离开</a-button>
        <a-button
          class="back-footer-btn"
          type="primary"
          @click="backSave"
        >保存后离开</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Model } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { adminUrl } from '@/common/config/env';

const webSite = namespace('webSite');

@Component({
  name: 'back-admin'
})

export default class BackAdmin extends Vue {
  @webSite.Getter('pageInfor')
  pageInfor;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  @webSite.Action('handleAppInfo') // 更改页面以及页面数据
  handleAppInfo;

  @webSite.Getter('global')
  global: Website.pageInfor;

  @Prop() pageSelect

  $router
  $message
  visible: boolean = false
  bodyStyle: object = {
    'border-bottom-width': 0
  }
  timer:any = null;
  oldAppInfo: string = ''
  oldGlobal: string = ''

  created() {
    this.initOldPage();
  }

  beforeDestroy() {
    this.visible = false;
    clearInterval(this.timer);
  }

  // 初始化旧页面
  initOldPage() {
    this.timer = setInterval(() => {
      let statusApp = Object.keys(this.appInfor).length > 0;
      let statusGlobal = Object.keys(this.global).length > 0;
      if (statusApp && statusGlobal) {
        this.oldAppInfo = JSON.stringify(this.appInfor);
        this.oldGlobal = JSON.stringify(this.global);
        clearInterval(this.timer);
      }
    }, 300)
  }

  // 退回admin
  openModal() {
    let newAppInfo = JSON.stringify(this.appInfor);
    let newGlobal = JSON.stringify(this.global);
    let stateApp = this.oldAppInfo === newAppInfo;
    let stateGlobal = this.oldGlobal === newGlobal;
    if (stateApp && stateGlobal) {
      this.backAdmin();
    } else {
      this.visible = true;
    }
  }

  // 直接退出
  backAdmin() {
    window.open(adminUrl + '#/admin/', '_self')
  }

  // 保存退出
  backSave() {
    this.cancelAsync();
  }

  cancelAsync() {
    this.saveInfo().then(() => {
      this.backAdmin();
    })
  }

  // 保存
  saveInfo() {
    let appInfor = this.appInfor;
    appInfor[this.pageSelect].module = this.pageInfor;
    let params = {
      page: appInfor,
      global: this.global
    };
    let appID = this.$router.currentRoute.params.appID;
    return new Promise((resolve, reject) => {
      this.handleAppInfo({
        url: '/page/pageconfig/' + appID,
        params
      }).then((res) => {
        this.$message.success('保存成功！');
        this.visible = false;
        resolve();
      }).catch((rej) => {
        this.$message.error('保存失败，请重新尝试');
        reject(new Error('error'));
      });
    });
  }

  // 还原主题
  initTheme(theme) {
    let win: any = window;
    let themeObj: any = {
      '@primary-color': '',
      '@success-color': '',
      '@warning-color': '',
      '@error-color': '',
      '@font-size-base': '',
      '@heading-color': '',
      '@text-color': '',
      '@text-color-secondary': '',
      '@disabled-color': '',
      '@border-radius-base': '',
      '@border-color-base': ''
    };
    for (let name of Object.keys(theme)) {
      if (Array.isArray(theme[name])) {
        themeObj[name] = `rgba(${this.getRGBColor(theme[name][0])},${theme[name][1]}%)`;
      } else {
        themeObj[name] = theme[name];
      }
    }
    win.less.modifyVars(themeObj);
  }

  // 十六进制转换成RGB颜色
  getRGBColor(color) {
    let sColor = String(color).toLowerCase();
    // 十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      return sColorChange.join(',');
    }
    return sColor;
  }
}
</script>

<style lang='less' scoped>
  .back-btn {
    font-size: 18px;
    margin-right: 10px;
  }
  .back-cont {
    font-size: 20px;
  }
  .back-icon {
    vertical-align: middle;
  }
  .text {
    margin-left: 16px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
  .back-footer {
    margin-top: 24px;
    text-align: right;

  }
  .back-footer-btn {
    margin-left: 8px;
  }
</style>

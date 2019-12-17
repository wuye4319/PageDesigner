<template>
  <div class="container">
    <div class="head-bar">
      <div class="page-nav">
        <back-admin :pageSelect="pageSelect" ref="backAdmin"/>
        <a-select
          v-model="pageSelect"
          class="page-select"
          @change="handleChange"
        >
          <a-select-option
            v-for="page in pageList"
            :key="page"
            :value="page"
          >{{ page }}</a-select-option>
        </a-select>
        <operate-modal @creatOk="creatOk"/>
      </div>
      <div class="apps-title">{{ currentApps.appName }}</div>
      <div class="handle-button">
        <theme class="btn"/>
        <a-button
          class="btn"
          icon="eye"
          @click="openfullscreen"
        >预览</a-button>
        <a-button
          class="btn"
          @click="saveInfo"
          icon="save"
        >保存</a-button>
        <a-button
          class="btn"
          type="primary"
          icon="file"
        >发布</a-button>
      </div>
    </div>
    <div class="design-cont">
      <!-- 组件 -->
      <div class="design-toolbar" :class="leftShow ? 'leftShow': 'leftHidden'">
        <comp-store
          :compData="compStore"
          class="compStore scroll-style"
          @moveDragend="moveDragend"
          @addPageComp="addPageComp"
        ></comp-store>
        <div class="arrow-handle arrow-left handle-left arrow-top" @click="leftShow = false">
          <a-icon type="left"/>
        </div>
      </div>
      <!-- 内容 -->
      <div class="design-screen">
        <div class="screen-list bg-white">
          <a-radio-group v-model="screen" @change="changeScreenType">
            <a-radio-button value="desktop">PC端设计</a-radio-button>
            <a-radio-button value="mobile">移动端设计</a-radio-button>
          </a-radio-group>
          <div
            class="arrow-handle arrow-right handle-mid-right"
            :class="leftShow ? 'mid-left-hidden': 'mid-left-show'"
            @click="leftShow = true"
          >
            <a-icon type="right"/>
          </div>
          <div
            class="arrow-handle arrow-left handle-mid-left"
            :class="rightShow ? 'mid-right-hidden': 'mid-right-show'"
            @click="rightShow = true"
          >
            <a-icon type="left"/>
          </div>
        </div>
        <!-- view -->
        <div class="design-iframe bg-white scroll-style" :class="{'mobile-width': screen === 'mobile'}">
          <website isDesigner="true" ref="website"></website>
          <!-- <iframe class="myframe" src="http://localhost:8001/#/website/cdaf602bc5fb9665dae64e6a9143e0bc/default?screen=mobile" frameborder="0"></iframe> -->
        </div>
      </div>
      <!-- 属性 -->
      <div class="design-attribute" :class="rightShow ? 'rightShow': 'rightHidden'">
        <classify :key="pageSelect" ref="classify"/>
        <div class="arrow-handle arrow-right handle-right arrow-top" @click="rightShow = false">
          <a-icon type="right"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getCompsInfor } from '@/common/utils';
import website from '@/website/pages/index.vue'; // 展示主要区域
import compStore from '@/website/components/comp_store'; // 组件配置
import operateModal from '@/designer/components/operateModal'; // 弹框
import theme from '@/designer/components/theme'; // 主题
import backAdmin from '@/designer/components/backAdmin'; // 回退按钮
import classify from '@/designer/components/classify'; // tabs切换

const webSite = namespace('webSite');

@Component({
  name: 'page-index',
  components: {
    website,
    compStore,
    operateModal,
    theme,
    backAdmin,
    classify
  }
})
export default class Pageindex extends Vue {
    // $router;
    $route;
    $message;
    $confirm;
    $refs: { website: HTMLFormElement, classify: HTMLFormElement, backAdmin: HTMLFormElement};
    pageSelect: string = ''; // 当前选择的page
    screen: string = 'desktop'; // 当前是pc还是移动
    leftShow: boolean = true; // 组件显示和隐藏
    rightShow: boolean = true; // 属性显示和隐藏

  @webSite.Getter('pageInfor')
  pageInfor;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  @webSite.Getter('compStore')
  compStore: Website.pageInfor;

  @webSite.Getter('global')
  global: Website.pageInfor;

  @webSite.Getter('currentApps')
  currentApps: Website.pageInfor;

  @webSite.Action('changePage')
  changePage;

  @webSite.Action('handleAppInfo') // 更改页面以及页面数据
  handleAppInfo;

  @webSite.Mutation('removePageInfor')
  removePageInfor: any;

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  get pageList() {
    let comps = Object.keys(this.appInfor);
    if (comps.length > 0 && !comps.includes(this.pageSelect)) {
      this.pageSelect = comps[0];
      this.handleChange(this.pageSelect)
    }
    return comps;
  }

  @Provide()
  showControl: any = this.showDrawer;

  @Provide()
  getCompsInfor: any = getCompsInfor;

  @Watch('$route', { immediate: true })
  routeChange() {
    this.pageSelect = this.$router.currentRoute.params.page;
    this.screen = this.$route.query.screen;
    this.changeScreenType();
  }

  // page变化
  handleChange(value) {
    this.screen = this.appInfor[value].screen === 'mobile' ? 'mobile' : 'desktop';
    let appID = this.$router.currentRoute.params.appID;

    this.$router.push({
      path: `/designer/${appID}/${value}`,
      query: {
        screen: this.appInfor[value].screen
      }
    });
    this.changePage({ page: value });
    this.changeScreenType();
  }

  // 点击添加后滚动条
  addPageComp() {
    let mywebsite = this.$refs.website;
    // 重置显示节点，新、旧节点 列 空列
    let scrollHeight = mywebsite.getScrollHeight();
    mywebsite.resetAll(scrollHeight);
  }

  // 展示control
  showDrawer(i, source, sourceParent) {
    let classify1 = this.$refs.classify;
    classify1.showDrawer(i, source, sourceParent);
    let mywebsite = this.$refs.website;
    mywebsite.showClickNum(i);
  }

  // 改变pc端或移动端
  changeScreenType() {
    let screen = this.screen;
    let appInfor = this.appInfor;
    if (Object.keys(appInfor).length > 0) {
      appInfor[this.pageSelect].screen = this.screen;
    }
    this.$router.push({
      query: {
        screen
      }
    })
  }

  // 全屏
  openfullscreen() {
    this.saveInfo().then(() => {
      let screen = this.screen;
      let appID = this.$router.currentRoute.params.appID;
      window.open(`#/website/${appID}/${this.pageSelect}?screen=${screen}`);
    })
  }

  // 拖动结束
  moveDragend() {
    let mywebsite = this.$refs.website;
    // 重置显示节点，新、旧节点 列 空列
    mywebsite.resetAll();
  }

  // 新增成功后跳到新页面
  creatOk() {
    this.pageSelect = this.pageList[this.pageList.length - 1];
    this.handleChange(this.pageSelect);
  }

  // 保存按钮
  saveInfo() {
    let appInfor = this.appInfor;
    let params = {
      page: appInfor,
      global: this.global
    };
    let appID = this.$router.currentRoute.params.appID;
    return new Promise((resolve, reject) => {
      this.handleAppInfo({
        url: '/page/pageconfig/' + appID,
        params
      }).then(res => {
        this.$message.success('保存成功！');
        let backAdmin = this.$refs.backAdmin;
        backAdmin.initOldPage();
        resolve();
      })
        .catch(rej => {
          this.$message.error('保存失败，请重新尝试');
          reject(new Error('error'));
        });
    });
  }
}
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>

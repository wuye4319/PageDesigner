<template>
  <component v-if="websiteShow" :is="name" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Model } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { getCompList } from '../service/index';
import wHandle from './handle.vue';
import wView from './view.vue'
import Tool from '@/common/utils/tools';

const util = new Tool();
const webSite = namespace('webSite');

@Component({
  name: 'website-index',
  components: {
    wHandle,
    wView
  }
})

export default class WebsiteIndex extends Vue {
  @webSite.Action('pageInfor')
  getPageInfor;

  @webSite.Action('compList')
  getCompList;

  @webSite.Action('pageActions') // 获取页面方法
  getPageActions;

  @webSite.Action('defaultActions') // 获取页面方法
  getDefaultActions;

  @webSite.Getter('appInfor')
  appInfor;

  websiteShow: boolean = false

  // 监听路由变化，请求页面的事件,由于预览页无法操作切换页面，所以必须监听路由变化
  @Watch('$route')
  handleRouterChange(to, from) {
    let page = to.params.page;
    let lastPage = from.params.page;
    let screen = this.appInfor[page].screen;
    let isMobile = screen === 'both' ? 2 : screen === 'desktop' ? 0 : 1;
    let userID = util.getCookie('userID');
    if (page !== lastPage) {
      let appID = this.$router.currentRoute.params.appID;
      this.getPageActions({ appID: appID, pageName: page });
      this.getCompList({ isMobile: isMobile, userID });
    }
  }

  async created() {
    let currentRoute = this.$router.currentRoute.params.page;
    let screen = this.$router.currentRoute.query.screen;
    let isMobile = screen === 'both' ? 2 : screen === 'desktop' ? 0 : 1;
    let appID = this.$router.currentRoute.params.appID;
    let userID = util.getCookie('userID');
    await this.getPageInfor({ appID: appID, page: currentRoute });
    await this.getPageActions({ appID: appID, pageName: currentRoute });
    await this.getDefaultActions({ appID: '0', pageName: '0' });
    await this.getCompList({ isMobile: isMobile, userID });
    this.websiteShow = true;
  }

  get name() {
    let view = this.$route.name === 'designer' ? wHandle : wView;
    return view
  }
}
</script>

<style lang='less' scoped>

</style>

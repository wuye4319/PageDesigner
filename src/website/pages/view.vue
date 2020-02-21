<template>
  <div :class="!global.paddingBottom?'page-container ':'page-container  bottomPadding'" :style="initStyle">
    <div
      class="component-view"
      v-for="(comp,i) in handlePageInfo"
      :key="i"
      :style="getFixed(comp)"
    >
      <component
        :style="comp.compInfo.boxOptions"
        class=" component-details "
        :is="comp.compFn"
        :compData="comp.compInfo"
        :compIndex="i"
        :trigFunc="triggerPageFunc"
        :ref="comp.compInfo.compAttr.uid?comp.compInfo.compAttr.uid:null"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Model, Mixins } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { getRGBColor } from '@/common/utils/math'; // 十六进制转换成RGB颜色
import commonMixin from '@/common/mixin';

const webSite = namespace('webSite');

@Component({
  name: 'website-view'
})

export default class WebsiteView extends Mixins(commonMixin) {
  pageEvent: any = null // 页面事件

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.State('Global')
  global;

  @webSite.Action('pageInfor')
  getPageInfor;

  @Inject('getCompsInfor') getCompsInfor

  // 获取当前view信息
  get handlePageInfo() {
    let routePageName = this.$route.params.page;
    let pageInfo: any = this.pageInfor;
    let compList = this.loadCompList(pageInfo);
    let newViewList = pageInfo.map((comp, i) => {
      let tempobj: object = {
        compInfo: comp, // 组件信息
        compFn: compList[i] // 组件view
      };
      return tempobj;
    });

    return newViewList;
  }

  get initStyle():object { // app样式对象
    if (Object.keys(this.global).length > 0) {
      let background = this.global.appStyle.background;
      let border = this.global.appStyle.border;
      let font = this.global.appStyle.font;
      return {
        width: background.width,
        height: background.height,
        background: `rgba(${getRGBColor(background.backgroundColor)},${background.backgroundOpacity}%)`,
        ...border,
        ...font
      };
    } else {
      return {}
    }
  }

  created() {
    this.initTheme();
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    let pageInfo = currentInfo['page-share'];
    this.pageEvent = pageInfo['event'];
    this.triggerPageFunc('created', this.pageEvent);
    console.log(this.$refs)
  }

  beforeDestroy() {
    this.triggerPageFunc('beforeDestroy', this.pageEvent);
  }

  // 自定义方法
  triggerPageFunc(type, model) {
    this.triggerFunc(this.$refs, type, model);
  }

  // 动态异步加载组件
  loadCompList(comps) {
    let compsInfor = this.getCompsInfor('website/components/', comps);
    return compsInfor;
  }

  // 初始化主题
  initTheme() {
    let themeObj:object = {
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
    }
    let theme = this.global.theme
    for (let name of Object.keys(theme)) {
      if (Array.isArray(theme[name])) {
        themeObj[name] = `rgba(${getRGBColor(theme[name][0])},${theme[name][1]}%)`;
      } else {
        themeObj[name] = theme[name];
      }
    }
    let win:any = window;
    win.less.modifyVars(theme);
  }
}
</script>

<style lang='less' scoped>
  @import url('./index.less');
</style>

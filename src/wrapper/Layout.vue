<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view></router-view>
    </a-locale-provider>
    <!-- <component :is="testComp"/> -->
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class';
import { Component, Vue, Provide } from 'vue-property-decorator';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import en_US from 'ant-design-vue/lib/locale-provider/en_US';
import { getCompsInfor } from '@/common/utils';
import { LocaleProvider } from 'ant-design-vue';

@Component({
  name: 'layout',
  components: {
    ALocaleProvider: LocaleProvider,
  }
})
export default class Layout extends Vue {
  locale: any = zhCN;

  @Provide()
  getCompsInfor: any = getCompsInfor;
  created() {
    // 动态加载及设置语言包
    this.$root.$on('$i18nLocale__', str => {
      /* import(`ant-design-vue/lib/locale-provider/${str}`).then(obj => {
        this.locale = obj.default;
      }); */
      if (str === 'en_US') {
        this.locale = en_US;
      } else {
        this.locale = zhCN
      }
    });
  }

  // get testComp() {
  //   return window.lib.default[0]
  // }
}
</script>

<style lang="less">
@import "../common/styles/base.less";
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

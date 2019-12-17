<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view></router-view>
    </a-locale-provider>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class';
import { Component, Vue, Provide } from 'vue-property-decorator';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
@Component({
  name: 'layout'
})
export default class Layout extends Vue {
  locale: any = zhCN;
}
</script>

<style lang="less">
@import '../common/styles/base.less';
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

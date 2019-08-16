<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class';
import { Component, Vue, Provide } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
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

<template>
  <div class="screen">
    <div class="box create-mobile-app" @click="createApp('mobile')">
      创建移动APP
    </div>
    <div class="box create-web-app" @click="createApp('desktop')">
      创建web端APP
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const app = namespace('app');

@Component({
  name: 'screen-component'
})

export default class screenComponent extends Vue {
  $router

  createApp(screen):void {
    this.$router.push({
      path: '/designer/product',
      query: {
        screen
      }
    })
  }
}
</script>

<style lang='less' scoped>
.screen {
  display: flex;
  justify-content: space-around;
  .box {
    border: 1px solid #ddd;
    width: 30%;
    height: 260px;
    text-align: center;
    line-height: 260px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>

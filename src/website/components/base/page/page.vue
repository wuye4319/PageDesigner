<template>
  <div class="pageBox">
    <p :style="pageData">{{ pageData.cont }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'page-component'
})

export default class PageComponent extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  created():void {

  }
}
</script>

<style lang="less" scoped>
.pageBox{
  p{
    white-space: wrap;
  }
}
</style>

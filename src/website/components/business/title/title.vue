<template>
  <div class="title-view">
    <div class="title" :style="mystyle">{{pageData.cont}}</div>
    <div class="more" v-if="pageData.showMore" :style="{'line-height': pageData.height}">更多<a-icon type="right" /></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'title-view'
})

export default class TitleView extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  get mystyle() {
    let obj = {
      ...this.pageData,
      'line-height':this.pageData.height,
      'text-align': this.pageData.align
    }
    return obj
  }

  created():void {

  }
}
</script>

<style lang="less" scoped>
.title-view{
  padding: 0 20px 0 20px;
  width: 100%;
  display: flex;
  .title {
    flex: 1;
  }
}
</style>

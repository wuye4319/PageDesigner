<template>
  <div class="title-view">
    <div class="title" :style="pageData">{{ pageData.cont }}</div>
    <div
      class="more"
      v-if="pageData.showMore"
    >更多<a-icon type="right"/></div>
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

  created():void {

  }
}
</script>

<style lang="less" scoped>
.title-view{
  padding: 0 20px 0 20px;
  width: 100%;
  display: flex;
  align-items: center;
  .title {
    flex: 1;
  }
}
</style>

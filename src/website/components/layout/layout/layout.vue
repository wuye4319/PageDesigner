<template>
  <component
    :is="view"
    :compData="compData"
    :compIndex="compIndex"
    :trigFunc="trigFunc"
    :layoutUidOut="layoutUidOut"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Model } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import wHandle from './handle.vue';
import wView from './view.vue'

const webSite = namespace('webSite');

@Component({
  name: 'layout-index',
  components: {
    wHandle,
    wView
  }
})

export default class LayoutIndex extends Vue {
  @Prop() compData: any // 属性
  @Prop() compIndex: any // 标识
  @Prop() trigFunc: any; // 方法
  @Prop() layoutUidOut: string; // 外层uid

  pageData: any = this.compData

  get view() {
    let view = this.$route.name === 'designer' ? wHandle : wView;
    return view
  }
}
</script>

<style lang='less' scoped>

</style>

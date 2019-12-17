<template>
  <div class="datacomp">
    <component :is="dataCompComponent" :compData="compData" :compIndex="compIndex" :compsDataParent="compsDataParent" :datacompStatus="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Model } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

@Component({
  name: 'datacomp'
})

export default class DataComp extends Vue {
  @Prop() compData
  @Prop() compIndex
  @Prop() compsDataParent

  currCompsData = this.compData

  get dataCompComponent() {
    let compName = this.currCompsData.compName;
    let type = this.currCompsData.type;
    let comp = () => import(/* webpackChunkName: "[request]" */ `@/website/components/${type}/${compName}/control/index.ts`)
    return comp
  }
}
</script>

<style lang='less' scoped>

</style>

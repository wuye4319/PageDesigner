<template>
  <div class="datacomp">
    <component
      :is="dataCompComponent"
      :compData="compData"
      :compIndex="compIndex"
      :compsDataParent="compsDataParent"
      :datacompStatus="true"/>
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

  @Inject('getCompsInfor') getCompsInfor;

  currCompsData = this.compData
  dataCompComponent: any = null;

  created() {
    this.dataCompComponent = this.getCompsInfor(
      `website/components/`,
      this.currCompsData,
      true
    )
  }
}
</script>

<style lang='less' scoped>

</style>

<template>
  <div class="progress-ant">
    <a-progress v-bind="pageData"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'progress-ant'
})

export default class progressAntView extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  created():void {

  }
}
</script>

<style lang="less" scoped>

</style>

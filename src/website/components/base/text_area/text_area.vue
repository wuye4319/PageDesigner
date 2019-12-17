<template>
  <a-textarea
    v-bind="pageData"
    v-model="pageData.value"
    :style="pageData"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'text-area'
})

export default class textAreaView extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  created():void {

  }
}
</script>

<style lang="less" scoped>

</style>

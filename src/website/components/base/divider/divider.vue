<template>
  <a-divider class="divider-color" ref="divider" :dashed="pageData.dashed === 'dashed'" v-bind="orientation">
    {{ pageData.cont }}
  </a-divider>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'divider-view'
})

export default class DividerView extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  get orientation() {
    let obj = {};
    if (this.pageData.orientation !== 'center') {
      Object.assign(obj, { orientation: this.pageData.orientation })
    }
    return obj
  }

  created():void {

  }
}
</script>

<style lang="less" scoped>
.divider-color {
  &::before {
    border-top-color: #000000;
  }
}
</style>

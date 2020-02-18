
<template>
  <div>Done</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
const webSite = namespace('webSite');
@Component({
  name: 'Donectrl-component'
})
export default class tablectrlComponent extends Vue {
  @Prop() compData: any;
  compAttr: any = this.compData.compAttr;
}
</script>
<style lang='less' scoped>
</style>

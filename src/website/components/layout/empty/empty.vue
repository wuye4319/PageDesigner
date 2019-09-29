<template>
  <div class="empty-view">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

@Component({
  name: 'empty-view'
})

export default class EmptyView extends Vue {

}
</script>

<style lang='less' scoped>
  .empty-view {
    width: 100%;
    height: 50px;
    border: 1px solid #000;
  }
</style>

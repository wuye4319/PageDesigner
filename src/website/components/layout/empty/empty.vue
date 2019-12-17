<template>
  <div class="empty-view">
    <span v-if="$route.name === 'designer'">拖动组件到此空白区域</span>
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

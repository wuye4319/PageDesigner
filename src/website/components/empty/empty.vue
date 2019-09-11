<template>
  <div class="empty">
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

@Component({
  name: 'empty'
})

export default class EmptyView extends Vue {
  
}
</script>

<style lang='less' scoped>
  .empty {
    width: 100%;
    height: 50px;
    background: red;
  }
</style>
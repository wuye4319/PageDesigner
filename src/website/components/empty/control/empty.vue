<template>
  <div class="empty-component">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'empty-component'
})
export default class EmptyComponent extends Vue {
  
}
</script>

<style lang="less" scoped>
</style>

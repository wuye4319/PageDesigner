<template>
  <div class="test">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Provide, Inject, Model } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

@Component({
  name: 'test'
})

export default class test extends Vue {

}
</script>

<style lang='less' scoped>

</style>

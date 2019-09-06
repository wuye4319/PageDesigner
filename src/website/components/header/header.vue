<template>
  <div>
    header view
    <button @click="testClick">123</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'header-component',
  components: {}
})
export default class headerComponent extends Vue {
  test: object = {}
  created() { }

  mounted() {
  }

  testClick() {
    Vue.set(this.test, 'test', '13')
    console.log(this.test)
  }
}
</script>
<style lang='less' scoped>
</style>

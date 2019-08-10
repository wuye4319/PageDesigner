<template>
  <div>header control</div>
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
  created() { }

  mounted() {
  }
}
</script>
<style lang='less' scoped>
</style>

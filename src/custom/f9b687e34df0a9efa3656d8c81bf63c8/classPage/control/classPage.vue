<template>
  <div>classPage</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'classPage-component',
  components: {}
})
export default class classPageComponent extends Vue {
  created() { }

  mounted() { }
}
</script>
<style lang='less' scoped>
</style>

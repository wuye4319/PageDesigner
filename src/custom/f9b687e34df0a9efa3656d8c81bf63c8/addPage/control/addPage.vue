<template>
  <div>addPage</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'addPage-component',
  components: {}
})
export default class addPageComponent extends Vue {
  created() { }

  mounted() { }
}
</script>
<style lang='less' scoped>
</style>

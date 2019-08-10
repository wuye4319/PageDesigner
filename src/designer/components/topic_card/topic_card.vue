<template>
  <div>topic card control</div>
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

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  mounted() {
    console.log(this.pageInfor)
  }
}
</script>
<style lang='less' scoped>
</style>

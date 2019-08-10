<template>
  <div>
    <div>
      <label>主标题：</label>
      <input type="text" v-model="mainTitle">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'recommon-component',
  components: {}
})
export default class recommonComponent extends Vue {
  @Prop() pageData: any
  mainTitle: string = ''

  created() { }

  mounted() {
    this.mainTitle = this.pageData.mainTitle
    console.log(this.pageData)
  }
}
</script>
<style lang='less' scoped>
</style>

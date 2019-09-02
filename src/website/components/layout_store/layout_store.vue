<template>
  <div class="complist">
    <div
      v-for="(comp,i) in compData"
      :key="i"
      @click="addComp(comp)"
    >{{ comp.compName }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'comp-store-component',
  components: {}
})
export default class compStoreComponent extends Vue {
  @Prop() compData: Array<object>

  @webSite.Mutation('addPageInfor')
  addPageInfor: any

  created() {
  }

  mounted() {
  }

  addComp(comp: object) {
    this.addPageInfor(comp)
  }
}
</script>
<style lang='less' scoped>
.complist {
  > div {
    width: 46%;
    display: inline-block;
    text-align: center;
    padding: 10px 0;
    border: 1px solid #ddd;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div class="rate">
    <a-rate v-model="pageData.value" v-bind="pageData"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Rate } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'rate',
  components: {
    ARate: Rate
  }
})

export default class rateView extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  created():void {

  }
}
</script>

<style lang="less" scoped>

</style>

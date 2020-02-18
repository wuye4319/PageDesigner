<template>
  <div class="progress-ant">
    <a-progress v-bind="pageData"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Progress } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'progress-ant',
  components: {
    AProgress: Progress,
  }
})

export default class progressAntView extends Vue {
  @Prop() compData: any
@Prop() trigFunc: any;
  pageData:any = this.compData.compAttr

  created():void {
    this.trigFunc('created', this.compData.actionModel);
  }
  mounted() {
    this.trigFunc('mounted', this.compData.actionModel);
  }
  updateProgress(num:number) {
    this.pageData.percent = num;
  }
  updateStatus(str:string) {
    this.pageData.status = str;
  }
}
</script>

<style lang="less" scoped>

</style>

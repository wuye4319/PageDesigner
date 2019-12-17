<template>
  <div class="grid-control">
    <p>栅格样式</p>
    <div class="gridStyle">
      <a-button style="width: 25%;padding: 0;" @click="changeVal([12,12])">12:12</a-button>
      <a-button style="width: 25%;padding: 0;" @click="changeVal([8,16])">8:16</a-button>
      <a-button style="width: 25%;padding: 0;" @click="changeVal([16,8])">16:8</a-button>
      <a-button style="width: 25%;padding: 0;" @click="changeVal([6,6,6,6])">6:6:6:6</a-button>
      <a-button style="width: 25%;padding: 0;" @click="changeVal([8,8,8])">8:8:8</a-button>
      <a-button style="width: 25%;padding: 0;" @click="changeVal([4,8,4,8])">4:8:4:8</a-button>
      <a-button style="width: 25%;padding: 0;" @click="changeVal([6,12,6])">6:12:6</a-button>
      <a-button style="width: 25%;padding: 0;" @click="changeVal([4,4,4,4,4,4])">4:4:4:4:4:4</a-button>
      <!-- <a-collapse accordion>
        <a-collapse-panel header="分栏样式" style="padding: 0;">
        </a-collapse-panel>
      </a-collapse> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'grid-component',
  components: {}
})
export default class GridComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: number;
  compAttr = this.compData.compAttr;

  column: number;
  row: number;
  gridCol: any;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created() {
    for (let key of Object.keys(this.compData.compAttr)) {
      this[key] = this.compData.compAttr[key];
    }
  }

  changeVal(arr) {
    this.compAttr.col = arr;
    this.editPageInfor({ index: this.compIndex, data: this.compAttr });
  }
}
</script>
<style lang='less' scoped>
.grid-control {
  /deep/.ant-collapse-content-box{
    padding: 0;
  }
  /deep/.ant-btn{
    font-size: 12px;
  }
}
</style>

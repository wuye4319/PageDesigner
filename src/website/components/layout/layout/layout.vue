<template>
  <div class="layout">
    <div class="column" v-for="(view,i) in compArray" :key="'array'+i" @click="layoutClick(i)">
      <div
        v-if="typeof(view)==='function'"
        :is="view"
        :compData="currCompsData(i)"
        :compIndex="i"
        :compList="loadCompList"
      ></div>
      <div v-else-if="typeof(view)==='number'">{{ view }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch , Emit} from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'layout-component',
  components: {}
})
export default class layoutComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number
  @Prop() compList: any
  compInfor: any = []
  compAttr: any = this.compData.compAttr

  @Emit('layoutColumn') emitClick(c: number){};

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  created() {
  }

  mounted() {
    this.compInfor = this.compList(this.compAttr.childList)
  }

  // 将1维数组改变为多维数据进行渲染
  get compArray() {
    let compArrayBox = []
    if (this.compInfor) {
      for (let i = 0; i < this.compAttr.number; i++) {
        if (this.compInfor[i]) {
          compArrayBox.push(this.compInfor[i])
        } else {
          compArrayBox.push({compAttr: {}, compName: 'empty'})
        }
      }
      return compArrayBox
    }
  }

  layoutClick(i) {
    this.emitClick(i)
  }

  loadCompList(comps) {
    return this.compList(comps)
  }

  currCompsData(i) {
    return this.compAttr.childList[i]
  }
}
</script>
<style lang='less' scoped>
.layout {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .column {
    flex-grow: 1;
    border: 1px solid #ddd;
    min-height: 60px;
    width: 100%;
  }
}
</style>

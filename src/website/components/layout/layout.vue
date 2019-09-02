<template>
  <div class="layout">
    <div class="row" v-for="(array,i) in compArray" :key="'array'+i">
      <div class="column" v-for="(view,j) in array" :key="'viewComp'+j">
        <div
          v-if="typeof(view)==='function'"
          :is="view"
          :compData="currCompsData(i)"
          :compIndex="i"
        ></div>
        <div v-if="typeof(view)==='number'">{{view}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
  compAttr: any = this.compData.compAttr
  compCount: number = this.compAttr.column * this.compAttr.row

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  created() {
  }

  mounted() {
    this.$emit('loadCompList', this.compAttr.childList)
  }

  // 将1维数组改变为多维数据进行渲染
  get compArray() {
    let compArrayBox = []
    if (this.compList.length) {
      for (let i = 0; i < this.compAttr.row; i++) {
        let temp = []
        for (let j = 0; j < this.compAttr.column; j++) {
          let index = i * (this.compAttr.column) + j
          if (this.compList[index]) {
            temp.push(this.compList[index])
          } else {
            temp.push(index)
          }
        }
        compArrayBox.push(temp)
      }
      return compArrayBox
    }
  }

  currCompsData(i) {
    return this.compAttr.childList[i]
  }

  // state改变的时候，更新视图
  @Watch('compData')
  viewCompList(val) {
    this.$emit('loadCompList', this.compAttr.childList)
  }
}
</script>
<style lang='less' scoped>
.layout {
  .row {
    display: flex;
    justify-content: space-between;
  }
  .column {
    flex-grow: 1;
    border: 1px solid #ddd;
    min-height: 60px;
    width: 100%;
  }
}
</style>

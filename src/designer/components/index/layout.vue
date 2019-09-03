<template>
  <div class="layout">
    <div class="design-comp-sort">
      <div class="row" v-for="row in compAttr.row" :key="row">
        <div class="cols" v-for="col in compAttr.column" :key="col+'-'+row">
          <p>{{ col }}</p>
          <p class="design-addcomps" @click="showDrawer">
            <a-icon type="plus"/>
          </p>
        </div>
      </div>
    </div>
    <template>
      <a-drawer
        title="Basic Drawer"
        placement="left"
        :closable="false"
        @close="onClose"
        :mask="false"
        width="299"
        :wrapStyle="{position:'absolute'}"
        getContainer=".design-componet-list"
        :visible="visible"
      >
        <d-store :compData="currCompsData" :compIndex="compIndex"></d-store>
        <a-button style="marginRight: 8px" @click="onClose">Cancel</a-button>
      </a-drawer>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import store from '@/website/components/layout_store'

const webSite = namespace('webSite');

@Component({
  name: 'layout-component',
  components: {
    DStore: store
  }
})
export default class layoutComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number
  @Prop() compList: any
  compAttr: any = this.compData.compAttr
  compCount: number = this.compAttr.column * this.compAttr.row
  visible: boolean = false
  currCompsData: object = {}

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Getter('layoutStore')
  layoutStore: Website.pageInfor

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

  getCurrCompsData(i) {
    return this.compAttr.childList[i]
  }

  showDrawer() {
    this.visible = true
    this.currCompsData = this.layoutStore
  }

  onClose() {
    this.visible = false
  }

  // state改变的时候，更新视图
  @Watch('compData')
  viewCompList(val) {
    this.$emit('loadCompList', this.compAttr.childList)
  }
}
</script>
<style lang='less' scoped>
.design-comp-sort {
  position: relative;
  .cols {
    flex-grow: 1;
    border: 1px solid #ddd;
    min-height: 40px;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
}
</style>

<template>
  <div class="layout">
    <div class="row" v-for="(array,i) in compArray" :key="'array'+i">
      <div class="column" v-for="(view,j) in array" :key="'viewComp'+j">
        <div>{{view}}</div>
        <p class="design-addcomps" @click="showDrawer">
          <a-icon type="plus"/>
        </p>
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

  compAttr: any = this.compData.compAttr
  compList: any = this.compAttr.childList

  compCount: number = this.compAttr.column * this.compAttr.row
  visible: boolean = false
  currCompsData: object = {}

  @webSite.Getter('layoutStore')
  layoutStore: Website.pageInfor

  created() {
  }

  mounted() {
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
            temp.push(this.compList[index].compName)
          } else {
            temp.push(index)
          }
        }
        compArrayBox.push(temp)
      }
      return compArrayBox
    }
  }

  showDrawer() {
    this.visible = true
    this.currCompsData = this.layoutStore
  }

  onClose() {
    this.visible = false
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
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    min-height: 60px;
    width: 100%;
  }
}
</style>

<template>
  <div>
    <div class="cols">
      <span>列数：</span>
      <a-slider
        id="test"
        :min="1"
        :max="5"
        v-model="column"
        :defaultValue="this.compData.compAttr.column"
        @change="changeVal('column')"
      />
    </div>
    <div class="cols">
      <span>行数：</span>
      <a-slider
        id="test"
        :min="1"
        :max="5"
        v-model="row"
        :defaultValue="this.compData.compAttr.row"
        @change="changeVal('row')"
      />
    </div>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
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
  compAttr = this.compData.compAttr

  column: number
  row: number
  visible: boolean = false
  currCompsData: object = {}

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  @webSite.Getter('layoutStore')
  layoutStore: Website.pageInfor

  created() {
    for (let key of Object.keys(this.compData.compAttr)) {
      this[key] = this.compData.compAttr[key];
    }
  }

  mounted() {
  }

  changeVal(name) {
    this.compData.compAttr[name] = this[name];
    this.editPageInfor({ index: this.compIndex, data: this.compData.compAttr });
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

<template>
  <div class="nav-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">列数:</div>
        </a-list-item-meta>
        <a-slider
          style="width:100%"
          :marks="columnMarks"
          v-model="column"
          :step="null"
          @change="changeVal('column')"
          :max="6"
          :min="1"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">行数:</div>
        </a-list-item-meta>
        <a-slider
          style="width:100%"
          :marks="rowMarks"
          v-model="row"
          @change="changeVal('row')"
          :max="6"
          :min="1"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">间隔(px):</div>
        </a-list-item-meta>
        <a-slider
          style="width:100%"
          v-model="gutter"
          @change="changeVal('gutter')"
          :max="50"
          :min="0"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">宽度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="width"
          @blur="changeVal('width')"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

const columnMarks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  6: '6'
}
const rowMarks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6'
}

@Component({
  name: 'nav-component'
})
export default class navComponent extends Vue {
  @Prop()
  compData: any
  @Prop()
  compIndex: number

  column:number = 1
  gutter:number = 1
  row:number = 1
  width:string = ''
  columnMarks:object = columnMarks
  rowMarks:object = rowMarks
  pageData:any = this.compData

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
    this.editPageInfor({
      data: this.pageData.compAttr,
      index: this.compIndex });
  }
}
</script>

<style lang="less" scoped>
.modal-name {
  width: 100px;
  display: flex;
  align-items: center;
}
</style>

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
      <!-- <a-list-item>
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
      </a-list-item> -->

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">高度(行):</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="rowHeight"
          @blur="changeVal('rowHeight')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">外边框:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('showBorder')"
          v-model="showBorder"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">并排显示:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('lineRow')"
          v-model="lineRow"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Slider, Input, Switch } from 'ant-design-vue';
const webSite = namespace('webSite');

const columnMarks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  6: '6'
};
const rowMarks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6'
};

@Component({
  name: 'nav-component',
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    ASlider: Slider,
    AInput: Input,
    ASwitch: Switch
  }
})
export default class navComponent extends Vue {
  @Prop()
  compData: any
  @Prop()
  compIndex: number

  column:number = 1
  // gutter:number = 1
  row:number = 1
  rowHeight:string = ''
  showBorder:boolean = false
  lineRow:boolean = false
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

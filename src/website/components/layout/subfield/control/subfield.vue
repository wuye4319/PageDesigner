<template>
  <div class="subfield-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">分栏样式:</div>
        </a-list-item-meta>
      </a-list-item>

      <a-list-item>
        <a-radio-group v-model="initData.typeVal" @change="changeVal('typeVal')" class="type-radio">
          <a-radio-button value="1:1">12:12</a-radio-button>
          <a-radio-button value="1:2">8:16</a-radio-button>
          <a-radio-button value="2:1">16:8</a-radio-button>
          <a-radio-button value="1:1:1">8:8:8</a-radio-button>
          <a-radio-button value="1:2:1">6:12:6</a-radio-button>
          <a-radio-button value="1:1:1:1">6:6:6:6</a-radio-button>
          <a-radio-button value="1:3:1:3">4:12:4:12</a-radio-button>
        </a-radio-group>
      </a-list-item>

    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { log } from 'util';

const webSite = namespace('webSite');

interface ProgressData {
  typeVal:string
  inner:any[]
}

@Component({
  name: 'subfield-component'
})
export default class SubfieldComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: Array<number>

  initData:ProgressData = {
    typeVal: '', // 基本样式
    inner: []
  }
  pageData: any = this.compData

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  @webSite.Mutation('changePageInforRow')
  changePageInforRow;

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    let arr = this.initData.typeVal.split(':');
    let length = arr.length;
    let res = Array.from({ length }, () => ({compAttr: {}, compName: 'empty'}));
    arr.unshift('1');
    this.pageData.compAttr.type = arr;
    this.pageData.compAttr.typeVal = this.initData.typeVal;
    res.unshift(this.pageData);
    this.editPageInfor({ index: this.compIndex, data: this.pageData.compAttr });
  }
}
</script>

<style lang="less" scoped>
.type-radio{
  text-align: left;
}
</style>

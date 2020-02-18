
<template>
  <div class="compAttr">
    <div class="title">列表设置:</div>
    <a-list itemLayout="horizontal" size="small">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">播放器位置:</div>
        </a-list-item-meta>
        <a-select
          style="width:100%"
          size="small"
          :defaultValue="selec"
          @change="userSelec">
          <a-select-option v-for="i in postionList" :key="i.key">
            {{ i.title }}
          </a-select-option>
        </a-select>
      </a-list-item>
      <a-list-item>
        <a-input v-model="input" @change="inputChange"></a-input>
      </a-list-item>
    </a-list>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Select } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'listctrl-component',
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option
  }
})
export default class tablectrlComponent extends Vue {
  @Prop() compData: any;
  postionList: any[] = [
    { key: 'bottom', title: '距底部' },
    { key: 'top', title: '距顶部' }
  ];
  selec: string = 'bottom';
  input: string = '25px';
  created(): void {
    let obj = this.compData.compAttr.postionAttr;
    if (!obj[this.selec]) {
      this.selec = 'top';
    }
    this.input = obj[this.selec];
  }
  userSelec(data) {
    let obj = {};
    this.selec = data;
    obj[this.selec] = this.input;
    this.compData.compAttr.postionAttr = obj;
  }
  inputChange(input) {
    let obj = {};
    obj[this.selec] = this.input;
    this.compData.compAttr.postionAttr = obj;
  }
}
</script>
<style lang='less' scoped>
.compAttr {
  font-size: 12px;
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.5;
  }
}
.title {
  font-weight: bolder;
}
/deep/ .ant-table-thead div {
  white-space: nowrap;
}
.input-width {
  width: 100px;
}
.selec-width {
  width: 80px;
}
.input-width2 {
  width: 50px;
}
</style>

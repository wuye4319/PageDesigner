
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
          :defaultValue="selec"
          @change="userSelec">
          <a-select-option v-for="i in postionList" :key="i.key">
            {{ i.title }}
          </a-select-option>
        </a-select>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description"></div>
        </a-list-item-meta>
        <a-input
          type="number"
          style="width:45%;margin-right:5%"
          v-model="input"
          @change="inputChange"></a-input>
        <a-select
          style="width:50%"
          v-model="unit"
          @change="uuu">
          <a-select-option v-for="i in unitList" :key="i.key">
            {{ i.key }}
          </a-select-option>
        </a-select>
      </a-list-item>
    </a-list>
    <api-user-tip :apiList="apiList"></api-user-tip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Select } from 'ant-design-vue';
import { apiUserTip } from '@/website/components/common'; // 线设置
const webSite = namespace('webSite');

@Component({
  name: 'listctrl-component',
  components: {
    apiUserTip,
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
  apiList:any[]=[
    { dsc: '// 根据数据绑定的条件更新列表 key为需要查询的字段', api: ' updatedList(filters:{key:string, value:any})' },
    { dsc: '// 直接更新数据列表，适用于已得到数据的情况', api: 'updatedData(data:{imgUrl: string,title: string,dsc:string,times: number,total: number,url: string,audioUrl: string}[])' }
  ]
  unitList: any[] = [{ key: 'px' }];
  selec: string = 'bottom';
  input: number = 25;
  unit: string = 'px';
  created(): void {
    let obj = this.compData.compAttr.postionAttr;
    if (!obj[this.selec]) {
      this.selec = 'top';
    }
    this.input = parseFloat(obj[this.selec]);
  }
  userSelec(data) {
    let obj = {};
    this.selec = data;
    obj[this.selec] = this.input + this.unit;
    this.compData.compAttr.postionAttr = obj;
  }
  uuu() {
    this.userSelec(this.selec);
  }
  inputChange(input) {
    let obj = {};
    obj[this.selec] = this.input + this.unit;
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
  /deep/.ant-list-split .ant-list-item {
    border: none;
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

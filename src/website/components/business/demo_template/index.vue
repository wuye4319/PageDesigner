
<template>
  <div>
    <div>我是示例</div>
    <div>绑定的数据1：{{ defaultData }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
/* 数据绑定，混入该Mixins会有四个字段可用
listData（绑定数据后返回处理过后的数据），
apiData(请求拿到的数据，会自动处理成对应的listData)，
defaultData（listData的默认值），
getListDataFn（请求拿数据函数需要自已实现，与apiData配合） */
import listind from '@/common/mixin/listbind.ts';
import { getTableContent } from '@/website/service';

@Component({
  name: 'demo-component',
  components: {}
})
export default class tableComponent extends Mixins(listind) {
  @Prop() compData: any; // 必须的
  compAttr: any = this.compData.compAttr;
  defaultData: any[] = [
    {
      data: '我是默认数据'
    }
  ];
  getListDataFn = this.getListData;
  params: any = {};

  created() {
    let that = this;

    function set(key, obj) {
      if (!that.compAttr[key]) {
        that.$set(that.compAttr, key, obj);
      }
    }
    if (this.compData.dataModel.mapData.length === 0) {
      this.compData.dataModel.mapData = [
        {
          desc: '数据',
          key: 'data',
          tableMap: ''
        }
      ];
    }
  }
  // 请求数据实现样例
  async getListData(tableName, params) {
    Object.assign(this.params, params);
    for (let k of Object.keys(this.params)) {
      if (!this.params[k]) {
        delete this.params[k];
      }
    }
    if (tableName) {
      let res = await getTableContent(tableName, this.params);
      this.dataSource = 'apiData';
      this.apiData = res.data || [];
    }
  }
}
</script>
<style lang='less' scoped>
</style>

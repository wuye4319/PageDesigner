
<template>
  <div class="myList">
    <!-- {{ this.defaultData }} -->
    <a-list itemLayout="horizontal" :dataSource="listData">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item.cont">
          <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getTableContent } from '@/website/service';
import listbind from '@/common/mixin/listbind';
import { List } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'list-view',
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta
  }
})
export default class ListView extends Mixins(listbind) {
  @Prop() compData;
  @Prop() trigFunc: any; // 动作绑定

  @webSite.Getter('tables')
  tables;

  $store;
  compAttr: any = this.compData.compAttr;
  dataModel: any = this.compData.dataModel;
  mapData: any = this.compData.dataModel.mapData;
  apiData: object[] = []; // 接口返回数据
  tableName: string = '' // 表名称
  classifyParams: object = {} // 分类参数
  sortParams: object = {} // 排序参数
  params: object = {}; // 排序和分类合并参数
  getListDataFn = this.getListData; // 触发的方法

  defaultData = [
    {
      title: 'Ant Design Title 1',
      cont: 'Ant Design Description 1'
    },
    {
      title: 'Ant Design Title 2',
      cont: 'Ant Design Description 2'
    },
    {
      title: 'Ant Design Title 3',
      cont: 'Ant Design Description 3'
    }
  ];

  created() {
    this.trigFunc('created', this.compData.actionModel);
  }

  mounted() {
    this.trigFunc('mounted', this.compData.actionModel);
  }

  //更新排序
  async updateOrder() {
    let params = Object.assign({},this.classifyParams)
    for (let k of Object.keys(params)) {
      if (!params[k]) {
        delete params[k];
      }
    }
    let arr = [];
    if (this.tableName) {
      let res = await getTableContent(this.tableName, params);
      arr = res.data || [];
    }
    return arr
  }

  //更新分类
  async updateFilter() {
    let params = Object.assign({},this.sortParams)
    for (let k of Object.keys(params)) {
      if (!params[k]) {
        delete params[k];
      }
    }
    let arr = [];
    if (this.tableName) {
      let res = await getTableContent(this.tableName, params);
      arr = res.data || [];
    }
    return arr
  }

  async getListData(tableName, params, type) {
    Object.assign(this.params, params);
    this[`${type}Params`] = params;
    this.tableName = tableName;
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
.myList {
  width: 100%;
  background: white;
  /deep/.ant-list-item-meta {
    text-align: left;
    padding-left: 20px;
  }
}
</style>

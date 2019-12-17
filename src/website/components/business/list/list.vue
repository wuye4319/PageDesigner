
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
// import mix from '@/common/mixin/modeMixins';
const webSite = namespace('webSite');

@Component({
  name: 'list-view',
  components: {},
  // mixins: [mix]
})
export default class ListView extends Vue {
  @Prop() compData;

  @webSite.Getter('tables')
  tables;

  $store;
  compAttr: any = this.compData.compAttr;
  dataModel: any = this.compData.dataModel;
  mapData: any = this.compData.dataModel.mapData;
  apiData: object[] = [];
  params: object = {};

  data = [
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
    },
    {
      title: 'Ant Design Title 4',
      cont: 'Ant Design Description 4'
    }
  ];

  get tableData() {
    let index = this.tables.findIndex(item => {
      return item.tableName === this.dataModel.tableName;
    });
    let data = [];
    if (index > -1) {
      data = this.tables[index].content;
    }
    return data;
  }

  get mylist() {
    let arr = [];
    if (this.apiData.length > 0) {
      arr = this.apiData;
    } else {
      arr = this.tableData;
    }
    return arr;
  }

  get listData() {
    let obj = {};
    this.mapData.forEach(item => {
      obj[item.key] = item.tableMap;
    });
    let listData = this.mylist.map((item, i) => {
      let dataObj = {};
      for (let k in obj) {
        dataObj[k] = item[obj[k]];
      }
      return dataObj;
    });
    if (listData.length === 0) {
      listData = this.data;
    }
    return listData;
  }

  @Watch('dataModel.tableName')
  tableNameChange(newVal) {
    let eventName = `${this.compAttr.uid}-tableName`;
    this.$store.$emit(eventName, newVal);
  }

  created() {
    let uid = this.genID(15);
    this.compAttr['uid'] = this.compAttr['uid'] ? this.compAttr['uid'] : `${uid}`;
    // 绑定列表分类排序 查询事件
    this.$store.on(`${this.compAttr.uid}-${this.compData.compName}`, this.getListData);
  }

  mounted() {}

  async getListData(tableName, params) {
    Object.assign(this.params, params);
    for (let k of Object.keys(this.params)) {
      if (!this.params[k]) {
        delete this.params[k]
      }
    }
    if (tableName) {
      let res = await getTableContent(tableName, this.params);
      this.apiData = res.data;
    }
  }

  // 创建唯一id
  genID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
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

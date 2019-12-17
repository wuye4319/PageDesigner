
<template>
  <div class="myTable">
    <a-table :rowKey="setKey" :columns="tableColumns" :dataSource="listData" :scroll="compAttr.tableAttr.scroll" :bordered="compAttr.tableAttr.bordered" :loading="compAttr.tableAttr.loading" :pagination="pagination" :size="compAttr.tableAttr.size" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { parse } from 'path';
import databind from '@/common/mixin/databind.ts';
const webSite = namespace('webSite');

@Component({
  name: 'table-component',
  components: {},
  mixins: [databind]
})
export default class tableComponent extends Vue {
  @Prop() compData: any;
  compAttr: any = this.compData.compAttr;
  pagination: any = {
    pageSize: 10,
    /* showQuickJumper: true, */
    showSizeChanger: true,
    hideOnSinglePage: true,
    showTotal: function(all) {
      return `总共 ${all} 条`;
    },
    pageSizeOptions: ['6', '10', '15', '20', '30']
  };
  // 为了解决ant design警告
  setKey(re, n) {
    return 'key' + n;
  }
  created() {
    let that = this;
    function set(key, obj) {
      if (!that.compAttr[key]) {
        that.$set(that.compAttr, key, obj);
      }
    }
    let tableAttr = {
      bordered: false,
      loading: false,
      scroll: { x: false },
      size: 'default'
    };
    let tableColumns = [
      {
        align: 'left',
        dataIndex: '0',
        fixed: '',
        key: '0',
        title: '表头一',
        width: '',
        sorter: false
      },
      {
        align: 'left',
        dataIndex: '1',
        fixed: '',
        key: '1',
        title: '表头二',
        width: '',
        sorter: false
      },
      {
        align: 'left',
        dataIndex: '2',
        fixed: '',
        key: '2',
        title: '表头三',
        width: '',
        sorter: false
      }
    ];
    set('tableAttr', tableAttr);
    set('tableColumns', tableColumns);
  }
  get tableColumns() {
    let setArr = [];
    let mapData = this.compData.dataModel.mapData;
    this.compAttr.tableColumns.forEach((arr, i) => {
      let n = mapData.length;
      let pushData = {
        desc: arr.title,
        key: arr.key,
        tableMap: ''
      };
      for (let l = 0; l < n; l++) {
        if (arr.key === mapData[l].key) {
          pushData = mapData[l];
          break;
        }
      }
      setArr.push(pushData);
    });
    this.compData.dataModel.mapData = setArr;
    return this.compAttr.tableColumns;
  };
}
</script>
<style lang='less' scoped>
.myTable {
  width: 100%;
}
/deep/ .ant-table-thead div {
  white-space: nowrap;
}
</style>

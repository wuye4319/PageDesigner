
<template>
  <div class="myTable">
    <a-table
      :rowKey="setKey"
      :columns="tableColumns"
      :dataSource="listData"
      :scroll="compAttr.tableAttr.scroll"
      :bordered="compAttr.tableAttr.bordered"
      :loading="compAttr.tableAttr.loading"
      :pagination="pagination"
      :size="compAttr.tableAttr.size"
    />

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import databind from '@/common/mixin/databind.ts';
import { Table } from 'ant-design-vue';
@Component({
  name: 'table-component',
  components: {
    ATable: Table
  },
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
      scroll: { y: false },
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
    let columns = [];
    this.compAttr.tableColumns.forEach((arr, i) => {
      let n = mapData.length;
      let temp = { ...arr };
      function sorter(a, b) {
        let a1 = a[temp.key];
        let b1 = b[temp.key];
        if (a1 === null) {
          a1 = 'null';
        }
        if (b1 === null) {
          b1 = 'null';
        }
        if (typeof a1 === 'number') {
          b1 = parseFloat(b1) || 0;
          return a1 - b1;
        } else {
          a1 = a1.toString();
          b1 = b1.toString();
          return a1.localeCompare(b1, 'zh-CN');
        }
      }
      temp.sorter = temp.sorter ? sorter : false;
      columns.push(temp)
      let pushData = {
        desc: arr.title,
        key: arr.key,
        tableMap: ''
      };
      for (let l = 0; l < n; l++) {
        if (arr.key === mapData[l].key) {
          mapData[l].desc = pushData.desc;
          pushData = mapData[l];
          break;
        }
      }
      setArr.push(pushData);
    });
    this.compData.dataModel.mapData = setArr;
    return columns;
  }
}
</script>
<style lang='less' scoped>
.myTable {
  width: 100%;
  overflow: hidden;
  /deep/.ant-table-tbody td {
    word-break: break-all;
  }
}

/deep/ .ant-table-placeholder {
  position: static;
}

/deep/ .ant-table-column-sorters {
  display: flex;
}

/deep/ .ant-table-thead > tr > th .ant-table-column-sorter {
  position: static;
  margin-top: 2px;
}
</style>

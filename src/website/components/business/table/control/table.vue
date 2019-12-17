
<template>
  <div class="compAttr">
    <div class="title">表格设置:</div>
    <a-list itemLayout="horizontal" size="small">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">边框:</div>
        </a-list-item-meta>
        <a-switch v-model="tableAttr.bordered" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">左右滑动:</div>
        </a-list-item-meta>
        <a-switch v-model="tableAttr.scroll.x" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">表格大小:</div>
        </a-list-item-meta>
        <a-select style="width:100%" size="small" v-model="tableAttr.size">
          <a-select-option v-for="i in size" :key="i">
            {{ i }}
          </a-select-option>
        </a-select>
      </a-list-item>
    </a-list>
    <div class="title">表头设置:</div>
    <a-list itemLayout="horizontal" size="small">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">增加列:</div>
        </a-list-item-meta>
        <a-button type="primary" @click="add" size="small">增加</a-button>
      </a-list-item>
    </a-list>
    <a-table :columns="columns" :dataSource="demoData" bordered :scroll="scroll" size="small" :pagination="false">
      <template slot="title1" slot-scope="text,re">
        <a-input v-model="re.title1" class="input-width" size="small" @change="handleChange">
        </a-input>
      </template>
      <template slot="align" slot-scope="text,re">
        <a-select v-model="re.align" class="selec-width" @change="handleChange" :size="'small'">
          <a-select-option v-for="o of optionObj.align" :value="o.value" :key="o.value">{{ o.key }}</a-select-option>
        </a-select>
      </template>
      <template slot="fixed" slot-scope="text,re">
        <a-select v-model="re.fixed" class="selec-width" @change="handleChange" :size="'small'">
          <a-select-option v-for="o of optionObj.fixed" :value="o.value" :key="o.value">{{ o.key }}</a-select-option>
        </a-select>
      </template>
      <template slot="width" slot-scope="text,re">
        <a-input class="input-width2" size="small" v-model="re.width" @change="handleChange">
        </a-input>
      </template>
      <template slot="sorter" slot-scope="text,re">
        <a-switch v-model="re.sorter" @change="handleChange" />
      </template>
      <template slot="dele" slot-scope="text,re">
        <a-button type="danger" @click="dele(re)" size="small">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'tablectrl-component',
  components: {}
})
export default class tablectrlComponent extends Vue {
  @Prop() compData: any;
  tableAttr: any = {};
  tableColumns: any[] = [];
  size: string[] = ['default', 'middle', 'small'];
  scroll: any = { x: true };
  optionObj: any = {
    align: [
      {
        key: '左对齐',
        value: 'left'
      },
      {
        key: '居中',
        value: 'center'
      },
      {
        key: '右对齐',
        value: 'right'
      }
    ],
    fixed: [
      {
        key: '不固定',
        value: ''
      },
      {
        key: '左固定',
        value: 'left'
      },
      {
        key: '右固定',
        value: 'right'
      }
    ]
  };
  demoData: any[] = [];

  columns: any[] = [
    {
      dataIndex: 'title1',
      key: 'title1',
      title: '列名',
      scopedSlots: { customRender: 'title1' }
    },
    {
      dataIndex: 'align',

      key: 'align',
      title: '对齐',
      scopedSlots: { customRender: 'align' }
    },
    {
      dataIndex: 'fixed',

      key: 'fixed',
      title: '列固定',
      scopedSlots: { customRender: 'fixed' }
    },
    {
      dataIndex: 'width',
      key: 'width',
      title: '宽',
      scopedSlots: { customRender: 'width' }
    },
    {
      dataIndex: 'sorter',
      key: 'sorter',
      title: '排序',
      scopedSlots: { customRender: 'sorter' }
    },
    {
      dataIndex: 'dele',
      fixed: 'right',
      key: 'dele',
      title: '删除',
      scopedSlots: { customRender: 'dele' }
    }
  ];

  created(): void {
    for (let key of Object.keys(this.compData.compAttr)) {
      this[key] = this.compData.compAttr[key];
    }
    this.setData();
  }
  // 处理表头
  setData() {
    let data = [];
    this.tableColumns.forEach(arr => {
      let temp = { ...arr };
      temp.title1 = temp.title;
      temp.sorter = !!temp.sorter;
      temp.dele = '删除';
      data.push(temp);
    });
    this.demoData = data;
  }
  // 还原表头
  handleChange() {
    let data = [];
    this.demoData.forEach(arr => {
      let temp = { ...arr };
      temp.title = temp.title1;
      delete temp.title1;
      temp.sorter = temp.sorter
        ? (a, b) => {
          let a1 = a.key2;
          let b1 = b.key2;
          if (typeof a1 === 'number') {
            b1 = parseFloat(b1) || 0;
            return a1 - b1;
          } else {
            a1 = a1.toString();
            b1 = b1.toString();
            return a1.localeCompare(b1, 'zh-CN');
          }
        }
        : false;
      delete temp.dele;
      let width = parseInt(temp.width);
      temp.width = width || '';
      data.push(temp);
    });
    this.compData.compAttr.tableColumns = data;
    // 构造数据做示例
   /*  let tempData: any = [];
    this.compData.dataModel.mapData.forEach(arr => {
      if (arr.tableMap) {
        tempData = false;
      }
    });
    if (tempData) {
      for (let i = 0; i < 3; i++) {
        let obj = {};
        data.forEach(d => {
          obj[d.dataIndex] = '我是示例数据';
        });
        tempData.push(obj);
      }
      this.compData.compAttr.tableData = tempData;
    }else{
      this.compData.compAttr.tableData=[];
    } */
  }
  // 删除一列表头
  dele(deData) {
    this.demoData.splice(this.demoData.indexOf(deData), 1);
    this.handleChange();
  }
  // 增加一列表头
  add() {
    let n = this.demoData.length;
    let id: any = n ? parseInt(this.demoData[n - 1].key) + 1 : 0;
    id = id + 'key';
    this.demoData.push({
      align: 'left',
      dataIndex: id,
      fixed: '',
      key: id,
      title: '表头',
      title1: '表头',
      width: '',
      sorter: false,
      dele: '删除'
    });
    this.handleChange();
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

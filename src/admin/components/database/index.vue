<template>
  <div class="warp">
    <div class="dataCenter">
      <div class="leftside">
        <a-button
          @click="closeModal('visible',1)"
          type="primary"
          class="top-button">
          <a-icon type="plus" />新建数据对象
        </a-button>

        <div class="tables">
          <div class="list-warp">
            <a-list size="small" :dataSource="tables">
              <a-list-item
                class="tablelist"
                :class="{'list-selec':item.tableName===currentTable}"
                @click="getTableMessage(item.tableName)"
                slot="renderItem"
                slot-scope="item">{{ item.title }}
                <a-popconfirm title="确定删除数据对象?" @confirm.stop="deleTable(item)">
                  <a-icon
                    class="i-close"
                    type="close-circle"
                    @click.stop />
                </a-popconfirm>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </div>
      <div class="databox">
        <a-button
          type="primary"
          class="back-button"
          @click="back">
          返回我的应用
        </a-button>
        <a-tabs v-model="tapActive">
          <a-tab-pane key="1">
            <span slot="tab">结构管理</span>
            <a-button
              type="primary"
              @click="closeModal('addstructV',1)"
              :disabled="!buttonKs.structAdd">添加字段</a-button>
            <a-table
              :columns="columns.struct"
              :rowKey="record => record.column_name"
              :dataSource="structMessage"
              :locale="{emptyText: '暂无数据'}"
              :pagination="page"
              @change="pageChange">
              <template
                v-for="col in ['column_name', 'data_type', 'column_comment']"
                :slot="col"
                slot-scope="text,re">
                <div :key="col" v-if="col==='data_type'">
                  {{ re['column_name']==='id'?dbType.id:dbType[text] }}
                </div>
                <div v-else :key="col">{{ text||'无' }}</div>
              </template>
              <template
                slot="operation"
                slot-scope="text, record"
                v-if="record.column_name!=='id'">
                <a-popconfirm
                  v-if="structMessage.length"
                  title="确定删除该字段?"
                  @confirm="deleStruc(record)">
                  <a>删除</a>
                </a-popconfirm>
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">数据管理</span>
            <a-button
              type="primary"
              @click="addData()"
              :disabled="!buttonKs.dataAdd">添加数据</a-button>
            <a-table
              :columns="contentColumns"
              :dataSource="contentMessage"
              :rowKey="(record,n)=> record.id+n"
              :locale="{emptyText: '暂无数据'}"
              :key="dataTableKey+'dataTable'"
              :scroll="{ x: true }"
              :pagination="pagination"
              @change="paginationChange">
              <template
                v-for="col in temp"
                :slot="col"
                slot-scope="text, record">
                <div
                  :key="col"
                  v-if="col!=='id'"
                  :class="{'max-width':record && !record.editable}">
                  <a-textarea
                    v-if="record && record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    @change="e => handleChange(e.target.value, record.id, col)" />
                  <template v-else>
                    <span v-if="text===null" style="color:red">(空)</span>
                    <span v-else :title="text">{{ text }}</span>
                  </template>
                </div>
                <span v-else :key="col">{{ text }}</span>
              </template>
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record && record.editable" class="option-set">
                    <a @click="save(record.id)">保存</a>
                    <a-popconfirm title="放弃修改?" @confirm=" cancel(record.id)">
                      <a>取消</a>
                    </a-popconfirm>
                  </span>
                  <span v-else class="option-set">
                    <a @click=" edit(record.id)" v-if="buttonKs.dataAdd">编辑</a>
                    <a-popconfirm title="确定删除该列数据?" @confirm=" deleData(record.id)">
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                </div>
              </template>
            </a-table>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <create-table-modal
      :visible="visible"
      :closeModal="closeModal"
      :success="getAllTables" />
    <create-key-modal
      :visible="addstructV"
      :closeModal="closeModal"
      :success="getTableMessage"
      :tableName="currentTable" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import ajax from '../../service/tables';
import createTableModal from './component/createTableModal.vue';
import createKeyModal from './component/createKeyModal.vue';
import { columns } from './columns';
import Pageindex from '../../pages/index.vue';
import { List, Input, Modal, Button, Icon, Popconfirm, Table, Tabs } from 'ant-design-vue';

@Component({
  name: 'dataBase-component',
  components: {
    createTableModal,
    createKeyModal,
    aList: List,
    aListItem: List.Item,
    aInput: Input,
    aButton: Button,
    aIcon: Icon,
    aTextarea: Input.TextArea,
    aPopconfirm: Popconfirm,
    aTable: Table,
    aTabs: Tabs,
    aTabPane: Tabs.TabPane
  }
})
export default class dataBaseComponent extends Vue {
  appId: string = '';
  dataTableKey: number = 0;
  tapActive: string = '1';
  tables: any = []; // 数据对象列表
  visible: boolean = false; // 增加数据对象弹窗显隐
  addstructV: boolean = false; // 增加字段弹窗显隐
  structMessage: any[] = []; // 字段数据内容
  contentMessage: any[] = []; // 数据内容
  columns = columns; // 结构管理表头
  currentTable: string = ''; // 当前数据对象
  contentColumns: any = []; // 数据管理表头
  cacheData: any[] = []; // 数据管理编辑时的临时数据
  temp: any[] = []; // 数据管理表头slot列表
  // 数据管理分页配置项
  pagination: any = {
    total: 0,
    current: 1,
    pageSize: 10,
    showQuickJumper: true,
    showSizeChanger: true,
    /* hideOnSinglePage: true, */
    showTotal: function(all) {
      return `总共 ${all} 条`;
    },
    pageSizeOptions: ['6', '10', '15', '20', '30']
  };
  // 结构分页配置项
  page: any = {
    total: 0,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    /* hideOnSinglePage: true, */
    showTotal: function(all) {
      return `总共 ${all} 条`;
    },
    pageSizeOptions: ['6', '10', '15', '20', '30']
  };
  pageInfo: { pageIndex: number; pageSize: number } = {
    pageIndex: 1,
    pageSize: 10
  };
  // 数据类型
  dbType: any = {
    id: '正整数',
    string: '字符串',
    float: '数值型',
    int: '布尔'
  };
  // 添加按钮控制
  buttonKs: any = {
    structAdd: false,
    dataAdd: false
  };
  created() {
    // this.getAllTables();
  }
  activated() {
    if (this.appId !== this.$route.query.appID) {
      this.currentTable = '';
      this.getAllTables();
    }
  }
  // 得到数据对象列表
  getAllTables(appID?, ks?) {
    this.appId = appID || this.$route.query.appID;
    let pageInfo = {
      pageIndex: 1,
      pageSize: 100
    };
    this.buttonKs.structAdd = false;
    if (ks) {
      this.currentTable = '';
    }
    ajax.getAllTables(this.appId, pageInfo).then((res: any) => {
      this.tables = ajax.tool(res, this) || [];
      let n = this.tables.length;
      if (!this.currentTable && n > 0 && this.tables[n - 1].tableName) {
        this.getTableMessage(this.tables[n - 1].tableName);
      } else {
        this.structMessage = [];
        this.contentMessage = [];
        this.contentColumns = [];
        this.dataTableKey++;
        this.tapActive = '1';
        this.buttonKs.dataAdd = false;
        this.pagination.total = 0;
        this.page.total = 0;
      }
    });
  }
  // 得到某个数据对象数据 ks归位 默认false 归位  ks2编辑判断的条件之一
  getTableMessage(tableName, ks?, ks2?) {
    if (this.currentTable !== tableName) {
      this.pageInfo.pageIndex = 1;
    }
    ajax.getTableMessage(tableName, this.pageInfo).then((res: any) => {
      let rData = ajax.tool(res, this);
      if (rData) {
        if (res.totalPage && res.totalPage < parseInt(res.currentPage || '1')) {
          this.pageInfo.pageIndex = res.totalPage;
          this.getTableMessage(tableName, ks, ks2);
          return false;
        }
        this.dataTableKey++;
        this.buttonKs.structAdd = true;
        if (!ks) {
          this.tapActive = '1';
        }

        this.currentTable = tableName;
        this.pageInfo.pageIndex = parseInt(res.currentPage || '1');
        this.pagination.total = parseInt(res.total || '0');
        this.pagination.current = this.pageInfo.pageIndex;
        this.pagination.pageSize = this.pageInfo.pageSize;
        this.page.total = rData.tableStruct.length;
        this.page.current = ks
          ? parseInt(((this.page.total - 1) / this.page.pageSize).toString()) +
            1
          : 1;
        this.setColumns(rData);
        if (ks && this.tapActive === '2' && !ks2) {
          this.edit(this.contentMessage[this.contentMessage.length - 1].id);
        }
      }
    });
  }
  // 控制弹窗显隐
  closeModal(str, ks) {
    this[str] = !!ks;
  }
  // 删除表结构
  deleStruc(data) {
    ajax.deleTableColunm(this.currentTable, data.column_name).then(res => {
      if (ajax.tool(res, this)) {
        this.getTableMessage(this.currentTable, true);
      }
    });
  }
  // 设置表头 及数据
  setColumns(data) {
    this.structMessage = data.tableStruct; // 结构赋值
    let t = [];
    let col = data.tableStruct.map(res => {
      let name = res.column_name;
      t.push(name);
      return {
        title: name === 'id' ? name : `${name} (${this.dbType[res.data_type]})`,
        dataIndex: name,
        scopedSlots: { customRender: name }
      };
    });

    this.temp = t;
    col.push({
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 110,
      scopedSlots: { customRender: 'operation' }
    });

    this.buttonKs.dataAdd = col.length > 2;

    this.cacheData = data.tableContent.map(item => ({ ...item }));
    this.contentColumns = col; // 设置数据管理表头
    this.contentMessage = data.tableContent; // 数据赋值
  }
  // 删除数据对象
  deleTable(data) {
    ajax.deleTable(data.tableName, this.$route.query.appID).then(res => {
      if (ajax.tool(res, this)) {
        this.currentTable = '';
        this.getAllTables();
        this.$message.success('删除数据对象成功');
      }
    });
    // ajax.deleTable()
  }
  // 添加数据
  addData() {
    let r = this.typeCorrect()[0];
    ajax.addContent(this.currentTable, r).then(res => {
      if (ajax.tool(res, this)) {
        this.pageInfo.pageIndex = parseInt(
          (
            (parseInt(res.total || 0) - 1) / this.pageInfo.pageSize +
            1
          ).toString()
        );
        this.getTableMessage(this.currentTable, true);
      }
    });
    // r['id'] = new Date().getTime();
    // this.contentMessage.push(r);
  }
  // 分页改变
  paginationChange(paginfo) {
    this.pageInfo.pageSize = paginfo.pageSize;
    this.pageInfo.pageIndex = paginfo.current;
    this.getTableMessage(this.currentTable, true, true);
  }
  pageChange(pageinfo) {
    this.page.pageSize = pageinfo.pageSize;
    this.page.current = pageinfo.current;
  }
  // 数据类型检测及容错纠正
  typeCorrect(data?) {
    data = data || [{}];
    data.forEach(d => {
      this.structMessage.forEach(res => {
        let name = res.column_name;
        let type = res.data_type;
        if (name !== 'id') {
          if (type === 'string') {
            d[name] = d[name] ? d[name].toString() : null;
          } else if (type === 'float') {
            d[name] = parseFloat(d[name]) || 0;
          } else if (type === 'int') {
            if (typeof d[name] === 'undefined') {
              d[name] = 0;
            } else {
              d[name] = d[name] ? 1 : 0;
            }
          }
        }
      });
    });
    return data;
  }
  // 数据管理 编辑时内容改变
  handleChange(value, id, column) {
    const newData = [...this.contentMessage];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target[column] = value;
      this.contentMessage = newData;
    }
  }
  // 数据管理 编辑点击
  edit(id) {
    const newData = [...this.contentMessage];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.contentMessage = newData;
    }
  }
  // 修改数据 后保存
  save(id) {
    const newData = [...this.contentMessage];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      delete target.editable;
      this.contentMessage = this.typeCorrect(newData);
      ajax.putContent(this.currentTable, target).then(res => {
        if (ajax.tool(res, this)) {
          this.$message.success('数据修改成功');
        }
      });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  // 放弃保存后数据还原
  cancel(id) {
    const newData = [...this.contentMessage];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);

      delete target.editable;
      this.contentMessage = newData;
    }
  }
  // 删除某一列数据
  deleData(id) {
    ajax.deleContent(this.currentTable, id).then(res => {
      if (ajax.tool(res, this)) {
        this.$message.success('数据删除成功');
        this.getTableMessage(this.currentTable, true, true);
      }
    });
  }
  // 页面返回
  back() {
    this.$router.back();
  }
}
</script>
<style lang='less' scoped>
.warp {
  height: 100%;
  /deep/.ant-table-fixed-columns-in-body {
    .editable-row-operations {
      width: 70px;
    }
  }
}
.dataCenter {
  width: 100%;
  height: 100%;
  & > div {
    float: left;
    min-height: 100%;
  }
  .leftside {
    position: relative;
    width: 21%;
    height: 100%;
    box-sizing: border-box;
    .top-button {
      position: relative;
      z-index: 9;
    }
  }
  .databox {
    width: 79%;
    box-sizing: border-box;
    position: relative;
    padding-left: 12px;
    border-left: 1px solid #ccc;
    .back-button {
      position: absolute;
      right: 0;
      z-index: 9;
    }
  }
}

.tables {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 43px;
  padding-right: 12px;
  box-sizing: border-box;
  .list-warp {
    width: 100%;
    height: 100%;
    overflow: auto;
    .tablelist {
      position: relative;
      cursor: pointer;
      &:hover {
        color: #17bc94;
        transition: 0.3s color ease;
      }
      .i-close {
        position: absolute;
        right: 10px;
        top: 10px;
        opacity: 0;
        font-size: 16px;
        transition: 0.3s opacity ease;
      }
      &:hover .i-close {
        opacity: 1;
      }
    }
    .list-selec {
      color: #17bc94;
    }
  }
}

.option-set > a:first-child {
  margin-right: 10px;
}
.max-width {
  min-width: 100px;
  max-width: 300px;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-wrap: break-word;
}
/deep/.ant-table-title {
  display: none;
}
</style>

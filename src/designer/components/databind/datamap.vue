<template>
  <div class="datamap">
    <div class="list">
      <span>数据对象</span>
      <a-select
        style="width: 50%;"
        :open="false"
        @dropdownVisibleChange="showModal"
        v-model="tableName"
        :disabled="dataModel.tableNameSwitch === 0"
      >
        <a-select-option
          v-for="menu of tablesData"
          :key="menu.tableName"
          :value="menu.tableName"
        >{{ menu.title }}</a-select-option>
      </a-select>
    </div>

    <div class="list po">
      <a-button type="primary" @click="goAdmin">前往数据中心</a-button>
    </div>

    <a-table
      class="my-table"
      v-if="dataModel.mapDataSwitch !== 0"
      :columns="detailsColumns"
      :dataSource="detailsData"
      bordered
      :pagination="false"
    >
      <template slot="val" slot-scope="val,obj,index">
        <div class="my-select" ref="my-select">
          <a-select
            style="width: 100%;"
            v-model="detailsData[index].val"
            @change="compChange(index)"
            :getPopupContainer="getPopupContainer"
          >
            <a-select-option
              v-for="menu of compSelectList"
              :key="menu"
              :value="menu"
            >{{ menu }}</a-select-option>
          </a-select>
        </div>
      </template>
    </a-table>

    <a-modal
      title="数据绑定"
      width="600px"
      :visible="visible"
      @ok="handleOk"
      okText="确定"
      @cancel="handleCancel"
      cancelText="取消"
      :bodyStyle="bodyStyle"
    >
      <div class="data-list">
        <div class="menu">
          <div class="menu-title flex">
            <span>数据对象列表</span>
            <span><a @click="goAdmin">前往数据中心</a></span>
          </div>
          <template v-if="tablesData.length > 0">
            <a-menu
              style="width: 256px"
              class=""
              mode="vertical"
              v-model="selectedKeys"
              @select="menuSelect"
            >
              <a-menu-item v-for="menu of tablesData" :key="menu.tableName">
                {{ menu.title }}
              </a-menu-item>
            </a-menu>
          </template>
          <template v-else>
            <div class="menu-empty">
              暂无数据<br>点击前往数据中心添加
            </div>
          </template>
        </div>

        <div class="menu-cont">
          <div class="menu-title">数据对象结构概览({{ modalTableTitle }})</div>
          <a-table
            :columns="modalColumns"
            :dataSource="modalData"
            bordered
            :pagination="false"
            :scroll="{ y: 300 }"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Emit,
  Provide,
  Inject,
  Model
} from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { adminUrl } from '@/common/config/env';
import { Select, Button, Table, Modal, Menu } from 'ant-design-vue';
const detailsColumns = [
  {
    title: '组件元素',
    dataIndex: 'desc'
  },
  {
    title: '字段名',
    dataIndex: 'val',
    scopedSlots: { customRender: 'val' }
  }
];

const modalColumns = [
  {
    title: '字段名',
    dataIndex: 'name',
    width: 80
  },
  {
    title: '字段类型',
    dataIndex: 'type'
  }
];

const webSite = namespace('webSite');

@Component({
  name: 'datamap',
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    ATable: Table,
    AModal: Modal,
    AMenu: Menu,
    AMenuItem: Menu.Item
  }
})
export default class DataMap extends Vue {
  @Prop() compData;

  dataModel = this.compData.dataModel;
  detailsColumns: object[] = detailsColumns;
  compSelectList: string[] = []; // 当前组件可以选的数据对象列表
  modalData: object[] = []; // 弹框列表
  detailsData: object[] = []; // 数据映射选择
  modalColumns: object[] = modalColumns;
  modalTableTitle: string = ''; // 弹框选中表展示的名称
  tablesData: object[] = []; // 表菜单
  tableName: string = '请选择'; // 组件选中的列表
  visible: boolean = false; // 弹框开关
  selectedKeys: string[] = []; // 弹框列表选项列表值
  bodyStyle: object = {
    // 弹框样式
  };

  @webSite.Getter('tables')
  tables;

  created() {
    this.tablesData = Object.freeze(this.tables);
    this.initData();
  }

  // 初始化数据
  initData() {
    let index = this.tablesData.findIndex(item => {
      let status = item['tableName'] === this.dataModel.tableName;
      return status;
    });
    if (this.dataModel.tableName && index > -1) {
      this.tableName = this.dataModel.tableName;
      this.tableNameChange();
    }
    if (this.tableName === '请选择') {
      this.selectedKeys = [];
      this.resetDetailsData();
    } else {
      this.selectedKeys = [this.tableName];
      this.initDetailsData();
    }
  }

  // 初始化数据映射选择表
  initDetailsData() {
    let arr = [];
    let mapData = this.dataModel.mapData;
    mapData.forEach((item, i) => {
      let val = '请选择';
      if (item.tableMap) {
        val = item.tableMap;
      }
      arr.push({
        key: i.toString(),
        desc: item.desc,
        val
      });
    });
    this.detailsData = arr;
  }

  // 初始化数据映射选择表
  resetDetailsData() {
    let arr = [];
    let mapData = this.dataModel.mapData;
    mapData.forEach((item, i) => {
      arr.push({
        key: i.toString(),
        desc: item['desc'],
        val: '请选择'
      });
      item.tableMap = '';
    });
    this.detailsData = arr;
  }

  // 展示弹框
  showModal() {
    if (this.tableName === '请选择') {
      this.selectedKeys = [];
      this.modalData = [];
    } else {
      this.selectedKeys = [this.tableName];
      let index = this.tablesData.findIndex(item => {
        return item['tableName'] === this.tableName;
      });
      this.modalTableTitle = this.tablesData[index]['title'];
      this.modalShowList(index);
    }
    this.visible = true;
  }

  // 弹框确定
  handleOk(e) {
    if (this.selectedKeys.length === 0) {
      this.$message.warning('请选择一张表');
      return;
    }
    let status = this.tableName !== this.selectedKeys[0];
    this.tableName = this.selectedKeys[0];
    this.visible = false;
    if (status) {
      this.tableNameChange();
      // 存储当前tableName
      this.dataModel.tableName = this.tableName;
      this.resetDetailsData();
    }
  }

  // 弹框取消
  handleCancel(e) {
    this.visible = false;
  }

  // 选中菜单
  menuSelect({ vueItem, key, selectedKeys }) {
    let index = this.tablesData.findIndex(item => {
      return item['tableName'] === key;
    });
    this.modalTableTitle = this.tablesData[index]['title'];
    this.modalShowList(index);
  }

  // 弹框展示列表数据
  modalShowList(i) {
    let arr = [];
    let struct = this.tablesData[i]['struct'];
    struct.forEach((item, n) => {
      arr.push({
        key: n.toString(),
        name: item.column_name,
        type: item.data_type
      });
    });
    this.modalData = arr;
  }

  // 数据对象变化
  tableNameChange() {
    let arr = [];
    let index = this.tablesData.findIndex(item => {
      return item['tableName'] === this.tableName;
    });
    let struct = this.tablesData[index]['struct'];
    struct.forEach(item => {
      arr.push(item.column_name);
    });
    this.compSelectList = arr;
  }

  // 组件绑定数据
  compChange(index) {
    this.dataModel.mapData[index].tableMap = this.detailsData[index]['val'];
  }

  // 跳转数据管理平台
  goAdmin() {
    let appID = this.$router.currentRoute.params.appID;
    let url = `${adminUrl}#/admin/database?appID=${appID}`;
    window.open(url, '_blank');
  }

  // 下拉框绑定位置
  getPopupContainer() {
    let myselect = this.$refs['my-select'];
    return myselect;
  }
}
</script>

<style lang='less' scoped>
.list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.po {
    margin: 15px 0;
    justify-content: flex-end;
  }
}

.data-list {
  display: flex;
  height: 400px;
}
.menu {
  /deep/ .ant-menu-light {
    height: calc(100% - 50px);
    overflow: auto;
  }
}
.menu-cont {
  flex: 1;
  padding-left: 50px;
}
.menu-title {
  height: 30px;
  padding-left: 16px;
  margin-bottom: 20px;
  &.flex {
    display: flex;
    justify-content: space-between;
  }
}
.menu-empty {
  width: 256px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.my-select {
  /deep/ .ant-select-dropdown-menu {
    max-height: 150px;
  }
}
</style>

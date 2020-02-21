<template>
  <div class="tabs-component">
    <h4>标签页配置项</h4>
    <a-table
      :columns="column"
      :rowKey="(record,i) => i"
      :dataSource="tabData"
      bordered
      :pagination="false"
    >
      <template slot="actions" slot-scope="text,record,i">
        <a-icon
          type="edit"
          @click="editTabM(i)"
          title="编辑内容"
          style="margin-right: 8px"
        />
        <a-popconfirm
          title="删除该标签?"
          @confirm="confirm(i)"
          okText="是"
          cancelText="否"
        >
          <a-icon
            type="delete"
            title="删除标签"
            style="color: red;margin-right: 8px"
          />
        </a-popconfirm>
        <a-radio
          :checked="Number(initData.activeKey) === i"
          @click="setActiveKey(i)"
          style="font-size: 12px"
        >设为默认</a-radio>
      </template>
      <template slot="title">
        <h5>选项配置</h5>
        <a-button
          class="addBtn"
          type="primary"
          @click="showTabModal"
        >
          <a-icon type="plus"/>
        </a-button>
      </template>
    </a-table>
    <h5 style="margin-top: 8px">其他配置:</h5>
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">标签风格:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('type')"
          v-model="initData.type"
          class="type-radio"
        >
          <a-radio value="line">线型</a-radio>
          <a-radio value="card">卡片</a-radio>
        </a-radio-group>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">页签大小:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('size')"
          v-model="initData.size"
          class="type-radio"
        >
          <a-radio value="large">大</a-radio>
          <a-radio value="default">中</a-radio>
          <a-radio value="small">小</a-radio>
        </a-radio-group>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">页签位置:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('tabPosition')"
          v-model="initData.tabPosition"
          class="type-radio"
        >
          <a-radio value="top">头部</a-radio>
          <a-radio value="bottom">底部</a-radio>
        </a-radio-group>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">切换动画:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('animated')"
          v-model="initData.animated"
        />
      </a-list-item>
    </a-list>
    <a-modal
      title="添加选项"
      :visible="visible"
      @ok="operateTab('add')"
      @cancel="handleCancel"
    >
      <label>
        标签名：
        <a-input v-model="tabName" placeholder="请输入标签名"/>
      </label>
    </a-modal>
    <a-modal
      title="编辑选项"
      :visible="visibleE"
      @ok="operateTab('edit')"
      @cancel="handleCancel"
    >
      <label>
        标签名：
        <a-input v-model="tabName" placeholder="请输入标签名"/>
      </label>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { compilation } from 'webpack';
import { List, Button, Input, Radio, Icon, Table, Popconfirm, Switch, Modal } from 'ant-design-vue';
interface InitData {
  animated: boolean;
  type: string;
  hideAdd: boolean;
  size: string;
  tabPosition: string;
  tabBarGutter: number;
  tabsCount: number;
  activeKey: any;
  flesh: boolean;
}

@Component({
  name: 'tabsCtl-component',
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AButton: Button,
    AInput: Input,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    AIcon: Icon,
    ATable: Table,
    APopconfirm: Popconfirm,
    ASwitch: Switch,
    AModal: Modal
  }
})
export default class TabsComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: number;

  $set;
  initData: InitData = {
    animated: true, // 是否使用动画切换 Tabs，在 tabPosition=top|bottom 时有效
    type: 'line', // 页签的基本样式，可选 line、card editable-card 类型
    hideAdd: false, // 是否隐藏加号图标，在 type="editable-card" 时有效
    size: 'default', // 大小，提供 large default 和 small 三种大小
    tabPosition: 'top', // 页签位置，可选值有 top right bottom left
    tabBarGutter: 0, // tabs 之间的间隙
    tabsCount: 1,
    activeKey: 0,
    flesh: false
  };
  pageData: any = this.compData;
  visible: boolean = false;
  visibleE: boolean = false;
  tabName: string = '';
  editIndex: number = 0;

  column: any = [
    {
      title: '标签名',
      dataIndex: 'title'
    },
    {
      title: '操作',
      dataIndex: 'actions',
      scopedSlots: { customRender: 'actions' }
    }
  ];

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
  }

  get tabData() {
    return this.compData.compAttr.tabs;
  }

  setActiveKey(index) {
    this.initData.activeKey = index;
    this.compData.compAttr.activeKey = index;
  }

  showTabModal() {
    this.visible = true;
  }

  handleCancel() {
    this.visible = false;
    this.visibleE = false;
    this.tabName = '';
    this.editIndex = 0;
  }

  confirm(index) {
    if (this.compData.compAttr.tabs.length <= 1) {
      this.$message.warning('已是最后一个标签');
      return;
    }
    this.compData.compAttr.tabs.splice(index, 1);
  }

  editTabM(i) {
    let tab = this.compData.compAttr.tabs[i];
    this.editIndex = i;
    this.tabName = tab.title;
    this.visibleE = true;
  }

  operateTab(type) {
    if (!this.tabName) {
      this.$message.warning('标签名称不能为空');
      return;
    }
    let newTab = {
      title: this.tabName,
      content: {
        compName: 'layout',
        compImg: 'layout',
        compAttr: {
          minHeight: '60px',
          minHeightSwitch: true,
          typeVal: '1',
          childList: [[]],
          childListAttr: [
            {
              boxOptions: {
                width: 'auto',
                height: 'auto',
                paddingTop: '0',
                paddingLeft: '0',
                paddingRight: '0',
                paddingBottom: '0',
                borderTopWidth: '0',
                borderLeftWidth: '0',
                borderRightWidth: '0',
                borderBottomWidth: '0',
                marginTop: '0',
                marginLeft: '0',
                marginRight: '0',
                marginBottom: '0'
              },
              flexOptions: {
                'flex-direction': 'column',
                'justify-content': 'flex-start',
                'align-items': 'stretch',
                'flex-wrap': 'nowrap'
              }
            }
          ]
        },
        type: 'layout',
        title: '布局',
        description: '布局组件',
        boxModel: 0,
        boxOptions: {},
        dataModel: {}
      }
    };
    let tabs = this.compData.compAttr.tabs;
    if (type === 'add') {
      tabs.push(newTab);
    } else {
      this.$set(tabs, this.editIndex, newTab);
    }
    this.pageData.compAttr.tabs = tabs;
    this.handleCancel();
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this.initData[name];
  }
}
</script>

<style lang="less" scoped>
.type-radio {
  text-align: left;
}
/deep/.ant-list-item-meta {
  width: 120px;
  font-size: 12px;
}
/deep/.ant-table-title {
  display: flex;
  align-items: center;
  padding: 6px 0;
  h5 {
    margin: 0 12px 0 0;
  }
}
.addBtn {
  padding: 0 6px;
  height: 22px;
}
</style>

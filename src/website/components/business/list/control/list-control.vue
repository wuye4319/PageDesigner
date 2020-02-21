
<template>
  <a-list itemLayout="horizontal">

    <!-- <a-list-item>
      <a-list-item-meta>
        <div slot="description">列表id:</div>
      </a-list-item-meta>
      {{ pageData.compName }}-{{ pageData.compAttr.uid.substr(0,10) }}
    </a-list-item> -->

    <a-list-item v-if="options['classify-switch']">
      <a-list-item-meta>
        <div slot="description">显示分类:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="开"
        unCheckedChildren="关"
        @change="showComp('classify')"
        v-model="classify"
      />
    </a-list-item>

    <a-list-item v-if="options['sort-switch']">
      <a-list-item-meta>
        <div slot="description">显示排序:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="开"
        unCheckedChildren="关"
        @change="showComp('sort')"
        v-model="sort"
      />
    </a-list-item>
  </a-list>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { genID } from '@/common/utils/math'; // 创建唯一id
import { List, Switch } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'list-common-component',
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    ASwitch: Switch
  }
})
export default class ListCommonComponent extends Vue {
  @webSite.Getter('pageInfor')
  pageInfor;

  @webSite.State('CompStore')
  compStore;

  @webSite.State('AppInfor') // 初始化接口返回的数据绑定表
  appInfor;

  @Prop() compData: any; // 上层直接传递
  @Prop() compIndex: any; // 上层直接传递
  @Prop() compsDataParent: any; // 上层直接传递

  @(Prop({
    type: Object,
    default: () => {
      // 数据配置
      return {
        'classify-compName': 'list-classify', // 分类组件名称
        'sort-compName': 'list-sort', // 排序组件名称
        'classify-switch': true, // 分类组件开关
        'sort-switch': true, // 排序组件开关
        'classify-key': 'list-classify', // 分类组件绑定值名称
        'sort-key': 'list-sort', // 排序组件绑定值名称
        'classify-status': false, // 分类组件绑定值状态
        'sort-status': false // 排序组件绑定值状态
      };
    }
  })!)
  options: any;

  @Inject('showControl') showControl;

  $store;
  pageData = this.compData;
  compAttr: any = this.compData.compAttr;
  pageDataParent = this.compsDataParent;
  optionsData: object = Object.assign({}, this.options);
  compName: string = '';

  classify: boolean = false;
  sort: boolean = false;

  initData: object = {
    'list-classify': false,
    'list-sort': false,
    on: ''
  };

  created() {
    this.classify = this.optionsData['classify-status'];
    this.sort = this.optionsData['sort-status'];
    this.compName = this.pageData.compName;
    // 绑定列表分类排序 清除列表分类和排序
    this.$store.off(`${this.compAttr.uid}-clear`);
    this.$store.on(`${this.compAttr.uid}-clear`, this.clearComp);
    this.createGlobal();
  }

  // 创建全局列表分类和排序属性
  createGlobal() {
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    let pageInfo = currentInfo['page-share'];
    if (!pageInfo['global-list']) {
      this.$set(pageInfo, 'global-list', []);
    }
    let index = pageInfo['global-list'].findIndex(item => {
      return item.uid === this.compAttr.uid;
    });
    if (index === -1) {
      pageInfo['global-list'].push({
        compName: this.compData.compName,
        uid: this.compData.compAttr['uid'],
        'classify-compName': this.optionsData['classify-compName'],
        'sort-compName': this.optionsData['sort-compName'],
        classify: this.classify,
        sort: this.sort,
        'classify-key': this.optionsData['classify-key'],
        'sort-key': this.optionsData['sort-key']
      });
    }
  }

  // 手动创建分类数据
  getdata(name) {
    let index = this.compStore.findIndex(item => {
      let compName = this.optionsData[`${name}-compName`];
      let status = compName === item.compName;
      return status;
    });
    let copyComp = JSON.parse(JSON.stringify(this.compStore[index]));
    let uid = genID();
    copyComp.compAttr['uid'] = copyComp.compAttr['uid'] ? copyComp.compAttr['uid'] : `${uid}`;
    let obj = {};
    Object.assign(obj, copyComp);
    Object.assign(obj['compAttr'], {
      bindUid: this.pageData.compAttr['uid'],
      bindName: this.pageData.compName
    });
    if (name === 'classify') {
      Object.assign(obj['dataModel'], {
        tableName: this.pageData.dataModel.tableName,
        tableNameSwitch: 0,
        dataCompSwitch: 1
      });
    } else if (name === 'sort') {
      Object.assign(obj['dataModel'], {
        tableName: this.pageData.dataModel.tableName,
        tableNameSwitch: 0, // 数据对象开关
        mapDataSwitch: 0, // 数据映射开关
        dataCompSwitch: 1 // 数据绑定（特殊）
      });
    }
    return obj;
  }

  showComp(name: string, status?: string) {
    let pageInfor = this.pageInfor;
    let i = this.compIndex.i;
    if (status === 'show') {
      this[name] = true;
    } else if (status === 'hide') {
      this[name] = false;
    }
    if (this[name]) {
      // 新增
      // 手动创建初始化数据
      let obj = this.getdata(name);
      if (i === 'layout') {
        // 布局中
        this.pageDataParent.splice(i, 0, obj);
        this.handleData(name);
        this.showControl('layout', this.compData, this.pageDataParent);
      } else {
        pageInfor.splice(i, 0, obj);
        let listIndex = this.getIndex(pageInfor, this.compName);
        this.handleData(name);
        this.showControl(listIndex);
      }
    } else {
      // 删除
      if (i === 'layout') {
        // 布局中
        let index = this.getIndex(this.pageDataParent, name);
        if (index > -1) {
          this.pageDataParent.splice(index, 1);
          this.handleData(name);
          this.showControl('layout', this.compData, this.pageDataParent);
        }
      } else {
        let index = this.getIndex(pageInfor, name);
        if (index > -1) {
          pageInfor.splice(index, 1);
          this.handleData(name);
          let listIndex = this.getIndex(pageInfor, this.compName);
          this.showControl(listIndex);
        }
      }
    }
  }

  // 处理数据
  handleData(name) {
    this.emitVal(name);
    this.changeGlobal(name);
  }

  // 派发change事件和对应的值
  emitVal(name) {
    this.$emit('change', {
      [this.optionsData[`${name}-key`]]: this[name]
    });
  }

  // 改变全局列表分类和排序属性
  changeGlobal(name) {
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    let pageInfo = currentInfo['page-share'];
    let index = pageInfo['global-list'].findIndex(item => {
      return item.uid === this.compAttr.uid;
    });
    this.$set(pageInfo['global-list'][index], name, this[name]);
  }

  // 索引
  getIndex(arr, name) {
    let index = arr.findIndex(item => {
      let status1;
      let status2;
      if (name === this.compName) {
        status1 = item.compName === name;
        status2 = this.pageData.compAttr.uid === item.compAttr.uid;
      } else {
        let compName = this.optionsData[`${name}-compName`];
        status1 = item.compName === compName;
        status2 = this.pageData.compAttr.uid === item.compAttr.bindUid;
      }
      let status = status1 && status2;
      return status;
    });
    return index;
  }

  // 执行false清除
  clearComp(name, status) {
    if (status) {
      this.showComp(name, 'show');
    } else {
      this.showComp(name, 'hide');
    }
  }
}
</script>
<style lang='less' scoped>
.myList {
  width: 100%;
  // display: flex;
  // background: #001529;
  // padding: 10px 10px;
  // justify-content: space-around;
}
</style>

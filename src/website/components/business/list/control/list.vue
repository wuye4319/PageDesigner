
<template>
  <div class="myList">
    <a-list itemLayout="horizontal">

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">列表id:</div>
        </a-list-item-meta>
        {{ pageData.compName }}-{{ pageData.compAttr.uid.substr(0,10) }}
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示分类:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="showComp('list-classify')"
          v-model="initData['list-classify']"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示排序:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="showComp('list-sort')"
          v-model="initData['list-sort']"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { log } from 'util';

const webSite = namespace('webSite');

interface ListData {
  'list-classify': boolean;
  'list-sort': boolean;
  on: string;
}

@Component({
  name: 'list-component',
  components: {}
})
export default class listComponent extends Vue {
  @webSite.Getter('pageInfor')
  pageInfor;

  @webSite.State('CompStore')
  compStore;

  @Prop() compData: any;
  @Prop() compIndex: any;
  @Prop() compsDataParent: any;

  @Inject('showControl') showControl;

  $store
  pageData = this.compData;
  compAttr: any = this.compData.compAttr;
  pageDataParent = this.compsDataParent;

  initData: ListData = {
    'list-classify': false,
    'list-sort': false,
    on: ''
  };

  created() {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
    // 绑定列表分类排序 清除列表分类和排序
    this.$store.on(`${this.compAttr.uid}-clear`, this.clearComp);
  }

  mounted() {}

  // 手动创建分类数据
  getdata(name) {
    let index = this.compStore.findIndex(item => {
      let status = name === item.compName;
      return status;
    });
    let copyComp = JSON.parse(JSON.stringify(this.compStore[index]));
    let obj = {};
    Object.assign(obj, copyComp);
    Object.assign(obj['compAttr'], {
      bindUid: this.pageData.compAttr['uid'],
      bindName: this.compData.compName
    });
    if (name === 'list-classify') {
      Object.assign(obj['dataModel'], {
        tableName: this.pageData.dataModel.tableName,
        tableNameSwitch: 0,
        dataCompSwitch: 1
      })
    } else if (name === 'list-sort') {
      Object.assign(obj['dataModel'], {
        tableName: this.pageData.dataModel.tableName,
        tableNameSwitch: 0, // 数据对象开关
        mapDataSwitch: 0, // 数据映射开关
        dataCompSwitch: 1 // 数据绑定（特殊）
      })
    }
    return obj;
  }

  showComp(name) {
    let pageInfor = this.pageInfor;
    let i = this.compIndex.i;
    this.pageData.compAttr[name] = this.initData[name];
    if (this.initData[name]) { // 新增
      // 手动创建初始化数据
      let obj = this.getdata(name);
      if (i === 'layout') {
        // 布局中
        this.pageDataParent.splice(i, 0, obj);
        this.showControl('layout', this.compData, this.pageDataParent);
      } else {
        pageInfor.splice(i, 0, obj);
        let listIndex = this.findIndex(pageInfor, 'list');
        this.showControl(listIndex);
      }
    } else { // 删除
      if (i === 'layout') {
        // 布局中
        let index = this.findIndex(this.pageDataParent, name);
        if (index > -1) {
          this.pageDataParent.splice(index, 1);
          this.showControl('layout', this.compData, this.pageDataParent);
        }
      } else {
        let index = this.findIndex(pageInfor, name);
        if (index > -1) {
          pageInfor.splice(index, 1);
          let listIndex = this.findIndex(pageInfor, 'list');
          this.showControl(listIndex);
        }
      }
    }
  }

  // 索引
  findIndex(arr, name) {
    let index = arr.findIndex(item => {
      let status1 = item.compName === name;
      let status2;
      if (name === 'list') {
        status2 = this.pageData.compAttr.uid === item.compAttr.uid
      } else {
        status2 = this.pageData.compAttr.uid === item.compAttr.bindUid
      }
      let status = status1 && status2;
      return status;
    });
    return index
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this.initData[name];
  }

  // 执行false清除
  clearComp() {
    if (this.initData['list-classify']) {
      this.initData['list-classify'] = false;
      this.showComp('list-classify');
    }
    if (this.initData['list-sort']) {
      this.initData['list-sort'] = false;
      this.showComp('list-sort');
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

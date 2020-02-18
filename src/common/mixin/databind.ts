import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component
export default class DataBindMixins extends Vue {
  @Prop() compData;

  @webSite.State('Tables') // 初始化接口返回的数据绑定表
  databindTables;

  apiData: object[] = null; // 接口返回数据
  defaultData = [] // 默认数据
  dataSource:string = 'tableData' // 数据来源  1. 'tableData' (table数据) 2. 'apiData' (api接口数据)

  protected get tableData() {
    let index = this.databindTables.findIndex(item => {
      return item.tableName === this.compData.dataModel.tableName;
    });
    let data = [];
    if (index > -1) {
      data = this.databindTables[index].content;
    }
    return data;
  }

  protected get mydatabindlist() { // 获取真实数据为api接口数据还是table数据
    let arr = [];
    if (this.dataSource === 'apiData') {
      arr = this.apiData;
    } else if (this.dataSource === 'tableData') {
      arr = this.tableData;
    }
    return arr;
  }

  protected get listData() { // 列表返回渲染数据  （需要用到的列表的数据）
    let obj = {};
    let mapData = this.compData.dataModel.mapData
    mapData.forEach(item => {
      obj[item.key] = item.tableMap;
    });
    // 新增id标识
    obj['id'] = 'id';
    let listData = this.mydatabindlist.map((item, i) => {
      let dataObj = {};
      for (let k in obj) {
        dataObj[k] = item[obj[k]];
      }
      return dataObj;
    });
    if (listData.length === 0 && this.dataSource === 'tableData') {
      listData = this.defaultData;
    }
    if (this.dataSource === 'userData') {
      listData = this.defaultData
    }
    return listData;
  }
}

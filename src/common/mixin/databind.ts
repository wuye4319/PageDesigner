import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');


@Component
export default class DataBindMixins extends Vue { 

  @Prop() compData;
  
  @webSite.State('Tables') // 初始化接口返回的数据绑定表
  databindTables;

  apiData: object[] = []; // 接口返回数据
  defaultData = [] // 默认数据

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
    if (this.apiData.length > 0) {
      arr = this.apiData;
    } else {
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
    let listData = this.mydatabindlist.map((item, i) => {
      let dataObj = {};
      for (let k in obj) {
        dataObj[k] = item[obj[k]];
      }
      return dataObj;
    });
    if (listData.length === 0) {
      listData = this.defaultData;
    }
    return listData;
  }
  
}
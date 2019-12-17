import { Vue, Component } from 'vue-property-decorator'
declare module 'vue/types/vue' {
  interface Vue {
    form: Object
    handleSubmit(name: any): Promise<any>
    getTableData(tables: any, dataModel, initData): any
  }
}

/**
* mixins
*/
@Component
export default class bottomNavMixin extends Vue {
  form: Object = { test: 'test' }

  handleSubmit(name: any): Promise<any> {
    return new Promise((resolve) => {
      resolve()
    })
  }

  getTableData(tables: any, dataModel: object, initData): any {
    let index = tables.findIndex((item) => {
      return item.tableName === dataModel['tableName']
    })
    let data = [];
    if (index > -1) {
      data = tables[index].content;
    }
    return data.length ? data : initData
  }
}

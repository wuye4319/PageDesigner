import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { parse } from 'recast';
import axios from '@/common/config/axios';
declare module 'vue/types/vue' {
  interface Vue {
    form: Object
    triggerFunc(refs: any, triggerStr: any, model: any, compStatus: any): any
    handleSubmit(name: any): Promise<any>
    getTableData(tables: any, dataModel, initData): any
    getFunctionName(pageActions: any, type: any): any
    getFunctionStruct(add: any): any
  }
}

const webSite = namespace('webSite');
/**
* mixins
*/
@Component
export default class bottomNavMixin extends Vue {
  @webSite.Getter('pageActions') pageActions;
  @webSite.Getter('defaultActions') defaultActions;
  @webSite.Getter('appInfor') appInfor;
  @webSite.Action('changePage') changePage;
  @Prop() compData: any;
  $router;
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

  getFunctionName(pageActions) {
    const ast = parse(pageActions);
    const add = ast.program.body;
    let funcBox = []
    for (let i in add) {
      let funcName = this.getFunctionStruct(add[i])
      if (funcName !== 'Not Supported') {
        if (typeof funcName === 'string') {
          const actionName = funcName;
          const action = { actionName: actionName, actionFunc: funcName };
          funcBox.push(action)
        } else {
          let objName = Object.keys(funcName)[0];
          let arr = funcName[objName]
          let tempArr = [];
          for (let ii = 0; ii < arr.length; ii++) {
            let item = arr[ii];
            const action = { actionName: item, actionFunc: item };
            tempArr.push(action);
          }
          funcBox.push({ [objName]: tempArr })
        }
      }
    }
    return funcBox;
  }

  getFunctionStruct(add) {
    let result
    switch (add.type) {
      case 'FunctionDeclaration':
        result = add.id.name
        break;
      case 'VariableDeclaration':
        let decl = add.declarations[0]
        if (decl.init.type === 'FunctionExpression' || decl.init.type === 'ArrowFunctionExpression') {
          result = decl.id.name
        } else if (decl.init.type === 'ObjectExpression') {
          result = {}
          result[decl.id.name] = []
          for (let i in decl.init.properties) {
            let prop = decl.init.properties[i]
            if (prop.value.type === 'FunctionExpression' || prop.value.type === 'ArrowFunctionExpression') {
              result[decl.id.name].push(prop.key.name)
            } else {
              result[decl.id.name].push('Not Function')
            }
          }
        } else {
          result = 'Not Supported'
        }
        break;
      default:
        result = 'Not Function'
        break;
    }
    return result
  }

  triggerFunc(refs, type, model, compStatus?) {
    if (!type) { return }
    let appInfor = this.appInfor;
    let ctx = { appInfor, refs: refs, router: this.$router, changePage: this.changePage, axios: axios }
    model && model.actionData.forEach(mod => {
      if (mod.eventType === type) {
        let actionsStr = '';
        mod.actions.forEach(action => {
          actionsStr += action.actionFunc + '(ctx' + ',' + action.params + ',' + compStatus + ');';
        });
        eval(this.defaultActions + this.pageActions + actionsStr); // eslint-disable-line
      }
    });
  }

  // 获取底部导航定位数据
  getFixed(comp) {
    return comp.compInfo.compAttr.isFixed === 'true'
      ? {
        'position': 'fixed',
        'bottom': comp.compInfo.compAttr.bottom || '',
        'top': comp.compInfo.compAttr.top || '',
        'z-index': '99'
      }
      : {}
  }
}

/**
 * 给组件赋能
 *使被混入的组件拥有特定的事件及属性
 *组件必有属性
 *dataFilter：用传进来的过滤函数 prop属性 （编辑器传进来的）
 *defaultData：组件默认数据 把propData通过dataFilter（如果有）处理然后与defaultData合并 可以直接使用 该属性是核心属性，修改其值会发广播
 *__defaultFilter：同dataFilter,优先级比dataFilter低，可用代码重置
 *listenSwitch__:是否具有监听能力，默认是打开的，可以强制关闭
 *axios：axios实例
 *canlisten__:该对像控制可监听组件，值由设计器控制及绑定
 *emit事件 只要defaultData改变就会触发、

 *需要确认  是否需要暴露axios,是否需要自动请求数据
 *
 * @Author: lizuping
 * @Date: 2019-11-27 10:13:38
 * @Last Modified by: lizuping
 * @Last Modified time: 2019-12-04 17:51:24
**/

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import axios, { AxiosInstance } from 'axios';
declare module 'vue/types/vue' {
  interface Vue {
    axios:AxiosInstance;
    defaultData:any;
    listenSwitch__:boolean;
  }
}
// 精准判断数据类型
function type(obj:any):string {
  return Object.prototype.toString.call(obj).split(' ')[1].toLocaleLowerCase().slice(0, -1);
}

// 深拷贝
function deepCopy(source:any) {
  let dataType = type(source);
  if (dataType === 'object' || dataType === 'array') {
    let result:any = dataType === 'object' ? {} : [];
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        result[key] = deepCopy(source[key]);
      }
    }
    return result;
  } else {
    return source;
  }
}
// 对像遍历
function objEach(obj:any, fuc:any) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      fuc(key, obj[key]);
    }
  }
}
// 合并处理数据
function ass(obj:any, obj2:any, fuc:Function, filter?:any) {
  let newObj;
  if (obj === null) {
    return obj2;
  }
  if (type(filter) === 'function') {
    newObj = filter(deepCopy(obj));
  } else {
    newObj = fuc(deepCopy(obj));
  }
  if (type(obj) === 'object' && type(obj2) === 'object') {
    Object.assign(newObj, obj2);
  }
  return newObj || obj2;
}
// 监听列表默认值
function def(key:string) {
  return { id: key, listen: false };
}
/**
 * mixins
 */
@Component
export default class FormValidateMixin extends Vue {
  axios:AxiosInstance=axios.create();
  title:string='mixins';
   defaultData:any={};
   __defaultFilter(data:any) { return data; }
  __timesListen__:number[]=[];
  compList__:any={};
  listenSwitch__:boolean=true;
  ___compId___!:string;
  __hasEmit__!:any;
  __tempData__!:any;
  @Prop() compData!:any;
  userCompData__:any={ }
  // 数据改变发送通知
  @Watch('defaultData', {
    deep: true
  })
  ___defaultData___ () {
    this.$bus.$emit(this.___compId___, deepCopy(this.defaultData));
  }
  // 合并用户数据
  @Watch('userCompData__.interactData.propData')
  ___propData___ () {
    let temp = this.userCompData__.interactData
    this.defaultData = ass(temp.propData, this.__tempData__, this.__defaultFilter, temp.dataFilter);
  }
  // 实时更新用户可监听组件
  @Watch('compList__', {
    deep: true
  })
  ___compList___ () {
    if (!this.listenSwitch__) {
      return false;
    }
    let temp = this.userCompData__.interactData;
    let obj = {};
    objEach(this.compList__.all, (key:any) => {
      if (key !== this.___compId___) {
        if (!temp.canlisten__[key]) {
          obj[key] = def(key);
        } else {
          obj[key] = temp.canlisten__[key]
        }
      }
    });
    temp.canlisten__ = deepCopy(obj);
    /*  objEach(temp.canlisten__, (key:any) => {
      if (!this.compList__.all[key]) {
        delete temp.canlisten__[key];
      }
    }) */
  }
  // 实时更新用户设置的监听组件，前根据用户设置做监听或取消监听
  @Watch('userCompData__.interactData.canlisten__')
  __canlisten__ () {
    objEach(this.userCompData__.interactData.canlisten__, (key:any, val:any) => {
      if (val.listen && !this.__hasEmit__[key]) {
        this.$bus.$on(key, this.__listen__);
        this.__hasEmit__[key] = true;
      }
      if (!val.listen && this.__hasEmit__[key]) {
        this.$bus.$off(key, this.__listen__);
        this.__hasEmit__[key] = false;
      }
    });
  }
  created() {
    let oldData:any = { id: '', canlisten__: { }, dataFilter: false, defaultData: {}, propData: null, tempData: { } };
    if (this.compData && this.compData.compAttr) {
      let tempComp = this.compData.compAttr
      let temp = this.compData.compAttr.interactData;
      if (temp && temp.id) {
        // 获取用户配过的
        this.___compId___ = temp.id;
        this.__tempData__ = temp.tempData;
        if (temp.FilterStr) {
          temp.dataFilter=eval('(' + temp.FilterStr + ')'); // eslint-disable-line
        }
        let num = parseInt(temp.id.split('@id')[1]);
        if (num && this.$bus.pageMax < num) {
          this.$bus.pageMax = num;
        }
      } else {
        // 生成组件默认对像
        this.$bus.pageMax++;
        this.___compId___ = (this.compData.title || '') + new Date().getTime().toString(36).slice(2) + '@id' + this.$bus.pageMax;
        this.__tempData__ = this.defaultData;
        oldData.id = this.___compId___;
        oldData.tempData = this.defaultData;
        if (temp) {
          temp = Object.assign(oldData, temp);
          temp.canlisten__ = {};
          tempComp.interactData = temp;
        } else {
          temp = oldData;
          tempComp.interactData = temp;
        }
      }

      oldData = temp;
    } else {
      console.error('无compData属性或compData.compAttr，请检查组件数据结构')
    }
    this.$set(this.userCompData__, 'interactData', oldData);
    this.__hasEmit__ = {};
    // 得到存在的组件
    if (this.$bus) {
      this.compList__ = this.$bus.compList;
      if (this.listenSwitch__) {
        objEach(this.compList__.all, (key:any) => {
          if (!oldData.canlisten__[key]) {
            oldData.canlisten__[key] = def(key);
          }
        });
      }
      if (oldData.canlisten__[this.___compId___]) {
        delete oldData.canlisten__[this.___compId___]
      }

      this.$bus.compList.all[this.___compId___] = this.___compId___;
      this.$bus.compList.all = deepCopy(this.$bus.compList.all);
    }
    // this.defaultData = ass(oldData.propData, this.__tempData__, this.__defaultFilter, oldData.dataFilter);
    // this.$bus.$emit(this.___compId___, this.defaultData);
    this.__timesListen__ = [];
  }
  __listen__(data:any) {
    // 防止事件递归
    if (this.__timesListen__.length > 5) {
      if (this.__timesListen__[5] - this.__timesListen__[0] < 200) {
        console.error('有组件事件互相绑定，做递归修改，请检查！！！！');
        return false;
      } else {
        this.__timesListen__ = [];
      };
    }
    this.__timesListen__.push(new Date().getTime());
    this.defaultData = ass(data, this.__tempData__, this.__defaultFilter, this.userCompData__.interactData.dataFilter);
  }
  mounted() {
    // 数据处理完做监听
    objEach(this.userCompData__.interactData.canlisten__, (key:any, val:any) => {
      if (val.listen) {
        this.$bus.$on(key, this.__listen__);
        this.__hasEmit__[key] = true;
      }
    });
  }
  // 解绑事件
  beforeDestroy() {
    delete this.$bus.compList.all[this.___compId___];
    this.$bus.compList.all = deepCopy(this.$bus.compList.all);
    objEach(this.__hasEmit__, (key:string, val:boolean) => {
      if (val) {
        this.$bus.$off(key, this.__listen__);
      }
    });
    this.___compList___();
  }
}

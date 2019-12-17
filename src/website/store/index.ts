import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export class WebSiteState {
  // 页面信息，决定每个页面的信息状态
  PageInfor: Array<object> = [];
  // 仅仅用来获取页面名称列表
  AppInfor: object = {}
  // 固定的组件仓库信息，存储了每个组件原始信息
  CompStore: object = {}
  // 支持Layout的组件库
  LayoutStore: object = {}
  // 接受当前应用全局信息
  Global: object = {}
  // 整个App后台传来的数据信息
  CurrentApps: object = {}
  // 当前页面表信息
  Tables: object[] =[]
  // 暴露给用户的页面对象
  UserData: object = {}
  // 当前应用所有可选动作
  Actions: object[] =[]
}

const websiteModule: Module<WebSiteState, any> = {
  namespaced: true,
  state: new WebSiteState(),
  mutations,
  getters,
  actions
};

export default websiteModule;

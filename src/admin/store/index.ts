import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export class AppState {
  // 页面信息
   myapp: object = {};
   // 组件信息
   compList: object = [];
  // 组件详情
  compDetail: object = {};
  // app详情
  appDetail: object = {};
  // 文档内容
  docContent: string = '';
}

const appModule: Module<AppState, any> = {
  namespaced: true,
  state: new AppState(),
  mutations,
  getters,
  actions
};

export default appModule;

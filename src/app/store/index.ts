import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export class AppState {
  // 页面信息
   myapp: object = {};
}

const appModule: Module<AppState, any> = {
  namespaced: true,
  state: new AppState(),
  mutations,
  getters,
  actions,
};

export default appModule;

import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export class WebSiteState {
  // 页面信息
  PageInfor: object = {};
  AppInfor: object = {}
}

const websiteModule: Module<WebSiteState, any> = {
  namespaced: true,
  state: new WebSiteState(),
  mutations,
  getters,
  actions,
};

export default websiteModule;

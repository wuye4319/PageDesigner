import { MutationTree } from 'vuex';
import { WebSiteState } from './index';
import { WebSite } from './types';
import Vue from 'vue';

const mutations: MutationTree<WebSiteState> = {
  [WebSite.appInfor](state, param) {
    state.PageInfor = param.data.pages[param.page].module;
    state.AppInfor = param.data.pages
    state.CompStore = param.data.compStore
    state.PageStyle = param.data.pages[param.page]
  },
  [WebSite.selectPage](state, param) {
    state.PageInfor = state.AppInfor[param].module
  },
  [WebSite.changePageInfor](state, param) {
    state.PageInfor = param
  },
  [WebSite.changePageInforRow](state, param) {
    Vue.set(state.PageInfor, param.index[0], param.data);
    // state.PageInfor[param.index[0]] = state.PageInfor[param.index[0]].concat(0,1,param.data)
  },
  [WebSite.editPageInfor](state, param) {
    if (state.PageInfor[param.index[0]]['compName'] === 'layout') {
      state.PageInfor[param.index[0]]['compAttr'].childList[param.index[1]]['compAttr'] = Object.assign(state.PageInfor[param.index[0]]['compAttr'].childList[param.index[1]]['compAttr'], param.data)
    } else {
      state.PageInfor[param.index[0]]['compAttr'] = Object.assign(state.PageInfor[param.index[0]]['compAttr'], param.data)
    }
  },
  [WebSite.addPageInfor](state, param) {
    state.PageInfor.push(param)
  },
  [WebSite.removePageInfor](state, param) {
    state.PageInfor.splice(param, 1)
  }
};

export default mutations;

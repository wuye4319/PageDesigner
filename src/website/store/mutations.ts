import { MutationTree } from 'vuex';
import { WebSiteState } from './index';
import { WebSite } from './types';

const mutations: MutationTree<WebSiteState> = {
  [WebSite.appInfor](state, param) {
    state.PageInfor = param.data.pages[param.page].module;
    state.AppInfor = param.data.pages
    state.CompStore = param.data.compStore.single
    state.LayoutStore = param.data.compStore.layout
  },
  [WebSite.selectPage](state, param) {
    state.PageInfor = state.AppInfor[param].module
  },
  [WebSite.changePageInfor](state, param) {
    state.PageInfor = param
  },
  [WebSite.editPageInfor](state, param) {
    state.PageInfor[param.index]['compAttr'] = Object.assign(state.PageInfor[param.index]['compAttr'], param.data)
  },
  [WebSite.addPageInfor](state, param) {
    state.PageInfor.push(param)
  },
  [WebSite.removePageInfor](state, param) {
    state.PageInfor.splice(param, 1)
  }
};

export default mutations;

import { MutationTree } from 'vuex';
import { WebSiteState } from './index';
import { WebSite } from './types';

const mutations: MutationTree<WebSiteState> = {
  [WebSite.appInfor](state, param) {
    state.PageInfor = param.data[param.page].module;
    state.AppInfor = param.data
  },
  [WebSite.changePage](state, param) {
    state.PageInfor = state.AppInfor[param].module
  },
  [WebSite.editPageInfor](state, param) {
    state.PageInfor[param.name] = param.data
  }
};

export default mutations;

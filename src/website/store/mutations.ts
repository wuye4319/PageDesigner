import { MutationTree } from 'vuex';
import { WebSiteState } from './index';
import { WebSite } from './types';

const mutations: MutationTree<WebSiteState> = {
  [WebSite.appInfor](state, param) {
    state.PageInfor = param.data[param.page].module;
    state.AppInfor = param.data
  }
};

export default mutations;

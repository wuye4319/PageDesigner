import { MutationTree } from 'vuex';
import { AppState } from './index';
import { App } from './types';

const mutations: MutationTree<AppState> = {
  [App.appInfo](state, param) {
    // state.designerPageInfor = param;
  },
  [App.myapp](state, param) {
    state.myapp = param
  },
  [App.compDetail](state, param) {
    state.compDetail = param
  },
  [App.compList](state, param) {
    state.compList = param
  },
  [App.changeCompDetail](state, param) {
    state.compDetail = param
  },
};

export default mutations;

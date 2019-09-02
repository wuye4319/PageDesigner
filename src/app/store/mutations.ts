import { MutationTree } from 'vuex';
import { AppState } from './index';
import { App } from './types';

const mutations: MutationTree<AppState> = {
  [App.appInfo](state, param) {
    // state.designerPageInfor = param;
  },
  [App.myapp](state, param) {
    state.myapp = param
  }
};

export default mutations;

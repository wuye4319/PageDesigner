import { MutationTree } from 'vuex';
import { AppState } from './index';
import { App } from './types';

const mutations: MutationTree<AppState> = {
  [App.myapp](state, param) {
    state.myapp = param;
  },
  [App.compDetail](state, param) {
    state.compDetail = param;
  },
  [App.compList](state, param) {
    state.compList = param;
  },
  [App.changeCompDetail](state, param) {
    state.compDetail = param;
  },
  [App.appDetail](state, param) {
    state.appDetail = param;
  },
  [App.docContent](state, param) {
    state.docContent = param;
  }
};

export default mutations;

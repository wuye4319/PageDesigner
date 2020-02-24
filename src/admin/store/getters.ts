import { GetterTree } from 'vuex';
import { AppState } from './index';
import { GlobalState } from '@/wrapper/store';
import { App } from './types';

const getters: GetterTree<AppState, GlobalState> = {
  [App.myapp](state) {
    return state.myapp;
  },
  [App.compList](state) {
    return state.compList;
  },
  [App.compDetail](state) {
    return state.compDetail;
  },
  [App.appDetail](state) {
    return state.appDetail;
  },
  [App.docContent](state) {
    return state.docContent;
  }
};

export default getters;

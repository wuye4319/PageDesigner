import { GetterTree } from 'vuex';
import { AppState } from './index';
import { GlobalState } from '@/wrapper/store';
import { App } from './types';

const getters: GetterTree<AppState, GlobalState> = {
  [App.appInfo](state) {
    // return state.designerPageInfor;
  },
  [App.myapp](state) {
    return state.myapp;
  }
};

export default getters;

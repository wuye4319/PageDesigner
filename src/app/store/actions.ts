import { GlobalState } from '@/wrapper/store';
import { ActionTree } from 'vuex';
import { AppState } from './index';
import { App } from './types';

const actions: ActionTree<AppState, GlobalState> = {
  [App.appInfo]({ commit }, param) {
    // let appData: any = param.data
    // commit(Designer.pageInfor, appData);
  },
  [App.myapp]({ commit }, param) {
    commit(App.myapp, param);
  }
};

export default actions;

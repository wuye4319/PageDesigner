import { GlobalState } from '@/wrapper/store';
import { ActionTree } from 'vuex';
import { AppState } from './index';
import { App } from './types';
import { getGuideDoc } from '../service/index';

const actions: ActionTree<AppState, GlobalState> = {
  [App.myapp]({ commit }, param) {
    commit(App.myapp, param);
  },
  [App.compDetail]({ commit }, param) {
    commit(App.compDetail, param);
  },
  [App.compList]({ commit }, param) {
    commit(App.compList, param);
  },
  [App.docContent]({ commit }, param) {
    getGuideDoc(param).then((res: any) => {
      if (res.data) {
        commit(App.docContent, res.data);
      }
    })
  }
};

export default actions;

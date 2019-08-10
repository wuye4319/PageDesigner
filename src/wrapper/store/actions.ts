import { ActionTree } from 'vuex';
import { GlobalState } from '.';
import { GlobalMutation } from './types';

const actions: ActionTree<GlobalState, GlobalState> = {
  [GlobalMutation.globalPageInfor]({ commit }, param) {
    // commit(GlobalMutation.globalPageInfor, param.data);
  }
};

export default actions;

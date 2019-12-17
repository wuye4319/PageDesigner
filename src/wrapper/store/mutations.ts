import { MutationTree } from 'vuex';
import { GlobalState } from '.';
import { GlobalMutation } from './types';

const mutations: MutationTree<GlobalState> = {
  [GlobalMutation.globalPageInfor](state, payload) {
    // state.globalPageInfor = payload;
  }
};

export default mutations;

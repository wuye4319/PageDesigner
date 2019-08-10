import { GetterTree } from 'vuex';
import { GlobalState } from '.';
import { GlobalMutation } from './types';

const getters: GetterTree<GlobalState, GlobalState> = {
  [GlobalMutation.globalPageInfor](state) {
    // return state.globalPageInfor;
  }
};

export default getters;

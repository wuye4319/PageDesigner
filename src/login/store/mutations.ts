import { MutationTree } from 'vuex';
import { LoginState } from './index';
import { Login } from './types';

const mutations: MutationTree<LoginState> = {
  [Login.userInfo](state, param) {
    state.userInfo = param;
  },
};

export default mutations;

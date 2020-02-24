import { GetterTree } from 'vuex';
import { LoginState } from './index';
import { GlobalState } from '@/wrapper/store';
import { Login } from './types';
import { stat } from 'fs';

const getters: GetterTree<LoginState, GlobalState> = {
  [Login.userInfo](state) {
    return state.userInfo;
  },
};

export default getters;

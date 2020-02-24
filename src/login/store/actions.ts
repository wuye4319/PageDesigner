import { GlobalState } from '@/wrapper/store';
import { ActionTree } from 'vuex';
import { LoginState } from './index';
import { Login } from './types';
import { getUserInfo } from '../service/index';

const actions: ActionTree<LoginState, GlobalState> = {
  async [Login.userInfo]({ commit }, param) {
    let userInfo = await getUserInfo(param.userId);
    commit(Login.userInfo, userInfo);
  }
};

export default actions;

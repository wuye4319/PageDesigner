import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export class LoginState {
  // 登录信息
   userInfo: object = {};
}

const loginModule: Module<LoginState, any> = {
  namespaced: true,
  state: new LoginState(),
  mutations,
  getters,
  actions,
};

export default loginModule;

import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export class DesignerState {
  // 页面信息
  // designerPageInfor: object = {};
}

const designerModule: Module<DesignerState, any> = {
  namespaced: true,
  state: new DesignerState(),
  mutations,
  getters,
  actions,
};

export default designerModule;

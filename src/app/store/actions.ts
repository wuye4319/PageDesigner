import { GlobalState } from '@/wrapper/store';
import { ActionTree } from 'vuex';
import { DesignerState } from './index';
import { Designer } from './types';

const actions: ActionTree<DesignerState, GlobalState> = {
  [Designer.pageInfor]({ commit }, param) {
    // let appData: any = param.data
    // commit(Designer.pageInfor, appData);
  }
};

export default actions;

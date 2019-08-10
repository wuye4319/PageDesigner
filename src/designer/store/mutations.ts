import { MutationTree } from 'vuex';
import { DesignerState } from './index';
import { Designer } from './types';

const mutations: MutationTree<DesignerState> = {
  [Designer.pageInfor](state, param) {
    // state.designerPageInfor = param;
  }
};

export default mutations;

import { GetterTree } from 'vuex';
import { DesignerState } from './index';
import { GlobalState } from '@/wrapper/store';
import { Designer } from './types';

const getters: GetterTree<DesignerState, GlobalState> = {
  [Designer.pageInfor](state) {
    // return state.designerPageInfor;
  }
};

export default getters;

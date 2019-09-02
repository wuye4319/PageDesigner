import { GetterTree } from 'vuex';
import { WebSiteState } from './index';
import { GlobalState } from '@/wrapper/store';
import { WebSite } from './types';

const getters: GetterTree<WebSiteState, GlobalState> = {
  [WebSite.pageInfor](state) {
    return state.PageInfor;
  },
  [WebSite.appInfor](state) {
    return state.AppInfor;
  },
  [WebSite.compStore](state) {
    return state.CompStore;
  },
  [WebSite.layoutStore](state) {
    return state.LayoutStore;
  }
};

export default getters;

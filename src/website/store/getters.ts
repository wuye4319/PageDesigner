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
  [WebSite.compList](state) {
    return state.CompList;
  },
  [WebSite.compStore](state) {
    return state.CompStore;
  },
  [WebSite.layoutStore](state) {
    return state.LayoutStore;
  },
  [WebSite.global](state) {
    return state.Global;
  },
  [WebSite.currentApps](state) {
    return state.CurrentApps;
  },
  [WebSite.tables](state) {
    return state.Tables;
  },
  [WebSite.userData](state) {
    return state.UserData;
  },
  [WebSite.defaultActions](state) {
    return state.defaultActions;
  },
  [WebSite.pageActions](state) {
    return state.pageActions;
  },
  [WebSite.tempAppData](state) {
    return state.TempAppData;
  }
};

export default getters;

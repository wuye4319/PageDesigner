import { GlobalState } from '@/wrapper/store';
import { ActionTree } from 'vuex';
import { WebSiteState } from './index';
import { WebSite } from './types';
import { getPageInfor, getProductList } from '@/website/service';

const actions: ActionTree<WebSiteState, GlobalState> = {
  async [WebSite.pageInfor]({ commit }, param) {
    let appData: any = null;
    appData = await getPageInfor(param.domain);
    commit(WebSite.appInfor, { data: appData.data.pages, page: param.page });
  },
  async getProductList({ commit }, param) {
    let appData: any = null;
    appData = await getProductList(param.id, param.size, param.page);
    return appData
    // commit(WebSite.appInfor, { data: appData.data.pages, page: param.page });
  },
  editPageInfor({ commit }, param) {
    let appData: any = null;
    appData = param.data
    commit(WebSite.pageInfor, appData);
  }
};

export default actions;

import { GlobalState } from '@/wrapper/store';
import { ActionTree } from 'vuex';
import { WebSiteState } from './index';
import { WebSite } from './types';
import { getPageInfor, getProductList } from '@/website/service';

const actions: ActionTree<WebSiteState, GlobalState> = {
  async [WebSite.pageInfor]({ commit }, param) {
    let appData: any = await getPageInfor(param.domain);
    commit(WebSite.appInfor, { data: appData.data, page: param.page });
  },
  [WebSite.selectPage]({ commit }, param) {
    commit(WebSite.selectPage, param.page);
  },
  [WebSite.editPageInfor]({ commit }, param) {
    commit(WebSite.editPageInfor, param);
  },
  // 页面商品组件
  async getProductList({ commit }, param) {
    let appData: any = await getProductList(param.id, param.size, param.page);
    return appData
  },
};

export default actions;

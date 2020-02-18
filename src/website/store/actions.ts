import { GlobalState } from '@/wrapper/store';
import { ActionTree } from 'vuex';
import { WebSiteState } from './index';
import { WebSite } from './types';
import { getPageInfor, getProductList, handlePageInfo, getPageActions, getCompList } from '@/website/service';

const actions: ActionTree<WebSiteState, GlobalState> = {
  // 初始化vuex内信息
  async [WebSite.pageInfor]({ commit }, param) {
    let appData: any = await getPageInfor(param.appID);
    commit(WebSite.appInfor, { data: appData.data, page: param.page });
  },
  // 获取组件列表
  async [WebSite.compList]({ commit }, param) {
    let res: any = await getCompList(param);
    let compList = res && res.data;
    commit(WebSite.compList, compList);
  },
  // 页面改变时
  [WebSite.selectPage]({ commit }, param) {
    commit(WebSite.selectPage, param.page);
  },
  [WebSite.editPageInfor]({ commit }, param) {
    commit(WebSite.editPageInfor, param);
  },
  // 设置页面函数
  async [WebSite.pageActions]({ commit }, params) {
    let resData: any = await getPageActions(params);
    let actionStr = resData.data && resData.data[0] ? resData.data[0].actionsStr : '';
    commit(WebSite.pageActions, actionStr);
  }, // defaultActions
  // 设置默认函数
  async [WebSite.defaultActions]({ commit }, params) {
    let resData: any = await getPageActions(params);
    if (resData.data && resData.data[0]) {
      commit(WebSite.defaultActions, resData.data[0].actionsStr);
    }
  },
  // 改变 全局信息
  async [WebSite.handleAppInfo]({ commit }, options) {
    let res: any = await handlePageInfo(options.url, options.params);
    if (res && res.data === 'success' && res.msg === 'success') {
      commit(WebSite.handleAppInfo, options.params);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('error'));
    }
  },
  // 页面商品组件
  async getProductList({ commit }, param) {
    let appData: any = await getProductList(param.id, param.size, param.page);
    return appData;
  },
  // 操作页面数据
  async [WebSite.handleUserData]({ commit }, { asyncfn, key, filterfn }) {
    let res:any = await asyncfn();
    if (typeof filterfn === 'function') {
      commit(WebSite.handleUserData,
        {
          key,
          value: filterfn(res)
        }
      );
    } else {
      commit(WebSite.handleUserData, {
        key,
        value: res
      });
    }
  }
};

export default actions;

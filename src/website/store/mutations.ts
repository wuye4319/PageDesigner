import { MutationTree } from 'vuex';
import { WebSiteState } from './index';
import { WebSite } from './types';
import Vue from 'vue';

enum HandleAppEnum {
  page = 'AppInfor',
  global = 'Global'
}

let globalObj = { // 全局初始化对象数据
  appStyle: { 'background': { 'width': '100%', 'height': '100%', 'backgroundColor': '#ffffff', 'backgroundOpacity': 100 }, 'border': { 'commonStyle': 'none', 'commonWidth': '0px', 'commonColor': '#000000', 'borderLeftWidth': '', 'borderLeftStyle': '', 'borderLeftColor': '', 'borderTopWidth': '', 'borderTopStyle': '', 'borderTopColor': '', 'borderRightWidth': '', 'borderRightStyle': '', 'borderRightColor': '', 'borderBottomWidth': '', 'borderBottomStyle': '', 'borderBottomColor': '', 'borderTopLeftRadius': '', 'borderTopRightRadius': '', 'borderBottomLeftRadius': '', 'borderBottomRightRadius': '' }, 'font': { 'fontFamily': 'Microsoft YaHei', 'fontSize': '16px', 'fontWeight': '400', 'fontColor': '#000000', 'textDecoration': 'none', 'textTransform': 'none', 'textAlign': 'center' } },
  theme: { '@primary-color': '#17BC94', '@success-color': '#52c41a', '@warning-color': '#faad14', '@error-color': '#f5222d', '@font-size-base': '14px', '@heading-color': ['#000000', 85], '@text-color': ['#000000', 65], '@text-color-secondary': ['#000000', 45], '@disabled-color': ['#000000', 25], '@border-radius-base': '4px', '@border-color-base': '#d9d9d9' }
};

const mutations: MutationTree<WebSiteState> = {
  [WebSite.appInfor](state, param) {
    // let pageInfor = JSON.parse(param.data.apps.pageInfor)
    let pageInfor = param.data.apps.pageInfor;
    state.PageInfor = pageInfor[param.page] && pageInfor[param.page].module;
    state.AppInfor = pageInfor;
    state.CurrentApps = param.data.apps;
    state.CompStore = param.data.compStore;
    state.Global = Object.keys(param.data.global).length > 0 ? param.data.global : globalObj;
    state.Tables = param.data.tables;
    // 全局注入JS
    eval(param.data.apps.jsCode); // eslint-disable-line
  },
  [WebSite.compList](state, param) {
    state.CompList = param;
    state.CompStore = param || [];
  },
  [WebSite.selectPage](state, param) {
    state.PageInfor = state.AppInfor[param].module;
  },
  [WebSite.changePageInfor](state, param) {
    Object.assign(state.PageInfor, param);
  },
  [WebSite.changePageInforRow](state, param) {
    Vue.set(state.PageInfor, param.index[0], param.data);
    // state.PageInfor[param.index[0]] = state.PageInfor[param.index[0]].concat(0,1,param.data)
  },
  [WebSite.editPageInfor](state, param) {
    if (param.index.i === -1) {
      Object.assign(param.index.source, param.data);
    } else {
      state.PageInfor[param.index.i]['compAttr'] = Object.assign(state.PageInfor[param.index.i]['compAttr'], param.data);
    }
  },
  [WebSite.addPageInfor](state, param) {
    state.PageInfor.push(param);
  },
  [WebSite.removePageInfor](state, param) {
    state.PageInfor.splice(param, 1);
  },
  [WebSite.handleAppInfo](state, param) { // param是所有包含apps、global等属性
    Object.keys(param).forEach((k) => {
      state[HandleAppEnum[k]] = Object.assign({}, param[k]);
    });
  },
  [WebSite.pageActions](state, param) {
    state.pageActions = param;
  },
  [WebSite.defaultActions](state, param) {
    state.defaultActions = param;
  },

  // 用户提交数据
  [WebSite.handleUserData](state, { key, value }) { // param是所有包含apps、global等属性
    Vue.set(state.UserData, key, value);
  },
  // 改变临时应用数据
  [WebSite.tempAppData](state, { key, value }) {
    Vue.set(state.TempAppData, key, value);
  }
};

export default mutations;

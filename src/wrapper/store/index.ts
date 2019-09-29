import Vue from 'vue';
import Vuex from 'vuex';
import WebSite from '@/website/store'
import Designer from '@/designer/store';
import App from '@/admin/store'; // app模块store
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export class GlobalState {
  // globalPageInfor: object = {}
}

export default new Vuex.Store<GlobalState>({
  modules: {
    designer: Designer,
    webSite: WebSite,
    app: App
  },
  state: new GlobalState(),
  mutations,
  actions,
  getters,
});

import Vue from 'vue';
import Router from 'vue-router';
import Layout from './wrapper/Layout.vue';
import routes from './wrapper/router';
import store from './wrapper/store';
import * as utils from '@/common/utils';
import vuexEvent from '@/common/vuexEvent/vuex-events';
// 增加多语言
import multilingual from './multilingual';
// 按需引入 ant-design-vue
import { message, Modal } from 'ant-design-vue';

let i18n = multilingual(Vue);
// 全局的提示
Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
// util.js是通过store来传入,还是window.super.util
Vue.config.productionTip = false;

Vue.use(Router);
// 发布订阅者模式挂载vuex
vuexEvent(store)

Vue.prototype.$utils = utils;
window.$utils = utils;

const router = new Router({
  routes
});
router.beforeEach((to: any, from: any, next: any) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
// $bust做简单通知使用
// Vue.prototype.$bus = new Vue({ data: { compList: { all: {} }, pageMax: 0 } });
new Vue({
  router,
  i18n,
  store, // 此处考虑模块的动态按需加载
  render: h => h(Layout)
}).$mount('#app');

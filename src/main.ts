import Vue from 'vue';
import Router from 'vue-router';
import Layout from './wrapper/Layout.vue';
import routes from './wrapper/router';
import store from './wrapper/store';
import 'ant-design-vue/dist/antd.less'
import * as utils from '@/common/utils';
import Antd from 'ant-design-vue';

// util.js是通过store来传入,还是window.super.util
Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(Antd)

Vue.prototype.$utils = utils;
window.$utils = utils;

const router = new Router({
  routes,
});
router.beforeEach((to: any, from: any, next: any) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  store, // 此处考虑模块的动态按需加载
  render: h => h(Layout),
}).$mount('#app');

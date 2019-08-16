const routes = [{
  path: '/app/',
  name: 'app',
  meta: {
    title: '应用管理'
  },
  component: () => import('@/app/pages/index.vue')
}];

export default routes;
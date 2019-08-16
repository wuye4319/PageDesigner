const routes = [{
  path: '/designer/:page',
  name: 'designer',
  meta: {
    title: '页面设计器'
  },
  component: () => import('@/designer/pages/index.vue')
}];

export default routes;
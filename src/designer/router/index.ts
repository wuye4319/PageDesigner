const routes = [{
  path: '/designer/:page',
  name: 'designer',
  meta: {
    title: '工作表'
  },
  component: () => import('@/designer/pages/index.vue')
}];

export default routes;
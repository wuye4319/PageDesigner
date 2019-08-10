export default [{
  path: '/website/:page',
  name: 'website',
  meta: {
    title: '工作表'
  },
  component: () => import('@/website/pages/index.vue')
}];

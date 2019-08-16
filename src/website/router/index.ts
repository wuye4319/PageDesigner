export default [{
  path: '/website/:page',
  name: 'website',
  meta: {
    title: '应用展示页面'
  },
  component: () => import('@/website/pages/index.vue')
}];

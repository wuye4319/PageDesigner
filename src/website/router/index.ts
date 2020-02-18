import website from '@/website/pages/index.vue'

export default [{
  path: '/website/:appID/:page',
  name: 'website',
  meta: {
    title: '应用展示页面'
  },
  component: website
}];

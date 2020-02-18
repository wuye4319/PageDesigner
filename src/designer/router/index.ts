import designer from '@/designer/pages/index.vue'

const routes = [{
  path: '/designer/:appID/:page',
  name: 'designer',
  meta: {
    title: '页面设计器'
  },
  component: designer
}];

export default routes;

import admin from '@/admin/pages/index.vue'

const appRouterList = [
  { path: 'userInfor', name: 'app-userInfor', meta: { title: '个人信息修改' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/userInfor/index.vue`) },
  { path: 'appshop', name: 'app-appshop', meta: { title: '应用市场' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/appshop/index.vue`) },
  { path: 'compshop', name: 'app-compshop', meta: { title: '组件市场' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/compshop/index.vue`) },
  { path: 'guide', name: 'app-guide', meta: { title: '开发指南' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/guide/index.vue`) },
  { path: 'database', name: 'app-database', meta: { title: '数据中心' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/database/index.vue`) }
]

const myappRouterList = [
  { path: 'myapp/manage', name: 'app-myapp-manage', meta: { title: '我的应用管理' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/myapp/manage.vue`) },
  { path: 'myapp/appdetail', name: 'app-myapp-appdetail', meta: { title: '应用详情' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/myapp/appdetail.vue`) },
  { path: 'myapp/collect', name: 'app-myapp-collect', meta: { title: '我的收藏' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/myapp/collect.vue`) }
]

const myCompRouterList = [
  { path: 'mycomp/complist', name: 'app-mycomp-complist', meta: { title: '组件列表' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/mycomp/complist.vue`) },
  { path: 'mycomp/default', name: 'app-mycomp-default', meta: { title: '内置组件' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/mycomp/default.vue`) },
  { path: 'mycomp/collect', name: 'app-mycomp-collect', meta: { title: '收藏组件' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/mycomp/collect.vue`) },
  { path: 'mycomp/detail', name: 'app-mycomp-detail', meta: { title: '组件说明' }, component: () => import(/* webpackChunkName: "app" */ `@/admin/components/mycomp/detail.vue`) }
]

const routes: any = [
  {
    path: '/admin/',
    name: 'admin',
    meta: {
      title: '应用管理'
    },
    redirect: '/admin/myapp/manage',
    component: admin,
    children: [
      ...appRouterList,
      ...myappRouterList, // myapp 子类
      ...myCompRouterList // mycomp 子类
    ]
  }
];

export default routes;

const appRouterInfo = [
  { name: 'screen', meta: { title: '引导页' } },
  { name: 'appshop', meta: { title: '应用市场' } },
  { name: 'notice', meta: { title: '自定义组件' } }
];
const myappRouterInfo = [ // myapp
  { name: 'manage', meta: { title: '我的应用管理' } },
  { name: 'comp', meta: { title: '我的组件管理' } },
  { name: 'collect', meta: { title: '我的收藏' } },
  { name: 'share', meta: { title: '我的分享' } },
  { name: 'detail', meta: { title: '组件说明' } }
];

interface RouteInfo {
  name: string,
  meta: object
}

const routes: any = [
  {
    path: '/admin/',
    name: 'admin',
    meta: {
      title: '应用管理'
    },
    redirect: '/admin/screen',
    component: () => import('@/admin/pages/index.vue'),
    children: [
      ...getRouterList('app', appRouterInfo), // app
      ...getRouterChildList('myapp', myappRouterInfo), // myapp
    ]
  },
];

function getRouterList(type: string, nameList: object[]): object[] {
  let arr = [];
  for (let item of Array.from(nameList.values())) {
    let obj: RouteInfo = {
      name: '',
      meta: {}
    }
    Object.assign(obj, item)
    arr.push({
      path: obj.name,
      name: `${type}-${obj.name}`,
      meta: obj.meta,
      component: () => import(/* webpackChunkName: "app" */ `@/admin/components/${obj.name}/index.vue`)
    })
  }
  return arr
}
function getRouterChildList(type: string, nameList: object[]): object[] {
  let arr = [];
  for (let item of Array.from(nameList.values())) {
    let obj: RouteInfo = {
      name: '',
      meta: {}
    }
    Object.assign(obj, item)
    arr.push({
      path: `${type}/${obj.name}`,
      name: `app-${type}-${obj.name}`,
      meta: obj.meta,
      component: () => import(/* webpackChunkName: "app" */ `@/admin/components/${type}/${obj.name}.vue`)
    })
  }
  return arr
}

export default routes;

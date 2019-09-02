const appRouterInfo = [
  { name: 'screen', title: '引导页' },
  { name: 'myapp', title: '我的应用' },
  { name: 'appshop', title: '应用市场' }
];
const myappRouterInfo = [
  { name: 'manage', title: '我的应用管理' },
  { name: 'collect', title: '我的收藏' },
  { name: 'share', title: '我的分享' }
];

interface RouteInfo {
  name:string,
  title:string
}

const routes:any = [
  {
    path: '/app/',
    name: 'app',
    meta: {
      title: '应用管理'
    },
    redirect: '/app/screen',
    component: () => import('@/app/pages/index.vue'),
    children: [
      ...getRouterList('app', appRouterInfo), // app
      ...getRouterChildList('myapp', myappRouterInfo), // myapp
    ]
  },

];

function getRouterList(type:string, nameList:object[]):object[] {
  let arr = [];
  for (let item of Array.from(nameList.values())) {
    let obj:RouteInfo = {
      name: '',
      title: ''
    }
    Object.assign(obj, item)
    arr.push({
      path: obj.name,
      name: `${type}-${obj.name}`,
      meta: {
        title: obj.title
      },
      component: () => import(/* webpackChunkName: "app" */ `@/app/components/${obj.name}/index.vue`)
    })
  }
  return arr
}
function getRouterChildList(type:string, nameList:object[]):object[] {
  let arr = [];
  for (let item of Array.from(nameList.values())) {
    let obj:RouteInfo = {
      name: '',
      title: ''
    }
    Object.assign(obj, item)
    arr.push({
      path: `${type}/${obj.name}`,
      name: `${type}-${obj.name}`,
      meta: {
        title: obj.title
      },
      component: () => import(/* webpackChunkName: "app" */ `@/app/components/${type}/${obj.name}.vue`)
    })
  }
  return arr
}

export default routes;

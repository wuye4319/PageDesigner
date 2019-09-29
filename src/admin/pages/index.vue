<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      width="230"
      collapsible
      v-model="collapsed"
    >
      <div class="logo"/>
      <a-menu
        theme="dark"
        mode="inline"
        :defaultSelectedKeys="defaultSelectedKeys"
        :defaultOpenKeys="defaultSelectedKeys"
        @select="selectMenu"
      >
        <template v-for="item of appMenu">
          <template v-if="item.children.length > 0">
            <a-sub-menu :key="item.key">
              <span slot="title">
                <a-icon :type="item.icon"/>
                <span>{{ item.name }}</span>
              </span>
              <a-menu-item :key="child.key" v-for="child of item.children">{{ child.name }}</a-menu-item>
            </a-sub-menu>
          </template>

          <template v-else>
            <a-menu-item :key="item.key">
              <a-icon :type="item.icon"/>
              <span>{{ item.name }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="app-header" style>
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '580px' }"
      >
        <div
          class="app-content"
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <!-- <component :is="appComponents"/> -->
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Select, Button, Input } from 'ant-design-vue';

const webSite = namespace('webSite');

// 菜单配置
const myappMenu: Array<object> = [
  { name: '我的应用', key: 'myapp-manage' },
  { name: '我的组件', key: 'myapp-comp' },
  { name: '我的收藏', key: 'myapp-collect' },
  { name: '我的分享', key: 'myapp-share' }
];

const appMenu: Array<object> = [
  { key: 'screen', name: '引导页', icon: 'tag', children: [] },
  { key: 'myapp', name: '我的应用', icon: 'user', children: myappMenu },
  { key: 'appshop', name: '应用市场', icon: 'star', children: [] },
  { key: 'notice', name: '自定义组件', icon: 'setting', children: [] }
];

@Component({
  name: 'page-index',
  components: {
    ASelete: Select,
    AButton: Button,
    AInput: Input
  }
})
export default class Pageindex extends Vue {
  $router;
  $route;
  collapsed: boolean = false; // 当前收起状态
  appMenu: object = Object.freeze(appMenu); // 菜单数组
  defaultOpenKeys: string[] = []; // 初始展开的 SubMenu 菜单项 key 数组
  defaultSelectedKeys: string[] = []; // 初始选中的菜单项 key 数组

  @webSite.Getter('pageInfor')
  pageInfor;

  // 菜单被选中时调用 obj = { item, key, selectedKeys }
  created() {
    let fullPath = this.$route.fullPath;
    let defaultSelectedKeys = fullPath.split('/')[3]
      ? `${fullPath.split('/')[2]}-${fullPath.split('/')[3]}`
      : fullPath.split('/')[2];
    let defaultOpenKeys = fullPath.split('/')[3]
      ? `${fullPath.split('/')[2]}`
      : '';
    this.defaultOpenKeys = [defaultOpenKeys];
    this.defaultSelectedKeys = [defaultSelectedKeys];
  }

  selectMenu(obj): void {
    this.$router.push({
      name: `app-${obj.key}`
    });
  }
}
</script>
<style lang='less' scoped>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.app-header {
  background: #fff;
  padding: 0 20px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/deep/.ant-layout-content{
  height: calc(100vh - 112px);
  box-sizing: border-box;
  overflow: scroll;
}
</style>

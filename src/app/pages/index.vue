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
        :defaultSelectedKeys="['screen']"
        @select="selectMenu"
      >
        <a-menu-item v-for="item of appMenu" :key="item.key">
          <a-icon :type="item.icon"/>
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '680px' }"
      >
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="app-content" :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
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
import { Select, Button, Input } from 'ant-design-vue'

const app = namespace('app');

// 菜单配置
const appMenu:Array<object> = [
  { key: 'screen', name: '引导页', icon: 'tag' },
  { key: 'myapp', name: '我的应用', icon: 'user' },
  { key: 'appshop', name: '应用市场', icon: 'star' }
]

@Component({
  name: 'page-index',
  components: {
    ASelete: Select,
    AButton: Button,
    AInput: Input
  }
})
export default class Pageindex extends Vue {
  $router
  $route
  collapsed: boolean = false // 当前收起状态
  appMenu:object = Object.freeze(appMenu) // 菜单数组

  // 菜单被选中时调用 obj = { item, key, selectedKeys }
  selectMenu(obj):void {
    console.log(111111111);

    this.$router.push({
      name: `app-${obj.selectedKeys}`
    })
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

</style>

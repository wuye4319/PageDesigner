<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" width="230" collapsible v-model="collapsed">
      <div class="logo"/>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="user"/>
          <span>引导页</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera"/>
          <span>我的应用</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="video-camera"/>
          <span>应用市场</span>
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
        <div class="app-content">
          <div class="create-mobile-app">
            <a href="#/designer/product/">创建移动APP</a>
          </div>
          <div class="create-web-app">创建web端APP</div>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Select, Button, Input } from 'ant-design-vue'

const webSite = namespace('webSite');

@Component({
  name: 'page-index',
  components: {
    ASelete: Select,
    AButton: Button,
    AInput: Input
  }
})
export default class Pageindex extends Vue {
  collapsed: boolean = false
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
.app-content {
  display: flex;
  justify-content: space-around;
  > div {
    border: 1px solid #ddd;
    width: 30%;
    height: 260px;
    text-align: center;
    line-height: 260px;
  }
}
</style>

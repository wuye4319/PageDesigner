<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      width="230"
      collapsible
      v-model="collapsed"
    >
      <div
        v-if="!collapsed"
        class="logo"
      >组件管理平台</div>
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
                <a-icon :type="item.icon" />
                <span>{{ item.name }}</span>
              </span>
              <a-menu-item
                :key="child.key"
                v-for="child of item.children"
              >{{ child.name }}</a-menu-item>
            </a-sub-menu>
          </template>

          <template v-else>
            <a-menu-item :key="item.key">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        class="app-header"
        style
      >
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <!-- <div class="leftOpt"> -->
        <!-- <a-button @click="goToAppMarket" type="primary"><a-icon type="shop" />应用市场</a-button> -->
        <a-popover
          trigger="click"
          v-model="visible"
          placement="bottomRight"
        >
          <template slot="content">
            <p
              class="list"
              @click="handleUserInfo"
            >
              <a-icon type="user" />
              {{ userInfo.userName }}
            </p>
            <p
              class="list"
              @click="hanldeLogout"
            >
              <a-icon type="logout" />退出登录
            </p>
          </template>
          <div class="userIcon">
            <UserModal
              :visible="userVisible"
              :closeModal="closeUserModal"
            />
          </div>
        </a-popover>

        <!-- </div> -->
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '18px 12px 0 12px', background: '#fff', minHeight: '580px' }">
        <div
          class="app-content"
          :style="{ background: '#fff', minHeight: '360px' }"
        >
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Layout, Menu, Icon, Button, Popover } from 'ant-design-vue';
import Tools from '../../common/utils/tools';
import UserModal from '../components/common/userInfoModal.vue';

const app = namespace('app');
const utils = new Tools();

// 菜单配置
const myappMenu: Array<object> = [
  { name: '应用列表', key: 'myapp-manage' },
  { name: '我的收藏', key: 'myapp-collect' }
];
const myCompMenu: Array<object> = [
  { name: '内置组件', key: 'mycomp-default' },
  { name: '组件列表', key: 'mycomp-complist' },
  { name: '我的收藏', key: 'mycomp-collect' }
];
const devGuides: Array<object> = [
  { name: '设计我的第一个页面', key: 'guide-use' },
  { name: '自定义组件开发说明', key: 'guide-comp' },
  { name: '自定义组件上传说明', key: 'guide-upload' },
  { name: '视图层数据结构说明', key: 'guide-data' },
  { name: '组件控制层开发说明', key: 'guide-ctrl' },
  { name: '数据绑定的对接规范', key: 'guide-coop' },
  { name: '事件联动规范', key: 'guide-event' },
  { name: '移动端单位规范', key: 'guide-unit' },
  { name: '代码编辑器api', key: 'guide-codeapi' },
  { name: '国际化', key: 'guide-locale' },
  { name: '云枢初步接入指南', key: 'guide-cloudpivot' }
];

const appMenu: Array<object> = [
  { key: 'myapp', name: '我的应用', icon: 'user', children: myappMenu },
  { key: 'mycomp', name: '自定义组件', icon: 'inbox', children: myCompMenu },
  { key: 'guide', name: '开发指南', icon: 'setting', children: devGuides },
  { key: 'appshop', name: '应用市场', icon: 'shop', children: [] },
  { key: 'compshop', name: '组件市场', icon: 'shopping', children: [] }
];

@Component({
  name: 'page-index',
  components: {
    UserModal,
    aLayout: Layout,
    aLayoutSider: Layout.Sider,
    aLayoutHeader: Layout.Header,
    aLayoutContent: Layout.Content,
    aMenu: Menu,
    aMenuItem: Menu.Item,
    aSubMenu: Menu.SubMenu,
    aIcon: Icon,
    aButton: Button,
    aPopover: Popover
  }
})
export default class Pageindex extends Vue {
  // $router;
  $route;
  collapsed: boolean = false; // 当前收起状态
  appMenu: object = Object.freeze(appMenu); // 菜单数组
  defaultOpenKeys: string[] = []; // 初始展开的 SubMenu 菜单项 key 数组
  defaultSelectedKeys: string[] = []; // 初始选中的菜单项 key 数组
  visible: boolean = false;
  userInfo: any = {};
  userVisible: boolean = false;

  @app.Action('docContent')
  getDocContent;

  // 菜单被选中时调用 obj = { item, key, selectedKeys }
  created() {
    let fullPath = this.$route.fullPath;
    this.defaultOpenKeys[0] = fullPath.split('/')[2];
    let temp = fullPath.split('/');
    temp.splice(0, 2);
    this.defaultSelectedKeys[0] = temp.join('-');
    if (fullPath.indexOf('admin/guide')) {
      this.getDocContent('use');
    }
    // let defaultSelectedKeys = fullPath.split('/')[3]
    //   ? `${fullPath.split('/')[2]}-${fullPath.split('/')[3]}`
    //   : fullPath.split('/')[2];
    // let defaultOpenKeys = fullPath.split('/')[3]
    //   ? `${fullPath.split('/')[2]}`
    //   : '';
    // this.defaultOpenKeys = [defaultOpenKeys];
    // this.defaultSelectedKeys = [defaultSelectedKeys];

    let userID: any = utils.getCookie('userID');
    let userName: any = utils.getCookie('userName');
    this.userInfo.userID = userID;
    this.userInfo.userName = userName;
  }

  selectMenu(obj): void {
    this.defaultSelectedKeys = obj.selectedKeys;
    this.defaultOpenKeys = [obj.key.split('-')[0]];
    if (obj.key.indexOf('guide') !== -1) {
      let docName = obj.key.split('-')[1];
      this.getDocContent(docName);
      this.$router.push({
        name: `app-guide`
      });
    } else {
      this.$router.push({
        name: `app-${obj.key}`
      });
    }
  }

  hanldeLogout() {
    this.$router.push({
      path: `/login`
    });
    utils.setCookie('userID', ';expires=0');
    utils.setCookie('userName', ';expires=0');
    utils.setCookie('userType', ';expires=0');
    utils.setCookie('userPhone', ';expires=0');
    utils.setCookie('userAge', ';expires=0');
  }
  handleUserInfo() {
    // this.userVisible = true;
    this.$router.push({
      path: `/admin/userInfor`
    });
  }
  closeUserModal() {
    this.userVisible = false;
  }
  goToAppMarket() {
    this.$router.push({ path: '/appMarket' });
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
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  color: #fff;
  text-align: center;
}
.app-content {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
.app-header {
  background: #fff;
  padding: 0 20px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

/deep/.ant-layout-content {
  height: calc(100vh - 112px);
  box-sizing: border-box;
  overflow: auto;
}
.userIcon {
  width: 45px;
  height: 45px;
  background: url('../../../static/images/defaultHeader.jpeg') no-repeat center;
  background-size: cover;
  border-radius: 50%;
  border: 1px solid #17bc94;
  cursor: pointer;
}
.list {
  margin: 0;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    color: #17bc94;
  }
  &:first-of-type {
    border-bottom: 1px solid #eee;
  }
  i {
    margin-right: 8px;
  }
}
.leftOpt {
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 220px;
}
</style>

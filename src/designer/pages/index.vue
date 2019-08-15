<template>
  <div class="container">
    <div class="design-toolbar">
      <div class="design-logo">设计器</div>
      <div class="design-componet-list">
        <template>
          <div v-for="(view,i) in ctrlCompList.name" :key="view+i">
            <div class="comps-button" @click="showDrawer(i)">{{view}}</div>
          </div>
          <div class="design-addcomps" @click="showDrawer('all')">
            <a-icon type="plus"/>
          </div>
          <a-drawer
            title="Basic Drawer"
            placement="left"
            :closable="false"
            @close="onClose"
            :mask="false"
            width="299"
            :wrapStyle="{position:'absolute'}"
            getContainer=".design-componet-list"
            :visible="visible"
          >
            <div :is="currCompView" :pageData="currCompsData"></div>
            <a-button style="marginRight: 8px" @click="onClose">Cancel</a-button>
          </a-drawer>
        </template>
      </div>
      <div class="foot-button">button</div>
    </div>
    <div class="design-screen">
      <div class="head-bar">
        <div class="page-nav">
          <a-select v-model="pageSelect" style="width: 120px" @change="handleChange">
            <a-select-option v-for="page in pageList" :key="page" :value="page">{{page}}</a-select-option>
          </a-select>
        </div>
        <div class="screen-list">
          <ul>
            <li @click="changeScreenType(screen)" v-for="screen in screenList" :key="screen">
              <a-icon :type="screen"/>
            </li>
            <li>
              <a href="/#/website/product" target="_blank">
                <a-icon type="fullscreen"/>
              </a>
            </li>
          </ul>
        </div>
        <div class="save">
          <a-button type="primary">Save</a-button>
        </div>
      </div>
      <div class="design-iframe">
        <div class="page-container" :class="isMobile">
          <website></website>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { getCompsInfor } from '@/common/utils'
import { Select, Button, Input } from 'ant-design-vue'
import website from '@/website/pages/index.vue'

const webSite = namespace('webSite');

@Component({
  name: 'page-index',
  components: {
    ASelete: Select,
    AButton: Button,
    AInput: Input,
    website
  }
})
export default class Pageindex extends Vue {
  $router
  pageSelect: string = ''
  currCompView: any = ''
  currCompsData: object = {}
  screenList = ['mobile', 'desktop']
  isMobile: string = ''

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor

  @webSite.Action('editPageInfor')
  editPageInfor;

  get pageList() {
    let comps = Object.keys(this.appInfor)
    return comps
  }

  get ctrlCompList() {
    let compsName = Object.keys(this.pageInfor)
    let compsInfor = getCompsInfor('website/components/', compsName, true)
    return { name: compsName, dom: compsInfor }
  }

  handleChange(value) {
    this.$router.push({
      path: `/designer/${value}`,
    })
    this.editPageInfor({ page: value })
    this.pageSelect = value
  }

  created() {
    this.pageSelect = this.$router.currentRoute.params.page
  }

  visible: boolean = false

  showDrawer(i) {
    if (i === 'all') {
      this.visible = true
      this.currCompsData = { name: 'compStore', data: this.pageInfor[0] }
    } else {
      this.currCompView = this.ctrlCompList.dom[i]
      let compsName = Object.keys(this.pageInfor)
      this.currCompsData = { name: compsName[i], data: this.pageInfor[compsName[i]] }
      this.visible = true
    }
  }

  onClose() {
    this.visible = false
  }

  changeScreenType(screen) {
    if (screen === 'mobile') {
      this.isMobile = 'mobile-width'
    } else {
      this.isMobile = ''
    }
  }
}
</script>
<style lang='less' scoped>
.container {
  display: -webkit-box;
  height: 100%;
  width: 100%;
}
/deep/ .ant-select-selection-selected-value {
  line-height: 28px;
}
.design-toolbar {
  width: 300px;
  height: 100%;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  .design-logo {
    @height: 60px;
    height: @height;
    line-height: @height;
    background: #585556;
    color: #fff;
  }
  .design-componet-list {
    height: 100%;
    padding-top: 50px;
    position: relative;
    .comps-button {
      height: 50px;
      line-height: 50px;
    }
    > div {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      margin-top: 5px;
      height: 50px;
      line-height: 50px;
    }
  }
  .foot-button {
    border-top: 1px solid #ddd;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    height: 60px;
  }
}
.design-screen {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  .head-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.17);
    height: 60px;
    .page-nav {
      margin-left: 10px;
    }
    .save {
      margin-right: 10px;
    }
    > div {
      line-height: 60px;
    }
    ul li {
      line-height: 60px;
      font-size: 20px;
    }
    .screen-list ul {
      width: 120px;
      display: flex;
      justify-content: space-between;
    }
  }
  .design-iframe {
    padding: 12px;
    flex-grow: 1;
    display: flex;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    .page-container {
      width: 100%;
      height: 100%;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(0, 0, 0, 0.1);
    }
    .mobile-width {
      width: 414px;
    }
  }
}
</style>

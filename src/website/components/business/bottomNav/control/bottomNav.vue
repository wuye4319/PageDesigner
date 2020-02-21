<template>
  <div class="bottomNav">
    <h3>路由配置</h3>
    <div>
      <label>固定到底部：</label>
      <a-switch
        checkedChildren="是"
        unCheckedChildren="否"
        :checked="isFixed === 'true'"
        @change="changeVal('isFixed')"
      />
    </div>
    <div v-if="isFixed === 'true'">
      <label>导航位置：</label>
      <div class="item">
        <!-- <a-input v-model="compAttr.top" /> -->
        <a-input
          style="width: 100%"
          placeholder="请输入"
          v-model="compAttr.position"
          @change="handlePosChange"
        >
          <a-select
            slot="addonBefore"
            defaultValue="top"
            style="width: 75px;font-size: 12px"
            v-model="compAttr.posPrefix"
            @change="handlePosChange"
          >
            <a-select-option value="top">top</a-select-option>
            <a-select-option value="bottom">bottom</a-select-option>
          </a-select>
          <a-select
            slot="addonAfter"
            defaultValue="px"
            style="width: 55px;font-size: 12px"
            v-model="compAttr.posAfter"
            @change="handlePosChange"
          >
            <a-select-option value="%">%</a-select-option>
            <a-select-option value="px">px</a-select-option>
          </a-select>
        </a-input>
      </div>
    </div>
    <div class="colorPic">
      <label>颜色：</label>
      <div>
        <span>默认</span>
        <color-picker v-model="compAttr.color"/>
      </div>
      <div>
        <span>按下</span>
        <color-picker v-model="compAttr.selectColor"/>
      </div>
    </div>
    <div>
      <a-button
        size="small"
        type="primary"
        style="width: 100%;font-size: 12px"
        @click="addPage"
      >添加</a-button>
      <p style="margin:10px 0 0 0;font-size:12px">*添加底部导航时，请设置连接页面</p>
      <a-collapse :bordered="false">
        <a-collapse-panel
          v-for="(item,i) in this.compAttr.data"
          :header="item.name"
          :key="i"
          :style="customStyle"
        >
          <div>
            <span>文字：</span>
            <a-input
              size="small"
              placeholder="标题"
              v-model="item.name"
            />
          </div>
          <div>
            <span>链接至：</span>
            <a-select
              size="small"
              placeholder="请选择连接页面"
              style="width: 120px"
              v-model="item.route"
            >
              <a-select-opt-group label="站内路由">
                <a-select-option
                  v-for="page in pageList"
                  :key="page"
                  :value="page"
                >{{ page }}</a-select-option>
              </a-select-opt-group>
              <a-select-option value="custom">自定义</a-select-option>
            </a-select>
          </div>
          <div v-if="item.route === 'custom'">
            <!-- <a-input v-model="item.customLink"  placeholder="请输入链接地址" /> -->
            <a-input
              style="width: 100%"
              placeholder="请输入地址"
              @change="(e)=>{handleCustomLink(e,i)}"
            >
              <a-select
                slot="addonBefore"
                defaultValue="http://"
                style="width: 85px"
                v-model="linkPrefix"
              >
                <a-select-option value="http://">http://</a-select-option>
                <a-select-option value="https://">https://</a-select-option>
              </a-select>
            </a-input>
          </div>
          <div>
            <span>设为首页：</span>
            <a-radio
              :checked="Number(compAttr.defaultPage) === i"
              @click="setDefaultPage(i)"
              style="font-size: 12px"
            />
          </div>
          <div>
            <span>原始图标：</span>
            <a-icon
              style="font-size: 16px"
              @click="showIconSelect(item,'default')"
              :type="item.icon"
              :theme="item.iconTheme"
            />
          </div>
          <div>
            <span>按下图标：</span>
            <a-icon
              style="font-size: 16px"
              @click="showIconSelect(item,'select')"
              :type="item.iconSelect"
              :theme="item.iconSelectTheme"
            />
          </div>
          <div style="justify-content:center">
            <a-button
              size="small"
              type="danger"
              @click="deletePage(i)"
            >删除</a-button>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>

    <a-drawer
      title="选择图标"
      placement="right"
      :closable="false"
      @close="showIconSelect"
      :visible="visible"
      width="275px"
      :bodyStyle="{'padding':0}"
    >
      <a-tabs style="height:100%;">
        <a-tab-pane
          :tab="tap.title"
          v-for="(tap,n) of tabData"
          :key="tap.key"
        >
          <div class="panne-height">
            <div
              class="icon-warp"
              v-for="idata1 of iconData[n]"
              :key="idata1.type"
            >
              <div class="icon-title">{{ idata1.type }}</div>
              <a-icon
                class="icon-style"
                v-for="i of idata1.list"
                @click="iconSelec(idata1.theme,i)"
                :key="i"
                :type="i"
                :theme="idata1.theme"
              />
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import iconData from './iconType';
import commonMixin from '@/common/mixin';
import { colorPicker } from '@/website/components/common';
import { Switch, Input, Select, Button, Collapse, Radio, Icon, Drawer, Tabs } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'bottomNav-component',
  components: {
    colorPicker,
    ASwitch: Switch,
    AButton: Button,
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
    ARadio: Radio,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    AIcon: Icon,
    ADrawer: Drawer,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane

  }
})
export default class bottomNavComponent extends Vue {
  @Prop() compData: any;
  compAttr = this.compData.compAttr;
  pageData: any = this.compData;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  customStyle =
    'background: #f7f7f7;border-radius: 4px;margin-top: 8px;border: 0;overflow: hidden';
  isFixed: string = 'true';
  routBox: Array<string> = [];
  iconData = iconData;
  visible: boolean = false;
  editRoute: any = {};
  editType: string = '';
  linkPrefix: string = 'http://'

  tabData: any[] = [
    { title: '线框', key: 'outlined' },
    { title: '实底', key: 'filled' },
    { title: '双色', key: 'twoTone' }
  ];
  mounted() {}

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }
  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  handleCustomLink(e, i) {
    this.compAttr.data[i].customLink = this.linkPrefix + e.target.value;
  }
  handlePosChange() {
    if (this.compAttr.posPrefix === 'top') {
      this.compAttr.bottom = '';
      this.compAttr.top = this.compAttr.position + this.compAttr.posAfter;
    } else {
      this.compAttr.top = '';
      this.compAttr.bottom = this.compAttr.position + this.compAttr.posAfter;
    }
  }

  // 选择面板切换
  showIconSelect(item, type) {
    this.visible = !this.visible;
    this.editType = type;
    this.editRoute = item;
  }
  // 用户选择icon
  iconSelec(theme, str) {
    if (this.editType === 'default') {
      this.editRoute.icon = str;
      this.editRoute.iconTheme = theme;
    } else {
      this.editRoute.iconSelect = str;
      this.editRoute.iconSelectTheme = theme;
    }
    this.visible = false;
  }
  addPage() {
    this.compAttr.data.push({
      id: this.compAttr.data.length + 1,
      name: '导航',
      route: '',
      icon: 'home',
      iconTheme: 'outlined',
      iconSelect: 'home',
      iconSelectTheme: 'outlined'
    });
  }
  deletePage(index) {
    if (this.compAttr.data.length <= 1) {
      this.$message.warning('已是最后一条数据，无法再删除！')
      return;
    }
    this.compAttr.data.splice(index, 1);
  }
  setDefaultPage(pageId) {
    this.compAttr.defaultPage = pageId;
  }

  changeVal(name) {
    if (name === 'isFixed') {
      this.isFixed = this.isFixed === 'true' ? 'false' : 'true'
    }
    this.pageData.compAttr[name] = this[name];
  }
}
</script>
<style lang='less' scoped>
.router {
  margin-top: 20px;
}
/deep/.ant-collapse-content-box {
  & > div {
    text-align: left;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4px 0 0 0;
    & > span {
      width: 60px;
    }
    .ant-input {
      flex: 1;
    }
    .ant-select {
      flex: 1;
    }
  }
}
.icon-warp {
  font-size: 16px;
  padding-bottom: 5px;
  .icon-title {
    font-size: 14px;
    font-weight: bolder;
  }
  .icon-style {
    cursor: pointer;
    padding: 6px;
    transition: transform ease 300ms;
    &:hover {
      transform: scale(1.4);
      color: red;
    }
  }
}
.bottomNav {
  font-size: 12px;
  &>div{
    margin-top: 12px;
  }
  /deep/.ant-collapse-header{
    font-size: 12px;
  }
  /deep/.ant-drawer-body {
    padding: 6px !important;
  }
}
.colorPic {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  &>div{
    display: flex;
    align-items: center;
    span{
      margin-right: 6px;
    }
  }
}
.item{
  margin: 8px 0 0 0;
  /deep/.ant-select-selection__rendered{
    margin: 0 6px;
  }
  span{
    display: inline-block;
    width: 40px;
    text-align: right;
    padding-right: 16px;
  }
  .ant-input{
    width: 120px;
  }
  .ant-input-number{
    width: 120px;
  }
}
</style>

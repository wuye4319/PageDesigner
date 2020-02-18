<template>
  <div class="compAttr button-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">按钮文本:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入按钮文本"
          v-model="value"
          @blur="changeVal('value')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">图标:</div>
        </a-list-item-meta>
        <a-switch
          size="small"
          v-model="icon"
          @change="changeVal('icon')" />
        <a-icon
          style="margin-left: 10px;font-size: 14px;margin-right:10px"
          @click="showIconModal"
          :theme="iconTheme || 'filled'"
          :type="iconType || 'plus'" />
        <color-picker v-model="compAttr.iconColor" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">类型:</div>
        </a-list-item-meta>
        <a-select
          v-model="type"
          @change="changeVal('type')"
          style="width: 100%">
          <a-select-option value="default">default</a-select-option>
          <a-select-option value="primary">primary</a-select-option>
          <a-select-option value="dashed">dashed</a-select-option>
          <a-select-option value="danger">danger</a-select-option>
          <a-select-option value="link">link</a-select-option>
        </a-select>
        <!-- <a-radio-group
          @change="changeVal('type')"
          v-model="type"
          class="type-radio"
        >
          <a-radio value="primary">主题色</a-radio>
          <a-radio value="default">白色</a-radio>
        </a-radio-group> -->
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">尺寸:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('size')"
          v-model="size"
          class="type-radio"
        >
          <a-radio value="small">小</a-radio>
          <a-radio value="default">中</a-radio>
          <a-radio value="large">大</a-radio>
        </a-radio-group>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">宽度:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('width')"
          v-model="width"
          class="type-radio"
        >
          <a-radio value="200px">auto</a-radio>
          <a-radio value="100%">100%</a-radio>
        </a-radio-group>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">边距:</div>
        </a-list-item-meta>
        <a-input
          placeholder="边距"
          v-model="margin"
          @blur="changeVal('margin')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">禁用:</div>
        </a-list-item-meta>
        <a-switch v-model="status" @change="changeVal('status')" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">api事件:</div>
        </a-list-item-meta>
        <div>click()</div>
      </a-list-item>
    </a-list>
    <a-drawer
      title="选择图标"
      placement="right"
      :closable="false"
      :visible="visible"
      width="275px"
      :bodyStyle="{'padding':0}"
    >
      <a-tabs style="height:100%;">
        <a-tab-pane
          :tab="tap.title"
          v-for="(tap,n) of tabData"
          :key="tap.key">
          <div class="panne-height">
            <div
              class="icon-warp"
              v-for="idata1 of iconData[n]"
              :key="idata1.type">
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Select, Icon, Switch, Radio, Tabs, Drawer } from 'ant-design-vue';
import { colorPicker } from '@/website/components/common';
import iconData from './iconType';
import IconSelect from '../../../common/icon-selec/icon-selec.vue';
const webSite = namespace('webSite');

@Component({
  name: 'active-component',
  components: {
    colorPicker,
    IconSelect,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    AIcon: Icon,
    ASwitch: Switch,
    ARadioGroup: Radio.Group,
    ARadio: Radio,
    ATabs: Tabs,
    ADrawer: Drawer,
    ATabPane: Tabs.TabPane
  }
})
export default class activeComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: number;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;
  @webSite.Mutation('editPageInfor')
  editPageInfor;

  compAttr: any = this.compData.compAttr;
  iconData = iconData;

  value: string = '';
  type: string = 'primary';
  width: string = '200px';
  size: string = 'default';
  margin: string = '';
  status: boolean = false;
  icon: boolean = false;
  iconType: string = '';
  iconTheme: string = '';
  visible: boolean = false;
  tabData: any[] = [
    { title: '线框', key: 'outlined' },
    { title: '实底', key: 'filled' },
    { title: '双色', key: 'twoTone' }
  ];

  created(): void {
    for (let key of Object.keys(this.compAttr)) {
      this[key] = this.compAttr[key];
    }
  }

  changeVal(name) {
    this.$set(this.compAttr, name, this[name])
  }

  iconSelec(theme, str) {
    this.iconType = str;
    this.iconTheme = theme;
    this.visible = false;
    this.changeVal('iconType')
    this.changeVal('iconTheme')
  }
  showIconModal() {
    this.visible = true;
  }
}
</script>

<style lang="less" scoped>
.button-component {
  .radio-group {
    display: flex;
    flex-direction: row;
  }
}
.ant-radio-wrapper{
  margin: 0;
}
.compAttr {
  font-size: 12px;
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.7;
    justify-content: flex-start;
  }
}
.borderSelect {
  width: 100%;
}
</style>

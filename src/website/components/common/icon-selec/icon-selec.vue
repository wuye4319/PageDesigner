<template>
  <div class="compAttr">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">{{ userText.select }}</div>
        </a-list-item-meta>
        <div class="icon-tip-warp" @click="changePanel">
          <a-icon
            :style="{color:iconInfo.color}"
            :type="iconInfo.type"
            :theme="iconInfo.theme"
            :twoToneColor="iconInfo.color"
            class="icon-tip" />
          <span v-if="iconInfo.type==='null'">无</span>
          <a-icon
            type="right"
            theme="outlined"
            class="icon-right" />
        </div>
      </a-list-item>
      <a-list-item v-if="userSet.size">
        <a-list-item-meta>
          <div slot="description">{{ userText.size }}</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入字体大小"
          v-model="iconInfo.fontSize"
          @blur="changeVal('fontSize')" />
      </a-list-item>

      <a-list-item v-if="userSet.color">
        <a-list-item-meta>
          <div slot="description">{{ userText.color }}</div>
        </a-list-item-meta>
        <color-picker v-model="iconInfo.color" @change="changeVal('color')" />
      </a-list-item>
    </a-list>
    <div class="user-selec-icon" :class="{'show-user-selec':iconPanKs}">
      <div @click="changePanel" class="user-return">
        <a-icon
          type="left"
          theme="outlined"
          class="icon-left" />
        请选择图标</div>
      <div class="tab-height">
        <a-tabs defaultActiveKey="1" style="height:100%;">
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
                <template v-for="i of idata1.list">
                  <span
                    v-if="i==='null'"
                    :key="i"
                    @click="iconSelec(idata1.theme,i)"
                    class="icon-style">无</span>
                  <a-icon
                    v-else
                    @click="iconSelec(idata1.theme,i)"
                    class="icon-style"
                    :key="i"
                    :type="i"
                    :theme="idata1.theme" />
                </template>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// 用法 支持change事件，与v-model 是Object Object 默认值是 {color: '#000',fontSize: '14px',theme: 'outlined', type: 'step-backward'};
// 直持两个prop属性 textSet 默认 { select: '图标选择', size: '图标大小',  color: '图标颜色' } optionSet 默认  { size: true,color: true } 控制大小，及颜色控制器显隐
import { Component, Vue, Model, Prop } from 'vue-property-decorator';
import { colorPicker } from '@/website/components/common'; // 颜色选择器
import iconData from './iconType';
import { List, Input, Tabs, Icon } from 'ant-design-vue';
@Component({
  name: 'active-component',
  components: {
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AIcon: Icon
  }
})
export default class activeComponent extends Vue {
  @Model('getInfo') info: any;
  iconInfo: any = {
    color: '#000',
    fontSize: '14px',
    theme: 'outlined',
    type: 'step-backward'
  };
  @Prop({
    default: () => {}
  })
  textSet!: any;
  @Prop({
    default: () => {}
  })
  optionSet!: any;
  get userText() {
    return Object.assign(
      {
        select: '图标选择',
        size: '图标大小',
        color: '图标颜色'
      },
      this.textSet
    );
  }
  get userSet() {
    return Object.assign(
      {
        size: true,
        color: true
      },
      this.optionSet
    );
  }

  // 控制icon选择面板
  iconPanKs: boolean = false;
  iconData: any[] = iconData;
  tabData: any[] = [
    { title: '线框', key: '1' },
    { title: '实底', key: '2' },
    { title: '双色', key: '3' }
  ];
  created(): void {
    let temp = Object.assign(this.iconInfo, this.info)
    this.iconInfo = Object.assign(this.info, temp);
  }
  // 选择面板切换
  changePanel() {
    this.iconPanKs = !this.iconPanKs;
  }
  changeVal(name) {
    this.$emit('getInfo', this.iconInfo);
    this.$emit('change', this.iconInfo);
  }
  // 用户选择icon
  iconSelec(theme, str) {
    this.iconInfo.theme = theme;
    this.iconInfo.type = str;
    this.iconPanKs = false;
    this.$emit('getInfo', this.iconInfo);
    this.$emit('change', this.iconInfo);
  }
}
</script>

<style lang="less" scoped>
.compAttr {
  font-size: 12px;
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.5;
  }
}
.icon-tip-warp {
  cursor: pointer;
  text-align: left;
  width: 100%;
  line-height: 24px;
  font-size: 16px;
  .icon-tip {
    padding-right: 6px;
  }
  .icon-right {
    float: right;
    font-size: 16px;
    margin-top: 3px;
    color: #bbb;
    transition: color ease 300ms;
  }
  &:hover .icon-right {
    color: #000;
  }
}
.user-selec-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: #fafafa;
  transform: translate3d(120%, 0, 0);
  transition: transform ease 300ms;
  z-index: 99;
  .user-return {
    height: 30px;
    background-color: #bac6da;
    line-height: 30px;
    padding: 0 10px;
    cursor: pointer;
    position: relative;
    z-index: 6;
    &:hover .icon-left {
      color: #000;
    }
  }
  .icon-left {
    float: left;
    margin-top: 8px;
    font-size: 14px;
    color: #666;
    transition: color ease 300ms;
  }
}
.show-user-selec {
  transform: translate3d(0, 0, 0);
}
/deep/.ant-tabs-bar {
  margin-bottom: 6px;
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
.tab-height {
  height: calc(100% - 38px);

  .panne-height {
    height: 100%;
    overflow: auto;
  }
}
</style>

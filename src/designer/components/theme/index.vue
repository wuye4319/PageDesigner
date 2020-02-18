<template>
  <div class="theme ">
    <a-popover
      placement="bottomRight"
      :overlayStyle="overlayStyle"
      trigger="click"
      :destroyTooltipOnHide="true"
    >
      <template slot="content">
        <theme-ui :themeData="themeData" ref="theme-ui"/>
      </template>
      <template slot="title">
        <div class="title">
          <div class="name">定制主题</div>
          <div class="btn"><a-button
            size="small"
            type="primary"
            @click="resetTheme"
          >重置</a-button></div>
        </div>
      </template>
      <div class="bg" :style="{background: btnBackground}">
        <a-icon type="down" class="icon"/>
      </div>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import themeUi from './themeUi.vue';
import { Popover, Button, Icon } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'theme',
  components: {
    themeUi,
    APopover: Popover,
    AButton: Button,
    AIcon: Icon

  }
})

export default class Theme extends Vue {
  $refs: {
    theme: HTMLFormElement
  }
  overlayStyle:object = {
    width: '270px'
  };
  btnBackground:string = ''

  @webSite.Getter('global')
  global: Website.pageInfor;

  get themeData():object {
    let global:any = this.global;
    if (global.theme) {
      this.btnBackground = global.theme['@primary-color'];
      this.initTheme(global.theme);
    }
    return global.theme;
  }

  // [重置]按钮
  resetTheme() {
    let theme = this.$refs['theme-ui'];
    theme.resetTheme();
  }

  //
  initTheme(theme) {
    let win:any = window;
    let themeObj:any = {
      '@primary-color': '',
      '@success-color': '',
      '@warning-color': '',
      '@error-color': '',
      '@font-size-base': '',
      '@heading-color': '',
      '@text-color': '',
      '@text-color-secondary': '',
      '@disabled-color': '',
      '@border-radius-base': '',
      '@border-color-base': ''
    };
    for (let name of Object.keys(theme)) {
      if (Array.isArray(theme[name])) {
        themeObj[name] = `rgba(${this.getRGBColor(theme[name][0])},${theme[name][1]}%)`;
      } else {
        themeObj[name] = theme[name];
      }
    }
    win.less.modifyVars(themeObj);
  }

  // 十六进制转换成RGB颜色
  getRGBColor(color) {
    let sColor = String(color).toLowerCase();
    // 十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      return sColorChange.join(',');
    }
    return sColor;
  }
}
</script>

<style lang='less' scoped>
  .theme {
    width: 40px;
    height: 40px;
    display: inline-block;
    padding: 4px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    font-size: 0;
    vertical-align: middle;
    background: #fff;
    .bg {
      width: 100%;
      height: 100%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon {
      font-size: 12px;
      color:#fff;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .title {
    display: flex;
    text-align: right;
    .name {
      flex: 1;
    }
    .btn {
      flex: 1;
    }
  }
</style>

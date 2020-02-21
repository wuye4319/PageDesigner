<template>
  <div class="themeUi ">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">全局主色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@primary-color']"
          @change="changeVal('@primary-color')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">成功色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@success-color']"
          @change="changeVal('@success-color')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">警告色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@warning-color']"
          @change="changeVal('@warning-color')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">错误色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@error-color']"
          @change="changeVal('@error-color')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">主字号:</div>
        </a-list-item-meta>
        <a-input
          v-model="theme['@font-size-base']"
          @blur="changeVal('@font-size-base')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">标题颜色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@heading-color'][0]"
          @change="changeVal('@heading-color',0)"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">标题透明度:</div>
        </a-list-item-meta>
        <a-input-number
          v-model="theme['@heading-color'][1]"
          :min="0"
          :max="100"
          style="width:100%"
          :formatter="value => `${value}%`"
          :parser="value => value.replace('%', '')"
          @blur="changeVal('@heading-color',1)"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">主文本颜色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@text-color'][0]"
          @change="changeVal('@text-color',0)"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">主文本透明度:</div>
        </a-list-item-meta>
        <a-input-number
          v-model="theme['@text-color'][1]"
          :min="0"
          :max="100"
          style="width:100%"
          :formatter="value => `${value}%`"
          :parser="value => value.replace('%', '')"
          @blur="changeVal('@text-color',1)"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">次文本颜色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@text-color-secondary'][0]"
          @change="changeVal('@text-color-secondary',0)"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">次文本透明度:</div>
        </a-list-item-meta>
        <a-input-number
          v-model="theme['@text-color-secondary'][1]"
          :min="0"
          :max="100"
          style="width:100%"
          :formatter="value => `${value}%`"
          :parser="value => value.replace('%', '')"
          @blur="changeVal('@text-color-secondary',1)"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">失效颜色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@disabled-color'][0]"
          @change="changeVal('@disabled-color',0)"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">失效透明度:</div>
        </a-list-item-meta>
        <a-input-number
          v-model="theme['@disabled-color'][1]"
          :min="0"
          :max="100"
          style="width:100%"
          :formatter="value => `${value}%`"
          :parser="value => value.replace('%', '')"
          @blur="changeVal('@disabled-color',1)"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">组件/浮层圆角:</div>
        </a-list-item-meta>
        <a-input
          v-model="theme['@border-radius-base']"
          @blur="changeVal('@border-radius-base')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">边框色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="theme['@border-color-base']"
          @change="changeVal('@border-color-base')"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { colorPicker } from '@/website/components/common'; // 颜色选择器
import { List, Input, InputNumber } from 'ant-design-vue';
@Component({
  name: 'themeUi',
  components: {
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInputNumber: InputNumber,
    AInput: Input

  }
})

export default class ThemeUi extends Vue {
  @Prop() themeData;

  pageData=this.themeData;
  theme:object = {
    '@primary-color': '',
    '@success-color': '',
    '@warning-color': '',
    '@error-color': '',
    '@font-size-base': '',
    '@heading-color': [],
    '@text-color': [],
    '@text-color-secondary': [],
    '@disabled-color': [],
    '@border-radius-base': '',
    '@border-color-base': ''
  };
  themeObj:object = {
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
  }

  created() {
    this.initTheme();
  }

  changeVal(name, i) {
    let win:any = window;
    if (Array.isArray(this.theme[name])) {
      this.pageData[name][i] = this.theme[name][i];
      this.themeObj[name] = `rgba(${this.getRGBColor(this.theme[name][0])},${this.theme[name][1]}%)`;
    } else {
      this.pageData[name] = this.theme[name];
      this.themeObj[name] = this.theme[name];
    }
    win.less.modifyVars(this.themeObj);
  }

  initTheme() {
    if (this.pageData) {
      for (let key of Object.keys(this.pageData)) {
        if (Array.isArray(this.pageData[key])) {
          this.theme[key][0] = this.pageData[key][0];
          this.theme[key][1] = this.pageData[key][1];
          this.themeObj[key] = `rgba(${this.getRGBColor(this.pageData[key][0])},${this.pageData[key][1]}%)`;
        } else {
          this.theme[key] = this.pageData[key];
          this.themeObj[key] = this.pageData[key];
        }
      }
    }
  }

  resetTheme() {
    let theme:object = {
      '@primary-color': '#17BC94',
      '@success-color': '#52c41a',
      '@warning-color': '#faad14',
      '@error-color': '#f5222d',
      '@font-size-base': '14px',
      '@heading-color': ['#000000', 85],
      '@text-color': ['#000000', 65],
      '@text-color-secondary': ['#000000', 45],
      '@disabled-color': ['#000000', 25],
      '@border-radius-base': '4px',
      '@border-color-base': '#d9d9d9'
    };
    Object.assign(this.pageData, theme);
    this.initTheme();
    let win:any = window;
    win.less.modifyVars(theme);
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
  .themeUi {
    height: 400px;
    overflow: auto;
    margin-right: -16px;
    padding-right: 16px;
    /deep/ .ant-list-item-meta-description {
      text-align: right;
      margin-right: 20px;
    }
  }

</style>

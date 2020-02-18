<template>
  <div class="title-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">文本内容:</div>
        </a-list-item-meta>
        <a-textarea
          :row="3"
          placeholder="请输入"
          v-model="initData.cont"
          @blur="changeVal('cont')"
        ></a-textarea>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">文本类型:</div>
        </a-list-item-meta>
        <a-select
          v-model="initData.textType"
          @change="changeVal('textType')"
          style="width: 100%">
          <a-select-option value="text">文本</a-select-option>
          <a-select-option value="title">标题</a-select-option>
          <a-select-option value="href">超链接</a-select-option>
        </a-select>
      </a-list-item>
      <a-list-item v-if="initData.textType === 'href'">
        <a-list-item-meta>
          <div slot="description">链接地址:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入完整的超链接地址"
          v-model="initData.href"
          @blur="changeVal('href')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体大小:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入"
          v-model="initData.fontSize"
          @blur="changeVal('fontSize')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">行高:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入"
          v-model="initData.lineHeight"
          @blur="changeVal('lineHeight')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体类型:</div>
        </a-list-item-meta>
        <a-select
          v-model="initData.fontFamily"
          style="width:100%"
          @change="changeVal('fontFamily')"
        >
          <a-select-option value="SimSun">宋体</a-select-option>
          <a-select-option value="SimHei">黑体</a-select-option>
          <a-select-option value="Microsoft YaHei">微软雅黑</a-select-option>
          <a-select-option value="FangSong">仿宋</a-select-option>
        </a-select>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体颜色:</div>
        </a-list-item-meta>
        <color-picker v-model="compAttr.color" />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">对齐方式:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('textAlign')"
          v-model="initData.textAlign"
          class="type-radio"
        >
          <a-radio value="left"><a-icon type="align-left" /></a-radio>
          <a-radio value="center"><a-icon type="align-center" /></a-radio>
          <a-radio value="right"><a-icon type="align-right" /></a-radio>
        </a-radio-group>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">自动换行:</div>
        </a-list-item-meta>
        <a-switch v-model="initData.whiteSpace" @change="changeVal('whiteSpace')" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">api事件:</div>
        </a-list-item-meta>
        <ul>
          <li><div>getText()</div></li>
          <li><div>setText(text)</div></li>
        </ul>

      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Radio, Switch, Select, Icon } from 'ant-design-vue';
import { colorPicker } from '@/website/components/common';
const webSite = namespace('webSite');

@Component({
  name: 'pageCtl-component',
  components: {
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ATextarea: Input.TextArea,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASwitch: Switch,
    AIcon: Icon
  }
})
export default class PageCtlComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number

  compAttr = this.compData.compAttr;

  initData = {
    cont: '', // 内容
    fontSize: '', // 字体大小
    color: '#333', // 颜色
    textAlign: 'left', // 对齐
    lineHeight: '',
    fontStyle: '',
    borderColor: '',
    whiteSpace: '',
    textType: 'text',
    fontFamily: 'Microsoft YaHei',
    href: ''
  }

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.compAttr)) {
      this.initData[key] = this.compAttr[key];
    }
  }

  changeVal(name) {
    if (name === 'textType') {
      if (this.initData[name] === 'href') {
        this.$set(this.compAttr, 'color', '#1890ff')
      } else {
        this.$set(this.compAttr, 'color', '#333')
      }
    }
    if (name === 'cont' && this.initData[name] === '') {
      this.initData[name] = '请绑定数据或配置默认值'
    }
    this.$set(this.compAttr, name, this.initData[name])
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-list-item-content {
  flex: 1.5;
  justify-content: flex-start;
}
</style>

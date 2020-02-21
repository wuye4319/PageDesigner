<template>
  <div class="compAttr divider">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">文本内容:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入内容"
          v-model="cont"
          @blur="changeVal('cont')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">对齐方式:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('orientation')"
          v-model="orientation"
          class="type-radio"
        >
          <a-radio value="left">居左</a-radio>
          <a-radio value="center">居中</a-radio>
          <a-radio value="right">居右</a-radio>
        </a-radio-group>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">分割线样式:</div>
        </a-list-item-meta>
        <a-select
          v-model="dashed"
          style="width:100%"
          @change="changeVal('dashed')"
        >
          <a-select-option value="dashed">虚线</a-select-option>
          <a-select-option value="solid">实线</a-select-option>
        </a-select>
      </a-list-item>

    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { colorPicker } from '@/website/components/common'; // 颜色选择器
import { List, Input, Select, Radio } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'divider-component',
  components: {
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ARadio: Radio,
    ARadioGroup: Radio.Group
  }
})
export default class DividerComponent extends Vue {
  @Prop() compData: any
  @Prop()
  compIndex: number

  cont: string = ''
  orientation: string = ''
  dashed: string= ''
  pageData: any = this.compData.compAttr

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData)) {
      this[key] = this.pageData[key];
    }
  }

  changeVal(name) {
    this.pageData[name] = this[name];
  }
}
</script>

<style lang="less" scoped>

</style>

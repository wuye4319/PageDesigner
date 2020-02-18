<template>
  <div class="img-mobile-control">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">段落内容:</div>
        </a-list-item-meta>
        <a-textarea
          :row="3"
          placeholder="请输入"
          v-model="cont"
          @blur="changeVal('cont')"
        ></a-textarea>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体大小:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入"
          v-model="fontSize"
          @blur="changeVal('fontSize')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体颜色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="color"
          @change="changeVal('color')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">对齐方式:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('textAlign')"
          v-model="textAlign"
          class="type-radio"
        >
          <a-radio value="left">左边</a-radio>
          <a-radio value="center">中间</a-radio>
          <a-radio value="right">右边</a-radio>
        </a-radio-group>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { colorPicker } from '@/website/components/common'; // 颜色选择器
import { List, Input, Radio } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'text-mobile-control',
  components: {
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ATextarea: Input.TextArea,
    ARadio: Radio,
    ARadioGroup: Radio.Group
  }
})
export default class TextMobileControl extends Vue {
  @Prop() compData: any;
  @Prop()
  compIndex: number;

  pageData: any = this.compData;
  cont:string = '' // 内容
  fontSize:string = '' // 字体大小
  color:string = '' // 颜色
  textAlign: string = '' // 对齐

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
  }
}
</script>

<style lang="less" scoped>

</style>

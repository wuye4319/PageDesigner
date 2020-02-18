<template>
  <div class="compAttr collapse">
    <a-list itemLayout="horizontal">

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">风格:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('style')"
          v-model="style"
          class="type-radio"
        >
          <a-radio value="one">样式一</a-radio>
          <a-radio value="two">样式二</a-radio>
          <a-radio value="three">样式三</a-radio>
        </a-radio-group>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">展开多项:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          v-model="accordion"
          @change="changeVal('accordion')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">箭头图标:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          v-model="showArrow"
          @change="changeVal('showArrow')"
        />
      </a-list-item>

      <a-list-item v-show="showArrow">
        <a-list-item-meta>
          <div slot="description">箭头方向:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="右"
          unCheckedChildren="左"
          v-model="arrow"
          @change="changeVal('arrow')"
        />
      </a-list-item>

    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { colorPicker } from '@/website/components/common'; // 颜色选择器
import { List, Switch, Radio } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'collapse-component',
  components: {
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    ASwitch: Switch,
    ARadio: Radio,
    ARadioGroup: Radio.Group
  }
})
export default class CollapseComponent extends Vue {
  @Prop() compData: any
  @Prop()
  compIndex: number

  style: string = ''
  accordion: boolean= false
  showArrow: boolean= true
  arrow: boolean= false
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
.type-radio {
  text-align: right;
}
</style>

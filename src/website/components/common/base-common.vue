
<template>
  <a-list itemLayout="horizontal">
    <a-list-item v-if="compAttr.borderRadius">
      <a-list-item-meta>
        <div slot="description">圆角:</div>
      </a-list-item-meta>
      <a-input
        v-model="compAttr.borderRadius"
      />
    </a-list-item>

    <a-list-item>
      <a-list-item-meta>
        <div slot="description">线宽:</div>
      </a-list-item-meta>
      <a-input
        v-model="compAttr.borderWidth"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">线型:</div>
      </a-list-item-meta>
      <a-select
        class="borderSelect"
        v-model="compAttr.borderStyle"
      >
        <a-select-option value="none">无</a-select-option>
        <a-select-option value="solid"><a-icon type="minus"/></a-select-option>
        <a-select-option value="dashed"><a-icon type="dash"/></a-select-option>
        <a-select-option value="dotted"><a-icon type="small-dash"/></a-select-option>
      </a-select>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">线条颜色</div>
      </a-list-item-meta>
      <color-picker v-model="compAttr.borderColor"/>
    </a-list-item>
    <a-list-item v-if="fontSize">
      <a-list-item-meta>
        <div slot="description">字体大小:</div>
      </a-list-item-meta>
      <a-input
        v-model="compAttr.fontSize"
      />
    </a-list-item>
    <a-list-item v-if="color">
      <a-list-item-meta>
        <div slot="description">字体颜色</div>
      </a-list-item-meta>
      <color-picker v-model="compAttr.color"/>
    </a-list-item>

  </a-list>

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Select, Icon } from 'ant-design-vue';
import { colorPicker } from '@/website/components/common'; // 颜色选择器
@Component({
  name: 'base-common',
  components: {
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    AIcon: Icon
  }
})
export default class baseCommon extends Vue {
  @Prop({
    type: Object,
    default: {}
  })
  compAttr;
  @Prop({
    type: Boolean,
    default: false
  })
  fontSize;
  @Prop({
    type: Boolean,
    default: false
  })
  color;
  created() {
  }
}
</script>
<style lang="less" scoped>
.borderSelect{
  width: 100%;
}
</style>

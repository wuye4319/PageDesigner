<template>
  <a-select
    class="myselect"
    :size="comAttr.size"
    placeholder="请选择"
    :style="{
      'width':comAttr.width,
      'height':comAttr.height,
      'line-height': comAttr.height,
      //'border-radius':comAttr.borderRadius,
      //'border-style':comAttr.borderStyle,
      //'border-color':comAttr.borderColor,
      //'border-width':comAttr.borderWidth,
      'font-size':comAttr.fontSize,
      'color':comAttr.fontColor,
      'size':comAttr.size
    }"
  >
    <a-select-option v-for="i in 10" :key="(i + 9).toString(36) + i">{{ (i + 9).toString(36) + i }}</a-select-option>
  </a-select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';
import { namespace } from 'vuex-class';

const webSite = namespace('webSite');
@Component({
  name: 'select-component'
})

export default class selectComponent extends Vue {
  @Prop() compData: any;

  comAttr: any = this.compData.compAttr;
  comName = this.compData.compName;
  content: any = this.comAttr.content

  created(): void {
  }
}
</script>

<style lang="less" scoped>
.myselect {
  transition: 0.5s all;
  margin-top: 5px;
}
</style>

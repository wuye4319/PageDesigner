<template>
  <a-button
    class="mybutton"
    type="primary"
    :style="{
      'width':comAttr.width,
      'height':comAttr.height,
      'margin':comAttr.margin,
      'padding':comAttr.padding,
      'border-radius':comAttr.borderRadius,
      'border-style':comAttr.borderStyle,
      'border-color':comAttr.borderColor,
      'border-width':comAttr.borderWidth,
      'font-size':comAttr.fontSize,
      'color':comAttr.fontColor
    }"
  >
    {{ comAttr.value }}
  </a-button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Button } from 'ant-design-vue';

const webSite = namespace('webSite');
@Component({
  name: 'button-component'
})

export default class buttonComponent extends Vue {
    @Prop() compData: any;

    comAttr:any = this.compData.compAttr;
    comName = this.compData.compName;

    created():void{
    }
}
</script>

<style lang="less" scoped>
    .mybutton{
        transition: 0.5s all;
        margin-top: 5px;
    }
</style>

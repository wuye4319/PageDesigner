<template>
  <a-input
    class="myinput"
    :placeholder="comAttr.placeHolder"
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
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Input } from 'ant-design-vue';

const webSite = namespace('webSite');
@Component({
  name: 'input-component'
})

export default class inputComponent extends Vue {
    @Prop() compData: any;

    comAttr:any = this.compData.compAttr;
    comName = this.compData.compName;

    created():void{
    }
}
</script>

<style lang="less" scoped>
    .myinput{
        transition: 0.5s all;
        margin-top: 5px;
    }
</style>

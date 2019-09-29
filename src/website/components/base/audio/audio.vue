<template>
  <audio
    class="myaudio"
    :src="comAttr.src || audioDemo"
    controls="controls"
    :style="{
      'width':comAttr.width,
      'height':comAttr.height,
      'margin':comAttr.margin,
      'padding':comAttr.padding,
      'border-color':comAttr.borderColor,
      'border-radius':comAttr.height/2
    }"
  >
    您的浏览器版本过低，推荐下载最新版谷歌浏览器体验
  </audio>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const audioDemo = 'https://www.w3school.com.cn/i/horse.ogg';
const webSite = namespace('webSite');
@Component({
  name: 'button-component'
})

export default class buttonComponent extends Vue {
  @Prop() compData: any;

  comAttr:any = this.compData.compAttr;
  comName = this.compData.compName;
  audioDemo = audioDemo;
  created():void{
  }
}
</script>

<style lang="less" scoped>
    .myaudio{
        transition: 0.5s all;
        outline: none;
    }
</style>

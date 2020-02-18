<template>
  <audio
    class="myaudio"
    :src="compAttr.src ? compAttr.src.indexOf('http') === -1 ? baseUrl + compAttr.src : compAttr.src: audioDemo"
    controls="controls"
    :style="setStyle()"
    :autoplay="compAttr.autoPlay"
    :preload="compAttr.preload"
    :loop="compAttr.loop"
  >
    您的浏览器版本过低，推荐下载最新版谷歌浏览器体验
  </audio>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { baseUrl } from '@/common/config/env';
const audioDemo = 'https://www.w3school.com.cn/i/horse.ogg';
const webSite = namespace('webSite');
@Component({
  name: 'button-component'
})

export default class buttonComponent extends Vue {
  @Prop() compData: any;

  compAttr:any = this.compData.compAttr;
  comName = this.compData.compName;
  audioDemo = audioDemo;
  baseUrl = baseUrl;

  created():void{}

  setStyle() {
    return {
      'border-radius': this.compAttr.borderRadius,
      'border-style': this.compAttr.borderStyle,
      'border-color': this.compAttr.borderColor
    }
  }

  setSrc(src) {
    this.compAttr.src = src;
  }

  getSrc() {
    return this.compAttr.src;
  }

  play() {
    let ele:any = document.querySelector('.myaudio')
    ele.play()
  }

  pause() {
    let ele:any = document.querySelector('.myaudio')
    ele.pause()
  }
}
</script>

<style lang="less" scoped>
  .myaudio{
    transition: 0.5s all;
    outline: none;
  }
</style>

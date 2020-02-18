<template>
  <video
    class="myvideo"
    :src="compAttr.src ? compAttr.src.indexOf('http') === -1 ? baseUrl + compAttr.src : compAttr.src: videoDemo"
    controls="controls"
    :style="setStyle()"
    :autoplay="compAttr.autoPlay"
    :preload="compAttr.preload"
    :loop="compAttr.loop"
  >
    您的浏览器版本过低，推荐下载最新版谷歌浏览器体验
  </video>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { baseUrl } from '@/common/config/env'

const videoDemo = 'https://www.w3school.com.cn/i/movie.ogg';
const webSite = namespace('webSite');
@Component({
  name: 'button-component'
})

export default class buttonComponent extends Vue {
    @Prop() compData: any;

    compAttr:any = this.compData.compAttr;

    videoDemo = videoDemo;
    baseUrl = baseUrl;

    created():void{
    }

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
      let ele:any = document.querySelector('.myvideo')
      ele.play()
    }

    pause() {
      let ele:any = document.querySelector('.myvideo')
      ele.pause()
    }
}
</script>

<style lang="less" scoped>

</style>

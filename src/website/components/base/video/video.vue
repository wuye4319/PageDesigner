<template>
  <video
    class="myvideo"
    :src="comAttr.src || videoDemo"
    controls="controls"
  >
    您的浏览器版本过低，推荐下载最新版谷歌浏览器体验
  </video>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const videoDemo = 'https://www.w3school.com.cn/i/movie.ogg';
const webSite = namespace('webSite');
@Component({
  name: 'button-component'
})

export default class buttonComponent extends Vue {
    @Prop() compData: any;

    comAttr:any = this.compData.compAttr;

    videoDemo = videoDemo;
    created():void{

    }
}
</script>

<style lang="less" scoped>

</style>

<template>
  <img
    :width="comAttr.width"
    :height="comAttr.height"
    :src="comAttr.src ? comAttr.src.indexOf('http') === -1 ? baseUrl + comAttr.src : comAttr.src: examImg"
    :alt="comAttr.alt"
    :style="setStyle()"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { baseUrl } from '@/common/config/env';
const webSite = namespace('webSite');
const examImg = require('../../../../../static/images/img.png');
@Component({
  name: 'img-component'
})

export default class imgComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;
  comAttr:any = this.compData.compAttr;
  examImg = examImg;
  baseUrl = baseUrl;

  created():void{
  }

  setStyle() {
    return {
      'border-radius': this.comAttr.borderRadius,
      'border-style': this.comAttr.borderStyle,
      'border-color': this.comAttr.borderColor
    }
  }

  handleClick() {
    this.trigFunc('click', this.compData.actionModel);
  }

  getImgSrc() {
    return this.comAttr.src;
  }
  setImgSrc(src) {
    if (!src) { return }
    this.comAttr.src = src
  }
}
</script>

<style lang="less" scoped>
</style>

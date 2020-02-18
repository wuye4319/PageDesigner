<template>
  <img
    :src="comAttr.src || examImg"
    @click="handleClick"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';
import { namespace } from 'vuex-class';
const webSite = namespace('webSite');
const examImg = require('../../../../../static/images/img.png');

@Component({
  name: 'img-mobile-view',
})

export default class ImgMobileView extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;

  comAttr:any = this.compData.compAttr;
  examImg = examImg;

  created():void{
  }
  @webSite.Getter('pageInfor') pageInfor;
  @webSite.Action('openUrl') openUrl;
  @webSite.Getter('pageActions') pageActions;//
  @webSite.Getter('defaultActions') defaultActions;

  handleClick() {
    this.trigFunc('click', this.compData.actionModel);
  }
}
</script>

<style lang="less" scoped>
</style>

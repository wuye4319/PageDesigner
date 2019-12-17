<template>
  <div>
    <a-icon :type="comAttr.iconInfo.type" :theme="comAttr.iconInfo.theme" :twoToneColor="comAttr.color" :style="comAttr" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Button } from 'ant-design-vue';
import iconData from './control/iconType';

const webSite = namespace('webSite');

@Component({
  name: 'icon-component'
})
export default class iconComponent extends Vue {
  @Prop() compData: any;

  comAttr: any = this.compData.compAttr;
  iconData: any[] = iconData;

  created() {
    if (!this.comAttr.iconInfo) {
      this.$set(this.comAttr, 'iconInfo', {
        theme: 'outlined',
        type: 'step-backward'
      });
    }
  }
}
</script>

<style lang="less" scoped>
.mybutton {
  transition: 0.5s all;
  margin-top: 5px;
}
</style>

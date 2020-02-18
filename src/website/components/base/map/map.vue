<template>
  <div class="mymap" :style="comAttr">
    <img :src="require('../../../../../static/images/map.png')" alt="">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';
import { namespace } from 'vuex-class';

const webSite = namespace('webSite');
@Component({
  name: 'map-component'
})
export default class mapComponent extends Vue {
  @Prop() compData: any;

  comAttr: any = this.compData.compAttr;

  created(): void {}
}
</script>

<style lang="less" scoped>
.mymap {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>

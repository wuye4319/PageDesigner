<template>
  <img
    :width="comAttr.width"
    :height="comAttr.height"
    :src="comAttr.src || examImg"
    :alt="comAttr.alt"
    :style="{'margin':comAttr.margin,'padding':comAttr.padding}"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';
import { namespace } from 'vuex-class';
const webSite = namespace('webSite');
const examImg = require('../../../../static/images/pro1.jpeg');
const examImg2 = require('../../../../static/images/bingzhang.png');
@Component({
  name: 'select-component'
})

export default class selectComponent extends Vue {
    @Prop() compData: any;

    comAttr:any = this.compData.compAttr;
    examImg = examImg;

    created():void{
    }
}
</script>

<style lang="less" scoped>
</style>

<template>
  <div class="swiper-view">
    <a-carousel
      v-bind="pageData"
      :style="{height:pageData.height, width:pageData.width}"
      class="my-carousel"
    >
      <div
        slot="prevArrow"
        class="custom-slick-arrow"
        style="left: 10px;zIndex: 1"
      >
        <a-icon type="left-circle"/>
      </div>
      <div
        slot="nextArrow"
        class="custom-slick-arrow"
        style="right: 10px"
      >
        <a-icon type="right-circle"/>
      </div>
      <div v-for="item in piclist" :key="item">
        <img :src="item" :style="{height:pageData.height}"/>
      </div>
    </a-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');
const piclist = ['https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0E/0B/ChMlWl1ksc2IRkiuADw2SJ3TI00AAM0DQNNbW4APDZg807.jpg', 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0D/07/ChMlWl1fixqIZoNFAAe4FQDS3jIAAMvHQB_5FgAB7gt197.jpg', 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0D/07/ChMlWl1fi0yIFvCZAAaPNZf-mjwAAMvIQBaKWwABo9N293.jpg']

@Component({
  name: 'swiper-view'
})
export default class swiperView extends Vue {
  @Prop() compData: any

  piclist = piclist

  get pageData() {
    let res = Object.assign({}, this.compData.compAttr);
    return res
  }

  created() { }

  mounted() {

  }
}
</script>
<style lang='less' scoped>
.my-carousel{
  margin: 0 auto;
  /deep/
.slick-slide {
  text-align: center;
  background: #364d79;
  overflow: hidden;
}
.custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31,45,61,.11);
  opacity: 0.3;
}
.slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.custom-slick-arrow:before {
  display: none;
}
.slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.custom-slick-arrow:hover {
  opacity: 0.5;
}

.slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}
.slick-slide  h3 {
  color: #fff;
}
 .slick-slide img {
    display: block;
    height: 100%;
    width: 100%;
}
.customPaging {
  height: 40px;
}
}

</style>

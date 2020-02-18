<template>
  <div class="swiper-view">
    <a-carousel
      v-bind="compAttr"
      class="my-carousel"
      :beforeChange="beforeChange"
      refs="carousel"
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
      <img
        v-for="item in list"
        :key="item.src"
        :src="item.src"
        :alt="item.alt"
        :style="{height:compAttr.height,width:compAttr.width,cursor: item.urlType === '无操作' ? 'auto': 'pointer'}"
        @click="goUrl(item.urlType, item.url, item.openType)"
      />
    </a-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Carousel, Icon } from 'ant-design-vue';
import { baseUrl } from '@/common/config/env';

const webSite = namespace('webSite');
const piclist = [
  { 
    src: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0E/0B/ChMlWl1ksc2IRkiuADw2SJ3TI00AAM0DQNNbW4APDZg807.jpg', urlType: '无操作' 
  }, 
  { 
    src: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0D/07/ChMlWl1fixqIZoNFAAe4FQDS3jIAAMvHQB_5FgAB7gt197.jpg', urlType: '无操作'
  },
  {
    src: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0D/07/ChMlWl1fi0yIFvCZAAaPNZf-mjwAAMvIQBaKWwABo9N293.jpg', urlType: '无操作' 
  }
];

@Component({
  name: 'swiper-view',
  components: {
    ACarousel: Carousel,
    AIcon: Icon
  }
})
export default class swiperView extends Vue {
  @Prop() compData: any

  @webSite.Getter('tables')
  tables;

  @webSite.Getter('appInfor')
  appInfor;

  compAttr:any = this.compData.compAttr
  dataModel:any = this.compData.dataModel
  mapData:any = this.compData.dataModel.mapData
  currentNumber: number = null

  get list() { // 列表信息
    let arr;
    if(this.compAttr.data && this.compAttr.data.length > 0){
      arr = this.compAttr.data
    }else {
      arr = piclist
    }
    return arr
  }

  created() { }

  mounted() {

  }

  // url 跳转
  goUrl(urlType, url, openType) {
    if(urlType === '无操作') {
      
    }else if(urlType === '用户自定义') {
      window.open(url,openType)
    }else {
      let appID = this.$router.currentRoute.params.appID;
      let page = urlType;
      let routname = this.$route.name;
      let fullPath = `#/${routname}/${appID}/${page}?screen=${this.appInfor[page].screen}`
      window.open(fullPath,openType)
    }
  }

  beforeChange(from, to) {
    this.currentNumber = to;
  }

  // 获取当前活动位置
  getSlideNumber() {
    return this.currentNumber
  }

  // 下一页
  next() {
    let carousel:any = this.$refs.carousel;
    carousel.next()
  }

  // 上一页
  prev() {
    let carousel:any = this.$refs.carousel;
    carousel.prev()
  }
}
</script>
<style lang='less' scoped>
.my-carousel{
  margin: 0 auto;
/deep/.slick-slide {
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

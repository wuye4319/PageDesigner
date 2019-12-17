<template>
  <div class="swiper-view">
    <a-carousel
      v-bind="compAttr"
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
      <img
        v-for="item in listData"
        :key="item.src"
        :src="item.src"
        :style="{height:compAttr.height,width:compAttr.width}"
      />
    </a-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');
const piclist = [{ src: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0E/0B/ChMlWl1ksc2IRkiuADw2SJ3TI00AAM0DQNNbW4APDZg807.jpg' }, { src: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0D/07/ChMlWl1fixqIZoNFAAe4FQDS3jIAAMvHQB_5FgAB7gt197.jpg' }, { src: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0D/07/ChMlWl1fi0yIFvCZAAaPNZf-mjwAAMvIQBaKWwABo9N293.jpg' }];

@Component({
  name: 'swiper-view'
})
export default class swiperView extends Vue {
  @Prop() compData: any

  @webSite.Getter('tables')
  tables;

  compAttr:any = this.compData.compAttr
  dataModel:any = this.compData.dataModel
  mapData:any = this.compData.dataModel.mapData

  get tableData() {
    let index = this.tables.findIndex((item) => {
      return item.tableName === this.dataModel.tableName
    })
    let data = [];
    if (index > -1) {
      data = this.tables[index].content;
    }
    return data
  }

  get listData() {
    let obj = {}
    this.mapData.forEach((item) => {
      obj[item.key] = item.tableMap
    })
    let listData = this.tableData.map((item, i) => {
      let dataObj = {};
      for (let k in obj) {
        dataObj[k] = item[obj[k]]
      }
      return dataObj
    })
    if (listData.length === 0) {
      listData = piclist
    }
    return listData
  }

  created() { }

  mounted() {

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

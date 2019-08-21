<template>
  <div>
    <div class="d-product-container">
      <div class="d-product-card-title">
        <h2>{{compData.mainTitle}}</h2>
        <span class="line"></span>
        <p>{{compData.secondTitle}}</p>
      </div>
      <div class="d-product-itemlist">
        <ul v-if="productList.data">
          <li v-for="(item,index) in productList.data.product_list" :key="index">
            <a href="#">
              <div :style="{backgroundColor:'#364d79'}" class="d-product-image"></div>
              <p class="d-pro-title li-el">{{'商品'+index}}</p>
            </a>
            <p class="d-product-price">
              <span>¥ {{item.sell_price}}</span>
              <span>月销：{{item.sales_volume}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'recommon-component',
  components: {}
})
export default class recommonComponent extends Vue {
  @Prop() compData: object
  productList: object = {}

  @webSite.Action('getProductList')
  getProductList: any

  async mounted() {
    console.log(this.compData)
    this.productList = await this.getProductList({ id: '4', size: 4, page: 1 })
  }
}
</script>
<style lang='less' scoped>
.d-product-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}
.d-product-itemlist {
  max-width: 1200px;
  min-width: 320px;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      width: 23%;
    }
  }
  p {
    margin: 0;
  }
  .d-product-price {
    display: flex;
    justify-content: space-between;
  }
}
</style>

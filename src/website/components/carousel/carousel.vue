<template>
  <div>
    <template>
      <a-carousel autoplay>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </a-carousel>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Carousel } from 'ant-design-vue'

// const webSite = namespace('webSite');

@Component({
  name: 'header-component',
  components: {
    ACarousel: Carousel
  }
})
export default class headerComponent extends Vue {
  created() { }

  mounted() {
  }
}
</script>
<style lang='less' scoped>
.ant-carousel {
  /deep/ .slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
    h3 {
      color: #fff;
    }
  }
}
</style>

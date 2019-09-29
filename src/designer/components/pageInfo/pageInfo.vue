<template>
  <div class="page-info">
    <!-- <div class="edit">
      <a-button block>源码编辑</a-button>
    </div>-->
    <div class="cont">
      <a-collapse :bordered="false" v-if="pageArr && pageArr.length > 0">
        <a-collapse-panel :header="item.header" :key="i" v-for="(item,i) of pageArr">
          <div :is="item.compFn" :styleData="pageStyle.pageAttr[item.styleName]" :changePageStyle="changePageStyle" ></div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation, namespace } from "vuex-class";
import pageStyle from "./style.vue";
import pageMargin from "./margin.vue";
import pageFont from "./font.vue";

const pageArr = [
  { header: "背景样式", compFn: pageStyle, styleName: "background" },
  { header: "边框", compFn: pageMargin, styleName: "border" },
  { header: "文字", compFn: pageFont, styleName: "font" }
];

const webSite = namespace("webSite");

@Component({
  name: "Page-info",
  components: {
    pageStyle,
    pageMargin,
    pageFont
  }
})
export default class PageInfo extends Vue {
  @webSite.Getter("pageStyle")
  pageStyle;

  @webSite.Getter("pageInfor")
  pageInfor;

  @webSite.Mutation("changePageInfor")
  changePageInfor;

  pageArr: any = pageArr;

  mounted() {
  }
  changePageStyle(key,value){
    console.log(key,value)
    

  }
}
</script>

<style lang='less' scoped>
.edit {
  width: 200px;
  height: 81px;
  padding: 21px 18px;
  margin: 0 auto;
}
.cont {
  text-align: left;
  /deep/ .arrow {
    right: 16px;
    left: auto !important;
  }
}
.page-info {
  font-size: 12px;
  /deep/.ant-collapse {
    background: transparent;
  }
  /deep/.ant-collapse-item {
    border: 0;
    margin-bottom: 8px;
    border-radius: 4px;
    background: #ffffff;
    .ant-collapse-header {
      padding: 6px 8px;
      color: #000000;
      font-size: 12px;
    }
  }
}
</style>

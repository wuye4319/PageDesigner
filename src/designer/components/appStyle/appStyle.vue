<template>
  <div class="app-style">
    <div class="cont" v-if="Object.keys(globalOptions).length > 0">
      <a-collapse
        :bordered="false"
        v-if="appArr && appArr.length > 0"
        v-model="showStyle">
        <a-collapse-panel
          :header="item.header"
          :key="item.styleName"
          v-for="item of appArr">
          <component :is="item.compFn" :appStyle="globalOptions[item.styleName]"/>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import background from './background.vue';
import border from './border.vue';
import font from './font.vue';
import { Collapse } from 'ant-design-vue';
const appArr = [
  { header: '背景样式', compFn: background, styleName: 'background' },
  { header: '边框', compFn: border, styleName: 'border' },
  { header: '文字', compFn: font, styleName: 'font' }
];

const webSite = namespace('webSite');

@Component({
  name: 'app-style',
  components: {
    background,
    border,
    font,
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
  }
})
export default class AppStyle extends Vue {
  @webSite.Getter('global')
  global;

  @webSite.Mutation('changeappInfor')
  changeappInfor;

  appArr: any = appArr;
  showStyle: string[] = ['background', 'border', 'font'];

  get globalOptions() {
    let obj = {};
    if (this.global.appStyle && Object.keys(this.global.appStyle).length) {
      obj = this.global.appStyle;
    }
    return obj;
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
  /deep/ .ant-collapse-arrow {
    right: 16px;
    left: auto !important;
  }
}
.app-style {
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
  /deep/.ant-collapse .ant-collapse-item .ant-collapse-header .arrow{
    left: auto !important;
    right: 16px;
  }
}
</style>

<template>
  <div class="databind">
    <!-- <div class="title">
      <a-button class="btn">{{currCompsData.title}}</a-button>
    </div> -->
    <a-collapse
      :bordered="false"
      v-model="showData"
    >
      <!-- 数据映射 -->
      <a-collapse-panel
        header="数据映射"
        key="datamap"
      >
        <datamap :key="new Date().getTime()+'datamap'" :compData="compData"/>
      </a-collapse-panel>
      <!-- 数据绑定 -->
      <a-collapse-panel
        header="数据绑定"
        key="datacomp"
        v-if="compData.dataModel.dataCompSwitch === 1"
      >
        <datacomp :key="new Date().getTime()+'datacomp'" :compData="compData" :compIndex="compIndex" :compsDataParent="compsDataParent" />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import datamap from './datamap.vue';
import datacomp from './datacomp.vue';

const webSite = namespace('webSite');

@Component({
  name: 'databind',
  components: { datamap, datacomp }
})
export default class DataBind extends Vue {
  @Prop() compData
  @Prop() compIndex
  @Prop() compsDataParent

  showData: string[] = ['datamap']

  created() {
    if (this.compData.dataModel.dataCompSwitch === 1) {
      this.showData = ['datamap', 'datacomp']
    }
  }
}
</script>

<style lang="less" scoped>
.cont {
  text-align: left;
  /deep/ .arrow {
    right: 16px;
    left: auto !important;
  }
}
.databind {
  font-size: 12px;
  text-align: left;
  /deep/ .arrow {
    right: 16px;
    left: auto !important;
  }
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
    .ant-collapse-content-box {
      padding-left: 8px;
    }
  }
}
.title {
  padding: 20px 8px;
  width: 100%;
  .btn {
    width: 100%;
  }
}
</style>

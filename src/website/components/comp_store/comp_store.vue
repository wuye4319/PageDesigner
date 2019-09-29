<template>
  <div class="complist">
    <a-collapse>
      <a-collapse-panel
        v-for="(item,c) in classifyComp"
        :key="c"
        :header="item.title"
        :disabled="!item.data.length"
      >
        <div class="details">
          <a-popover placement="topRight" v-for="(base,i) of item.data" :key="i">
            <template slot="content" width="200px">
              <div
                class="imgBox"
                style="width: 154px;height: 128px;display: flex;justify-content: center;align-items: center;"
              >
                <img
                  @click="addComp(base)"
                  :src="base.compImg?require('../../../../static/images/' + base.compImg + '.png') : defaultImg"
                  width="100%"
                />
              </div>
            </template>
            <span slot="title">{{ base.title }}</span>
            <a-button
              class="compItem"
              draggable
              @dragstart="dragstart($event,base)"
              @dragend="dragend"
              @click="addComp(base)"
            >{{ base.compName }}</a-button>
          </a-popover>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { Collapse } from "ant-design-vue";
// import defaultImg from "/static/images/default.png";

const webSite = namespace("webSite");
const defaultImg = require("../../../../static/images/img.png");

interface ComponentVal {
  type?: string;
  compName?: string;
  compAttr?: object;
  [propName: string]: any;
}

@Component({
  name: "comp-store-component",
  components: {}
})
export default class compStoreComponent extends Vue {
  @Prop() compData: Array<object>;

  @webSite.Mutation("addPageInfor")
  addPageInfor: any;
  defaultImg = defaultImg;

  get classifyComp() {
    let obj = {
      base: { title: "基础组件", data: [] },
      layout: { title: "功能组件", data: [] },
      business: { title: "扩展组件", data: [] },
      custom: { title: "自定义组件", data: [] }
    };

    let compData = this.compData;
    compData &&compData.length &&compData.forEach((item: ComponentVal) => {
      obj[item.type].data.push(item);
    });
    return obj;
  }

  created() {}

  mounted() {}

  addComp(comp: object) {
    this.addPageInfor(comp);
  }

  imgError(e) {
    let target = e.target || {};
    target.src = require("../../../../static/images/img.png");
    target.onerror = null;
  }

  dragstart(e, info) {
    let compInfo = JSON.stringify(info);
    e.dataTransfer.setData("compInfo", compInfo);
    e.dataTransfer.setData("animation", "move");
  }
  dragend(event) {
    event.dataTransfer.clearData();
    this.$emit("moveDragend");
  }
}
</script>
<style lang='less' scoped>
.details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .compItem {
    width: 86px;
    height: 30px;
    background: rgba(0, 0, 0, 0.02);
    border: 1px dashed rgba(209, 209, 209, 1);
    padding: 0;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 2px;
    &:hover {
      border-color: #17bc94;
    }
    &:nth-child(even) {
      margin-bottom: 0;
    }
  }
}
.description {
  margin-bottom: 10px;
}
.list {
  border-bottom: 1px solid #d9d9d9;
  margin-top: 20px;
  &:last-of-type {
    border: none;
  }
}
.complist {
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  flex: 1;
  .imgBox {
    width: 154px;
    height: 128px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/.ant-collapse {
    border: 0;
  }
  /deep/.ant-collapse-item {
    border: 0;
  }
  /deep/.ant-collapse-content {
    border: 0;
  }
  /deep/.ant-collapse-content-box {
    padding: 8px;
  }
}
/deep/.ant-collapse-header {
  text-align: left;
  font-size: 12px;
  border: 0;
}
</style>

<template>
  <div class="complist">
    <a-collapse accordion>
      <a-collapse-panel
        v-for="(item,c) in classifyComp"
        :key="c"
        :header="item.title"
        :disabled="!item.data.length"
      >
        <div class="details">
          <a-popover placement="topRight" v-for="(base,i) of item.data" :key="i">
            <template slot="content" width="200px">
              <div style="width: 200px;">
                <img
                  :src="require('../../../../static/images/' + base.compName + '.png')"
                  v-on:error="imgError"
                  width="100%"
                >
              </div>
            </template>
            <span slot="title">{{base.title}}</span>
            <a-button
              class="compItem"
              draggable
              @dragstart="dragstart($event,base)"
              @dragend="dragend"
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

const webSite = namespace("webSite");

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

  get classifyComp() {
    let obj = {
      base: { title: '基础组件', data: [] },
      effect: { title: '功能组件', data: [] },
      business: { title: '业务组件', data: [] },
      custom: { title: '自定义组件', data: [] }
    };

    let compData = this.compData;
    compData && compData.length && compData.forEach((item: ComponentVal) => {
      obj[item.type].data.push(item);
    });
    return obj;
  }

  created() { }

  mounted() { }

  addComp(comp: object) {
    this.addPageInfor(comp);
  }

  imgError(e) {
    let target = e.target || {};
    target.src = require("../../../../static/images/default.png");
    target.onerror = null;
  }

  dragstart(e, info) {
    let compInfo = JSON.stringify(info);
    e.dataTransfer.setData("compInfo", compInfo);
    e.dataTransfer.setData("animation", "move");
  }
  dragend(event) {
    event.dataTransfer.clearData();
    this.$emit('moveDragend');
  }
}
</script>
<style lang='less' scoped>
.details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .compItem {
    width: 45%;
    margin-right: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    &:nth-child(even) {
      margin-right: 0;
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
</style>

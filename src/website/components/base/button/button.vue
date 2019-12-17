<template>
  <a-button
    class="mybutton"
    type="primary"
    :style="comAttr"
    @click="handleClick"
  >{{ comAttr.value }}</a-button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Button } from "ant-design-vue";
import actions from "../../../store/actions";

const webSite = namespace("webSite");

@Component({
  name: "button-component"
})
export default class buttonComponent extends Vue {
  @Prop() compData: any;

  @webSite.Getter("pageInfor") pageInfor;

  comAttr: any = this.compData.compAttr;

  created() {
    console.log("buttonPageInfor", this.pageInfor);
    console.log("compData", this.compData);
  }
  handleClick() {
    this.compData.actionModel.forEach(mod => {
      if (mod.eventType === "click") {
        mod.actions.forEach(action => {
          this.$emit(mod.actionFunc, mod.params);
        });
      }
    });
  }
  handleDblClick() {
    this.compData.actionModel.forEach(mod => {
      if (mod.eventType === "dblclick") {
        mod.actions.forEach(action => {
          this.$emit(mod.actionFunc, mod.params);
        });
      }
    });
  }
}
</script>

<style lang="less" scoped>
.mybutton {
  transition: 0.5s all;
  margin-top: 5px;
}
</style>

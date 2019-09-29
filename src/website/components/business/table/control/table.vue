
<template>
  <div class="myTable">
    表格
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

const webSite = namespace("webSite");

@Component({
  name: "tablectrl-component",
  components: {}
})
export default class tablectrlComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number

  initData = {
    animated: true, // 是否使用动画切换 Tabs，在 tabPosition=top|bottom 时有效
    type: 'line', // 页签的基本样式，可选 line、card editable-card 类型
    hideAdd: false, // 是否隐藏加号图标，在 type="editable-card" 时有效
    size: 'default', // 大小，提供 large default 和 small 三种大小
    tabPosition: 'top', // 页签位置，可选值有 top right bottom left
    tabBarGutter: 0 // tabs 之间的间隙
  }
  pageData: any = this.compData

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
  }

  mounted() {}


  changeVal(name) {
    this.pageData.compAttr[name] = this.initData[name];
    this.editPageInfor({ index: this.compIndex, data: this.pageData.compAttr });
  }
}
</script>
<style lang='less' scoped>
.myTable {
  width: 100%;
}
</style>

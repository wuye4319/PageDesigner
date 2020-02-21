<template>
  <div class="pageBox" @click="handleClick">
    <p :style="setStyle()" v-if="compAttr.textType === 'text' || !compAttr.textType">{{ compAttr.cont }}</p>
    <h4 :style="setStyle()" v-if="compAttr.textType === 'title'">{{ compAttr.cont }}</h4>
    <a
      :style="setStyle()"
      :href="compAttr.href"
      v-if="compAttr.textType === 'href'"
    >{{ compAttr.cont }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'page-component'
})

export default class PageComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;

  compAttr:any = this.compData.compAttr

  created() {
    console.log(this.compAttr)
  }

  setStyle() {
    return {
      'white-space': this.compAttr.whiteSpace ? 'normal' : 'nowrap',
      'color': this.compAttr.color,
      'line-height': this.compAttr.lineHeight,
      'font-size': this.compAttr.fontSize,
      'font-family': this.compAttr.fontFamily,
      'text-align': this.compAttr.textAlign
    }
  }

  getText() {
    return this.compAttr.cont;
  }
  setText(text) {
    this.compAttr.cont = text;
  }
  handleClick() {
    this.trigFunc('click', this.compData.actionModel);
  }
}
</script>

<style lang="less" scoped>
.pageBox{
  p{
    white-space: wrap;
  }
}
</style>

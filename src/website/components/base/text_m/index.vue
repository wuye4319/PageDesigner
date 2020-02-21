<template>
  <div class="text-mobile-view" :style="pageData">
    <span @click="handleClick" v-if="pageData.cont">{{ pageData.cont }}</span>
    <span
      @click="handleClick"
      v-else
      style="color: #bfbfbf;"
    >请输入文字</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';
import { namespace } from 'vuex-class';
const webSite = namespace('webSite');
@Component({
  name: 'text-mobile-view',
})

export default class TextMobileView extends Vue {
    @Prop() compData: any;
    @Prop() trigFunc: any;

    pageData:any = this.compData.compAttr

    created():void{
    }

  @webSite.Getter('pageInfor') pageInfor;
  @webSite.Action('openUrl') openUrl;
  @webSite.Getter('pageActions') pageActions;//
  @webSite.Getter('defaultActions') defaultActions;

  handleClick() {
    this.trigFunc('click', this.compData.actionModel);
  }
}
</script>

<style lang="less" scoped>
</style>

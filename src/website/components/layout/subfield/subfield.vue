<template>
  <div class="subfield" :class="{'designer-show': $route.name === 'designer'}">
    <!-- <p class="text">请点击此处操作分栏</p> -->
    <div class="item" v-for="(inner,i) of pageData.type" :key="i"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { guid } from '@/common/utils';
import { log } from 'util';

const webSite = namespace('webSite');

@Component({
  name: 'subfield'
})

export default class SubfieldView extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr
  list = []
  $route
  
  created():void {

  }

}
</script>

<style lang="less" scoped>
.subfield {
  width: 100%;
  min-height: 50px;
  &.designer-show {
    display: flex;
    border: 1px dashed rgba(151,151,151,1);
    align-items: center;
    justify-content: center;
  }
}
.text {
  display: none;
  margin-bottom: 0;
}
</style>

<template>
  <div class="text-area" :style="{width:pageData.width}">
    <a-textarea
      v-bind="pageData"
      v-model="pageData.value"
      :style="{fontSize:pageData.fontSize,color:pageData.color}"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { guid } from '../../../common/utils';

const webSite = namespace('webSite');

@Component({
  name: 'text-area'
})

export default class textAreaView extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  created():void {

  }
}
</script>

<style lang="less" scoped>

</style>

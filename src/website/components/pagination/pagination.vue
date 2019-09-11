<template>
  <div class="pagination">
    <a-pagination v-bind="pageData" v-model="pageData.current" @showSizeChange="onShowSizeChange" :pageSize="pageSize">
      <template slot='buildOptionText' slot-scope='props'>
        <span>{{props.value}}条/页</span>
      </template>
    </a-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { guid } from '../../../common/utils';

const webSite = namespace('webSite');

@Component({
  name: 'pagination'
})

export default class PaginationView extends Vue {
  @Prop() compData: any

  pageSize:number = 10
  pageData:any = this.compData.compAttr

  created():void {
    
  }

  onShowSizeChange(current, pageSize) {
    this.pageSize = pageSize
  }

}
</script>

<style lang="less" scoped>

</style>

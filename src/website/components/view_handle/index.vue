<template>
  <div class="view-handle">
    <a-tooltip
      class="handle-item"
      :mouseEnterDelay="1"
      v-if="isShowArrow"
    >
      <template slot="title">
        上移
      </template>
      <a-icon type="arrow-up" @click.stop="arrowUp"/>
    </a-tooltip>
    <a-tooltip
      class="handle-item"
      :mouseEnterDelay="1"
      v-if="isShowArrow"
    >
      <template slot="title">
        下移
      </template>
      <a-icon type="arrow-down" @click.stop="arrowDown"/>
    </a-tooltip>
    <a-tooltip class="handle-item" :mouseEnterDelay="1">
      <template slot="title">
        拖动
      </template>
      <a-icon
        type="drag"
        @mousedown="mousedown"
        @mouseup="mouseup"
      />
    </a-tooltip>
    <a-tooltip class="handle-item" :mouseEnterDelay="1">
      <template slot="title">
        删除
      </template>
      <a-icon type="delete" @click.stop="deleteComponent"/>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

interface info {
  index:number,
  context:object,
  arrName:string
}

@Component({
  name: 'view-handle'
})

export default class ViewHandle extends Vue {
  @Prop({ default: true, type: Boolean }) isShowArrow:boolean

  $message

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  @Emit('arrowUp')
  arrowUp() {

  }

  @Emit('arrowDown')
  arrowDown() {

  }

  @Emit('deleteComponent')
  deleteComponent() {

  }

  @Emit()
  mousedown() {

  }

  @Emit()
  mouseup() {

  }
}
</script>

<style lang='less' scoped>
.view-handle {
    top: 5px;
    right: -100px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    z-index: 99;
    .handle-item {
      width: 20px;
    }
  }
</style>

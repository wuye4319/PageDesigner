<template>
  <div class="compAttr input-component">

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'active-component'
})
export default class activeComponent extends Vue {
  @Prop() compData: any;
  compAttr: any = this.compData.compAttr;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {

  }
}
</script>

<style lang="less" scoped>
.input-component {
  .radio-group {
    display: flex;
    flex-direction: row;
  }
}
.compAttr {
  font-size: 12px;
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.5;
  }
}
</style>

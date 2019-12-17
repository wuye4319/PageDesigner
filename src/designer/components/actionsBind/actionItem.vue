<template>
  <div class="event-item">
    <a-list-item slot="renderItem">
      <a slot="actions" @click="operateAction('edit',eventIndex,index)">
        <a-icon type="edit" />
      </a>
      <a slot="actions" @click="operateAction('delete',eventIndex,index)">
        <a-icon type="delete" style="color: red" />
      </a>
      <a-tooltip>
        <template slot="title">{{ action.actionName +'-' + action.params }}</template>
        <div class="actonBox">{{ action.actionName +'-' + action.params }}</div>
      </a-tooltip>
    </a-list-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'action-item',
  components: {}
})
export default class ActionItem extends Vue {
  @Prop() action;
  @Prop() eventIndex;
  @Prop() index;
  @Prop() operateAction;
}
</script>

<style lang='less' scoped>
/deep/.ant-list-item-action {
  margin-left: 16px;
}
.actonBox {
  width: 155px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<template>
  <div class="tabs">
    <a-tabs
      v-bind="pageData"
      >
      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
        {{pane.content}}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { guid } from '../../../common/utils';

const webSite = namespace('webSite');

const panes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
  { title: 'Tab 4', content: 'Content of Tab 4', key: '4' }
]

@Component({
  name: 'tabs'
})

export default class TabsView extends Vue {
  @Prop() compData: any

  panes:object[]=panes
  pageData:any = this.compData.compAttr

  created():void {

  }
}
</script>

<style lang="less" scoped>

</style>

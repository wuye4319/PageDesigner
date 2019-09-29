<template>
  <a-tabs defaultActiveKey="1" type="card">
    <a-tab-pane tab="content" key="1">Content of Tab Pane 1</a-tab-pane>
    <a-tab-pane
      tab="style"
      key="2"
      forceRender
    >
      <a-list itemLayout="horizontal">
        <a-list-item v-for="(base,i) of compData" :key="i">
          <a-list-item-meta>
            <div slot="description">宽度:</div>
          </a-list-item-meta>
          <a-input
            placeholder="Basic usage"
            v-model="width"
            @blur="changeVal('width')"
          />
        </a-list-item>
      </a-list>
    </a-tab-pane>
    <a-tab-pane tab="advanced" key="3">Content of Tab Pane 3</a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Tabs } from 'ant-design-vue';

const webSite = namespace('webSite');

@Component({
  name: 'active-component'
})
export default class activeComponent extends Vue {
  @Prop()
  compData: any
  compIndex: number
  compArrt: any

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    console.log('settings', JSON.parse(JSON.stringify(this.compData)))
    console.log('currentIndex', this.compIndex)
    // for (let key of Object.keys(this.pageData.compAttr)) {
    //   this[key] = this.pageData.compAttr[key];
    // }
  }

  // changeVal(name) {
  //   this.pageData.compAttr[name] = this[name];
  //   this.editPageInfor({ index: this.compIndex, data: this.pageData.compAttr });
  // }
}
</script>

<style lang="less" scoped>
.input-component {
  .radio-group {
    display: flex;
    flex-direction: row;
  }
}
</style>

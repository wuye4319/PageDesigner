<template>
  <div class="tabs-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">切换动画:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('animated')"
          v-model="initData.animated"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">基本样式:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('type')"
          v-model="initData.type"
          class="type-radio"
        >
          <a-radio value="line">line</a-radio>
          <a-radio value="card">card</a-radio>
          <a-radio value="editable-card">editable-card</a-radio>
        </a-radio-group>
      </a-list-item>

      <a-list-item v-show="initData.type==='editable-card'">
        <a-list-item-meta>
          <div slot="description">隐藏加号图标:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('hideAdd')"
          v-model="initData.hideAdd"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">大小:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('size')"
          v-model="initData.size"
          class="type-radio"
        >
          <a-radio value="large">large</a-radio>
          <a-radio value="default">default</a-radio>
          <a-radio value="small">small</a-radio>
        </a-radio-group>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">页签位置:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('tabPosition')"
          v-model="initData.tabPosition"
          class="type-radio"
        >
          <a-radio value="top">top</a-radio>
          <a-radio value="right">right</a-radio>
          <a-radio value="bottom">bottom</a-radio>
          <a-radio value="left">left</a-radio>
        </a-radio-group>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">间隙:</div>
        </a-list-item-meta>
        <a-slider
          v-model="initData.tabBarGutter"
          :max="100"
          style="width:100%"
          @change="changeVal('tabBarGutter')"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

interface ProgressData {
  animated:boolean,
  type:string,
  hideAdd:boolean,
  size:string,
  tabPosition:string,
  tabBarGutter:number
}

@Component({
  name: 'tabs-component'
})
export default class TabsComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number

  initData:ProgressData = {
    animated: true, // 是否使用动画切换 Tabs，在 tabPosition=top|bottom 时有效
    type: 'line', // 页签的基本样式，可选 line、card editable-card 类型
    hideAdd: false, // 是否隐藏加号图标，在 type="editable-card" 时有效
    size: 'default', // 大小，提供 large default 和 small 三种大小
    tabPosition: 'top', // 页签位置，可选值有 top right bottom left
    tabBarGutter: 0 // tabs 之间的间隙
  }
  pageData: any = this.compData

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this.initData[name];
    this.editPageInfor({ index: this.compIndex, data: this.pageData.compAttr });
  }
}
</script>

<style lang="less" scoped>
.type-radio{
  text-align: left;
}
</style>

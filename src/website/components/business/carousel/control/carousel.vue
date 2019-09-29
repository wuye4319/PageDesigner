<template>
  <a-list itemLayout="horizontal">
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">箭头显示:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="开"
        unCheckedChildren="关"
        v-model="arrows"
        @change="changeVal('arrows')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">动画效果函数:</div>
      </a-list-item-meta>
      <a-radio-group @change="changeVal('effect')" v-model="effect">
        <a-radio value="scrollx">默认</a-radio>
        <a-radio value="fade">渐显</a-radio>
      </a-radio-group>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">是否垂直:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="是"
        unCheckedChildren="否"
        v-model="vertical"
        @change="changeVal('vertical')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">自动播放:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="是"
        unCheckedChildren="否"
        v-model="autoplay"
        @change="changeVal('autoplay')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">显示面板指示点:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="是"
        unCheckedChildren="否"
        v-model="dots"
        @change="changeVal('dots')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">高度:</div>
      </a-list-item-meta>
      <a-input
        placeholder="Basic usage"
        v-model="height"
        @blur="changeVal('height')"
      />
    </a-list-item>
    <a-list-item>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'header-component',
  components: {
  }
})
export default class headerComponent extends Vue {
  @Prop()
  compData: any
  @Prop()
  compIndex: number

  effect:string = 'scrollx'
  height:string = '200px'
  width:string = '100%'
  arrows:boolean = true
  dots:boolean = true
  vertical:boolean = false
  autoplay:boolean = false
  pageData:any = this.compData

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
    this.editPageInfor({
      data: this.pageData.compAttr,
      index: this.compIndex });
  }
}
</script>
<style lang='less' scoped>
</style>

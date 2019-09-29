<template>
  <div class="title-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">内容:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="initData.cont"
          @blur="changeVal('cont')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">高度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="initData.height"
          @blur="changeVal('height')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体大小:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="initData.fontSize"
          @blur="changeVal('fontSize')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体颜色:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="initData.color"
          @blur="changeVal('color')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示更多:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('showMore')"
          v-model="initData.showMore"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">对齐方式:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('align')"
          v-model="initData.align"
          class="type-radio"
        >
          <a-radio value="left">左边</a-radio>
          <a-radio value="center">中间</a-radio>
        </a-radio-group>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

interface ProgressData {
  cont:string,
  height:string,
  fontSize:string,
  color:string,
  showMore:boolean,
  align:string
}

@Component({
  name: 'title-component'
})
export default class TitleComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number

  initData:ProgressData = {
    cont: '', // 内容
    height: '', // 高度
    fontSize: '', // 字体大小
    color: '', // 颜色
    showMore: false, // 显示更多
    align: '' // 对齐
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

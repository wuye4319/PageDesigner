<template>
  <div class="input-component">
    <a-list itemLayout="horizontal">
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
          <div slot="description">外边距:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="margin"
          @blur="changeVal('margin')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">内边距:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="padding"
          @blur="changeVal('padding')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">图片地址:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="src"
          @blur="changeVal('src')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">提示文本:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="alt"
          @blur="changeVal('alt')"
        />
      </a-list-item>
    </a-list>
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
  @Prop() compData: any
  @Prop()
  compIndex: number
  pageData:any = this.compData
  choosen:number = 3
  width: string = ''
  height: string = ''
  src: string = ''
  alt: string = ''
  margin: string = ''
  padding: string = ''

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
    this.editPageInfor({ index: this.compIndex, data: this.pageData.compAttr });
  }
}
</script>

<style lang="less" scoped>
    .input-component{
        .radio-group{
            display: flex;
            flex-direction: row;
        }
    }
</style>

<template>
  <div class="active-component">
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
          <div slot="description">高度(行):</div>
        </a-list-item-meta>
        <a-slider
          style="width:100%"
          v-model="rows"
          @change="changeVal('rows')"
          :max="8"
          :min="1"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">默认为空展示:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="placeholder"
          @blur="changeVal('placeholder')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">默认内容:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="value"
          @blur="changeVal('value')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体大小:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="fontSize"
          @blur="changeVal('fontSize')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体颜色:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="color"
          @blur="changeVal('color')"
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

  width: string = '100%'
  rows: number = 1
  placeholder: string = ''
  value: string = ''
  fontSize: string = '18px'
  color: string = '#000'
  pageData: any = this.compData

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
</style>

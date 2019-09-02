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
          <div slot="description">图片高度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="imgHeight"
          @blur="changeVal('imgHeight')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">图片圆角:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="borderRadius"
          @blur="changeVal('borderRadius')"
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
          v-model="fontColor"
          @blur="changeVal('fontColor')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">文本省略行:</div>
        </a-list-item-meta>
        <a-slider
          style="width:100%"
          v-model="lineClamp"
          @change="changeVal('lineClamp')"
          :max="4"
          :min="1"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">标题显示:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          v-model="titleChecked"
          @change="changeVal('titleChecked')"
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

  width: string = ''
  imgHeight: string = ''
  borderRadius: string = ''
  lineClamp: number = 2
  fontSize: string = '14px'
  fontColor: string = '#000'
  titleChecked: boolean = true
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

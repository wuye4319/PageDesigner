<template>
  <div class="compAttr active-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">行数:</div>
        </a-list-item-meta>
        <a-slider
          style="width:100%"
          v-model="pageData.rows"
          @change="changeVal('rows')"
          :max="8"
          :min="1"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示内容:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入内容"
          v-model="pageData.value"
          @blur="changeVal('value')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体大小:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="pageData.fontSize"
          @blur="changeVal('fontSize')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体颜色:</div>
        </a-list-item-meta>
        <a-input
          type="color"
          placeholder="Basic usage"
          v-model="pageData.color"
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

  rows: number = 1
  placeholder: string = ''
  value: string = ''
  fontSize: string = '18px'
  color: string = '#000'
  pageData: any = this.compData.compAttr

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {

  }

  changeVal(name) {

  }
}
</script>

<style lang="less" scoped>
.compAttr{
  padding: 0 8px;
  /deep/.ant-list-item-content{
    flex: 1.5;
  }
}
</style>

<template>
  <div class="compAttr tag-component">
    <a-list itemLayout="horizontal">
      
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">标签颜色:</div>
        </a-list-item-meta>
        <color-picker
          v-model="color"
          @change="changeVal('color')"
        />
      </a-list-item>

    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { colorPicker } from '@/website/components/common'; // 颜色选择器

const webSite = namespace('webSite');

@Component({
  name: 'active-component',
  components: {
    colorPicker
  }
})
export default class activeComponent extends Vue {
  @Prop() compData: any
  @Prop()
  compIndex: number

  color:string = '' //标签颜色
  pageData: any = this.compData.compAttr

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData)) {
      this[key] = this.pageData[key];
    }
  }

  changeVal(name) {
    this.pageData[name] = this[name];
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

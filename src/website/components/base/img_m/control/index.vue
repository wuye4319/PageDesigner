<template>
  <div class="img-mobile-control">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">路径:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入图片路径"
          v-model="src"
          @blur="changeVal('src')"
        />
      </a-list-item>

    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Input } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'img-mobile-control',
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
  }
})
export default class ImgMobileControl extends Vue {
  @Prop() compData: any;
  @Prop()
  compIndex: number;

  pageData: any = this.compData;
  src: string = '';

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
  }
}
</script>

<style lang="less" scoped>

</style>

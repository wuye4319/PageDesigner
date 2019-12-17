<template>
  <div class="compAttr input-component">
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
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">描述:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入描述文本"
          v-model="alt"
          @blur="changeVal('alt')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">圆角:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入圆角"
          v-model="borderRadius"
          @blur="changeVal('borderRadius')"
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
  @Prop() compData: any;
  @Prop()
  compIndex: number;
  pageData: any = this.compData;
  src: string = '';
  alt: string = '';
  borderRadius: string = '';

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
.input-component {
  .radio-group {
    display: flex;
    flex-direction: row;
  }
}
.compAttr {
  font-size: 12px;
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.5;
  }
}
</style>

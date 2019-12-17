<template>
  <div class="compAttr button-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">资源路径:</div>
        </a-list-item-meta>
        <a-input
          type="textarea"
          placeholder="Basic usage"
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

const webSite = namespace('webSite');

@Component({
  name: 'active-component'
})
export default class activeComponent extends Vue {
  @Prop() compData: any;
  @Prop()
  compIndex: number;

  width: string = '';
  height: string = '';
  pageData: any = this.compData;
  margin: string = '';
  padding: string = '';

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
.button-component {
  .radio-group {
    display: flex;
    flex-direction: row;
  }
}
.compAttr {
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.5;
  }
}
</style>

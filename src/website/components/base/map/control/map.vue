<template>
  <div class="input-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">地图宽度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="width"
          @blur="changeVal('width')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">地图高度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="height"
          @blur="changeVal('height')"
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

  pageData: any = this.compData
  width:string = ''
  height:string = ''

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
</style>

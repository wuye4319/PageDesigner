<template>
  <div class="compAttr input-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">圆角:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="borderRadius"
          @blur="changeVal('borderRadius')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">线形:</div>
        </a-list-item-meta>
        <a-select
          class="borderSelect"
          v-model="borderStyle"
          @change="changeVal('borderStyle')"
        >
          <a-select-option value="none">无</a-select-option>
          <a-select-option value="solid"><a-icon type="minus"/></a-select-option>
          <a-select-option value="dashed"><a-icon type="dash"/></a-select-option>
          <a-select-option value="dotted"><a-icon type="small-dash"/></a-select-option>
        </a-select>
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
          type="color"
          placeholder="Basic usage"
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

const webSite = namespace('webSite');

@Component({
  name: 'active-component'
})
export default class activeComponent extends Vue {
  @Prop() compData: any;

  borderRadius: string = '';
  borderStyle: string = '';
  fontSize: string = '14px';
  color: string = '#000';
  pageData: any = this.compData;

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
.borderSelect{
  width: 100%;
}
</style>

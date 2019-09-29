<template>
  <div class="rate-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">允许半选:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('allowHalf')"
          v-model="initData.allowHalf"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">再次点击后清除:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('allowClear')"
          v-model="initData.allowClear"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">当前数:</div>
        </a-list-item-meta>
        <a-slider
          v-model="initData.value"
          :max="initData.count"
          :step="0.5"
          style="width:100%"
          @change="changeVal('value')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">star 总数:</div>
        </a-list-item-meta>
        <a-slider
          v-model="initData.count"
          :max="10"
          style="width:100%"
          @change="changeVal('count')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">是否只读:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('disabled')"
          v-model="initData.disabled"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

interface ProgressData {
  allowHalf:boolean,
  allowClear:boolean,
  value:number,
  count:number,
  disabled:boolean
}

@Component({
  name: 'rate-component'
})
export default class rateComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number

  initData:ProgressData = {
    allowHalf: true, // 是否允许半选
    allowClear: true, // 是否允许再次点击后清除
    value: 0, // 当前数，受控值
    count: 5, // star 总数
    disabled: false // 只读，无法进行交互
  }
  pageData: any = this.compData

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this.initData[name];
    this.editPageInfor({ index: this.compIndex, data: this.pageData.compAttr });
  }
}
</script>

<style lang="less" scoped>
</style>

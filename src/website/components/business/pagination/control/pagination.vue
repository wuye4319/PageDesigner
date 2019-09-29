<template>
  <div class="pagination-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">当前页数:</div>
        </a-list-item-meta>
        <a-slider
          v-model="initData.current"
          :max="100"
          style="width:100%"
          @change="changeVal('current')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">总数:</div>
        </a-list-item-meta>
        <a-input-number
          :min="1"
          v-model="initData.total"
          @change="changeVal('total')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">简单分页:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('simple')"
          v-model="initData.simple"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示改变每页条数:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('showSizeChanger')"
          v-model="initData.showSizeChanger"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示快速跳转:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('showQuickJumper')"
          v-model="initData.showQuickJumper"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">一页时是否隐藏:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('hideOnSinglePage')"
          v-model="initData.hideOnSinglePage"
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
  simple:boolean,
  showSizeChanger:boolean,
  showQuickJumper:boolean,
  hideOnSinglePage:boolean,
  current:number,
  total:number
}

@Component({
  name: 'pagination-component'
})
export default class PaginationComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number

  initData:ProgressData = {
    simple: false, // 简单分页
    showSizeChanger: false, // 是否可以改变 pageSize
    showQuickJumper: false, // 是否可以快速跳转至某页
    hideOnSinglePage: false, // 只有一页时是否隐藏分页器
    current: 1, // 当前页数
    total: 500 // 总数
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
.type-radio{
  text-align: left;
}
</style>

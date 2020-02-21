<template>
  <div class="compAttr button-component">
    <h3>回到顶部</h3>
    <div>
      <label>水平位置：</label>
      <div class="item">
        <!-- <span>水平:</span> -->
        <a-input
          class="myinput"
          style="width: 100%"
          placeholder="请输入"
          v-model="compAttr.positionC"
          @change="handlePosCChange"
        >
          <a-select
            slot="addonBefore"
            style="width: 75px;font-size: 12px"
            v-model="compAttr.posCPrefix"
            @change="handlePosCChange"
          >
            <a-select-option value="left">left</a-select-option>
            <a-select-option value="right">right</a-select-option>
          </a-select>
          <span slot="addonAfter">px</span>
        </a-input>
      </div>
      <label>垂直位置：</label>
      <div class="item">
        <a-input
          class="myinput"
          style="width: 100%"
          placeholder="请输入"
          v-model="compAttr.positionV"
          @change="handlePosVChange"
        >
          <a-select
            slot="addonBefore"
            style="width: 75px;font-size: 12px"
            v-model="compAttr.posVPrefix"
            @change="handlePosVChange"
          >
            <a-select-option value="top">top</a-select-option>
            <a-select-option value="bottom">bottom</a-select-option>
          </a-select>
          <span slot="addonAfter">px</span>
        </a-input>
      </div>
      <div class="item">
        <label>滚动距离:</label>
        <a-input-number v-model="compAttr.scroll"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Input, Select, InputNumber } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'backTopCtl-component',
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    AInputNumber: InputNumber
  }
})
export default class backTopCtlComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: number;

  pageData: any = this.compData;
  compAttr: any = this.compData.compAttr;
  width: string = '';
  height: string = '';
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

  handlePosVChange() {
    if (this.compAttr.posVPrefix === 'top') {
      delete this.compAttr.bottom;
    } else {
      delete this.compAttr.top;
    }
    this.$set(this.compAttr, this.compAttr.posVPrefix, this.compAttr.positionV + 'px')
  }
  handlePosCChange() {
    if (this.compAttr.posCPrefix === 'left') {
      delete this.compAttr.right;
    } else {
      delete this.compAttr.left;
    }
    this.$set(this.compAttr, this.compAttr.posCPrefix, this.compAttr.positionC + 'px')
  }
}
</script>

<style lang="less" scoped>
.button-component {
  h3{
    margin: 8px 0;
  }
  // .item{
  //   margin: 8px 0 0 0;
  //   span{
  //     display: inline-block;
  //     width: 100px;
  //     text-align: right;
  //     padding-right: 16px;
  //   }
  //   .ant-input{
  //     width: 120px;
  //   }
  //   .ant-input-number{
  //     width: 120px;
  //   }
  // }
}

.item{
  margin: 8px 0 0 0;
  /deep/.ant-select-selection__rendered{
    margin: 0 6px;
  }
  span{
    display: inline-block;
    width: 40px;
    text-align: right;
    padding-right: 16px;
  }
  .ant-input{
    width: 120px;
  }
  .ant-input-number{
    width: 120px;
  }
}
.compAttr {
  padding: 0 8px;
}
</style>

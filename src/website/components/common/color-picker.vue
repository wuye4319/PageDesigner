<template>
  <div
    class="color-picker"
    ref="color-picker"
    @mouseenter="hoverStatus=true"
    @mouseleave="hoverStatus=false"
  >
    <a-popover
      placement="bottom"
      overlayClassName="ant-popover-user"
      v-model="visible"
      trigger="click"
      :destroyTooltipOnHide="true"
    >
      <template slot="content">
        <photoshop-picker
          class="mypicker"
          v-model="mycolor"
          acceptLabel="确定"
          cancelLabel="取消"
          @ok="colorOk"
          @cancel="colorCancel"
        />
      </template>
      <div class="color-btn" :class=" hoverStatus ? 'ant-desigener-border-color': 'color-btn-border'">
        <div class="color-picker-bg" :style="{background: color}"><a-icon type="down" class="color-picker-icon"/></div>
      </div>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Photoshop } from 'vue-color';

@Component({
  name: 'color-picker',
  components: {
    'photoshop-picker': Photoshop
  }
})

export default class ColorPicker extends Vue {
  @Model('getColor') color: any

  hoverStatus:boolean = false
  mycolor = Object.assign({}, { hex: this.color })
  visible:boolean = false

  // [确定]按钮
  colorOk() {
    let color = this.mycolor.hex || this.mycolor;
    this.$emit('getColor', color);
    this.visible = this.hoverStatus = false;
    this.$emit('change', color);
  }

  // [取消]按钮
  colorCancel() {
    this.visible = this.hoverStatus = false;
  }
}
</script>

<style lang='less' scoped>
  .color-picker {
    width: 40px;
    height: 40px;
  }
  .color-btn {
    width: 40px;
    height: 40px;
    display: inline-block;
    padding: 4px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    font-size: 0;
    vertical-align: middle;
    background: #fff;
  }
  .color-btn-border {
    border-color:#e6e6e6;
  }
  .color-picker-bg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .color-picker-icon {
    font-size: 12px;
    color: #fff;
  }
</style>

<style lang="less">
 .ant-popover-user {
   .ant-popover-inner-content {
     padding: 0;
   }
}
</style>

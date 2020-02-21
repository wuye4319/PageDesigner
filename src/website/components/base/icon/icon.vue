<template>
  <div>
    <span :style="comAttr">
      <a-icon
        @click="handleClick"
        :type="comAttr.iconInfo.type"
        :theme="comAttr.iconInfo.theme"
        :twoToneColor="comAttr.iconInfo.color"
        :style="comAttr.iconInfo"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Icon } from 'ant-design-vue';
@Component({
  name: 'icon-component',
  components: {
    AIcon: Icon
  }
})
export default class iconComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;
  comAttr: any = this.compData.compAttr;
  created() {
    if (!this.comAttr.iconInfo) {
      this.$set(this.comAttr, 'iconInfo', {
        theme: 'outlined',
        type: 'step-backward',
        color: '#000',
        fontSize: '32px'
      });
    }
  }
  handleClick(d:any) {
    this.trigFunc('click', this.compData.actionModel, d);
  }
  getIconOption() {
    return this.comAttr.iconInfo
  }
  setIconOption(option:{
        theme?:string,
        type?:string,
        color?:string,
        fontSize?:string,
        borderWidth?:string,
        borderStyle?:string,
        borderColor?:string,
        borderRadius?:string}) {
    Object.assign(this.comAttr.iconInfo, option)
  }
}
</script>
<style lang="less" scoped>

</style>

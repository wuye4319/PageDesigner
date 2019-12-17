<template>
  <a-select
    class="myselect"
    :size="comAttr.size"
    placeholder="请选择"
    :style="comAttr"
    :mode="comAttr.mode"
  >
    <a-select-option v-for="i in 10" :key="(i + 9).toString(36) + i">{{ (i + 9).toString(36) + i }}</a-select-option>
  </a-select>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Select } from 'ant-design-vue';
import { namespace } from 'vuex-class';

const webSite = namespace('webSite');
@Component({
  name: 'select-component'
})

export default class selectComponent extends Vue {
  @Prop() compData: any;

  comAttr: any = this.compData.compAttr;

  created(): void {
  }
}
</script>

<style lang="less" scoped>

</style>

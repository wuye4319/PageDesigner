<template>
  <a-radio-group name="radioGroup">
    <a-radio
      :value="item"
      v-for="item in checkOptions"
      :key="item"
    >{{ item }}</a-radio>
  </a-radio-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const webSite = namespace('webSite');
const checkOptions = ['apple', 'pear', 'orange'];

@Component({
  name: 'select-component'
})

export default class selectComponent extends Vue {
  @Prop() compData: any;

  comAttr: any = this.compData.compAttr;
  checkOptions = checkOptions

  created(): void {
  }
}
</script>

<style lang="less" scoped>
</style>

<template>
  <a-radio-group name="radioGroup" :defaultValue="0">
    <a-radio
      :value="i"
      v-for="i in Number(comAttr.choosen)"
      :key="(i + 9).toString(36) + i"
    >option{{ i }}</a-radio>
  </a-radio-group>
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

    comAttr:any = this.compData.compAttr;

    created():void{
    }
}
</script>

<style lang="less" scoped>
</style>

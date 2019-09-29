<template>
  <a-checkbox-group>
    <a-row>
      <a-col
        :value="i"
        v-for="i in Number(comAttr.choosen)"
        :key="(i + 9).toString(36) + i"
        :span="8"
      >
        <a-checkbox :value="i">option{{ i }}</a-checkbox>
      </a-col>
    </a-row>
  </a-checkbox-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Checkbox } from 'ant-design-vue';
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

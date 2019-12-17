<template>
  <a-checkbox-group :options="checkOptions"/>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Checkbox } from 'ant-design-vue';
import { namespace } from 'vuex-class';

const webSite = namespace('webSite');
const checkOptions = ['apple', 'pear', 'orange'];
@Component({
  name: 'select-component'
})

export default class selectComponent extends Vue {
    @Prop() compData: any;

    comAttr:any = this.compData.compAttr;
    checkOptions = checkOptions

    created():void{
    }
}
</script>

<style lang="less" scoped>
</style>

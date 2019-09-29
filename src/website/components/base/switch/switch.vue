<template>
  <a-switch defaultChecked/>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Switch } from 'ant-design-vue';
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

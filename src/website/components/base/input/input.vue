<template>
  <a-input
    class="myinput"
    :placeholder="comAttr.placeHolder"
    :style="comAttr"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Input } from 'ant-design-vue';

const webSite = namespace('webSite');
@Component({
  name: 'input-component'
})

export default class inputComponent extends Vue {
    @Prop() compData: any;

    comAttr:any = this.compData.compAttr;

    created():void{
    }
}
</script>

<style lang="less" scoped>
    .myinput{
        transition: 0.5s all;
        margin-top: 5px;
    }
</style>

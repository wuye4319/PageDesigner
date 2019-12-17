<template>
  <div>
    <div>把接收到的数据原样显示出来</div>
    <div>{{ defaultData }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import mix from '@/common/mixin/modeMixins';
const webSite = namespace('webSite');

@Component({
  name: 'pShowData-component',
  components: {},
  mixins: [mix]
})
export default class pShowDataComponent extends Vue {
  created() {}

  mounted() {}
  defaultData: any = false;
}
</script>
<style lang='less' scoped>
</style>

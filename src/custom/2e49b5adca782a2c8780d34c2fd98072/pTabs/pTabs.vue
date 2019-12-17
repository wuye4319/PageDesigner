<template>
  <div>
    <a-tabs v-model="defaultData">
      <a-tab-pane key="1" tab="切换1">
        <div>我是第一个页签</div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="切换2">
        <div>我是第二个页签</div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import mix from '@/common/mixin/modeMixins';
const webSite = namespace('webSite');

@Component({
  name: 'showData-component',
  components: {},
  mixins: [mix]
})
export default class showDataComponent extends Vue {
  created() {}
  defaultData: string = '1';

  mounted() {}
}
</script>
<style lang='less' scoped>
</style>

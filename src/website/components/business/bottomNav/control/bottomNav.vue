<template>
  <div class="bottomNav">
    <h3>路由配置</h3>
    <div>
      <label>固定到底部：</label>
      <a-switch
        checkedChildren="是"
        unCheckedChildren="否"
        v-model="isFixed"
        @change="changeVal('isFixed')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import commonMixin from '@/common/mixin'

const webSite = namespace('webSite');

@Component({
  name: 'bottomNav-component',
  components: {}
})
export default class bottomNavComponent extends Vue {
  @Prop() compData: any;
  compAttr = this.compData.compAttr;
  pageData: any = this.compData

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  isFixed: boolean = true
  routBox: Array<string> = []

  mounted() { }

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
  }
}
</script>
<style lang='less' scoped>
.router {
  margin-top: 20px;
}
</style>

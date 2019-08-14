<template>
  <div>
    <div v-for="(view,i) in viewCompList" :key="i">
      <div :is="view" :compData="compsDate(i)"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getCompsInfor } from '@/common/utils'

const webSite = namespace('webSite');

@Component({
  name: 'page-index',
  components: {}
})
export default class Pageindex extends Vue {
  $router
  currentRoute: any = ''

  @webSite.Action('pageInfor')
  getPageInfor;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  compsDate(i) {
    let comps = Object.keys(this.pageInfor)
    return this.pageInfor[comps[i]]
  }

  created() {
    this.currentRoute = this.$router.currentRoute.params.page
    this.getPageInfor({ domain: 'default', page: this.currentRoute })
  }

  get viewCompList() {
    let comps = Object.keys(this.pageInfor)
    let compsInfor = getCompsInfor('website/components/', comps)
    return compsInfor
  }
}
</script>
<style lang='less' scoped>
</style>

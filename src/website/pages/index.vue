<template>
  <div class="page-container">
    <transition-group name="flip-list" class="flip-list" tag="div">
      <div v-for="(view,i) in viewCompList" :key="'viewComp'+i">
        <div
          :is="view"
          :compData="compsDate(i)"
          :compIndex="i"
          @loadCompList="loadCompList"
          :compList="compList"
        ></div>
      </div>
    </transition-group>
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
  compList: any = ''

  @webSite.Action('pageInfor')
  getPageInfor;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  compsDate(i) {
    return this.pageInfor[i]
  }

  created() {
    this.currentRoute = this.$router.currentRoute.params.page
    this.getPageInfor({ domain: 'default', page: this.currentRoute })
  }

  get viewCompList() {
    let compsInfor = getCompsInfor('website/components/', this.pageInfor)
    return compsInfor
  }

  loadCompList(compInfor) {
    this.compList = getCompsInfor('website/components/', compInfor)
  }
}
</script>
<style lang='less' scoped>
.page-container {
  text-align: center;
}
.flip-list-move {
  transition: transform 0.3s;
}
</style>

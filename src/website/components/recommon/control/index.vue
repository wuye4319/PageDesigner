<template>
  <div>
    <div>
      <label>主标题：</label>
      <input type="text" v-model="mainTitle" @blur="editMainTitle">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'recommon-component',
  components: {}
})
export default class recommonComponent extends Vue {
  @Prop() pageData: any
  mainTitle: string = ''

  @webSite.Action('editPageInfor')
  editPageInfor

  editMainTitle() {
    this.pageData.data.mainTitle = this.mainTitle
    this.editPageInfor({ name: this.pageData.name, data: this.pageData.data })
  }

  created() { }

  mounted() {
    this.mainTitle = this.pageData.data.mainTitle
  }
}
</script>
<style lang='less' scoped>
</style>

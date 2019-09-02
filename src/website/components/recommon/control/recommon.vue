<template>
  <div>
    <div>
      <label>主标题：</label>
      <input
        type="text"
        v-model="mainTitle"
        @blur="editMainTitle"
      >
    </div>
    <div>
      <label>副标题：</label>
      <input
        type="text"
        v-model="secondTitle"
        @blur="editSecondTitle"
      >
    </div>
    <div>
      <label>设置一行橱窗个数：</label>
      <input
        type="text"
        v-model="numberItem"
        @blur="numberItem"
      >
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
  secondTitle: string = ''
  numberItem: string = ''

  @webSite.Action('editPageInfor')
  editPageInfor

  editMainTitle() {
    this.pageData.data.mainTitle = this.mainTitle
    this.editPageInfor({ name: this.pageData.name, data: this.pageData.data })
  }

  editSecondTitle() {
    this.pageData.data.secondTitle = this.secondTitle
    this.editPageInfor({ name: this.pageData.name, data: this.pageData.data })
  }

  created() { }

  mounted() {
    this.mainTitle = this.pageData.data.mainTitle
    this.secondTitle = this.pageData.data.secondTitle
  }
}
</script>
<style lang='less' scoped>
</style>

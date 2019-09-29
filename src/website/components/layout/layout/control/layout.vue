<template>
  <div>
    <div class="cols">
      <span>列数：</span>
      <a-slider
        id="test"
        :min="1"
        :max="5"
        v-model="column"
        :defaultValue="this.compData.compAttr.column"
        @change="changeVal('column')"
      />
    </div>
    <div class="cols">
      <span>行数：</span>
      <a-slider
        id="test"
        :min="1"
        :max="5"
        v-model="row"
        :defaultValue="this.compData.compAttr.row"
        @change="changeVal('row')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'layout-component',
  components: {
  }
})
export default class layoutComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number
  compAttr = this.compData.compAttr

  column: number
  row: number

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created() {
    for (let key of Object.keys(this.compData.compAttr)) {
      this[key] = this.compData.compAttr[key];
    }
  }

  mounted() {
  }

  changeVal(name) {
    this.compData.compAttr[name] = this[name];
    this.editPageInfor({ index: this.compIndex, data: this.compData.compAttr });
  }
}
</script>
<style lang='less' scoped>
.design-comp-sort {
  position: relative;
  .cols {
    flex-grow: 1;
    border: 1px solid #ddd;
    min-height: 40px;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
}
</style>

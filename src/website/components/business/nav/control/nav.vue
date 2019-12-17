<template>
  <div class="myHeaderControl">
    <ul>
      <li>
        <h4>主题</h4>
        <a-select defaultValue="lucy" style="width: 120px">
          <a-select-option value="jack">dark</a-select-option>
          <a-select-option value="lucy">default</a-select-option>
        </a-select>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'nav-component',
  components: {}
})
export default class navComponent extends Vue {
  test: object = {};
  created() {}

  mounted() {}

  testClick() {
    Vue.set(this.test, 'test', '13');
    console.log(this.test);
  }
}
</script>
<style lang='less' scoped>
.myHeaderControl {

}
</style>

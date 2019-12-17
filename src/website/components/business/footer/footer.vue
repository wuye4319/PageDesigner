<template>
  <div class="myFooter">
    <ul>
      <li>Copyright&copy;2006-2019 xxxxx xxxxx, All Rights Reserved.</li>
      <li>中国广东省深圳市深南中路436号 </li>
      <li>粤ICP备88888889号  公安机关备案号 88888888888</li>
      <li>法律声明</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'footer-component',
  components: {}
})
export default class footerComponent extends Vue {
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
.myFooter {
  width: 100%;
  // display: flex;
  background: #001529;
  padding: 0 10px;
  margin-top: 30px;
  ul {
    padding: 20px 0;
    width: 80%;
    margin: 0 auto;
    text-align: left;
    color: #8d8d8d;
  }
}
</style>

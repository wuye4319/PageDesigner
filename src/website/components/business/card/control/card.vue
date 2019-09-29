<template>
  <div class="myCard">
    卡片
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

const webSite = namespace("webSite");

@Component({
  name: "card-component",
  components: {}
})
export default class cardComponent extends Vue {
  created() {}

  mounted() {}
}
</script>
<style lang='less' scoped>
.myFooter {
  width: 100%;
  // display: flex;
  background: #001529;
  padding: 0 10px;
  ul {
    padding: 20px 0;
    width: 80%;
    margin: 0 auto;
    text-align: left;
    color: #8d8d8d;
  }
}
</style>

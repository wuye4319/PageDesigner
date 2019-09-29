<template>
  <div class="myHeader">
    <div class="logo" />
    <ul class="mymenue">
      <li>首页</li>
      <li>关于</li>
      <li>联系我们</li>
      <li>更多</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

const webSite = namespace("webSite");

@Component({
  name: "nav-component",
  components: {}
})
export default class navComponent extends Vue {
  created() {}

  mounted() {}
}
</script>
<style lang='less' scoped>
.myHeader {
  width: 100%;
  display: flex;
  background: #001529;
  height: 64px;
  line-height: 64px;
  padding: 0 10px;
  .logo {
    width: 100px;
    height: 100%;
    background: url("../../../../../static/images/logo.png") no-repeat center;
    background-size: contain;
  }
  .mymenue {
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    color: white;
    li{
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>

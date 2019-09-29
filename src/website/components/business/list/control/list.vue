
  <template>
  <div class="myList">
    列表
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

const webSite = namespace("webSite");

@Component({
  name: "list-component",
  components: {}
})
export default class listComponent extends Vue {
  created() {}

  mounted() {}
}
</script>
<style lang='less' scoped>
.myList {
  width: 100%;
  // display: flex;
  // background: #001529;
  // padding: 10px 10px;
  // justify-content: space-around;
}
</style>

<template>
  <div class="myCard">
    <a-card hoverable style="width: 240px">
      <img
        alt="example"
        src="https://www.authine.com/Uploads/20190325115244_673110.jpg"
        slot="cover"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">www.instagram.com</template>
      </a-card-meta>
    </a-card>
    <a-card hoverable style="width: 240px">
      <img
        alt="example"
        src="https://www.authine.com/Uploads/20190325115244_673110.jpg"
        slot="cover"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">www.instagram.com</template>
      </a-card-meta>
    </a-card>
    <a-card hoverable style="width: 240px">
      <img
        alt="example"
        src="https://www.authine.com/Uploads/20190325115244_673110.jpg"
        slot="cover"
      />
      <a-card-meta title="Europe Street beat">
        <template slot="description">www.instagram.com</template>
      </a-card-meta>
    </a-card>
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
.myCard {
  width: 100%;
  display: flex;
  // background: #001529;
  padding: 10px 10px;
  justify-content: space-around;
}
</style>

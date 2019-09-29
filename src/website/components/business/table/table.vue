
<template>
  <div class="myTable">
    <a-table :columns="columns" :dataSource="data" :pagination="{ pageSize: 10 }" :scroll="{ y: 240 }" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

const webSite = namespace("webSite");

@Component({
  name: "table-component",
  components: {}
})
export default class tableComponent extends Vue {
  columns = [{
  title: 'Name',
  dataIndex: 'name',
  width: 150,
}, {
  title: 'Age',
  dataIndex: 'age',
  width: 150,
}, {
  title: 'Address',
  dataIndex: 'address',
}];
data = [
  {
    key: 1,
    name: `Edward King ${1}`,
    age: 32,
    address: `London, Park Lane no. ${1}`,
  },
  {
    key: 2,
    name: `Edward King ${2}`,
    age: 32,
    address: `London, Park Lane no. ${3}`,
  },
  {
    key: 3,
    name: `Edward King ${3}`,
    age: 32,
    address: `London, Park Lane no. ${3}`,
  }
]
  created() {}

  mounted() {}
}
</script>
<style lang='less' scoped>
.myTable {
  width: 100%;
}
</style>

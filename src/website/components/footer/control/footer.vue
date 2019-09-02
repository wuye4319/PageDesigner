<template>
  <div>footer control</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'footer-component',
  components: {}
})
export default class footerComponent extends Vue {
  @Prop() compIndex: number

  created() { }
}
</script>
<style lang='less' scoped>
</style>

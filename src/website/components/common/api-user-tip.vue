<template>
  <div class="user-tip">
    <div class="title">数据联动支持API:</div>
    <ul class="list-warp"><li v-for="(data,n) in apiList" :key="n">
      <div class="dsc">{{ data.dsc }}</div>
      <div class="api">{{ data.api }}</div>
    </li></ul>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  name: 'apiUserTip',
  components: {}
})
export default class apiUserTip extends Vue {
  // 生命周期
  created() {}
  mounted() {}
    @Prop({
      type: Array,
      default: () => [{ dsc: '//说明', api: 'updatedList(mark:string)' }]
    })
    apiList!:any[];
}
</script>
<style lang="less" scoped>
.user-tip{
  border-top: 1px solid #e8e8e8;
  padding: 10px 0;
  text-align: left;
}
.title{
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
}
.dsc{
  color: #aaa;
  word-break: break-all;
}
.api{
  color:#17BC94;
  font-size: 16px;
  font-weight: bold;
  word-break: break-all;
}
.list-warp>li{
  padding: 6px 4px;
  border-bottom: 1px solid #e8e8e8
}
</style>

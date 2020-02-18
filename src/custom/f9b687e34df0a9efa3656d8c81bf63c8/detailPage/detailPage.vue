<template>
  <div class="pageDetail">
    <div class="top">
      <a-icon type="left" />
      <h5>标题</h5>
      <a-icon type="ellipsis" />
    </div>
    <div class="center">

    </div>
    <div class="bottom">
      <a-input placeholder="评论" />
      <div class="operate">
        <a-icon type="star" />
        <a-icon type="heart" />
        <a-button type="primary" style="padding: 0 4px;height: 24px;line-height: 24px">发送</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Icon, Input, Button } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'pageDetail-component',
  components: {
    AIcon: Icon,
    AInput: Input,
    AButton: Button
  }
})
export default class pageDetailComponent extends Vue {
  created() { }

  mounted() { }
}
</script>
<style lang='less' scoped>
.pageDetail{
  padding: 34px 0;
  *{
    margin: 0;
  }
  .top,.bottom{
    position: fixed;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 34px;
    line-height: 34px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
  }
  .top{
    top: 0;
    justify-content: space-between;
  }
  .bottom{
    bottom: 0;
    padding-top: 3px;
    padding-bottom: 3px;
    .operate{
      width: 120px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    input{
      flex: 1;
      height: 100%;
      background: #eee;
      border: 0;
      border-radius: 14px;
      margin-right: 6px;
    }
  }
}
</style>

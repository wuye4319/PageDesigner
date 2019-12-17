<template>
  <div class="listItem">
    <div class="leftImg">
      <img width="100px" src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1800972588,3781195765&fm=26&gp=0.jpg" alt="">
    </div>
    <div class="rightContent">
      <div class="lineT">
        <h5>服装空间</h5>
      </div>
      <div class="lineO">
        <span>wedu</span>
        <span>30分钟前</span>
      </div>
      <div class="lineS">
        <div class="hot">
          <a-icon type="fire" />
          <span>最新西藏旅游线路攻略</span>
        </div>
        <div class="hot">
          <a-icon type="fire" />
          <span>最新西藏旅游线路攻略</span>
        </div>
        <div class="hot">
          <a-icon type="fire" />
          <span>最新西藏旅游线路攻略</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'listItem-component',
  components: {}
})
export default class listItemComponent extends Vue {
  created() { }

  mounted() { }
}
</script>
<style lang='less' scoped>
.listItem{
  display: flex;
  flex-direction: row;
  padding: 3px;
  margin: 3px;
  border-radius: 4px;
  background: white;
}
.hot{
  i{
    color: red;
  }
}
.rightContent{
  text-align: left;
  padding: 0 12px;
}
</style>

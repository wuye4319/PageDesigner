<template>
  <div class="findPage">
    <div class="header">
      <a-input placeholder="搜索">
        <a-icon slot="prefix" type="search"/>
      </a-input>
      <!-- <a-icon type="appstore" style="margin-left: 8px;font-size: 16px;color: white" /> -->
    </div>
    <div class="findList">
      <div class="item">
        <div class="title">
          <span>featurelist</span>
          <a-icon type="right"/>
        </div>
        <div class="content">
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1620906161,2794597244&fm=26&gp=0.jpg" alt="">
        </div>
        <div class="footer">
          <p>本周最佳攻略推荐</p>
        </div>
      </div>
      <div
        class="tag"
        v-for="(item,i) in 5"
        :key="i"
      >
        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1111603952,1083408135&fm=26&gp=0.jpg" alt="">
        <div class="right">
          <div class="time">2019/12/06</div>
          <div>2sdf sdf019 /12/0dd adfsdfs6</div>
          <div>2sdfs019 /sfafadfee 12/06</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Icon, Input } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'findPage-component',
  components: {
    AIcon: Icon,
    AInput: Input
  }
})
export default class findPageComponent extends Vue {
  created() { }

  mounted() { }
}
</script>
<style lang='less' scoped>
.findPage{
  width: 100%;
  height: 100%;
  background: #343235;
  color: #787677;
  .header{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 6px 8px;
    background: #343235;
    /deep/.ant-input{
      background: black;
      border: 0;
      color: white;
      border-radius: 16px;
      font-size: 12px;
    }
    /deep/.ant-input-prefix{
      color: #fade37;
      font-weight: 500;
    }
  }
  .findList{
    .title{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 8px;
      font-size: 14px;
      font-weight: 500;
      height: 48px;
    }
    .content{
      padding: 12px 24px;
      img{
        border-radius: 8px;
        width: 100%;
      }
    }
    .footer{
      text-align: left;
      padding: 0 8px;
      color: #dad8dc;
      font-size: 14px;
    }
  }
  .tag{
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    img{
      width: 50%;
      border-radius: 8px;
    }
    .right{
      flex: 1;
      text-align: left;
      padding-left: 8px;
      white-space: wrap;
      .time {
        color: #fade37;
        font-weight: 700;
      }
    }
  }
}
</style>

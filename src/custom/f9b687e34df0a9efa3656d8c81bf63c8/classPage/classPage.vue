<template>
  <div class="classPage">
    <div class="imgCard" v-for="(item,i) in classes" :key="i">
      <img :src="item.bg" alt="">
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'classPage-component',
  components: {}
})
export default class classPageComponent extends Vue {
  classes: any = [
    { bg: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=358571324,2274511244&fm=26&gp=0.jpg', text: '旅游' },
    { bg: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3345558762,4224615957&fm=26&gp=0.jpg', text: '学习' },
    { bg: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2424205005,814560301&fm=26&gp=0.jpg', text: '服装' },
    { bg: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1493186464,791775722&fm=26&gp=0.jpg', text: '健身' },
    { bg: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1136818274,773348885&fm=26&gp=0.jpg', text: '工作' },
    { bg: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3378117055,3222036324&fm=26&gp=0.jpg', text: '管理' },
    { bg: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1924256247,2280066858&fm=11&gp=0.jpg', text: 'it' },
    { bg: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3652264774,1890865955&fm=26&gp=0.jpg', text: '健康' },
    { bg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2981564169,2644898085&fm=26&gp=0.jpg', text: '心理' }
  ]
  created() { }

  mounted() { }
}
</script>
<style lang='less' scoped>
.classPage{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  background: #938789;
  .imgCard{
    width: 49%;
    height: 160px;
    line-height: 160px;
    background-size: contain;
    color: white;
    position: relative;
    margin-bottom: 3px;
    img{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    p{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.3)
    }
  }
}
</style>

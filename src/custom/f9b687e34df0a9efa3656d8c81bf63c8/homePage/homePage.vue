<template>
  <div class="homePage">
    <div class="header">
      <a-input placeholder="搜索">
        <a-icon slot="prefix" type="search"/>
      </a-input>
      <a-icon type="appstore" style="margin-left: 8px;font-size: 16px;color: white"/>
    </div>
    <!-- <div class="swipper">
      <img width="100%" height="128" :src="defaultImg" alt="">
    </div> -->
    <!-- <div class="tab">
      <ul>
        <li>全部</li>
        <li>我的关注</li>
        <li>推荐</li>
      </ul>
      <div class="tabContent">
        <list-item></list-item>
        <list-item></list-item>
        <list-item></list-item>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import listItem from '../listItem/index';
import { Icon, Input } from 'ant-design-vue';
const defaultImg = require('../../../../static/images/img.png')
const webSite = namespace('webSite');

@Component({
  name: 'homePage-component',
  components: {
    listItem,
    AIcon: Icon,
    AInput: Input
  }
})
export default class homePageComponent extends Vue {
  defaultImg = defaultImg;
  actions = [
    { type: 'star-o', text: '156' },
    { type: 'like-o', text: '156' },
    { type: 'message', text: '2' },
  ]

  get listData () {
    return [
      {
        href: 'https://vue.ant.design/',
        title: `ant design vue part`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      }
    ]
  }
  created() { }

  mounted() { }
}
</script>
<style lang='less' scoped>
.homePage{
  width: 100%;
  height: 100%;
  font-size: 12px;
  .header{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 4px 8px;
    background: #343235;
    /deep/.ant-input{
      background: rgba(255,255,255,0.2);
      border: 0;
      color: white;
    }
  }
  .tab{
    ul{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 4px 0;
      background: white;
      margin: 0;
      li{
        flex: 1;
        border-right: 1px solid #ccc;
        &:last-of-type{
          border: 0;
        }
      }
    }
  }
}
</style>

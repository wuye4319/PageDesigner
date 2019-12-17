<template>
  <div
    class="bottomNav"
    :style="{
      width: compAttr.width,
      height: compAttr.height
    }"
  >
    <ul class="navList">
      <li v-for="(item,i) in tableData" :key="'tableData'+item.id" :class="item.select?'active':''" @click="addRoute(item.rout,i)">
        <a-icon :type="item.icon"/>
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import commonMixin from '@/common/mixin'

const webSite = namespace('webSite');

@Component({
  name: 'bottomNav-component',
  components: {},
  mixins: [commonMixin]
})
export default class bottomNavComponent extends Vue {
  @Prop() compData: any;
  compAttr = this.compData.compAttr;
  pageSelect: string = ''; // 当前选择的page
  isMobile: string = ''; // 手机端class name
  dataModel: any = this.compData.dataModel

  @webSite.Getter('tables')
  tables;

  @webSite.Action('changePage')
  changePage;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  // 组件的初始化数据
  initData = [
    { id: 'home', icon: 'home', name: '首页', select: true },
    { id: 'find', icon: 'appstore', name: '发现' },
    { id: 'circle', icon: 'plus-circle', name: '' },
    { id: 'heart', icon: 'heart', name: '攻略' },
    { id: 'user', icon: 'user', name: '我的' }
  ]

  created() {
    // console.log(this.form);
    // let func = 'function test(){console.log("123")};test();'
    // eval(func)
  }

  // 数据绑定
  get tableData() {
    return this.getTableData(this.tables, this.dataModel, this.initData)
  }

  mounted() { }

  // 添加路由
  async addRoute(router, index) {
    let lis = document.querySelectorAll('.navList li');
    for (let i = 0; i < lis.length; i++) {
      let ele = lis[i];
      if (i === index) {
        await ele.setAttribute('class', 'active');
        this.tableData[i].select = true;
      } else {
        await ele.setAttribute('class', '');
        this.tableData[i].select = false;
      }
    }

    if (router) {
      let appID = this.$router.currentRoute.params.appID;
      let page = router
      let routname = this.$route.name

      this.$router.push({
        path: `/${routname}/${appID}/${page}`,
        query: {
          screen: this.appInfor[page].screen
        }
      });
      this.changePage({ page: page });
    } else {
      this.$message.info('请先绑定数据源！');
    }
  }
}
</script>
<style lang='less' scoped>
.bottomNav {
  width: 100%;
  background: white;
  border-top: 1px solid #eee;
}
.navList {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  font-size: 12px;
  li {
    cursor: pointer;
    &:hover {
      color: #17bc94;
    }
    &.active{
      color: #17bc94;
    }
  }
  p {
    margin: 0;
  }
}
</style>

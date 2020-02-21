<template>
  <div
    class="bottomNav"
    :style="{
      width: compAttr.width,
      height: compAttr.height
    }"
  >
    <ul class="navList">
      <li
        v-for="(item,i) in this.compAttr.data"
        :key="item.route + item.id"
        :class="(useDefault && Number(compAttr.defaultPage) === i) || (!useDefault && item.select === 'true')?'ant-desigener-font-color':''"
        :style="{'color':(useDefault && Number(compAttr.defaultPage) === i) || item.select === 'true'?compAttr.selectColor:compAttr.color}"
        @click="addRoute(item.route,i)"
      >
        <a-icon
          style="font-size: 16px"
          :type="item.select === 'true'?item.iconSelect:item.icon"
          :theme="item.iconTheme"
        />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Icon } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'bottomNav-component',
  components: { AIcon: Icon }
})
export default class bottomNavComponent extends Vue {
  $router;
  // 组件信息
  @Prop() compData: any;
  // 表格信息
  @webSite.Getter('tables')
  // 改变页面信息
  tables;
  @webSite.Action('changePage')
  changePage;
  // 获取页面信息
  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  compAttr = this.compData.compAttr;
  pageSelect: string = ''; // 当前选择的page
  isMobile: string = ''; // 手机端class name
  dataModel: any = this.compData.dataModel;
  useDefault: boolean = false;

  created() {
    let page = this.$router.currentRoute.params.page;
    let isSelect = false;
    this.compAttr.data.forEach(el => {
      if (el.route === page) {
        el.select = 'true';
        isSelect = true;
      } else {
        el.select = 'false';
      }
    });
    if (!isSelect) {
      this.useDefault = true;
    }
  }
  // 添加路由
  async addRoute(router, index) {
    this.useDefault = false;
    let data = this.compAttr.data;
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (i === index) {
        item.select = 'true';
      } else {
        item.select = 'false';
      }
      this.$set(data, i, item)
      this.compAttr.data = data;
    }

    if (router === 'custom') {
      window.open(data[index].customLink, '_blank');
    }

    if (router) {
      let appID = this.$router.currentRoute.params.appID;
      let page = router;
      let routname = this.$route.name;

      this.$router.push({
        path: `/${routname}/${appID}/${page}`,
        query: {
          screen: this.appInfor[page].screen
        }
      });
      this.changePage({ page: page });
    } else {
      this.$message.info('请选择跳转页面！');
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
  overflow: auto;
  border: 1px solid #eee;
  padding: 2px 0 0 0;
  li {
    cursor: pointer;
  }
  p {
    margin: 0;
  }
}
</style>

<template>
  <div class="myHeader" :style="{'text-align':compAttr.position}">
    <ul :class="'mymenue ' + compAttr.type">
      <li
        v-for="(item,i) in compAttr.data"
        :key="i"
        :class="(useDefault && Number(compAttr.defaultPage) === i) || (!useDefault && item.select === 'true')?'ant-desigener-border-color active':'default'"
        @click="addRoute(item.route,i)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'nav-component',
  components: {}
})
export default class navComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;
  compAttr: any = this.compData.compAttr;
  useDefault: boolean = false;

  @webSite.Action('changePage')
  changePage;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

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
        if (item.select === 'false') {
          this.trigFunc('tabChange', this.compData.actionModel);
        }
        item.select = 'true';
      } else {
        item.select = 'false';
      }
      this.$set(data, i, item);
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
.myHeader {
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  .mymenue {
    display: inline-block;
    white-space: nowrap;
    margin: 0px;
    li {
      display: inline-block;
      padding: 3px 6px;
      cursor: pointer;
      font-size: 12px;
      margin-right: 10px;
    }
    &.line {
      /* display: flex; */
      flex-direction: row;
      // height: 100%;
      justify-content: space-around;
      align-items: center;
      li {
        &.active {
          border-bottom-width: 2px;
          border-bottom-style: solid;
        }
      }
    }
    &.outline {
      li {
        &.default {
          border: 1px solid #ccc;
          // border-right: transparent;
        }
        &:first-of-type {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        &:last-of-type {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          // border-right: 1px solid #ccc;
        }
        &.active {
          border-width: 1px;
          border-style: solid;
        }
      }
    }
    &.tab {
      width: auto;
      background: rgba(23, 188, 148, 0.3);
      border-radius: 13px;
      height: 26px;
      li {
        padding: 0 12px;
        height: 26px;
        line-height: 26px;
        &.active {
          color: white;
          background: #17bc94;
          border-radius: 13px;
        }
      }
    }
  }
}
</style>

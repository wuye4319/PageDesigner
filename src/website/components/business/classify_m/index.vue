
<template>
  <div class="classify-mobile">
    <div
      class="list-item"
      :class="{line: isLine(i)}"
      v-for="(item,i) of classifyData"
      :key="i"
      :style="{width:(100/compAttr.column)+'%'}"
    >
      <div class="item-cont" @click="goUrl(item.urlType,item.url)">
        <a-icon v-if="item.icon.type !== 'none'" v-bind="item.icon"/>
        <span class="item-text">{{ item.label }}</span>
        <span>({{ item.sum }})</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Icon } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'classify-mobile-view',
  components: {
    AIcon: Icon
  }
})
export default class ClassifyMobileView extends Vue {
  @Prop() compData;

  @webSite.Getter('tables')
  tables;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  @webSite.Action('changePage')
  changePage;

  $store;
  compAttr: any = this.compData.compAttr;
  dataModel: any = this.compData.dataModel;
  mapData: any = this.compData.dataModel.mapData;
  myVal: string = '0';

  get classifyData(): object[] {
    // control表数据
    let row = this.compAttr.row;
    let column = this.compAttr.column;
    let maxLen = row * column;
    let arr = [];
    if (maxLen > this.compAttr.data.length) {
      arr = this.compAttr.data;
    } else {
      arr = this.compAttr.data.slice(0, maxLen);
    }
    return arr;
  }

  get buttonStyle() {
    let buttonStyle = this.compAttr.style === 'tabs' ? 'outline' : 'solid';
    return buttonStyle;
  }

  created() {
    if (this.compAttr.bindUid && this.compAttr.bindName) {
      let eventName = `${this.compAttr.bindUid}-tableName`;
      // 绑定事件
      this.$store.on(eventName, this.changeTableName);
    }
  }

  mounted() {}

  // 改变tab名称
  changeTableName(name) {
    this.dataModel.tableName = name;
  }

  isLine(i) {
    // 当为样式二时候 判断是否需要添加分割线
    let status = false;
    if (
      this.compAttr.style === 'two' &&
      i !== this.classifyData.length - 1 &&
      (i + 1) % this.compAttr.column > 0
    ) {
      status = true;
    }

    return status;
  }

  // url跳转
  goUrl(type, url) {
    if (type === '用户自定义') {
      window.open(url);
    } else {
      let appID = this.$router.currentRoute.params.appID;
      let page = type;
      let routname = this.$route.name;
      this.$router.push({
        path: `/${routname}/${appID}/${page}`,
        query: {
          screen: this.appInfor[page].screen
        }
      });
      this.changePage({ page });
    }
  }
}
</script>
<style lang='less' scoped>
.classify-mobile {
  display: flex;
  flex-wrap: wrap;
}
.list-item {
  &.line {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      right: -1px;
      top: 50%;
      width: 1px;
      height: 10px;
      margin-top: -5px;
      background: #e8e8e8;
    }
  }
}
.item-cont {
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
}
</style>

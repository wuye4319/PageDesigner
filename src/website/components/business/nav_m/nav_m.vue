<template>
  <div class="nav-mobile" :class="{'show-border':pageData.showBorder}">
    <a-list
      :grid="pageData"
      :dataSource="navData"
      :bordered="false"
    >
      <a-list-item slot="renderItem" slot-scope="item,i">
        <div class="list-item" :class="{'line-row':pageData.lineRow}">
          <div class="pic">
            <img
              class="img"
              :src="require(`./nav${i}.png`)"
              alt=""
            >
          </div>
          <div class="text">
            {{ item.text }}
          </div>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List } from 'ant-design-vue';
const webSite = namespace('webSite');

const numberData = [
  { text: '理论宣讲' },
  { text: '教育服务' },
  { text: '科技服务' },
  { text: '公益平台' }
];

@Component({
  name: 'nav-mobile',
  components: {
    AList: List,
    AListItem: List.Item
  }
})
export default class Navmobile extends Vue {
  @Prop() compData: any;

  pageData: any = this.compData.compAttr;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  get navData(): object[] {
    let row = this.pageData.row;
    let column = this.pageData.column;
    let maxLen = row * column;
    let arr = [];
    if (maxLen > numberData.length) {
      arr = numberData;
    } else {
      arr = numberData.slice(0, maxLen);
    }
    return arr;
  }

  created(): void {}
}
</script>

<style lang="less" scoped>
.nav-mobile {
  margin: 10px auto;
  &.show-border {
    box-shadow: 0 0 16px 0 rgba(124, 118, 180, 0.2);
  }
  .img {
    width: 40px;
    height: 40px;
  }
  /deep/.ant-list-grid .ant-list-item {
    margin-bottom: 0;
  }
}
.card-icon {
  font-size: 40px;
  color: blue;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  .text {
    margin-top: 5px;
  }
  &.line-row {
    flex-direction: row;
    .text {
      margin-top: 0;
      margin-left: 20px;
      font-size: 16px;
    }
  }
}
</style>

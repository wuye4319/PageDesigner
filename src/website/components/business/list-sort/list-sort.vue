
<template>
  <div class="list-sort">
    <div class="item" @click="chooseItem(item.value,item.sort,i)" v-for="(item,i) of compAttr.data" :key="i">
      <div class="name" :class="{'ant-desigener-font-color': clickNum === i}">{{ item.label }}</div>
      <div class="sort"
           :class="{'single-icon': item.sort !== 'sort'}"
           v-if="item.sort !== 'none'">
        <a-icon class="sort-icon"
                :class="{'ant-desigener-font-color': clickNum === i && clickSort === 'asc'}"
                v-if="item.sort === 'asc' || item.sort === 'sort'"
                type="caret-up" />

        <a-icon class="sort-icon sort-icon-down"
                :class="{'ant-desigener-font-color': clickNum === i && clickSort === 'desc'}"
                v-if="item.sort === 'desc' || item.sort === 'sort'"
                type="caret-down" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { log } from 'util';

const webSite = namespace('webSite');

@Component({
  name: 'list-sort-view',
  components: {}
})
export default class ListSortView extends Vue {
  @Prop() compData
  @webSite.Getter('tables')
  tables;

  $store
  compAttr:any = this.compData.compAttr
  dataModel:any = this.compData.dataModel
  clickNum: number = 0 // 当前选中
  clickVal:string = 'listAll' // 点击的值
  clickSort: string = 'none' // asc 正序 desc 倒序

  created() {
    if (this.compAttr.bindUid && this.compAttr.bindName) {
      let eventName = `${this.compAttr.bindUid}-tableName`;
      // 绑定事件
      this.$store.on(eventName, this.changeTableName);
    }
  }

  mounted() {}

  // 选中
  chooseItem(val, sort, i) {
    if (this.clickNum === i && this.clickSort === sort) {

    } else {
      this.uishow(val, sort, i);
      this.emitEvent(val, sort);
    }
  }

  // ui层展示
  uishow(val, sort, i) {
    if (sort === 'sort') {
      this.clickSort = this.clickVal === val ? this.clickSort : '';
      if (this.clickSort === '') {
        this.clickSort = 'asc';
      } else if (this.clickSort === 'asc') {
        this.clickSort = 'desc';
      } else if (this.clickSort === 'desc') {
        this.clickSort = 'asc';
      }
      this.clickNum = i;
      this.clickVal = val;
    } else {
      this.clickSort = sort;
      this.clickNum = i;
      this.clickVal = val;
    }
  }

  // 触发事件
  emitEvent(val, sort) {
    let params = {
      orderBy: this.clickVal === 'listAll' ? '' : `${this.clickVal}-${this.clickSort}`
    }
    let tableName = this.dataModel.tableName;
    if (this.compAttr.bindUid && this.compAttr.bindName) {
      this.$store.$emit(`${this.compAttr.bindUid}-${this.compAttr.bindName}`, tableName, params);
    } else {
      this.$store.$emit(this.compAttr.emit, tableName, params);
    }
  }

  // 改变tab名称
  changeTableName(name) {
    this.dataModel.tableName = name;
  }
}
</script>
<style lang='less' scoped>
.list-sort {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.item {
  display: flex;
  height: 24px;
  line-height: 24px;
  padding: 0 15px;
  cursor: pointer;
}
.name {
  font-size: 14px;

}

.sort {
  color: #bfbfbf;
  margin-top: 2px;
  .sort-icon {
    font-size: 12px;
    display: block;
    height: 4px;
    line-height: 4px;
  }
  .sort-icon-down {
    margin-top: 4px;
  }
  &.single-icon{
    margin-top: 6px;
    .sort-icon {
      font-size: 14px;
    }
    .sort-icon-down {
      margin-top: 0;
    }
  }
}
</style>

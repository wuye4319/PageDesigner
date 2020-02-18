
<template>
  <div>
    <div class="tap-warp">
      <span
        :class="{'user-action':clickNum === i}"
        @click="chooseItem(item.value,item.sort,i)"
        v-for="(item,i) of compAttr.data"
        :key="i">{{ item.label }}
      </span>
      <div class="icon-warp" v-if="compAttr.styleKs">
        <a-icon :type="this.icon" @click="iconClick" />
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
  name: 'list-sort-view',
  components: {
    AIcon: Icon
  }
})
export default class ListSortView extends Vue {
  @Prop() compData;
  @webSite.Getter('tables')
  tables;

  $store;
  compAttr: any = this.compData.compAttr;
  dataModel: any = this.compData.dataModel;
  clickNum: number = 0; // 当前选中
  clickVal: string = 'listAll'; // 点击的值
  clickSort: string = 'none'; // asc 正序 desc 倒序

  created() {
    if (this.compAttr.bindUid && this.compAttr.bindName) {
      let eventName = `${this.compAttr.bindUid}-tableName-sort`;
      // 绑定事件
      this.$store.off(eventName);
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
      orderBy:
        this.clickVal === 'listAll' ? '' : `${this.clickVal}-${this.clickSort}`
    };
    let tableName = this.dataModel.tableName;
    if (this.compAttr.bindUid && this.compAttr.bindName) {
      this.$store.$emit(
        `${this.compAttr.bindUid}-${this.compAttr.bindName}`,
        tableName,
        params
      );
    } else {
      this.$store.$emit(this.compAttr.emit, tableName, params);
    }
  }

  // 改变tab名称
  changeTableName(name) {
    this.dataModel.tableName = name;
    this.dataModel.mapData.forEach((item, i) => {
      this.dataModel.mapData[i].tableMap = ''
    })
    this.compAttr.data.forEach((item, i) => {
      this.compAttr.data[i].value = 'listAll'
      this.compAttr.data[i].sort = 'none'
    })
    this.clickNum = 0;
  }

  // 增加的js代码
  icon: string = 'bars';
  iconClick() {
    this.icon = this.icon === 'bars' ? 'appstore' : 'bars';
    this.$store.$emit(this.compAttr.bindUid + 'Icon', this.icon);
  }
}
</script>
<style lang='less' scoped>
.tap-warp {
  height: 47px;
  line-height: 47px;
  font-size: 16px;
  border-bottom: 1px solid #f3f3f3;
  text-align: left;
  position: relative;
  span {
    padding: 0 16px;
    cursor: pointer;
    color: #828282;
  }
  .user-action {
    color: #cd8755;
  }
  .icon-warp {
    position: absolute;
    right: 10px;
    top: 0;
    text-align: center;
    width: 25px;
    font-size: 20px;
    color: #656565;
  }
}
</style>

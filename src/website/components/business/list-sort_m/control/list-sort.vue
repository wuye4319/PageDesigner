
<template>
  <div class="list-sort">
    <a-list itemLayout="horizontal">

      <template v-if="datacompStatus">
        <a-list-item>
          <a-list-item-meta>
            <div slot="description">列表排序数据:</div>
          </a-list-item-meta>
          <div class="add">
            <a-button
              type="primary"
              size="small"
              class="handle-add"
              icon="plus"
              @click="addOptions"
            >添加</a-button>
          </div>
        </a-list-item>

        <div class="cont  ">
          <a-list-item v-for="(item,i) of data" :key="i">
            <div class="mylist">
              <div class="handle">
                <a-button
                  type="danger"
                  size="small"
                  class="handle-icon"
                  shape="circle"
                  icon="delete"
                  @click="deleteOptions(i)"
                />
              </div>
              <div class="list-data">
                <div class="item">
                  <div class="name">标签名{{ i+1 }}</div>
                  <div class="desc">
                    <a-input v-model="item.label"/>
                  </div>
                </div>
                <div class="item">
                  <div class="name">绑定值{{ i+1 }}</div>
                  <div class="desc">
                    <a-select
                      style="width: 100%;"
                      v-model="item.value"
                      @change="valueChange(item.value,item)"
                    >
                      <a-select-option key="listAll" value="listAll">全部</a-select-option>
                      <a-select-option
                        v-for="item of menuData"
                        :key="item"
                        :value="item"
                      >{{ item }}</a-select-option>
                    </a-select>
                  </div>
                </div>
                <div class="item">
                  <div class="name">排序{{ i+1 }}</div>
                  <div class="desc">
                    <a-select style="width: 100%;" v-model="item.sort">
                      <template v-if="item.value === 'listAll'">
                        <a-select-option key="none" value="none">不涉及</a-select-option>
                      </template>
                      <template v-else>
                        <!-- asc 正序 desc 倒序 -->
                        <a-select-option key="sort" value="asc">升序</a-select-option>
                        <a-select-option key="sort" value="desc">降序</a-select-option>
                        <a-select-option key="sort" value="sort">升序/降序</a-select-option>
                      </template>
                    </a-select>
                  </div>
                </div>
              </div>
            </div>
          </a-list-item>
        </div>
      </template>

      <template v-else>

        <a-list-item v-if="pageData.compAttr.bindUid && pageData.compAttr.bindName">
          <a-list-item-meta>
            <div slot="description">关联列表:</div>
          </a-list-item-meta>
          {{ pageData.compAttr.bindName }}-{{ pageData.compAttr.bindUid.substr(0,10) }}
        </a-list-item>
        <a-list-item>
          <a-list-item-meta>
            <div slot="description">风格切换:</div>
          </a-list-item-meta>
          <a-switch v-model="pageData.compAttr.styleKs"/>
        </a-list-item>
        <a-list-item v-if="!pageData.compAttr.bindName">
          <a-list-item-meta>
            <div slot="description">触发事件:</div>
          </a-list-item-meta>
          <a-input @blur="changeVal('emit')" v-model="emit"/>
        </a-list-item>
      </template>

    </a-list>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { List, Button, Input, Select, Switch } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'list-sort-component',
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AButton: Button,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASwitch: Switch
  }
})
export default class ListSortComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any;
  @Prop({ default: false, type: Boolean }) datacompStatus!: boolean;

  pageData = this.compData;
  dataModel: any = this.compData.dataModel;
  data: object[] = []; // 选项
  emit: string = ''; // 触发事件

  @webSite.Getter('tables')
  tables;

  created() {
    this['style'] = this.pageData.compAttr['style'];
    this['data'] = this.pageData.compAttr['data'];
    this['emit'] = this.pageData.compAttr['emit'];
  }

  get tableData() {
    let index = this.tables.findIndex(item => {
      return item.tableName === this.dataModel.tableName;
    });
    let data = [];
    if (index > -1) {
      data = this.tables[index].struct;
    }
    return data;
  }

  get menuData() {
    let menuData = this.tableData.map((item, i) => {
      return item['column_name'];
    });
    let data = Array.from(new Set(menuData));
    return data;
  }

  mounted() {}

  // 删除某一项
  deleteOptions(i) {
    this.data.splice(i, 1);
  }

  // 增加一项
  addOptions() {
    if (this.data.length > 10) {
      this.$message.error('超出上限！');
      return;
    }
    this.data.push({ label: '排序', value: 'listAll', sort: 'none' });
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
  }

  // 绑定值变化
  valueChange(val, item) {
    if (val === 'listAll') {
      item.sort = 'none';
    } else {
      item.sort = 'sort';
    }
  }
  // 新增的JS
}
</script>
<style lang='less' scoped>
.mylist {
  width: 100%;
  .handle {
    text-align: right;
    margin-bottom: -30px;
    margin-right: 5px;
  }
}
.cont {
  height: 450px;
  overflow: auto;
}
.item {
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: 180px;
  .name {
    margin-right: 15px;
    width: 60px;
    text-align: right;
  }
  .desc {
    flex: 1;
  }
}
</style>

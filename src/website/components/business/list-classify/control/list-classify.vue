
<template>
  <div class="list-classify">
    <a-list itemLayout="horizontal">

      <template v-if="datacompStatus">

        <a-list-item>
          <a-list-item-meta>
            <div slot="description">列表分类数据:</div>
          </a-list-item-meta>
        </a-list-item>

        <a-list-item>
          <div class="desc">
            <div class="add">
              <a-button type="primary" size="small" class="handle-add" icon="plus" @click="addOptions">添加</a-button>
              &nbsp;&nbsp;<span>(全部绑定值为 list-all)</span>
            </div>
            <div class="mylist scroll-style">
              <div class="list-data" v-for="(item,i) of data" :key="i">
                <div class="label">
                  标签名{{ i+1 }}
                  <a-input v-model="item.label" />
                </div>
                <div class="value">
                  绑定值{{ i+1 }}
                  <!-- <a-select
                    style="width: 100%;"
                    v-model="item.value"
                  >
                    <a-select-option key="listAll" value="listAll">全部</a-select-option>
                    <a-select-option v-for="item of menuData" :key="item" :value="item">{{item}}</a-select-option>
                  </a-select> -->
                  <a-input v-model="item.value" />
                </div>
                <div class="handle">
                  <div>操作</div>
                  <a-button type="danger" class="handle-icon" shape="circle" icon="minus" @click="deleteOptions(i)" />
                </div>
              </div>
            </div>
          </div>
        </a-list-item>
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
            <div slot="description">列表分类样式:</div>
          </a-list-item-meta>
        </a-list-item>

        <a-list-item>
          <div class="option ant-desigener-border-color" :class="{checked: style === 'base'}" @click="chooseClassify('base')">
            <a-radio-group class="option-list" defaultValue="a" buttonStyle="solid">
              <a-radio-button class="option-list-item" value="all">全部</a-radio-button>
              <a-radio-button class="option-list-item" value="a">分类1</a-radio-button>
              <a-radio-button class="option-list-item" value="b">分类2</a-radio-button>
              <a-radio-button class="option-list-item" value="c">分类3</a-radio-button>
            </a-radio-group>
          </div>
        </a-list-item>

        <a-list-item>
          <div class="option ant-desigener-border-color" :class="{checked: style === 'tabs'}" @click="chooseClassify('tabs')">
            <a-radio-group class="option-list" defaultValue="a">
              <a-radio-button class="option-list-item tab" value="all">全部</a-radio-button>
              <a-radio-button class="option-list-item tab" value="a">分类1</a-radio-button>
              <a-radio-button class="option-list-item tab" value="b">分类2</a-radio-button>
              <a-radio-button class="option-list-item tab" value="c">分类3</a-radio-button>
            </a-radio-group>
          </div>
        </a-list-item>

        <a-list-item v-if="!pageData.compAttr.bindName">
          <a-list-item-meta>
            <div slot="description">触发事件:</div>
          </a-list-item-meta>
          <a-input
            @blur="changeVal('emit')"
            v-model="emit"
          />
        </a-list-item>
      </template>

    </a-list>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'list-classify-component',
  components: {}
})
export default class ListClassifyComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any;
  @Prop({ default: false, type: Boolean }) datacompStatus!:boolean; // false 在属性中展示  true 在数据绑定中展示

  style: string = 'base' // 列表分类样式
  pageData = this.compData
  dataModel:any = this.compData.dataModel
  mapData:any = this.compData.dataModel.mapData
  data: object[] = [] // 选项
  emit: string = ''

  @webSite.Getter('tables')
  tables;

  created() {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }

  get tableData() {
    let index = this.tables.findIndex((item) => {
      return item.tableName === this.dataModel.tableName
    })
    let data = [];
    if (index > -1) {
      data = this.tables[index].content;
    }
    return data
  }

  get menuData() {
    let menuData = this.tableData.map((item, i) => {
      let tableMap = this.mapData.tableMap;
      return item[tableMap]
    })
    let data = Array.from(new Set(menuData))
    return data
  }

  mounted() {}

  // 选中样式
  chooseClassify(type) {
    this.style = type;
    this.pageData.compAttr['style'] = type;
  }

  // 删除某一项
  deleteOptions(i) {
    this.data.splice(i, 1)
  }

  // 增加一项
  addOptions() {
    if (this.data.length > 10) {
      this.$message.error('超出上限！')
      return
    }
    this.data.push({ label: '分类', value: '' });
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
  }
}
</script>
<style lang='less' scoped>
.option {
  width: 100%;
  padding: 5px 1px;
  &.checked {
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
  }
}
.option-list {
    pointer-events: none;
    width: 100%;
    display: flex;
    justify-content: space-around;
    .option-list-item {
      border-width: 0;
      padding: 0 8px;
      &::before {
        width: 0;
      }
      &.ant-radio-button-wrapper {
        border-radius: 4px;
        box-shadow: none;
      }
      &.tab {
        &.ant-radio-button-wrapper-checked {
          border-bottom-width: 2px;
          border-radius: 0;
        }
      }
    }

  }

  .list-data {
    display: flex;
    width: 100%;
    text-align: left;
    margin-bottom: 5px;
  }
  .label {
    flex: 1;
    margin-right: 10px;
  }
  .value {
    flex: 1;
    margin-right: 10px;
  }
  .handle {
    text-align: center;
    margin-right: 5px;
  }
  .handle-icon {
    font-size: 12px;
    width: 20px;
    height: 20px;
    vertical-align: middle;

  }
  .mylist {
    text-align: left;
    height: 240px;
    overflow: auto;
  }
  .add {
    text-align: left;
    margin-bottom: 10px;
  }


</style>

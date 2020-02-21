
<template>
  <div class="classify-mobile">
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
              <span>全部绑定值为 list-all</span>
            </div>
            <div class="mylist ">
              <div
                class="list-data"
                v-for="(item,i) of data"
                :key="i"
              >
                <div class="label">
                  标签名{{ i+1 }}
                  <a-input v-model="item.label" disabled/>
                </div>
                <div class="value">
                  绑定值{{ i+1 }}
                  <a-input
                    v-model="item.value"
                    @blur="getTotal(item,i)"
                    :disabled="!dataModel.tableName || !compData.dataModel.mapData[0].tableMap"
                  />
                </div>
              </div>
            </div>
          </div>
        </a-list-item>
      </template>

      <template v-else>

        <a-list-item>
          <a-list-item-meta>
            <div slot="description">列数:</div>
          </a-list-item-meta>
          <a-slider
            style="width:100%"
            :marks="columnMarks"
            v-model="column"
            :step="null"
            @change="changeVal('column')"
            :max="6"
            :min="1"
          />
        </a-list-item>
        <a-list-item>
          <a-list-item-meta>
            <div slot="description">行数:</div>
          </a-list-item-meta>
          <a-slider
            style="width:100%"
            :marks="rowMarks"
            v-model="row"
            @change="changeVal('row')"
            :max="6"
            :min="1"
          />
        </a-list-item>

        <a-list-item>
          <a-list-item-meta>
            <div slot="description">列表分类样式:</div>
          </a-list-item-meta>
          <a-radio-group
            @change="changeVal('style')"
            v-model="style"
            class="type-radio"
          >
            <a-radio value="one">样式一</a-radio>
            <a-radio value="two">样式二</a-radio>
          </a-radio-group>
        </a-list-item>

        <a-list-item>
          <a-list-item-meta>
            <div slot="description">数据:</div>
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
        <div class="cont-base  ">
          <a-list-item v-for="(item,i) of data" :key="i">
            <div class="mylist-base">
              <div class="handle-base">
                <a-button
                  type="danger"
                  size="small"
                  class="handle-icon"
                  shape="circle"
                  icon="delete"
                  @click="deleteOptions(i)"
                />
              </div>
              <div class="list-data-base">
                <div class="item-base">
                  <div class="name-base">标签名{{ i+1 }}</div>
                  <div class="desc-base"><a-input v-model="item.label"/></div>
                </div>
                <div class="item-base">
                  <div class="name-base">图标{{ i+1 }}</div>
                  <div class="desc-base">
                    <icon-selec
                      v-model="item.icon"
                      :textSet="{select:' '}"
                      :optionSet="{size: false,color: false}"
                    />
                  </div>
                </div>
                <div class="item-base">
                  <div class="name-base">跳转{{ i+1 }}</div>
                  <div class="desc-base">
                    <a-select
                      v-model="item.urlType"
                      style="width:100%"
                      @change="handleChange"
                    >
                      <a-select-opt-group label="本地路由">
                        <a-select-option
                          v-for="item of pageList"
                          :key="item"
                          :value="item"
                        >{{ item }}</a-select-option>
                      </a-select-opt-group>
                      <a-select-opt-group label="自定义链接">
                        <a-select-option value="用户自定义">自定义</a-select-option>
                      </a-select-opt-group>
                    </a-select>
                  </div>
                </div>
                <div class="item-base" v-if="item.urlType === '用户自定义'">
                  <div class="name-base">链接{{ i+1 }}</div>
                  <div class="desc-base"><a-input v-model="item.url"/></div>
                </div>
              </div>
            </div>
          </a-list-item>
        </div>

        <!-- <a-list-item v-if="!pageData.compAttr.bindName">
          <a-list-item-meta>
            <div slot="description">触发事件:</div>
          </a-list-item-meta>
          <a-input
            @blur="changeVal('emit')"
            v-model="emit"
          />
        </a-list-item> -->
      </template>

    </a-list>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getTableContent } from '@/website/service';
import iconSelec from '@/website/components/common/icon-selec/icon-selec.vue'; // 图标选择
import { List, Input, Select, Button, Slider, Radio } from 'ant-design-vue';

const webSite = namespace('webSite');
const columnMarks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  6: '6'
};
const rowMarks = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6'
};

@Component({
  name: 'classify-mobile-component',
  components: { iconSelec,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASelectOptGroup: Select.OptGroup,
    AButton: Button,
    ASlider: Slider,
    ARadio: Radio,
    ARadioGroup: Radio.Group
  }
})
export default class ClassifyMobileComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any;
  @Prop({ default: false, type: Boolean }) datacompStatus!:boolean; // false 在属性中展示  true 在数据绑定中展示

  columnMarks:object = columnMarks
  rowMarks:object = rowMarks
  column:number = 1 // 列
  row:number = 1 // 行

  style: string = 'base' // 列表分类样式
  pageData = this.compData
  dataModel:any = this.compData.dataModel
  data: object[] = [] // 选项
  emit: string = ''
  tableName: string = '' // 表名称
  mapDataName: string = '' // 表内映射

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  get isChange() {
    let status1 = this.tableName === this.dataModel.tableName;
    let status2 = this.mapDataName === this.dataModel.mapData[0].tableMap;
    let status = status1 && status2;
    return !status
  }

  @Watch('isChange')
  isChangeWatch(val) {
    if (val) {
      this.tableName = this.dataModel.tableName
      this.mapDataName = this.dataModel.mapData[0].tableMap
      this.data.forEach((item, i) => {
        this.data[i]['sum'] = 0;
        this.data[i]['value'] = '';
      })
    }
  }

  created() {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
    this.tableName = this.dataModel.tableName
    this.mapDataName = this.dataModel.mapData[0].tableMap
  }

  mounted() {}

  // 删除某一项
  deleteOptions(i) {
    if (this.data.length === 1) {
      this.$message.error('最少保留一个！')
      return
    }
    this.data.splice(i, 1)
  }

  // 增加一项
  addOptions() {
    if (this.data.length > 10) {
      this.$message.error('超出上限！')
      return
    }
    this.data.push({ label: '分类', icon: { 'fontSize': '14px', 'type': 'home' }, url: '', sum: 0, urlType: '' });
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
  }

  // 选择框
  handleChange(item) {

  }

  // 获取总数
  async getTotal(item, i) {
    let tableName = this.dataModel.tableName;
    let tableMap = this.compData.dataModel.mapData[0].tableMap;
    let val = item.value;
    let params = {};
    if (val !== 'list-all') {
      params = {
        [tableMap]: val
      };
    }
    if (tableName && tableMap) {
      let res = await getTableContent(tableName, params);
      this.data[i]['sum'] = res.total || 0;
    }
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

.mylist-base {
  width: 100%;
  .handle-base {
    text-align: right;
    margin-bottom: -30px;
    margin-right: 5px;
  }
}
.cont-base {
  height: 400px;
  overflow: auto;
}
.item-base {
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: 200px;
  .name-base {
    margin-right: 15px;
    width: 80px;
    text-align: right;
  }
  .desc-base {
    flex: 1;
  }
}

</style>

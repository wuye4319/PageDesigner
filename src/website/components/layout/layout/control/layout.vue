<template>
  <div class="layout-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">分栏样式:</div>
        </a-list-item-meta>
      </a-list-item>

      <a-list-item>
        <a-radio-group
          v-model="initData.typeVal"
          @change="changeLayout()"
          class="type-radio"
        >
          <a-radio-button value="1:1">12:12</a-radio-button>
          <a-radio-button value="1:2">8:16</a-radio-button>
          <a-radio-button value="2:1">16:8</a-radio-button>
          <a-radio-button value="1:1:1">8:8:8</a-radio-button>
          <a-radio-button value="1:2:1">6:12:6</a-radio-button>
          <a-radio-button value="1:1:1:1">6:6:6:6</a-radio-button>
          <a-radio-button value="1:3:1:3">4:12:4:12</a-radio-button>
        </a-radio-group>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">最小高度开关:</div>
        </a-list-item-meta>
        <a-switch v-model="initData.minHeightSwitch" @change="changeVal('minHeightSwitch')"/>
      </a-list-item>

      <a-list-item v-show="initData.minHeightSwitch">
        <a-list-item-meta>
          <div slot="description">最小高度:</div>
        </a-list-item-meta>
        <a-input-number
          placeholder="Basic usage"
          v-model="initData.minHeightVal"
          :formatter="value => `${value}px`"
          :parser="value => value.replace('px', '')"
          @blur="changeMinHeightVal('minHeightVal')"
        />
      </a-list-item>
    </a-list>

    <a-collapse :bordered="false" v-if="initData.childListAttr.length > 0">
      <a-collapse-panel
        :header="`布局格子${i}`"
        :key="i"
        v-for="(item,i) of initData.childListAttr"
      >
        <box-model :key="'box'+i" :boxOptions="item.boxOptions"/>

        <a-list itemLayout="horizontal">
          <a-list-item>
            <a-list-item-meta>
              <div slot="description">flex-direction:</div>
            </a-list-item-meta>
            <a-select style="width:100%" v-model="item.flexOptions['flex-direction']">
              <a-select-option value="row">row</a-select-option>
              <a-select-option value="column">column</a-select-option>
            </a-select>
          </a-list-item>

          <a-list-item>
            <a-list-item-meta>
              <div slot="description">justify-content:</div>
            </a-list-item-meta>
            <a-select style="width:100%" v-model="item.flexOptions['justify-content']">
              <a-select-option value="flex-start">flex-start</a-select-option>
              <a-select-option value="flex-end">flex-end</a-select-option>
              <a-select-option value="center">center</a-select-option>
              <a-select-option value="space-between">space-between</a-select-option>
              <a-select-option value="space-around">space-around</a-select-option>
            </a-select>
          </a-list-item>

          <a-list-item>
            <a-list-item-meta>
              <div slot="description">align-items:</div>
            </a-list-item-meta>
            <a-select style="width:100%" v-model="item.flexOptions['align-items']">
              <a-select-option value="flex-start">flex-start</a-select-option>
              <a-select-option value="flex-end">flex-end</a-select-option>
              <a-select-option value="center">center</a-select-option>
              <a-select-option value="baseline">baseline</a-select-option>
              <a-select-option value="stretch">stretch</a-select-option>
            </a-select>
          </a-list-item>

          <a-list-item>
            <a-list-item-meta>
              <div slot="description">flex-wrap:</div>
            </a-list-item-meta>
            <a-select style="width:100%" v-model="item.flexOptions['flex-wrap']">
              <a-select-option value="nowrap">nowrap</a-select-option>
              <a-select-option value="wrap">wrap</a-select-option>
              <a-select-option value="wrap-reverse">wrap-reverse</a-select-option>
            </a-select>
          </a-list-item>

        </a-list>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { boxModel } from '@/website/components/common'; // 盒模型
import { List, Switch, InputNumber, Radio, Select, Collapse } from 'ant-design-vue';
const webSite = namespace('webSite');

interface ProgressData {
  typeVal:string,
  childList:any[],
  minHeight: string,
  minHeightSwitch: boolean,
  childListAttr: any[],
  minHeightVal: number
}

@Component({
  name: 'layout-component',
  components: {
    boxModel,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    ASwitch: Switch,
    AInputNumber: InputNumber,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel
  }
})
export default class LayoutComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: object

  initData:ProgressData = {
    typeVal: '', // 基本样式
    childList: [], // 子元素
    minHeight: '60px', // 最小高度
    minHeightVal: 60, // 最小高度
    minHeightSwitch: true, // 最小高度开关
    childListAttr: [] // 子元素属性
  }
  pageData: any = this.compData

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  @webSite.Mutation('changePageInforRow')
  changePageInforRow;

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
  }

  changeLayout() {
    let arr = this.initData.typeVal.split(':');
    let length = arr.length;
    let res, attr;
    this.pageData.compAttr.typeVal = this.initData.typeVal;
    let childListLength = this.pageData.compAttr.childList.length;
    if (childListLength > length) {
      res = this.pageData.compAttr.childList.slice(0, length);
      attr = this.pageData.compAttr.childListAttr.slice(0, length);
    } else {
      res = Array.from({ length }, () => []);
      res.splice(0, childListLength, ...this.pageData.compAttr.childList);
      attr = Array.from({ length }, () => {
        return {
          boxOptions: {
            'width': 'auto',
            'height': 'auto',
            // 'paddingTop': '0',
            // 'paddingLeft': '0',
            // 'paddingRight': '0',
            // 'paddingBottom': '0',
            // 'borderTopWidth': '0',
            // 'borderLeftWidth': '0',
            // 'borderRightWidth': '0',
            // 'borderBottomWidth': '0',
            // 'marginTop': '0',
            // 'marginLeft': '0',
            // 'marginRight': '0',
            // 'marginBottom': '0'
          },
          flexOptions: {
            'flex-direction': 'column',
            'justify-content': 'flex-start',
            'align-items': 'stretch',
            'flex-wrap': 'nowrap'
          }
        }
      });
      attr.splice(0, childListLength, ...this.pageData.compAttr.childListAttr);
    }
    this.pageData.compAttr.childList = this.initData.childList = res;
    this.pageData.compAttr.childListAttr = this.initData.childListAttr = attr;
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this.initData[name];
  }

  changeMinHeightVal() {
    this.pageData.compAttr['minHeight'] = this.initData['minHeight'] = `${this.initData['minHeightVal']}px`;
    this.pageData.compAttr['minHeightVal'] = this.initData['minHeightVal'];
  }
}

</script>
<style lang='less' scoped>
.type-radio {
  text-align: left;
}

/deep/.ant-collapse {
  background: transparent;
}
/deep/.ant-collapse-item {
  border: 0;
  margin-bottom: 8px;
  border-radius: 4px;
  background: #ffffff;
  .ant-collapse-header {
    padding: 6px 8px;
    color: #000000;
    font-size: 12px;
    text-align: left;
  }
}
/deep/ .ant-collapse .ant-collapse-item .ant-collapse-header .anticon {
  left: initial;
  right: 16px;
}
.line {
  display: flex;
}
</style>

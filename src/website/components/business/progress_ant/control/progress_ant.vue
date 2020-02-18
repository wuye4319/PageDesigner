<template>
  <div class="progress-ant-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">类型:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('type')"
          v-model="initData.type"
          class="type-radio"
        >
          <a-radio value="line">直线</a-radio>
          <a-radio value="circle">圆形</a-radio>
          <a-radio value="dashboard">仪表盘</a-radio>
        </a-radio-group>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">进度:</div>
        </a-list-item-meta>
        <a-slider
          v-model="initData.percent"
          style="width:100%"
          @change="changeVal('percent')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">状态:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('status')"
          v-model="initData.status"
          class="type-radio"
        >
          <a-radio value="normal">normal</a-radio>
          <a-radio value="success">success</a-radio>
          <a-radio value="exception">exception</a-radio>
          <a-radio value="active">active</a-radio>
        </a-radio-group>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">显示数值:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('showInfo')"
          v-model="initData.showInfo"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">进度条边缘的形状:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('strokeLinecap')"
          v-model="initData.strokeLinecap"
          class="type-radio"
        >
          <a-radio value="square">square</a-radio>
          <a-radio value="round">round</a-radio>
        </a-radio-group>
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">进度条的色彩:</div>
        </a-list-item-meta>
        <color-picker v-model="initData.strokeColor" @change="changeVal('strokeColor')" />
      </a-list-item>

      <a-list-item v-show="initData.type !== 'dashboard'">
        <a-list-item-meta>
          <div slot="description">
            进度条线的宽度
            <template v-if="initData.type === 'circle'">(百分比)</template>
            <template v-else-if="initData.type === 'line'">(px)</template>
            :
          </div>
        </a-list-item-meta>
        <a-slider
          v-model="initData.strokeWidth"
          :max="initData.type === 'circle'? 100 : 500"
          style="width:100%"
          @change="changeVal('strokeWidth')"
        />
      </a-list-item>

      <a-list-item v-show="initData.type === 'circle'">
        <a-list-item-meta>
          <div slot="description">宽度(px):</div>
        </a-list-item-meta>
        <a-slider
          v-model="initData.width"
          :max="500"
          style="width:100%"
          @change="changeVal('width')"
        />
      </a-list-item>

      <a-list-item v-show="initData.type === 'circle'">
        <a-list-item-meta>
          <div slot="description">圆形进度条缺口角度:</div>
        </a-list-item-meta>
        <a-slider
          v-model="initData.gapDegree"
          :max="360"
          style="width:100%"
          @change="changeVal('gapDegree')"
        />
      </a-list-item>

      <a-list-item v-show="initData.type === 'circle'">
        <a-list-item-meta>
          <div slot="description">圆形进度条缺口位置:</div>
        </a-list-item-meta>
        <a-radio-group
          @change="changeVal('gapPosition')"
          v-model="initData.gapPosition"
          class="type-radio"
        >
          <a-radio value="top">top</a-radio>
          <a-radio value="bottom">bottom</a-radio>
          <a-radio value="left">left</a-radio>
          <a-radio value="right">right</a-radio>
        </a-radio-group>
      </a-list-item>
    </a-list>
    <api-user-tip :apiList="apiList"></api-user-tip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Radio, Slider, Switch, Input } from 'ant-design-vue';
import { colorPicker, apiUserTip } from '@/website/components/common'; // 颜色选择器
const webSite = namespace('webSite');

interface ProgressData {
  type: string,
  percent: number,
  status: string,
  showInfo: boolean,
  width: number,
  gapDegree: number,
  gapPosition: string,
  strokeWidth: number,
  strokeLinecap: string,
  strokeColor: string
}

@Component({
  name: 'progress-ant-component',
  components: {
    apiUserTip,
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ASlider: Slider,
    ASwitch: Switch
  }
})
export default class progressAntComponent extends Vue {
  @Prop() compData: any
  @Prop()
  compIndex: number

  initData: ProgressData = {
    type: 'round', // 形状
    percent: 10, // 百分比
    status: 'active', // 状态
    showInfo: true, // 是否显示进度数值或状态图标
    width: 120, // 圆形进度条画布宽度，单位 px
    gapDegree: 0, // 圆形进度条缺口角度，可取值 0 ~ 360
    gapPosition: 'top', // 圆形进度条缺口位置
    strokeWidth: 0, // 进度条线的宽度 line px   circle 百分比
    strokeLinecap: 'round', // 进度条边缘的形状
    strokeColor: '' // 进度条的色彩
  }
  pageData: any = this.compData
  apiList:any[]=[
    { dsc: '//改变状态(normal success exception active)', api: 'updateStatus(str:string)' },
    { dsc: '//改变进度条的值(0-100)', api: 'updateProgress(num:number)' }
  ]
  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this.initData[name];
  }
}
</script>

<style lang="less" scoped>
.type-radio {
  text-align: left;
}
</style>

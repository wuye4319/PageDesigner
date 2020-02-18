<template>
  <div class="page-font">
    <div class="line">
      <div class="item big">
        <div class="name"></div>
        <div class="desc">
          <a-select
            v-model="fontFamily"
            style="width:100%"
            @change="changeVal('fontFamily')"
          >
            <a-select-option value="SimSun">宋体</a-select-option>
            <a-select-option value="SimHei">黑体</a-select-option>
            <a-select-option value="Microsoft YaHei">微软雅黑</a-select-option>
            <a-select-option value="FangSong">仿宋</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-input
            v-model="fontSize"
            @blur="changeVal('fontSize')"
          />
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item big">
        <div class="name"></div>
        <div class="desc">
          <a-select
            v-model="fontWeight"
            style="width:100%"
            @change="changeVal('fontWeight')"
          >
            <a-select-option value="100">100</a-select-option>
            <a-select-option value="200">200</a-select-option>
            <a-select-option value="300">300</a-select-option>
            <a-select-option value="400">400(normal)</a-select-option>
            <a-select-option value="500">500</a-select-option>
            <a-select-option value="600">600</a-select-option>
            <a-select-option value="700">700(blod)</a-select-option>
            <a-select-option value="800">800</a-select-option>
            <a-select-option value="900">900</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-input
            type="color"
            v-model="fontColor"
            @change="changeVal('fontColor')"
          />
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-radio-group v-model="textDecoration" @change="changeVal('textDecoration')">
            <a-radio-button value="none">T</a-radio-button>
            <a-radio-button value="overline">上</a-radio-button>
            <a-radio-button value="underline"><a-icon type="underline"/></a-radio-button>
            <a-radio-button value="line-through"><a-icon type="strikethrough"/></a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-radio-group v-model="textTransform" @change="changeVal('textTransform')">
            <a-radio-button value="uppercase">TT</a-radio-button>
            <a-radio-button value="capitalize">Tt</a-radio-button>
            <a-radio-button value="lowercase">tt</a-radio-button>
            <a-radio-button value="none">none</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-radio-group v-model="textAlign" @change="changeVal('textAlign')">
            <a-radio-button value="left"><a-icon type="align-left"/></a-radio-button>
            <a-radio-button value="center"><a-icon type="align-center"/></a-radio-button>
            <a-radio-button value="right"><a-icon type="align-right"/></a-radio-button>
            <a-radio-button value="justify"><a-icon type="pic-center"/></a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Icon, Select, Radio, Input } from 'ant-design-vue';
interface fontInfo {
  fontFamily:string, // 字体
  fontSize:string, // 大小
  fontWeight:string, // 粗细
  fontColor:string, // 颜色
  textDecoration:string, // 文本的修饰
  textAlign:string, // 对齐方式
  textTransform:string // 文本的大小写
}

@Component({
  name: 'page-font',
  components: {
    AIcon: Icon,
    ASelect: Select,
    ASelectOption: Select.Option,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
    AInput: Input
  }
})

export default class PageFont extends Vue {
  @Prop() appStyle;

  appData: any = this.appStyle
  fontFamily: string = ''
  fontSize:string = ''
  fontWeight:string = ''
  fontColor:string = ''
  textDecoration:string = ''
  textAlign:string = ''
  textTransform:string = ''

  created():void {
    for (let key of Object.keys(this.appData)) {
      this[key] = this.appData[key];
    }
  }

  changeVal(name) {
    this.appData[name] = this[name];
  }
}
</script>

<style lang='less' scoped>
  @import url('./common.less');
  /deep/.ant-radio-group{
      display: flex;
    }
  /deep/.ant-radio-button-wrapper{
    padding: 0;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

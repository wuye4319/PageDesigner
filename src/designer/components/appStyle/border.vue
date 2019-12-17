<template>
  <div class="app-border">
    <div class="border-handle">
      <div class="around">
        <a-icon
          type="border-left"
          @click="chooseBorder('Left')"
          :class="{'ant-desigener-font-color':borderArr.includes('Left')}"
        />
      </div>
      <div class="mid">
        <a-icon
          type="border-top"
          @click="chooseBorder('Top')"
          :class="{'ant-desigener-font-color':borderArr.includes('Top')}"
        />
        <a-icon
          type="lock"
          class="small-font ant-desigener-font-color"
          v-show="borderLock"
          @click="borderLockClick"
        />
        <a-icon
          type="unlock"
          class="small-font"
          v-show="!borderLock"
          @click="borderLockClick"
        />
        <a-icon
          type="border-bottom"
          @click="chooseBorder('Bottom')"
          :class="{'ant-desigener-font-color':borderArr.includes('Bottom')}"
        />
      </div>
      <div class="around">
        <a-icon
          type="border-right"
          @click="chooseBorder('Right')"
          :class="{'ant-desigener-font-color':borderArr.includes('Right')}"
        />
      </div>
    </div>
    <div class="line">
      <div class="item">
        <div class="name">线形</div>
        <div class="desc">
          <a-select v-model="commonStyle" @change="changeVal('commonBorder','commonStyle')">
            <a-select-option value="none">无</a-select-option>
            <a-select-option value="solid"><a-icon type="minus"/></a-select-option>
            <a-select-option value="dashed"><a-icon type="dash"/></a-select-option>
            <a-select-option value="dotted"><a-icon type="small-dash"/></a-select-option>
          </a-select>
        </div>
      </div>
      <div class="item">
        <div class="name">宽</div>
        <div class="desc">
          <a-input
            v-model="commonWidth"
            @blur="changeVal('commonBorder','commonWidth')"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">颜色</div>
        <div class="desc">
          <a-input
            type="color"
            v-model="commonColor"
            @change="changeVal('commonBorder','commonColor')"
          />
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item">
        <div class="name">圆角</div>
        <div class="desc">
          <a-input
            v-model="borderTopLeftRadius"
            @blur="radiusLock?changeVal('radiusCommon','borderTopLeftRadius'):changeVal('radius','borderTopLeftRadius')"
          >
            <a-icon slot="addonBefore" type="radius-upleft"/>
          </a-input>
        </div>
      </div>
      <div class="item">
        <div class="name">&nbsp;</div>
        <div class="desc">
          <a-input
            v-model="borderTopRightRadius"
            @blur="radiusLock?changeVal('radiusCommon','borderTopRightRadius'):changeVal('radius','borderTopRightRadius')"
          >
            <a-icon slot="addonBefore" type="radius-upright"/>
          </a-input>
        </div>
      </div>
    </div>
    <div class="lock">
      <div class="lock-icon">
        <a-icon
          type="lock"
          class="ant-desigener-font-color"
          v-show="radiusLock"
          @click="radiusLock=false"
        />
        <a-icon
          type="unlock"
          v-show="!radiusLock"
          @click="radiusLock=true"
        />
      </div>
    </div>
    <div class="line">
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-input
            v-model="borderBottomLeftRadius"
            @blur="radiusLock?changeVal('radiusCommon','borderBottomLeftRadius'):changeVal('radius','borderBottomLeftRadius')"
          >
            <a-icon slot="addonBefore" type="radius-bottomleft"/>
          </a-input>
        </div>
      </div>
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-input
            v-model="borderBottomRightRadius"
            @blur="radiusLock?changeVal('radiusCommon','borderBottomRightRadius'):changeVal('radius','borderBottomRightRadius')"
          >
            <a-icon slot="addonBefore" type="radius-bottomright"/>
          </a-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

interface BorderInfo {
  commonStyle:string, // 线形
  commonWidth:string, // 高
  commonColor:string, // 宽
  borderTopLeftRadius:string, // 上左
  borderTopRightRadius:string, // 上右
  borderBottomLeftRadius:string, // 下左
  borderBottomRightRadius:string // 下右
}

const webSite = namespace('webSite');

@Component({
  name: 'app-border'
})

export default class AppBorder extends Vue {
  @Prop() appStyle;

  radiusLock:boolean = true // radius锁
  borderLock:boolean = true // border锁
  borderArr:string[] = [] // border方向 'Left', 'Right', 'Top', 'Bottom'
  appData: any = this.appStyle
  commonStyle:string = ''
  commonWidth:string = ''
  commonColor:string = ''
  borderTopLeftRadius:string = ''
  borderTopRightRadius:string = ''
  borderBottomLeftRadius:string = ''
  borderBottomRightRadius:string = ''
  borderLeftWidth:string = ''
  borderLeftStyle:string = ''
  borderLeftColor:string = ''
  borderTopWidth:string = ''
  borderTopStyle:string = ''
  borderTopColor:string = ''
  borderRightWidth:string = ''
  borderRightStyle:string = ''
  borderRightColor:string = ''
  borderBottomWidth:string = ''
  borderBottomStyle:string = ''
  borderBottomColor:string = ''

  @webSite.Mutation('changeAppStyle')
  changeAppStyle;

  created():void {
    for (let key of Object.keys(this.appData)) {
      this[key] = this.appData[key];
    }
  }

  mounted() {
    this.$nextTick(() => {
      // border
      let bArr = ['Top', 'Left', 'Right', 'Bottom']
      bArr.forEach((v) => {
        if (this[`border${v}Width`]) {
          this.borderArr.push(v)
        }
      })
      this.borderLock = this.borderArr.length === 4;
      // radius
      let rArr = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'];
      let radiusArr = rArr.map((v) => {
        return this[`border${v}Radius`]
      })
      let radiusLockArr = Array.from(new Set(radiusArr))
      this.radiusLock = radiusLockArr.length === 1;
    })
  }

  // 选中边框
  chooseBorder(borderName:string) {
    if (this.borderLock) {
      return;
    }
    let index = this.borderArr.indexOf(borderName);
    if (index === -1) {
      this.borderArr.push(borderName);
    } else {
      this.borderArr.splice(index, 1);
    }
    this.changeVal('border');
  }

  // 边框锁
  borderLockClick() {
    this.borderLock = !this.borderLock;
    this.borderArr = this.borderLock ? ['Left', 'Right', 'Top', 'Bottom'] : [];
    this.changeVal('border');
  }

  // 改变值
  changeVal(type:string, name?:string) {
    this[type](name);
  }

  // 变更单一圆角
  radius(name) {
    this.appData[name] = this[name];
  }

  // 变更所有圆角
  radiusCommon(name) {
    let radius = this[name];
    this.appData.borderTopLeftRadius = this.borderTopLeftRadius = radius;
    this.appData.borderTopRightRadius = this.borderTopRightRadius = radius;
    this.appData.borderBottomLeftRadius = this.borderBottomLeftRadius = radius;
    this.appData.borderBottomRightRadius = this.borderBottomRightRadius = radius;
  }

  // 变更边框
  border() {
    let arr = ['Left', 'Right', 'Top', 'Bottom'];
    arr.forEach((item) => {
      this.appData[`border${item}Width`] = '';
      this.appData[`border${item}Style`] = '';
      this.appData[`border${item}Color`] = '';
    });
    this.borderArr.forEach((item) => {
      this.appData[`border${item}Width`] = this.commonWidth;
      this.appData[`border${item}Style`] = this.commonStyle;
      this.appData[`border${item}Color`] = this.commonColor;
    });
  }

  // 变更边框公共属性
  commonBorder(name) {
    this.appData[name] = this[name];
    this.border();
  }
}
</script>

<style lang='less' scoped>
  @import url('./common.less');
  .border-handle {
    height: 90px;
    margin-right: 12px;
    background:rgba(233,237,242,1);
    border-radius:4px;
    opacity:0.65;
    display: flex;
    justify-content: center;
    font-size: 30px;
    .around {
      width: 28px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .mid {
      width: 52px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .small-font {
        font-size: 16px;
      }
    }
  }
  .lock {
    width: 100%;
    padding-right: 12px;
    margin-top: -4px;
    margin-bottom: 4px;
    .lock-icon {
      width:24px;
      height:18px;
      margin: 0 auto;
      line-height: 18px;
      background:rgba(233,237,242,1);
      border-radius:2px;
      opacity:0.65;
      text-align: center;
    }
  }
  .app-border {
    .green {
      color: #17BC94;
    }
  }
</style>

<template>
  <div>
    <div class="box-model">
      <div
        class="box-margin position ant-desigener-border-color flex-box"
        :class="{background: bgDesc === 'all' || bgDesc === 'margin'}"
        @mouseenter="mouseenter('margin')"
        @mouseleave="mouseleave('margin')"
      >
        <div class="top flex-size flex-cont">
          <div class="content-s input" v-show="inputStatus === 'marginTop'">
            <a-input
              class="cont-input"
              type="text"
              size="small"
              v-model="boxObj.marginTop"
              @blur="statusReset('marginTop')"
              @keydown.enter="statusReset('marginTop')"
            />
          </div>
          <div
            class="content-s"
            v-show="inputStatus !== 'marginTop'"
            @dblclick="doubleclick('marginTop')"
          >{{ boxObj.marginTop }}</div>
          <div class="text">margin</div>
        </div>
        <div class="mid margin flex-cont">
          <div class="left">
            <div class="content-s input" v-show="inputStatus === 'marginLeft'">
              <a-input
                class="cont-input tl"
                type="text"
                size="small"
                v-model="boxObj.marginLeft"
                @keydown.enter="statusReset('marginLeft')"
                @blur="statusReset('marginLeft')"
              />
            </div>
            <div
              class="content-s"
              v-show="inputStatus !== 'marginLeft'"
              @dblclick="doubleclick('marginLeft')"
            >{{ boxObj.marginLeft }}</div>
          </div>
          <div class="right">
            <div class="content-s input" v-show="inputStatus === 'marginRight'">
              <a-input
                class="cont-input tr"
                type="text"
                size="small"
                v-model="boxObj.marginRight"
                @keydown.enter="statusReset('marginRight')"
                @blur="statusReset('marginRight')"
              />
            </div>
            <div
              class="content-s"
              v-show="inputStatus !== 'marginRight'"
              @dblclick="doubleclick('marginRight')"
            >{{ boxObj.marginRight }}</div>
          </div>
        </div>
        <div class="btm flex-size flex-cont">
          <div class="content-s input" v-show="inputStatus === 'marginBottom'">
            <a-input
              class="cont-input"
              type="text"
              size="small"
              v-model="boxObj.marginBottom"
              @keydown.enter="statusReset('marginBottom')"
              @blur="statusReset('marginBottom')"
            />
          </div>
          <div
            class="content-s"
            v-show="inputStatus !== 'marginBottom'"
            @dblclick="doubleclick('marginBottom')"
          >{{ boxObj.marginBottom }}</div>
        </div>
      </div>
      <div
        class="box-border position ant-desigener-border-color flex-box"
        :class="{background: bgDesc === 'all' || bgDesc === 'border'}"
        @mouseenter="mouseenter('border')"
        @mouseleave="mouseleave('border')"
      >
        <div class="top flex-size flex-cont">
          <div class="content-s input" v-show="inputStatus === 'borderTopWidth'">
            <a-input
              class="cont-input"
              type="text"
              size="small"
              v-model="boxObj.borderTopWidth"
              @keydown.enter="statusReset('borderTopWidth')"
              @blur="statusReset('borderTopWidth')"
            />
          </div>
          <div
            class="content-s"
            v-show="inputStatus !== 'borderTopWidth'"
            @dblclick="doubleclick('borderTopWidth')"
          >{{ boxObj.borderTopWidth }}</div>
          <div class="text">border</div>
        </div>
        <div class="mid border flex-cont">
          <div class="left">
            <div class="content-s input" v-show="inputStatus === 'borderLeftWidth'">
              <a-input
                class="cont-input tl"
                type="text"
                size="small"
                v-model="boxObj.borderLeftWidth"
                @keydown.enter="statusReset('borderLeftWidth')"
                @blur="statusReset('borderLeftWidth')"
              />
            </div>
            <div
              class="content-s"
              v-show="inputStatus !== 'borderLeftWidth'"
              @dblclick="doubleclick('borderLeftWidth')"
            >{{ boxObj.borderLeftWidth }}</div>
          </div>
          <div class="right">
            <div class="content-s input" v-show="inputStatus === 'borderRightWidth'">
              <a-input
                class="cont-input tr"
                type="text"
                size="small"
                v-model="boxObj.borderRightWidth"
                @keydown.enter="statusReset('borderRightWidth')"
                @blur="statusReset('borderRightWidth')"
              />
            </div>
            <div
              class="content-s"
              v-show="inputStatus !== 'borderRightWidth'"
              @dblclick="doubleclick('borderRightWidth')"
            >{{ boxObj.borderRightWidth }}</div>
          </div>
        </div>
        <div class="btm flex-size flex-cont">
          <div class="content-s input" v-show="inputStatus === 'borderBottomWidth'">
            <a-input
              class="cont-input"
              type="text"
              size="small"
              v-model="boxObj.borderBottomWidth"
              @keydown.enter="statusReset('borderBottomWidth')"
              @blur="statusReset('borderBottomWidth')"
            />
          </div>
          <div
            class="content-s"
            v-show="inputStatus !== 'borderBottomWidth'"
            @dblclick="doubleclick('borderBottomWidth')"
          >{{ boxObj.borderBottomWidth }}</div>
        </div>
      </div>

      <div
        class="box-padding position ant-desigener-border-color flex-box"
        :class="{background: bgDesc === 'all' || bgDesc === 'padding'}"
        @mouseenter="mouseenter('padding')"
        @mouseleave="mouseleave('padding')"
      >
        <div class="top flex-size flex-cont">
          <div class="content-s input ml" v-show="inputStatus === 'paddingTop'">
            <a-input
              class="cont-input"
              type="text"
              size="small"
              v-model="boxObj.paddingTop"
              @keydown.enter="statusReset('paddingTop')"
              @blur="statusReset('paddingTop')"
            />
          </div>
          <div
            class="content-s"
            v-show="inputStatus !== 'paddingTop'"
            @dblclick="doubleclick('paddingTop')"
          >{{ boxObj.paddingTop }}</div>
          <div class="text">padding</div>
        </div>
        <div class="mid flex-size flex-cont">
          <div class="left">
            <div class="content-s input" v-show="inputStatus === 'paddingLeft'">
              <a-input
                class="cont-input tl"
                type="text"
                size="small"
                v-model="boxObj.paddingLeft"
                @keydown.enter="statusReset('paddingLeft')"
                @blur="statusReset('paddingLeft')"
              />
            </div>
            <div
              class="content-s"
              v-show="inputStatus !== 'paddingLeft'"
              @dblclick="doubleclick('paddingLeft')"
            >{{ boxObj.paddingLeft }}</div>
          </div>
          <div class="right">
            <div class="content-s input" v-show="inputStatus === 'paddingRight'">
              <a-input
                class="cont-input tr"
                type="text"
                size="small"
                v-model="boxObj.paddingRight"
                @keydown.enter="statusReset('paddingRight')"
                @blur="statusReset('paddingRight')"
              />
            </div>
            <div
              class="content-s"
              v-show="inputStatus !== 'paddingRight'"
              @dblclick="doubleclick('paddingRight')"
            >{{ boxObj.paddingRight }}</div>
          </div>
        </div>
        <div class="btm flex-size flex-cont">
          <div class="content-s input" v-show="inputStatus === 'paddingBottom'">
            <a-input
              class="cont-input"
              type="text"
              size="small"
              v-model="boxObj.paddingBottom"
              @keydown.enter="statusReset('paddingBottom')"
              @blur="statusReset('paddingBottom')"
            />
          </div>
          <div
            class="content-s"
            v-show="inputStatus !== 'paddingBottom'"
            @dblclick="doubleclick('paddingBottom')"
          >{{ boxObj.paddingBottom }}</div>
        </div>
      </div>
      <div
        class="box-content position ant-desigener-border-color flex-cont"
        :class="{background: bgDesc === 'all' || bgDesc === 'content'}"
        @mouseenter="mouseenter('content')"
        @mouseleave="mouseleave('content')"
      >
        <div class="content input" v-show="inputStatus === 'width'">
          <a-input
            class="cont-input"
            type="text"
            size="small"
            v-model="boxObj.width"
            @keydown.enter="statusReset('width')"
            @blur="statusReset('width')"
          />
        </div>
        <div
          class="content"
          v-show="inputStatus !== 'width'"
          @dblclick="doubleclick('width')"
        >{{ boxObj.width }}</div>
        <span class="ant-desigener-font-color">x</span>
        <div class="content input" v-show="inputStatus === 'height'">
          <a-input
            class="cont-input"
            type="text"
            size="small"
            v-model="boxObj.height"
            @keydown.enter="statusReset('height')"
            @blur="statusReset('height')"
          />
        </div>
        <div
          class="content"
          v-show="inputStatus !== 'height'"
          @dblclick="doubleclick('height')"
        >{{ boxObj.height }}</div>
      </div>
    </div>
    <a-list
      itemLayout="horizontal"
      size="small"
      class="unit-selec"
    >
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">盒模型单位:</div>
        </a-list-item-meta>
        <a-select
          :defaultValue="boxObj.unit"
          style="width: 100%;"
          size="small"
          @change="unitChange"
        >
          <a-select-option value="px">px</a-select-option>
        </a-select>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Select } from 'ant-design-vue';
@Component({
  name: 'box-model',
  filters: {},
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option
  }
})
export default class BoxModel extends Vue {
  @Prop() boxOptions: object;

  compBox: object = this.boxOptions;
  bgDesc: string = 'all';
  inputStatus: string = '';
  boxObj: object = {
    width: '100%',
    height: 'auto',
    paddingTop: '0',
    paddingLeft: '0',
    paddingRight: '0',
    paddingBottom: '0',
    borderTopWidth: '0',
    borderLeftWidth: '0',
    borderRightWidth: '0',
    borderBottomWidth: '0',
    marginTop: '0',
    marginLeft: '0',
    marginRight: '0',
    marginBottom: '0',
    unit: 'px'
  };

  created() {
    for (let k of Object.keys(this.compBox)) {
      if (this.compBox[k] === '0') {
        delete this.compBox[k]
      }
      if (k !== 'unit') {
        this.boxObj[k] = this.deleteUnit(this.compBox[k]).val;
      } else {
        this.boxObj[k] = this.compBox[k];
      }
    }
  }

  mouseenter(name) {
    this.bgDesc = name;
  }
  mouseleave() {
    this.bgDesc = 'all';
  }
  unitChange(data) {
    this.compBox['unit'] = data;
    this.boxObj['unit'] = data;
    Object.keys(this.boxObj).forEach(arr => {
      if (arr !== 'unit') {
        this.statusReset(arr);
      }
    });
  }

  // 双击
  doubleclick(name) {
    this.inputStatus = name;
  }

  // 数值处理
  statusReset(name) {
    this.inputStatus = '';
    let temp = this.deleteUnit(this.boxObj[name]);
    if (temp.unit) {
      this.compBox[name] = temp.val + this.boxObj['unit'];
    } else {
      this.compBox[name] = temp.val;
    }
    this.boxObj[name] = temp.val;
    if (temp.val === '0') {
      delete this.compBox[name]
    }
    /*    if (!val) {
      this.boxObj[name] = val = '0';
    }
    this.boxObj[name] = val;
    if (Number(val).toString() === val) {
      this.compBox[name] = va;+this.;
    } else {
      this.compBox[name] = val;
    } */
  }

  // 处理数值
  deleteUnit(str: string) {
    str += '';
    let re = { val: '0', unit: false };
    if (str === 'auto') {
      re.val = str;
    }
    let val: any = parseFloat(str);
    if (!isNaN(val)) {
      if (str.slice(-1) === '%') {
        re.val = val + '%';
      } else {
        re.val = val + '';
        re.unit = true;
      }
    }
    return re;
  }
}
</script>

<style lang='less' scoped>
.box-model {
  width: 100%;
  height: 240px;
  position: relative;
}
.box-margin {
  width: 240px;
  height: 210px;
  margin: 0 auto;
  border-width: 1px;
  border-style: dashed;
  background: #fff;
  z-index: 11;
  &.background {
    background: rgb(249, 204, 157);
  }
}
.box-border {
  width: 190px;
  height: 150px;
  margin: 0 auto;
  border-width: 1px;
  border-style: solid;
  background: #ffffff;
  z-index: 12;
  &.background {
    background: rgb(255, 238, 188);
  }
}
.box-padding {
  width: 140px;
  height: 90px;
  margin: 0 auto;
  border-width: 1px;
  border-style: dashed;
  background: #fff;
  z-index: 13;
  &.background {
    background: rgb(196, 223, 184);
  }
}
.box-content {
  width: 90px;
  height: 30px;
  margin: 0 auto;
  border-width: 1px;
  border-style: solid;
  background: #fff;
  z-index: 14;
  &.background {
    background: rgb(160, 198, 232);
  }
}
.unit-selec {
  height: 20px;
  position: relative;
  top: -20px;
  padding: 0 5px;
}
.position {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.flex-cont {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 35px;
  &.input {
    width: 40px;
  }
}
.cont-input {
  padding: 0;
}
.flex-box {
  display: flex;
  flex-direction: column;
  .top {
    position: relative;
  }
  .text {
    position: absolute;
    left: 5px;
    top: 3px;
  }
  .mid {
    display: flex;
    justify-content: space-between;
    &.border {
      height: 90px;
    }
    &.margin {
      height: 150px;
    }
  }
}
.flex-size {
  flex: 1;
}
.tl {
  text-align: left;
}
.tr {
  text-align: right;
}
.ml {
  margin-left: 10px;
}
.content-s {
  width: 25px;
  &.input {
    width: 30px;
  }
}
</style>

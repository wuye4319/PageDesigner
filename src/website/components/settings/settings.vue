<template>
  <div class="borderBox">
    <h5>盒模型</h5>
    <div class="margin box">
      <div class="top">
        margin
        <span
          class="operate"
          @dblclick="editActive('marginTopEdit')"
          v-if="!marginTopEdit"
        >{{ marginTop || 0 }}</span>
        <a-input
          class="operateIpt"
          @change="changeVal('marginTop')"
          @blur="editNagative('marginTopEdit')"
          @keydown="handleKeyPress('marginTop')"
          v-if="marginTopEdit"
          v-model="marginTop"
        />
      </div>
      <div class="center">
        <div class="left">
          <span
            class="operate"
            @dblclick="editActive('marginLeftEdit')"
            v-if="!marginLeftEdit"
          >{{ marginLeft || compData.compAttr.margin }}</span>
          <a-input
            class="operateIpt"
            @change="changeVal('marginLeft')"
            @blur="editNagative('marginLeftEdit')"
            @keydown="handleKeyPress('marginLeft')"
            v-if="marginLeftEdit"
            v-model="marginLeft"
          />
        </div>
        <div class="border box">
          <div class="top">
            border
            <span
              class="operate"
              @dblclick="editActive('borderTopEdit')"
              v-if="!borderTopEdit"
            >{{ borderTop || compData.compAttr.borderWidth }}</span>
            <a-input
              class="operateIpt"
              @change="changeVal('borderTop')"
              @blur="editNagative('borderTopEdit')"
              @keydown="handleKeyPress('borderTop')"
              v-if="borderTopEdit"
              v-model="borderTop"
            />
          </div>
          <div class="center">
            <div class="left">
              <span
                class="operate"
                @dblclick="editActive('borderLeftEdit')"
                v-if="!borderLeftEdit"
              >{{ borderLeft || compData.compAttr.borderWidth }}</span>
              <a-input
                class="operateIpt"
                @change="changeVal('borderLeft')"
                @blur="editNagative('borderLeftEdit')"
                @keydown="handleKeyPress('borderLeft')"
                v-if="borderLeftEdit"
                v-model="borderLeft"
              />
            </div>
            <div class="padding box">
              <div class="top">
                padding
                <span
                  class="operate"
                  @dblclick="editActive('paddingTopEdit')"
                  v-if="!paddingTopEdit"
                >{{ paddingTop || compData.compAttr.padding }}</span>
                <a-input
                  class="operateIpt"
                  @change="changeVal('paddingTop')"
                  @blur="editNagative('paddingTopEdit')"
                  @keydown="handleKeyPress('paddingTop')"
                  v-if="paddingTopEdit"
                  v-model="paddingTop"
                />
              </div>
              <div class="center">
                <div class="left">
                  <span
                    class="operate"
                    @dblclick="editActive('paddingLeftEdit')"
                    v-if="!paddingLeftEdit"
                  >{{ paddingLeft || compData.compAttr.padding }}</span>
                  <a-input
                    class="operateIpt"
                    @change="changeVal('paddingLeft')"
                    @blur="editNagative('paddingLeftEdit')"
                    @keydown="handleKeyPress('paddingLeft')"
                    v-if="paddingLeftEdit"
                    v-model="paddingLeft"
                  />
                </div>
                <div class="content box">
                  <span class="width">
                    <span
                      class="operate"
                      @dblclick="editActive('widthEdit')"
                      v-if="!widthEdit"
                    >{{ width }}</span>
                    <a-input
                      class="operateIpt"
                      @change="changeVal('width')"
                      @blur="editNagative('widthEdit')"
                      @keydown="handleKeyPress('width')"
                      v-if="widthEdit"
                      v-model="width"
                    />
                  </span>
                  <span>*</span>
                  <span class="height">
                    <span
                      class="operate"
                      @dblclick="editActive('heightEdit')"
                      v-if="!heightEdit"
                    >{{ height }}</span>
                    <a-input
                      class="operateIpt"
                      @change="changeVal('height')"
                      @blur="editNagative('heightEdit')"
                      @keydown="handleKeyPress('height')"
                      v-if="heightEdit"
                      v-model="height"
                    />
                  </span>
                </div>
                <div class="right">
                  <span
                    class="operate"
                    @dblclick="editActive('paddingRightEdit')"
                    v-if="!paddingRightEdit"
                  >{{ paddingRight || compData.compAttr.padding }}</span>
                  <a-input
                    class="operateIpt"
                    @change="changeVal('paddingRight')"
                    @blur="editNagative('paddingRightEdit')"
                    @keydown="handleKeyPress('paddingRight')"
                    v-if="paddingRightEdit"
                    v-model="paddingRight"
                  />
                </div>
              </div>
              <div class="bottom">
                <span
                  class="operate"
                  @dblclick="editActive('paddingBottomEdit')"
                  v-if="!paddingBottomEdit"
                >{{ paddingBottom || compData.compAttr.padding }}</span>
                <a-input
                  class="operateIpt"
                  @change="changeVal('paddingBottom')"
                  @blur="editNagative('paddingBottomEdit')"
                  @keydown="handleKeyPress('paddingBottom')"
                  v-if="paddingBottomEdit"
                  v-model="paddingBottom"
                />
              </div>
            </div>
            <div class="right">
              <span
                class="operate"
                @dblclick="editActive('borderRightEdit')"
                v-if="!borderRightEdit"
              >{{ borderRight || compData.compAttr.borderWidth }}</span>
              <a-input
                class="operateIpt"
                @change="changeVal('borderRight')"
                @blur="editNagative('borderRightEdit')"
                @keydown="handleKeyPress('borderRight')"
                v-if="borderRightEdit"
                v-model="borderRight"
              />
            </div>
          </div>
          <div class="bottom">
            <span
              class="operate"
              @dblclick="editActive('borderBottomEdit')"
              v-if="!borderBottomEdit"
            >{{ borderBottom || compData.compAttr.borderWidth }}</span>
            <a-input
              class="operateIpt"
              @change="changeVal('borderBottom')"
              @blur="editNagative('borderBottomEdit')"
              @keydown="handleKeyPress('borderBottom')"
              v-if="borderBottomEdit"
              v-model="borderBottom"
            />
          </div>
        </div>
        <div class="right">
          <span
            class="operate"
            @dblclick="editActive('marginRightEdit')"
            v-if="!marginRightEdit"
          >{{ marginRight || compData.compAttr.margin }}</span>
          <a-input
            class="operateIpt"
            @change="changeVal('marginRight')"
            @blur="editNagative('marginRightEdit')"
            @keydown="handleKeyPress('marginRight')"
            v-if="marginRightEdit"
            v-model="marginRight"
          />
        </div>
      </div>
      <div class="bottom">
        <span
          class="operate"
          @dblclick="editActive('marginBottomEdit')"
          v-if="!marginBottomEdit"
        >{{ marginBottom || compData.compAttr.margin }}</span>
        <a-input
          class="operateIpt"
          @change="changeVal('marginBottom')"
          @blur="editNagative('marginBottomEdit')"
          @keydown="handleKeyPress('marginBottom')"
          v-if="marginBottomEdit"
          v-model="marginBottom"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Tabs } from 'ant-design-vue';
import { parse } from 'path';

const webSite = namespace('webSite');

@Component({
  name: 'active-component'
})
export default class activeComponent extends Vue {
  @Prop() compData: any;
  marginTopEdit: boolean = false;
  marginTop: any =
    parseInt(this.compData.compAttr.marginTop) ||
    parseInt(this.compData.compAttr.margin) ||
    '-';
  marginLeftEdit: boolean = false;
  marginLeft: any =
    parseInt(this.compData.compAttr.marginLeft) ||
    parseInt(this.compData.compAttr.margin) ||
    '-';
  marginRightEdit: boolean = false;
  marginRight: any =
    parseInt(this.compData.compAttr.marginRight) ||
    parseInt(this.compData.compAttr.margin) ||
    '-';
  marginBottomEdit: boolean = false;
  marginBottom: any =
    parseInt(this.compData.compAttr.marginBottom) ||
    parseInt(this.compData.compAttr.margin) ||
    '-';
  borderTopEdit: boolean = false;
  borderTop: any =
    parseInt(this.compData.compAttr.borderTop) ||
    parseInt(this.compData.compAttr.borderWidth) ||
    '-';
  borderLeftEdit: boolean = false;
  borderLeft: any =
    parseInt(this.compData.compAttr.borderLeft) ||
    parseInt(this.compData.compAttr.borderWidth) ||
    '-';
  borderRightEdit: boolean = false;
  borderRight: any =
    parseInt(this.compData.compAttr.borderRight) ||
    parseInt(this.compData.compAttr.borderWidth) ||
    '-';
  borderBottomEdit: boolean = false;
  borderBottom: any =
    parseInt(this.compData.compAttr.borderBottom) ||
    parseInt(this.compData.compAttr.borderWidth) ||
    '-';
  paddingTopEdit: boolean = false;
  paddingTop: any =
    parseInt(this.compData.compAttr.paddingTop) ||
    parseInt(this.compData.compAttr.padding) ||
    '-';
  paddingLeftEdit: boolean = false;
  paddingLeft: any =
    parseInt(this.compData.compAttr.paddingLeft) ||
    parseInt(this.compData.compAttr.padding) ||
    '-';
  paddingRightEdit: boolean = false;
  paddingRight: any =
    parseInt(this.compData.compAttr.paddingRight) ||
    parseInt(this.compData.compAttr.padding) ||
    '-';
  paddingBottomEdit: boolean = false;
  paddingBottom: any =
    parseInt(this.compData.compAttr.paddingBottom) ||
    parseInt(this.compData.compAttr.padding) ||
    '-';

  widthEdit: boolean = false;
  width: any = this.compData.compAttr.width || '-';

  heightEdit: boolean = false;
  height: string = this.compData.compAttr.height || '-';

  hanldeBoxOut(e) {}
  editActive(key) {
    this[key] = true;
  }
  editNagative(key) {
    this[key] = false;
  }
  handleKeyPress(key) {
    let event: any = window.event;
    if (event.keyCode === 38) {
      this[key] = +this[key] + 1;
    }
    if (event.keyCode === 40) {
      this[key] = +this[key] - 1;
    }
    if (this[key] < 0) {
      this[key] = 0;
    }
    this.compData.compAttr[key] = this[key] + 'px';
  }
  changeVal(name) {
    if (name === 'width' || name === 'height') {
      this.compData.compAttr[name] = this[name];
    } else {
      this.compData.compAttr[name] = this[name] + 'px';
    }
  }
}
</script>

<style lang="less" scoped>
.borderBox {
  * {
    box-sizing: border-box;
  }
  .margin {
    width: 254px;
    height: 154px;
    margin: 0;
  }
}
.box {
  // margin: 15px;
  border: 1px dotted #17bc94;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: white;
  &.hover {
    background: #17bc94;
  }
  & > div {
    width: 100%;
  }
  .box {
    width: 100%;
  }
  .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
  .top {
    width: 100%;
    padding-left: 10px;
    position: relative;
    text-align: left;
    .operate,
    .operateIpt {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
    }
  }
  .operate {
    cursor: pointer;
  }
  .operateIpt {
    height: 100%;
    width: 25px;
    padding: 0;
    margin: 0;
    border: 0;
    font-size: 12px;
    background: transparent;
    text-align: center;
  }
  .left {
    width: 25px;
  }
  .right {
    width: 25px;
  }
  div {
    text-align: center;
  }
  .content {
    display: flex;
    flex-direction: row;
  }
}
</style>

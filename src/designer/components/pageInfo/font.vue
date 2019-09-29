<template>
  <div class="page-font">
    <div class="line">
      <div class="item big">
        <div class="name"></div>
        <div class="desc">
          <a-select v-model="page.fontFamily" style="width:100%">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-input
            v-model="page.fontSize"
            addonAfter="px"
          />
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item big">
        <div class="name"></div>
        <div class="desc">
          <a-select v-model="page.fontWeight" style="width:100%">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-input
            v-model="page.fontColor"
          />
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-radio-group v-model="page.fontStyle">
            <a-radio-button value="jack">T</a-radio-button>
            <a-radio-button value="lucy">T</a-radio-button>
            <a-radio-button value="disabled">T</a-radio-button>
            <a-radio-button value="Yiminghe">T</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-radio-group v-model="page.fontStyle">
            <a-radio-button value="ee">TT</a-radio-button>
            <a-radio-button value="dd">Tt</a-radio-button>
            <a-radio-button value="cc">tt</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-radio-group v-model="page.fontStyle">
            <a-radio-button value="rr"><a-icon type="align-center" /></a-radio-button>
            <a-radio-button value="ff"><a-icon type="align-left" /></a-radio-button>
            <a-radio-button value="gg"><a-icon type="align-right" /></a-radio-button>
            <a-radio-button value="vv"><a-icon type="pic-center" /></a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

interface fontInfo {
  fontFamily:string, // 字体
  fontSize:string, // 大小
  fontWeight:string, // 粗细
  fontColor:string, // 颜色
  fontStyle:string, // 样式
}

@Component({
  name: 'page-font'
})

export default class PageFont extends Vue {
  @Prop() styleData;
  page:fontInfo = {
    fontFamily: '',
    fontSize: '',
    fontWeight: '',
    fontStyle: '',
    fontColor: ''
  }

  background = this.styleData.background;
  font = this.styleData.font;
  border = this.styleData.border;

  updated(){

    console.log('style',this.styleData)
  }

  mounted(){
    console.log('style',this.styleData)
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

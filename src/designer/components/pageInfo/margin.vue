<template>
  <div class="page-margin">
    <div class="line">
      <div class="item">
        <div class="name">宽</div>
        <div class="desc">
          <a-input
            v-model="page.width"
            addonAfter="px"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">高</div>
        <div class="desc">
          <a-input
            v-model="page.height"
            addonAfter="px"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">颜色</div>
        <div class="desc">
          <a-input
            v-model="page.color"
          />
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item">
        <div class="name">圆角</div>
        <div class="desc">
          <a-input
            addonBefore="上左"
            v-model="page.borderTopLeft"
            addonAfter="px"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">&nbsp;</div>
        <div class="desc">
          <a-input
            addonBefore="上右"
            v-model="page.borderTopRight"
            addonAfter="px"
          />
        </div>
      </div>
    </div>

    <div class="line">
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-input
            addonBefore="下左"
            v-model="page.borderBottomLeft"
            addonAfter="px"
          />
        </div>
      </div>
      <div class="item">
        <div class="name"></div>
        <div class="desc">
          <a-input
            addonBefore="下右"
            v-model="page.borderBottomRight"
            addonAfter="px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

interface marginInfo {
  width:string, // 宽
  height:string, // 高
  color:string, // 颜色
  borderTopLeft:string, // 上左
  borderTopRight:string, // 上右
  borderBottomLeft:string, // 下左
  borderBottomRight:string // 下右
}

@Component({
  name: 'page-margin'
})

export default class pageMargin extends Vue {
  page:marginInfo = {
    width: '',
    height: '',
    color: '',
    borderTopLeft: '',
    borderTopRight: '',
    borderBottomLeft: '',
    borderBottomRight: ''
  }
}
</script>

<style lang='less' scoped>
  @import url('./common.less');
</style>

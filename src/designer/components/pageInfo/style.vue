<template>
  <div class="page-style">
    <div class="line">
      <div class="item">
        <div class="name">宽</div>
        <div class="desc">
          <a-input-number
            v-model="pageData.width"
            :min="0"
            :max="100"
            style="width:100%"
            @change="changeData('width')"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">高</div>
        <div class="desc">
          <a-input
            v-model="pageData.height"
            addonAfter="px"
          />
        </div>
      </div>
    </div>
    <div class="line">
      <div class="item">
        <div class="name">颜色</div>
        <div class="desc">
          <a-input
            v-model="pageData.color"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">透明度</div>
        <div class="desc">
          <a-input-number
            v-model="pageData.opacity"
            :min="0"
            :max="100"
            style="width:100%"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

interface StyleInfo {
  width:string,
  height:string,
  color:string,
  opacity:number
}

@Component({
  name: 'page-style'
})

export default class PageStyle extends Vue {
  @Prop() styleData;
  @Prop() changePageStyle;
  pageData:any = this.styleData;

  changeData(key){
    this.changePageStyle('background',this.pageData)
  }

  updated(){
    console.log(this.pageData)
  }
}
</script>

<style lang='less' scoped>
  @import url('./common.less');
  .page-style{
    font-size: 12px;
  }
</style>

<template>
  <div class="app-background">
    <div class="line">
      <div class="item">
        <div class="name">宽</div>
        <div class="desc">
          <a-input
            v-model="width"
            @blur="changeVal('width')"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">高</div>
        <div class="desc">
          <a-input
            v-model="height"
            @blur="changeVal('height')"
          />
        </div>
      </div>
    </div>
    <div class="line">
      <div class="item">
        <div class="name">颜色</div>
        <div class="desc">
          <a-input
            type="color"
            v-model="backgroundColor"
            @change="changeVal('backgroundColor')"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">透明度</div>
        <div class="desc">
          <a-input-number
            v-model="backgroundOpacity"
            :min="0"
            :max="100"
            style="width:100%"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
            @blur="changeVal('backgroundOpacity')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

interface BackgroundStyle {
  width:string,
  height:string,
  backgroundColor:string,
  backgroundOpacity:number
}

@Component({
  name: 'app-background'
})

export default class AppBackground extends Vue {
  @Prop() appStyle;

  appData: any = this.appStyle;
  width: string = '';
  height: string = '';
  backgroundColor: string = '';
  backgroundOpacity: number = null;

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
  .app-background{
    font-size: 12px;
  }
</style>

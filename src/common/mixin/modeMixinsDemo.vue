<template>
  <div>
    <h4>我是 {{ title }}</h4>
    <span
      class="button"
      :class="{act:obj.selecd}"
      v-for="obj in defaultData"
      :key="obj.title"
      @click="bClick(obj)"
    >{{ obj.title }}</span>
  </div>
</template>

<script lang="ts">
// 每次点击会把 defaultData 广播出去 ，且强制不接收别的组件的数据。  第一个demo
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import mix from '@/common/mixin/modeMixins';
const webSite = namespace('webSite');

@Component({
  name: 'pButton-component',
  components: {},
  mixins: [mix]
})
export default class pButtonComponent extends Vue {
  title: string = '按钮';
  listenSwitch__ = false; // 强制不接收别的组年的数据。

  defaultData: any[] = [
    { title: '按钮1', selecd: true },
    { title: '按钮2', selecd: false }
  ];

  bClick(obj: any) {
    this.defaultData.forEach(arr => {
      arr.selecd = false;
    });
    obj.selecd = true;
  }
}
</script>
<style lang='less' scoped>
.button {
  display: inline-block;
  text-align: center;
  padding: 4px 10px;
  border: 1px solid red;
  border-radius: 6px;
  margin-right: 10px;
  transition: all ease 300ms;
  cursor: pointer;
}
.act {
  color: #fff;
  background-color: red;
}
</style>

<template>
  <div>
    <a-tabs v-model="defaultData">
      <a-tab-pane key="1" tab="切换1">
        <div>我是第一个页签</div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="切换2">
        <div>我是第二个页签</div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
//接收的数据 defaultData 会改切换 第二个demo
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import mix from '@/common/mixin/modeMixins';
const webSite = namespace('webSite');

@Component({
  name: 'showData-component',
  components: {},
  mixins: [mix]
})
export default class showDataComponent extends Vue {
  created() {}
  defaultData: string = '1';

  mounted() {}
}
</script>
<style lang='less' scoped>
</style>

<template>
  <div>
    <div>把接收到的数据原样显示出来</div>
    <div>{{ defaultData }}</div>
  </div>
</template>

<script lang="ts">
//纯demo 第三个demo
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import mix from '@/common/mixin/modeMixins';
const webSite = namespace('webSite');

@Component({
  name: 'pShowData-component',
  components: {},
  mixins: [mix]
})
export default class pShowDataComponent extends Vue {
  created() {}

  mounted() {}
  defaultData: any = false;
}
</script>
<style lang='less' scoped>
</style>

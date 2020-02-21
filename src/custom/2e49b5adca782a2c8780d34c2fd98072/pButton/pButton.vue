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
  listenSwitch__ = false;
  created() {
    console.log(this.listenSwitch__, 'sss');
  }

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

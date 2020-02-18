<template>
  <div>
    <icon-selec v-model="compData.compAttr.iconInfo"></icon-selec>
    <base-line :compAttr="compData.compAttr.iconInfo"></base-line>
    <api-user-tip :apiList="apiList"></api-user-tip>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { apiUserTip } from '@/website/components/common'; // api提示
import iconSelec from '@/website/components/common/icon-selec/icon-selec.vue'; // icon选择器
import baseLine from '@/website/components/common/base-common.vue'; // 线设置

@Component({
  name: 'active-component',
  components: {
    iconSelec,
    baseLine,
    apiUserTip
  }
})
export default class iconActiveComponent extends Vue {
  @Prop() compData: any;
  /*   pageData: any = this.compData; */
  info: any = {};
  apiList:any[]=[{ dsc: '//得到图标配置项', api: 'getIconOption():{theme?:string,type?:string,color?:string,fontSize?:string,borderWidth?:string,borderStyle?:string, borderColor?:string,borderRadius?:string}' },
    { dsc: '//设置图标配置项', api: 'setIconOption(option:{theme?:string,type?:string,color?:string,fontSize?:string,borderWidth?:string,borderStyle?:string, borderColor?:string,borderRadius?:string}):void' }];
  created() {
    // this.info = this.compData.compAttr.iconInfo;
    /*     console.log(this.info) */
  }
  // 用户选择icon
  /* iconSelec(info) {
    console.log(info, 'info')

  } */
}
</script>

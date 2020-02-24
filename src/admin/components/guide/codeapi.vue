<template>
  <div class="notice">
    <div class="mdBox" v-html="htmlelement"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import showDown from 'showdown';
import { getGuideDoc } from '../../service/index';

@Component({
  name: 'notice-component'
})
export default class noticeComponent extends Vue {
  $router;
  convertor: any;
  htmlelement: any = {};

  beforeCreate() {
    // markdown解释器
    this.convertor = new showDown.Converter({
      tables: true,
      parseImgDimensions: true,
      simplifiedAutoLink: true
    });
  }

  mounted() {
    let self = this;
    getGuideDoc('codeapi').then((res:any) => {
      if (res.status === 200) {
        self.htmlelement = self.convertor.makeHtml(res.data);
      }
    });
  }
}
</script>

<style lang='less' scoped>
/deep/blockquote{
  border-left: 6px solid #e6e6e6;
  background: #fafafa;
  padding-left: 5px;
}
/deep/pre{
  background: #f2f2f2;
  border-radius: 4px;
}
/deep/li{
  list-style: initial;
}
.notice{
  /deep/ol,/deep/ul{
    padding-left: 16px;
  }
}
</style>

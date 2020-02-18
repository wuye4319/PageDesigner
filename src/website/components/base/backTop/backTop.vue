<template>
  <div title="回到顶部">
    <div v-if="isDesigner" :style="{'position':'fixed','z-index':'199','top':compAttr.top,'left':compAttr.left,'right':compAttr.right,'bottom':compAttr.bottom,'width':'38px','height':'38px'}"></div>
    <a-back-top
      :style="setStyle()"
      :visibilityHeight="parseInt(compAttr.scroll)"
      :target="()=> document.querySelector('.page-container')"
    >
      <i class="backIcon"></i>
    </a-back-top>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { BackTop } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'backTop-component',
  components: {
    ABackTop: BackTop
  }
})
export default class backTopComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: number;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  pageData: any = this.compData;
  compAttr: any = this.compData.compAttr;
  width: string = '';
  height: string = '';
  margin: string = '';
  padding: string = '';
  document: any = document;
  isDesigner: number = -1;

  created(): void {
    this.isDesigner = this.$router.currentRoute.path.indexOf('designer');
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }

  setStyle() {
    return {
      'top': this.compAttr.top,
      'left': this.compAttr.left,
      'right': this.compAttr.right,
      'bottom': this.compAttr.bottom
    }
  }

  get designer() {
    return this.$router.currentRoute.path.indexOf('designer') !== -1;
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
  }
}
</script>

<style scoped>
#components-back-top-demo-custom .ant-back-top {
  bottom: 100px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 40px;
  width: 40px;
  line-height: 40px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 20px;
}
.ant-back-top {
  background-color: rgba(0, 0, 0, 0.7);
  height: 40px;
  width: 40px;
  padding: 4px;
  border-radius: 50%;
  z-index: 100;
}
.backIcon {
  display: block;
  height: 18px;
  width: 18px;
  margin: 6px auto;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAoCAYAAACWwljjAAAABGdBTUEAALGPC/xhBQAAAbtJREFUWAntmMtKw0AUhhMvS5cuxILgQlRUpIggIoKIIoigG1eC+AA+jo+i6FIXBfeuXIgoeKVeitVWJX5HWhhDksnUpp3FDPyZk3Nm5nycmZKkXhAEOXSA3lG7muTeRzmfy6HneUvIhnYkQK+Q9NhAA0Opg0vBEhjBKHiyb8iGMyQMOYuK41BcBSypAL+MYXSKjtFAW7EAGEO3qN4uMQbbAkXiSfRQJ1H6a+yhlkKRcAoVFYiweYNjtCVQJJpBz2GCiPt7fBOZQpFgDpUikse5HgnkM4Fi4QX0Fpc5wf9EbLqpUCy4jMoJSXWhFwbMNgWKhVbRhy5jirhs9fy/oFhgHVVTJEs7RLZ8sSEoJm6iz7SZDMbJ+/OKERQTttCXQRLToRUmrKWCYuA2+jbN0MB4OQobYShfdTCgn/sL1K36M7TLrN3n+758aPy2rrpR6+/od5E8tf/A1uLS9aId5T7J3CNYihkQ4D9PiMdMC7mp4rjB9kjFjZp8BlnVHJBuO1yFXIV0FdDF3RlyFdJVQBdv5AxVdIsq8apiZ2PyYO1EVykesGfZEESsCkweyR8MUW+V8uJ1gkYipmpdP1pm2aJVPEGzAAAAAElFTkSuQmCC)
    100%/100% no-repeat;
}
</style>

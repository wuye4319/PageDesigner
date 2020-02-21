<template>
  <div
    class="page-container "
    @drop="drop"
    @dragover.prevent
    :style="styleDetails"
    ref="scrollArea"
    @click="showAttr('empty')"
  >
    <template v-if="handlePageInfo.length > 0">
      <transition-group
        :name="animationName"
        :class="!global.paddingBottom?'flip-list':'flip-list bottomPadding'"
        tag="div"
      >
        <div
          v-for="(comp,i) in handlePageInfo"
          class="component-view ant-desigener-after-border-color"
          :class="compClass(i,comp)"
          :key="comp.animation"
          :draggable="comp.compInfo.compAttr.isFixed === 'true'?false:true"
          @dragstart="dragstart(i,$event)"
          @dragenter="dragenter(i)"
          @dragend="dragend(i)"
          @click.stop="clickComp(i,comp.compinfo)"
          :style="getFixed(comp)"
          @mouseenter="mouseEvent(comp.compInfo.compAttr.uid)"
          @mouseleave="mouseEvent('')"
        >
          <component
            :style="comp.compInfo.boxOptions"
            class=" component-details"
            :class="{'pointer-event': getPointer(comp.compInfo)}"
            :is="comp.compFn"
            :compData="comp.compInfo"
            :compIndex="i"
            :ref="comp.compInfo.compAttr.uid?comp.compInfo.compAttr.uid:null"
            :id="comp.compInfo.compAttr.uid?comp.compInfo.compAttr.uid:''"
            :trigFunc="triggerPageFunc"
          />
          <handle
            class="handle hidden"
            v-if="isDesigner"
            @mouseenter="mouseEvent(comp.compInfo.compAttr.uid)"
            @mouseleave="mouseEvent('')"
            @deleteComponent="deleteComponent(i)"
          />
        </div>
        <div
          class="component-view empty-cont"
          :class="newViewList.length === newNum ? 'preview-box' : ''"
          key="empty"
          :draggable="false"
          @dragstart="dragstart(newViewList.length,$event)"
          @dragenter="dragenter(newViewList.length)"
          @dragend="dragend(newViewList.length,$event)"
        />
        <!-- <div key="void" class="void-cont component-view" /> -->
      </transition-group>
    </template>
    <template v-else>
      <div class="tips">
        <div class="tips-img"></div>
        <div class="text">请从左侧点击或拖拽控件</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Inject,
  Emit,
  Provide,
  Mixins
} from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getRGBColor } from '@/common/utils/math'; // 创建唯一id 十六进制转换成RGB颜色
import handle from '@/website/components/view_handle/index.vue'; // 操作
import listMixins from './list';
import commonMixin from '@/common/mixin';

const webSite = namespace('webSite');

@Component({
  name: 'page-backup',
  components: {
    handle
  },
  mixins: [commonMixin]
})
export default class Pageindex extends Mixins(listMixins) {
  $route;
  $router;
  $message;
  $refs: {
    scrollArea: HTMLFormElement;
  };
  currentRoute: any = ''; // 当前路由
  routePageName: string = ''; // 当前page的名称
  newViewList: any[] = []; // view层组件列表
  oldNum: number = -1; // 记录原始位置
  newNum: number = -1; // 记录最后位置
  animationName: string = ''; // 动画列表名称
  status: string = ''; // 动画状态 sort move
  draggable: boolean = false; // 是否允许拖拽
  emptyTimer: any = null; // 空行显示定时器
  scrollTop: number = 0; // 滚动条位置
  clickNum: number = -1; // 点击选中
  pageEvent: any = null; // 页面事件

  @Prop({ default: true, type: Boolean })
  isDesigner: boolean;

  @webSite.Action('pageInfor')
  getPageInfor;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.State('Global')
  global;

  @webSite.Getter('appInfor')
  appInfor;

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  @webSite.State('CompStore')
  compStore: Website.pageInfor;

  @webSite.Mutation('tempAppData')
  setTempAppData; // 设置临时变量

  @webSite.State('TempAppData')
  tempAppData;

  @Provide()
  deleteComp = this.deleteComponent; // 删除当前组件

  @Provide()
  resetView = this.resetAll; // 重置所有

  @Inject('showControl') showControl; // 展示control层

  @Inject('getCompsInfor') getCompsInfor; // 获取异步组件方法

  get styleDetails(): object {
    // app样式对象
    let obj = this.initStyle();
    return obj;
  }

  // 监听选中ID的变化，改变对应元素位子
  @Watch('tempAppData.selectedUid', { immediate: true, deep: true })
  selectedUidChange() {
  }

  created() {
    let currentRoute = this.$router.currentRoute.params.page;
    this.currentRoute = currentRoute;
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    if (!currentInfo['page-share']) {
      this.$set(currentInfo, 'page-share', {});
    }
    let pageInfo = currentInfo['page-share'];
    this.pageEvent = pageInfo['event'];
    this.triggerPageFunc('created', this.pageEvent);
  }

  beforeDestroy() {
    clearTimeout(this.emptyTimer);
    this.triggerPageFunc('beforeDestroy', this.pageEvent);
  }

  // 触发自定义方法
  triggerPageFunc(type, model, compStatus?) {
    this.triggerFunc(this.$refs, type, model, compStatus);
  }

  // 动态异步加载组件
  loadCompList(comps) {
    let compsInfor = this.getCompsInfor('website/components/', comps);
    return compsInfor;
  }

  clickComp(i, comp) {
    this.showAttr(i);
    let element:any = document.querySelector('.element' + this.tempAppData['selectedUid']);
    element && element.scrollIntoView({ 'block': 'center' });
  }

  // 显示属性
  showAttr(i) {
    this.showControl(i);
    this.showClickNum(i);
  }

  // 展示点击按钮
  showClickNum(i) {
    this.clickNum = i;
  }

  // 从组件拖动到view层结束
  drop(e) {
    let animation = e.dataTransfer.getData('animation');
    let compInfo = e.dataTransfer.getData('compInfo');
    if (animation === 'move') { // 左侧组件拖动过来
      this.handleDrop(compInfo);
      let pageInfo: any = this.pageInfor;
      this.changePageInfor(pageInfo);
      if (JSON.parse(compInfo).compName === 'bottomNav') {
        this.global.paddingBottom = true;
        // document.querySelector('.flip-list').setAttribute('class', 'flip-list bottomPadding')
      }
    } else if (animation === 'layout') { // layout移入
      this.handleDrop(compInfo);
      // 拖拽组件正确落点drop
      this.setTempAppData({
        key: 'dropStatus',
        value: true
      })
      // 清空
      this.newNum = -1;
      this.oldNum = -1;
      this.status = '';
    }
  }

  // drop处理函数
  handleDrop(compInfo) {
    // 左侧组件拖动过来
    let info: any = JSON.parse(compInfo);
    let pageInfo: any = this.pageInfor;
    if (this.newNum === -1) {
      pageInfo.push(info);
    } else {
      pageInfo.splice(this.newNum, 0, info);
    }
    // 拖动过去展示
    let index = this.newNum === -1 ? pageInfo.length - 1 : this.newNum;
    this.showAttr(index);
    // 记录当时滚动条
    this.scrollTop = this.$refs.scrollArea.scrollTop;
  }

  // 记录初始位置信息
  dragstart(value, e) {
    // 参数
    e.dataTransfer.setData('animation', 'out');
    let compInfo = JSON.stringify(this.pageInfor[value]);
    e.dataTransfer.setData('compInfo', compInfo);
    e.dataTransfer.setData('compIndex', value);
    // 拖拽图片
    new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      ctx.font = '16px Arial';
      let title = this.pageInfor[value]['title'] || '组件';
      ctx.fillText(title, 20, 30);
      let image = document.createElement('img');
      image.src = canvas.toDataURL('image/jpg');
      image.style.pointerEvents = 'none';
      resolve(image)
    }).then((image) => {
      e.dataTransfer.setDragImage(image, 0, 0);
    })
    this.oldNum = value;
    this.status = 'sort';
    // 拖拽组件uid
    this.setTempAppData({
      key: 'dragStartUid',
      value: this.pageInfor[value].compAttr.uid
    })
  }

  // 做最终操作
  dragend(value, e) {
    if (this.status === 'sort' && this.oldNum !== this.newNum) {
      let newNum = this.oldNum < this.newNum ? this.newNum - 1 : this.newNum;
      this.newViewList = this.exchangePosition(
        this.oldNum,
        newNum,
        this.newViewList
      );
      // 改变vuex pageinfo
      let pageInfo: any = this.pageInfor;
      let resPage = this.exchangePosition(this.oldNum, newNum, pageInfo);
      this.changePageInfor(resPage);
      this.showAttr(newNum);
    }
    this.status = '';
    // 重置显示节点，新、旧节点
    this.newNum = -1;
    this.oldNum = -1;
    // 拖拽组件uid
    this.setTempAppData({
      key: 'dragStartUid',
      value: ''
    })
  }

  // 记录移动过程中位置信息
  dragenter(value) {
    if (this.tempAppData['dragStartUid']) {
      this.newNum = value;
    }
  }

  // 获取当前view信息
  get handlePageInfo() {
    let routePageName = this.$route.params.page;
    let pageInfo: any = this.pageInfor;
    let compList = this.loadCompList(pageInfo);
    this.animationName = 'flip-list';
    if (this.$route.name === 'website' && this.appInfor[routePageName]) {
      document.title = this.appInfor[routePageName].title;
    }
    if (
      pageInfo.length !== this.newViewList.length ||
      routePageName !== this.routePageName
    ) {
      this.newViewList = pageInfo.map((comp, i) => {
        let tempobj: object = {
          compInfo: comp, // 组件信息
          compFn: compList[i], // 组件view
          animation: `${comp.compName}${i}` // 组件的动画string
        };
        return tempobj;
      });
      this.routePageName = routePageName;
      this.animationName = 'list';
    }

    return this.newViewList;
  }

  // 交换数组位置
  exchangePosition<T>(
    oldIndex: number,
    newIndex: number,
    oldArr: Array<T>
  ): Array<T> {
    let newItems = [...oldArr];
    let oldVal = newItems[oldIndex];
    // 删除老的节点
    newItems.splice(oldIndex, 1);
    // 在列表中目标位置增加新的节点
    newItems.splice(newIndex, 0, oldVal);
    // this.items一改变，transition-group就起了作用
    let res = [...newItems];
    return res;
  }

  // 箭头
  arrowClick(direction, i) {
    if (i === 0 && direction === 'up') {
      this.$message.warning('已经是最顶层啦');
      return;
    }
    if (i === this.newViewList.length - 1 && direction === 'down') {
      this.$message.warning('已经是最底层啦');
      return;
    }
    let newIndex = direction === 'up' ? i - 1 : i + 1;
    this.newViewList = this.exchangePosition(newIndex, i, this.newViewList);
    // 改变vuex pageinfo
    let pageInfo: any = this.pageInfor;
    let resPage = this.exchangePosition(newIndex, i, pageInfo);
    this.changePageInfor(resPage);
  }

  // 删除组件
  deleteComponent(i) {
    let pageInfo: any = this.pageInfor;
    if (pageInfo[i].compName === 'bottomNav') {
      this.global.paddingBottom = false;
      // document.querySelector('.flip-list').setAttribute('class', 'flip-list')
    }
    // 删除是列表、列表分类和列表排序时
    let list = this.deleteGlobal(i, this.deleteOver);
    if (list === 'list') {
      return;
    }
    this.deleteOver(i);
  }

  //  删除完成
  deleteOver(i) {
    this.changeVuex(i);
    this.loadscroll();
  }

  // 改变vuex状态
  changeVuex(i) {
    let pageInfo: any = this.pageInfor;
    pageInfo.splice(i, 1);
    this.changePageInfor(pageInfo);
  }

  // 载入滚动条
  loadscroll() {
    // 记录当时滚动条
    this.scrollTop = this.$refs.scrollArea.scrollTop;
    this.resetAll();
    // 显示状态
    this.showAttr('empty');
  }

  // 初始化样式
  initStyle() {
    if (Object.keys(this.global).length > 0) {
      let background = this.global.appStyle.background;
      let border = this.global.appStyle.border;
      let font = this.global.appStyle.font;
      return {
        width: background.width,
        height: background.height,
        background: `rgba(${getRGBColor(background.backgroundColor)},${
          background.backgroundOpacity}%)`,
        ...border,
        ...font
      };
    } else {
      return {};
    }
  }

  // 获取当前滚动区位置
  getScrollHeight() {
    let scrollHeight = this.$refs.scrollArea.scrollHeight;
    return scrollHeight;
  }

  // 重置scrollTop
  resetScrollTop(val?: number) {
    this.$nextTick(() => {
      setTimeout(() => {
        let num: number = val || this.scrollTop;
        this.$refs.scrollArea.scrollTop = num;
      }, 0);
    });
  }

  // 重置所有
  resetAll(val?: number) {
    this.resetScrollTop(val);
    clearTimeout(this.emptyTimer);
    this.newNum = -1;
    this.oldNum = -1;
    this.status = '';
  }

  // 返回组件pointer-event
  getPointer(compData) {
    let compName = compData.compName;
    let type = compData.type;
    let compStore: any = this.compStore;
    let index = compStore.findIndex((item) => {
      let status1 = compName === item.compName;
      let status2 = type === item.type;
      return status1 && status2
    })
    let pointer = compStore[index] && compStore[index].compAttr['pointer-event'] || '';
    let status = pointer !== 'auto';
    return status
  }

  // 组件class
  compClass(i, comp) {
    let obj = {
      'preview-box': i === this.newNum,
      design: this.isDesigner,
      'ant-desigener-after-border-color': this.clickNum === i,
      clickshow: this.clickNum === i,
      ['elementD' + comp.compInfo.compAttr.uid]: true,
      'designer-hover': this.tempAppData.mouseenterUid === this.pageInfor[i].compAttr.uid || this.tempAppData.selectedUid === this.pageInfor[i].compAttr.uid
    }
    return obj
  }

  //
  mouseEvent(uid) {
    clearTimeout(this.tempAppData['mouseenterUidTimer']);
    this.setTempAppData({
      key: 'mouseenterUidTimer',
      value: setTimeout(() => {
        this.setTempAppData({
          key: 'mouseenterUid',
          value: uid
        })
      }, 100)
    })
  }
}
</script>
<style lang='less' scoped>
@import url("./index.less");
</style>

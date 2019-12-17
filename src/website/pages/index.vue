<template>
  <div
    class="page-container scroll-style"
    @drop="drop"
    @dragover.prevent
    :style="styleDetails"
    ref="scrollArea"
    @click.capture ="showAttr('empty')"
  >
    <template v-if="handlePageInfo.length > 0">
      <transition-group
        :name="animationName"
        :class="global.paddingBottom?'flip-list':'flip-list bottomPadding'"
        tag="div"
      >
        <div
          v-for="(comp,i) in handlePageInfo"
          class="component-view ant-desigener-after-border-color"
          :class="[i === emptyNum ? 'preview-box' : '',isDesigner?'design':'',clickNum===i?'ant-desigener-after-border-color clickshow':'']"
          :key="comp.animation"
          :draggable="draggable"
          @dragstart="dragstart(i,$event)"
          @dragenter="dragenter(i)"
          @dragend="dragend(i)"
          @click.capture="showAttr(i)"
          :style="comp.compInfo.compAttr.isFixed?{
            'position': 'fixed',
            'bottom': '0',
            'z-index': '99'
          }:{'top':'0'}"
        >
          <component
            :style="comp.compInfo.boxOptions"
            class="scroll-style component-details"
            :is="comp.compFn"
            :compData="comp.compInfo"
            :compIndex="i"
          />
          <handle
            class="handle hidden"
            v-if="isDesigner"
            @arrowUp="arrowClick('up',i)"
            @arrowDown="arrowClick('down',i)"
            @deleteComponent="deleteComponent(i)"
            @mousedown="draggable=true"
            @mouseup="draggable=false"
          />
        </div>
        <div
          class="component-view empty-cont"
          :class="newViewList.length === emptyNum ? 'preview-box' : ''"
          key="empty"
          v-show="isDesigner && emptyNum !== -1"
          :draggable="draggable"
          @dragstart="dragstart(newViewList.length,$event)"
          @dragenter="dragenter(newViewList.length)"
          @dragend="dragend(newViewList.length)"
        />
        <div
          key="void"
          v-show="isDesigner && emptyNum === -1"
          class="void-cont"
        />
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
import { Component, Prop, Vue, Watch, Inject, Emit, Provide } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getCompsInfor } from '@/common/utils';
import handle from '@/website/components/view_handle/index.vue'; // 操作

const webSite = namespace('webSite');

@Component({
  name: 'page-backup',
  components: {
    handle
  }
})
export default class Pageindex extends Vue {
  $route
  $router
  $message
  $refs: {
    scrollArea: HTMLFormElement
  }
  currentRoute: any = '' // 当前路由
  routePageName: string = '' // 当前page的名称
  newViewList: any[] = [] // view层组件列表
  oldNum: number = -1 // 记录原始位置
  newNum: number = -1 // 记录最后位置
  animationName: string = '' // 动画列表名称
  status: string = 'move' // 动画状态 sort move
  draggable: boolean = false // 是否允许拖拽
  emptyNum: number = -1 // 空行显示emptyNum: number = -1 // 空行显示
  emptyTimer: any = null // 空行显示定时器
  scrollTop: number = 0 // 滚动条位置
  clickNum: number = -1 // 点击选中

  @Prop()
  isDesigner: boolean

  @webSite.Action('pageInfor')
  getPageInfor;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Getter('global')
  global;

  @webSite.Getter('appInfor')
  appInfor

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  @Provide()
  compList:any = this.loadCompList

  @Inject('showControl') showControl

  get styleDetails():object { // app样式对象
    let obj = this.initStyle();
    return obj;
  }

  created() {
    this.currentRoute = this.$router.currentRoute.params.page;
    let appID = this.$router.currentRoute.params.appID;
    this.getPageInfor({ appID: appID, page: this.currentRoute });
  }

  beforeDestroy() {
    clearTimeout(this.emptyTimer)
  }

  // 动态异步加载组件
  loadCompList(comps) {
    let compsInfor = getCompsInfor('website/components/', comps);
    return compsInfor;
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
    if (animation === 'move') {
      let compInfo = e.dataTransfer.getData('compInfo');
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
      this.changePageInfor(pageInfo);
      if (JSON.parse(compInfo).compName === 'bottomNav') {
        this.global.paddingBottom = true;
        document.querySelector('.flip-list').setAttribute('class', 'flip-list bottomPadding')
      }
    }
  }

  // 记录初始位置信息
  dragstart(value, e) {
    if (!this.draggable) {
      e.preventDefault();
    }
    this.oldNum = value;
    this.status = 'sort';
  }

  // 做最终操作
  dragend(value) {
    if (this.status === 'sort' && this.oldNum !== this.newNum) {
      let newNum = this.oldNum < this.newNum ? this.newNum - 1 : this.newNum;
      this.newViewList = this.exchangePosition(this.oldNum, newNum, this.newViewList);
      // 改变vuex pageinfo
      let pageInfo: any = this.pageInfor;
      let resPage = this.exchangePosition(this.oldNum, newNum, pageInfo);
      this.changePageInfor(resPage);
    }
    this.status = 'move';
    // 重置显示节点，新、旧节点
    this.emptyNum = -1;
    this.newNum = -1;
    this.oldNum = -1;
    this.draggable = false;// 禁止drag
  }

  // 记录移动过程中位置信息
  dragenter(value) {
    this.newNum = value;
    if (this.status === 'move' && this.emptyNum !== value) {
      clearTimeout(this.emptyTimer);
      this.emptyTimer = setTimeout(() => {
        this.emptyNum = value;
      }, 50);
    }
    if (this.status === 'sort') {
      this.emptyNum = value;
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
    if (pageInfo.length !== this.newViewList.length || routePageName !== this.routePageName) {
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
  exchangePosition<T>(oldIndex: number, newIndex: number, oldArr: Array<T>): Array<T> {
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
    if (i === (this.newViewList.length - 1) && direction === 'down') {
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
      document.querySelector('.flip-list').setAttribute('class', 'flip-list')
    }
    // 删除是列表分类和列表排序时
    if (pageInfo[i].compName === 'list-classify' || pageInfo[i].compName === 'list-sort') {
      this.deleteListSon(i);
    }
    // 删除列表
    if (pageInfo[i].compName === 'list') {
      this.deleteList(i)
      return
    }
    pageInfo.splice(i, 1);
    this.changePageInfor(pageInfo);
    // 记录当时滚动条
    this.scrollTop = this.$refs.scrollArea.scrollTop;
    this.resetAll();
    // 显示状态
    this.showAttr('empty')
  }

  // 删除列表 
  deleteList(i) {
    let pageInfo: any = this.pageInfor;
    let uid = pageInfo[i].compAttr.uid;
    this.$store['$emit'](`${pageInfo[i].compAttr.uid}-clear`);
    let index = pageInfo.findIndex(item => {
      let status1 = item.compName === 'list';
      let status2 = uid === item.compAttr.uid;
      let status = status1 && status2;
      return status;
    });
    pageInfo.splice(index, 1);
    this.changePageInfor(pageInfo);
    // 记录当时滚动条
    this.scrollTop = this.$refs.scrollArea.scrollTop;
    this.resetAll();
    // 显示状态
    this.showAttr('empty')
  }

  // 删除列表子项
  deleteListSon(i) {
    let pageInfo: any = this.pageInfor;
    if (pageInfo[i].compAttr.bindName && pageInfo[i].compAttr.bindUid) {
      let index = pageInfo.findIndex(item => {
        let status1 = item.compName === pageInfo[i].compAttr.bindName;
        let status2 = pageInfo[i].compAttr.bindUid === item.compAttr.uid;
        let status = status1 && status2;
        return status;
      });
      pageInfo[index].compAttr[pageInfo[i].compName] = false;
    }
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
        background: `rgba(${this.getRGBColor(background.backgroundColor)},${background.backgroundOpacity}%)`,
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
    return scrollHeight
  }

  // 重置scrollTop
  resetScrollTop(val?:number) {
    this.$nextTick(() => {
      setTimeout(() => {
        let num:number = val || this.scrollTop;
        this.$refs.scrollArea.scrollTop = num;
      }, 0);
    });
  }

  // 重置所有
  resetAll(val?:number) {
    this.resetScrollTop(val);
    clearTimeout(this.emptyTimer);
    this.emptyNum = -1;
    this.newNum = -1;
    this.oldNum = -1;
  }

  // 十六进制转换成RGB颜色
  getRGBColor(color) {
    let sColor = String(color).toLowerCase();
    // 十六进制颜色值的正则表达式
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // 处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      return sColorChange.join(',');
    }
    return sColor;
  }
}
</script>
<style lang='less' scoped>
@import url('./index.less');
</style>

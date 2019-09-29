<template>
  <div class="page-container" @drop="drop" @dragover.prevent>
    <template v-if="handlePageInfo.length > 0">
      <transition-group :name="animationName" class="flip-list" tag="div">
        <div
          v-for="(comp,i) in handlePageInfo"
          class="component-view"
          :class="[i === emptyNum ? 'preview-box' : '',isDesigner?'design':'']"
          :key="comp.animation"
          :draggable="draggable"
          @dragstart="dragstart(i)"
          @dragenter="dragenter(i)"
          @dragend="dragend(i)"
          @click="showAttr(i)"
        >
          <div :is="comp.compFn" :compData="comp.compInfo" :compIndex="[i,column]" :compList="loadCompList" @layoutColumn="layoutColumn"></div>
          <handle
            class="handle hidden"
            v-if="isDesigner"
            @arrowUp="arrowClick('up',i)"
            @arrowDown="arrowClick('down',i)"
            @deleteComponent="deleteComponent(i)"
            @mousedown="draggable=true"
            @mouseup="draggable=false"
          ></handle>
        </div>
        <div
          class="component-view empty-cont"
          :class="newViewList.length === emptyNum ? 'preview-box' : ''"
          key="empty"
          v-show="emptyNum !== -1"
          draggable
          @dragstart="dragstart(newViewList.length)"
          @dragenter="dragenter(newViewList.length)"
          @dragend="dragend(newViewList.length)"
        ></div>
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
import { Component, Prop, Vue, Watch, Inject, Emit } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getCompsInfor, clone } from '@/common/utils'
import { emit } from 'cluster';
import handle from '@/website/components/view_handle/index.vue'

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
  currentRoute: any = ''
  compList: any = ''
  compIndex: number
  routePageName:string = '' // 当前page的名称
  newViewList: any[] = [] // view层组件列表
  oldNum: number = 0 // 记录原始位置
  newNum: number = 0 // 记录最后位置
  animationName: string = '' // 动画列表名称
  status: string = 'move' // 动画状态 sort move
  draggable: boolean = false // 是否允许拖拽
  emptyNum: number = -1 // 空行显示
  emptyTimer: any = null // 空行显示定时器
  column:number = null 

  @Prop()
  showDrawer: any
  @Prop()
  isDesigner: boolean

  @webSite.Action('pageInfor')
  getPageInfor;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  @Emit()
  showSettings(index: number) {
    this.compIndex = index;
  }

  showAttr(i) {
    this.showDrawer(i, this.column)
  }

  layoutColumn(c) {
    this.column = c;
  }

  // 动态异步加载组件
  loadCompList(comps) {
    let compsInfor = getCompsInfor('website/components/', comps)
    return compsInfor
  }

  created() {
    this.currentRoute = this.$router.currentRoute.params.page
    this.getPageInfor({ domain: 'default', page: this.currentRoute })
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
      this.changePageInfor(pageInfo);
    }
  }

  // 记录初始位置信息
  dragstart(value) {
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
      }, 300);
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
    if (pageInfo.length !== this.newViewList.length || routePageName !== this.routePageName) {
      this.newViewList = pageInfo.map((comp, i) => {
        let tempobj: object = {
          compInfo: comp, // 组件信息
          compFn: compList[i], // 组件view
          animation: `${comp.compName}${i}` // 组件的动画string
        }
        return tempobj
      })
      this.routePageName = routePageName;
      this.animationName = 'list';
    }
    
    return this.newViewList
  }

  exchangePosition<T>(oldIndex: number, newIndex: number, oldArr: Array<T>): Array<T> {
    let newItems = [...oldArr];
    let oldVal = newItems[oldIndex];
    // 删除老的节点
    newItems.splice(oldIndex, 1);
    // 在列表中目标位置增加新的节点
    newItems.splice(newIndex, 0, oldVal);
    // this.items一改变，transition-group就起了作用
    let res = [...newItems];
    return res
  }

  // 箭头
  arrowClick(direction, i) {
    if (i === 0 && direction === 'up') {
      this.$message.warning('已经是最顶层啦');
      return
    }
    if (i === (this.newViewList.length - 1) && direction === 'down') {
      this.$message.warning('已经是最底层啦');
      return
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
    pageInfo.splice(i, 1);
    this.changePageInfor(pageInfo);
  }
}
</script>
<style lang='less' scoped>
.page-container {
  text-align: center;
}
.flip-list-move {
  transition: transform 0.3s;
}
.preview-box {
  @previewbox-top: 30px;
  padding-top: @previewbox-top;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    top: 0px;
    background: skyblue;
    height: @previewbox-top;
    border: 1px solid skyblue;
  }
}
.preview-box-after {
  @previewbox-top: 30px;
  padding-top: @previewbox-top;
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    bottom: 0px;
    background: skyblue;
    height: @previewbox-top;
    border: 1px solid skyblue;
  }
}
.component-view {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  position: relative;
  flex-grow: 1;
  width: 100%;
  &.design {
    &:hover {
    border: 1px dashed #17BC94;
    box-sizing: border-box;
    .handle {
      animation: myAnimation 0.3s;
      animation-fill-mode: forwards;
    }
    .hidden {
      visibility: visible;
    }
  }
  }
  .handle {
    position: absolute;
  }
  .hidden {
    visibility: hidden;
  }
}
@keyframes myAnimation {
  from {
    right: -100px;
  }
  to {
    right: 10px;
  }
}
.list-item {
  // display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  display: none;
  // transform: translateY(1px);
}
.empty-cont {
  min-height: 30px;
  width: 100%;
}
.tips {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  .tips-img {
    width:118px;
    height:118px;
    background:rgba(216,216,216,1);
    border-radius:2px;
    border:1px solid rgba(151,151,151,1);
  }
  .text {
    margin-top: 10px;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(0,0,0,0.65);
  }
}
</style>

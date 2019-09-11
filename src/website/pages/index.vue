<template>
  <div class="page-container" @drop="drop" @dragover.prevent>
    <transition-group :name="animationName" class="flip-list" tag="div">
      <div
        v-for="(view,i) in newViewList"
        class="component-view"
        :draggable="draggable"
        @dragstart="dragstart(i)"
        @dragenter="dragenter(i)"
        @dragend="dragend(i)"                            
        :key="view.animation"
        v-on:click="showAttr(i)">
        <div class="empty" v-show="i === emptyNum">
          
        </div>
        <div
          :is="view.compFn"
          :compData="view.compInfo"
          :compIndex="i"
          @loadCompList="loadCompList"
          :compList="compList"
        ></div>
        <div class="handle">
          <a-tooltip :mouseEnterDelay="1">
            <template slot='title'>
              上移
            </template>
            <a-icon type="arrow-up" @click.stop="arrowUp(i)" />
          </a-tooltip>
          <a-tooltip :mouseEnterDelay="1">
            <template slot='title'>
              下移
            </template>
            <a-icon type="arrow-down" @click.stop="arrowDown(i)"  />
          </a-tooltip>
          <a-tooltip :mouseEnterDelay="1">
            <template slot='title'>
              拖动
            </template>
            <a-icon type="drag" @mousedown="draggable=true" @mouseup="draggable=false"/>
          </a-tooltip>
          <a-tooltip :mouseEnterDelay="1">
            <template slot='title'>
              删除
            </template>
            <a-icon type="delete" @click.stop="deleteComponent(i)"/>
          </a-tooltip>
        </div>
      </div>
      <div 
        class="component-view" 
        key="empty" 
        v-show="emptyNum !== -1"
        draggable
        @dragstart="dragstart(newViewList.length)"
        @dragenter="dragenter(newViewList.length)"
        @dragend="dragend(newViewList.length)">
        <div class="empty" v-show="newViewList.length === emptyNum">
          
        </div>
        <div class="empty-cont">

        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Inject, Emit } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { getCompsInfor, clone } from '@/common/utils'
import { emit } from 'cluster';

const webSite = namespace('webSite');

@Component({
  name: 'page-index',
  components: {}
})
export default class Pageindex extends Vue {
  $router
  $message
  currentRoute: any = ''
  compList: any = ''
  compIndex: number
  nameList = []
  newViewList: any[] = [] // view层组件列表
  oldNum: number = 0 // 记录原始位置
  newNum: number = 0 // 记录最后位置
  animationName:string = '' // 动画列表名称
  status: string = 'move' // 动画状态 sort move
  draggable: boolean = false // 是否允许拖拽
  emptyNum:number = -1 // 空行显示
  emptyTimer:any = null // 空行显示定时器

  @Prop()
  showDrawer: any

  @webSite.Action('pageInfor')
  getPageInfor;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Mutation("changePageInfor")
  changePageInfor;

  @Emit()
  showSettings(index: number) {
    this.compIndex = index;
  }

  compsDate(i) {
    return this.pageInfor[i]
  }

  showAttr(i) {
    this.showDrawer(i)
  }
  compsDateCopy(i) {
    return this.nameList[i]
  }

  created() {
    this.currentRoute = this.$router.currentRoute.params.page
    this.getPageInfor({ domain: 'default', page: this.currentRoute })
  }

  @Watch("pageInfor.length",{deep:true})
  pageInfoChange(val,oval) {
    this.animationName = `flip-list`;
    if (val !== oval) {
      this.animationName = 'list';
      this.handlePageInfo();
    }
  }

  loadCompList(compInfor) {
    this.compList = getCompsInfor('website/components/', compInfor)
  }

  // 从组件拖动到view层结束
  drop(e) {
    let animation = e.dataTransfer.getData('animation');
    if (animation === 'move') {
      let compInfo = e.dataTransfer.getData('compInfo');
      let info:any = JSON.parse(compInfo);
      let pageInfo:any = this.pageInfor;
      if (this.newNum === -1) {
        pageInfo.push(info);
      }else {
        pageInfo.splice(this.newNum,0,info);
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
      this.newViewList = this.exchangePosition(this.oldNum,this.newNum,this.newViewList);
      // 改变vuex pageinfo
      let pageInfo:any = this.pageInfor;
      let resPage = this.exchangePosition(this.oldNum,this.newNum,pageInfo);
      this.changePageInfor(resPage);
    } 
    this.status = 'move';
    // 重置显示节点，新、旧节点
    this.emptyNum = -1;
    this.newNum = -1;
    this.oldNum = -1;
    this.draggable=false;// 禁止drag
  }

  // 新旧位置交换
  exchangePosition<T>(oldIndex:number,newIndex:number,oldArr:Array<T>):Array<T> {
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

  // 记录移动过程中位置信息
  dragenter(value) {
    this.newNum = value;
    if (this.status === 'move' && this.emptyNum !== value) {
      clearTimeout(this.emptyTimer);
      this.emptyTimer = setTimeout(() => {
        this.emptyNum = value
      }, 200);
    }
  }

  // 获取当前view信息
  handlePageInfo() {
    this.newViewList = [];
    let compList = getCompsInfor('website/components/', this.pageInfor);
    let pageInfo:any = this.pageInfor;
    this.newViewList = pageInfo.map((item,i) => {
      let obj = {
        compInfo: item,
        compFn: compList[i],
        animation: `${item.compName}${i}`,
        draggable: false
      }
      return obj
    })
  }

  // 向上箭头
  arrowUp(i) {
    if (i===0) {
      this.$message.warning('已经是最顶层啦');
      return
    }
    this.newViewList = this.exchangePosition(i-1,i,this.newViewList);
  }

  // 向下箭头
  arrowDown(i) {
    if (i===(this.newViewList.length-1)) {
      this.$message.warning('已经是最底层啦');
      return
    }
    this.newViewList = this.exchangePosition(i+1,i,this.newViewList);
  }

  // 删除组件
  deleteComponent(i) {
    let pageInfo:any = this.pageInfor;
    pageInfo.splice(i,1);
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
.component-view {
  position: relative;
  overflow: hidden;
  .handle {
    width: 100px;
    position: absolute;
    top: 5px;
    right: -100px;
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
  &:hover {
    border:1px dotted red;
    box-sizing: border-box;
    .handle {
      animation: myAnimation .7s;
      animation-fill-mode: forwards;
    }
  }
  .hidden {
    visibility: hidden;
  }
}
@keyframes myAnimation {
  from {right: -100px;}
  to {right: 10px;}
}
.list-item {
  // display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  display: none;
  // transform: translateY(1px);
}

.empty {
  width: 100%;
  height: 30px;
  background: skyblue;
}
.empty-cont {
  height: 10px;
  width: 100%;
}
</style>

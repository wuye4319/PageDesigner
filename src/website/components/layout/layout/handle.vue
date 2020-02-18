<template>
  <div
    class="layout designer"
    :style="{'min-height': minHeight}"
    :class="{'layout-hover': layoutHoverUid === pageData.compAttr.uid}"
    @mouseenter="mouseEvent(pageData.compAttr.uid)"
    @mouseleave="mouseEvent('','mouseleave')"
  >
    <div
      class="column layout-view "
      v-for="(item,i) in compArray"
      :key="'array'+i"
      :style="Object.assign({},{'flex-grow': item.flex},item.attr.boxOptions,item.attr.flexOptions)"
      :class="getViewClass(i,item.viewList.length)"
      @dragover.prevent.stop="dragover($event,i,'out')"
      @drop.stop="drop($event,i,item.viewList.length)"
    >
      <div
        class="layout-item item-designer "
        :class="getItemClass(i,j)"
        v-for="(view,j) of item.viewList"
        :key="j"
        @click.stop="innerClick(i,j)"
        :draggable="true"
        @dragstart.stop="dragstart($event,i,j)"
        @drop.stop="drop($event,i,j)"
        @dragover.prevent.stop="dragover($event,i,j)"
        @dragend.stop="dragend($event,i,j)"
        @mouseenter="mouseEvent(item.data[j].compAttr.uid)"
        @mouseleave="mouseEvent(pageData.compAttr.uid)"
        :ref="`${item.data[j].compAttr.uid}-layout-item`"
      >
        <component
          :style="item.data[j].boxOptions"
          :is="view"
          :class="{'pointer-event': getPointer(item.data[j]),['elementD' + item.data[j].compAttr.uid]: true,}"
          :compData="item.data[j]"
          :trigFunc="trigFunc"
          :layoutUidOut="layoutUidOutPage"
        />
        <div
          class="handle"
          :class="getHandleClass(i,j)"
          @mouseenter="mouseEvent(item.data[j].compAttr.uid)"
          @mouseleave="mouseEvent(pageData.compAttr.uid)"
        >
          <a-icon type="delete" @click="deleteChild(i,j)"/>
        </div>
      </div>
      <div
        class="empty"
        :class="{'bg-green': bgPositon === (String(i)+item.viewList.length)}"
        @drop.stop="drop($event,i,item.viewList.length)"
        @dragover.prevent.stop="dragover($event,i,item.viewList.length)"
        v-show="$route.name === 'designer' && item.viewList.length > 0 && (Array.from(bgPositon)[0] === String(i))"
      />
      <div v-if="$route.name === 'designer' && item.viewList.length === 0" class="tips">拖拽组件到此处</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Icon } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'layout-component',
  components: {
    AIcon: Icon
  }
})
export default class layoutComponent extends Vue {
  $route
  $message
  @Prop() compData: any
  @Prop() compIndex: any
  @Prop() trigFunc: any;
  @Prop() layoutUidOut: string;

  pageData: any = this.compData
  bgPositon: string = '' // 背景位置
  handleArr: any[] = [] // 操作数组
  timer: any = null
  layoutHover: boolean = false // 布局组件hover时
  dragStartColumn: number = -1;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  @webSite.Mutation('tempAppData')
  setTempAppData; // 设置临时变量

  @webSite.State('TempAppData')
  tempAppData;

  @webSite.State('CompStore')
  compStore: Website.pageInfor;

  @Inject('showControl') showControl

  @Inject('getCompsInfor') getCompsInfor // 获取异步组件方法

  @Inject('deleteComp') deleteComp // website删除组件方法

  @Inject('resetView') resetView // 重置website视图区

  // 将1维数组改变为多维数据进行渲染
  get compArray() {
    let childList = this.pageData.compAttr.childList;
    let childListAttr = this.pageData.compAttr.childListAttr;
    let compViewList = childList.map((item) => {
      let arr = this.loadCompList(item);
      return arr;
    });
    let flexArr = this.pageData.compAttr.typeVal.split(':');
    let compArrayBox = compViewList.map((item, i) => {
      let obj = {
        viewList: item,
        flex: flexArr[i],
        data: childList[i],
        attr: childListAttr[i]
      };
      return obj;
    });

    // 创建hover的数组
    let handleArr = [];
    handleArr = Array.from({ length: childList.length }, () => []);
    childList.forEach((item, i) => {
      item.forEach((v, j) => {
        handleArr[i][j] = false;
      });
    });
    this.handleArr = handleArr;
    return compArrayBox;
  }

  get minHeight() { // 最小高度
    let minHeight = 0;
    if (this.pageData.compAttr.minHeightSwitch) {
      minHeight = this.pageData.compAttr.minHeight
    }
    return minHeight
  }

  get layoutHoverUid() { // layout鼠标移入时标识
    let layoutHoverUid = this.tempAppData['mouseenterUid'] || '';
    return layoutHoverUid
  }

  get selectedUid() { // layout选中时标识
    let selectedUid = this.tempAppData['selectedUid'] || '';
    return selectedUid
  }

  get layoutUidOutPage() { // layout最外层uid
    let uid;
    if (this.layoutUidOut) {
      uid = this.layoutUidOut
    } else {
      uid = this.pageData.compAttr.uid
    }
    return uid
  }

  created() {
    let arr = Array.from({ length: this.pageData.compAttr.childList.length }, () => []);
    this.pageData.compAttr.childList.forEach((item, i) => {
      item.forEach((v, j) => {
        arr[i][j] = false;
      });
    });
    this.handleArr = arr;
  }

  beforeDestory() {
    clearTimeout(this.timer);
  }

  // 动态异步加载组件
  loadCompList(comps) {
    let compsInfor = this.getCompsInfor('website/components/', comps);
    return compsInfor;
  }

  getViewClass(i, len) {
    return {
      droping: this.bgPositon === (i + 'out') || this.bgPositon === (String(i) + len),
      bordershow: this.$route.name === 'designer',
      designer: i > 0
    };
  }

  // 内部组件点击
  innerClick(i, j) {
    let element:any = document.querySelector('.element' + this.tempAppData['selectedUid']);
    element && element.scrollIntoView({ 'block': 'center' });
    let source = this.pageData.compAttr.childList[i][j];
    let sourceParent = this.pageData.compAttr.childList[i];
    this.showControl('layout', source, sourceParent);
  }

  // 拖拽开始
  dragstart(e, i, j) {
    // 参数
    let source = this.pageData.compAttr.childList[i][j];
    let sourceParent = this.pageData.compAttr.childList[i];
    e.dataTransfer.setData('animation', 'layout');
    let compInfo = JSON.stringify(source);
    e.dataTransfer.setData('compInfo', compInfo);
    // 拖拽图片
    new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      ctx.font = '16px Arial';
      let title = source['title'] || '组件';
      ctx.fillText(title, 10, 30);
      let image = document.createElement('img');
      image.src = canvas.toDataURL('image/jpg');
      image.style.pointerEvents = 'none';
      resolve(image)
    }).then((image) => {
      e.dataTransfer.setDragImage(image, 0, 0);
    })
    // 页面上拖拽元素开始位置
    this.dragStartColumn = j;
    // 拖拽组件uid
    this.setTempAppData({
      key: 'dragStartUid',
      value: source.compAttr.uid
    })
  }

  // 落点
  drop(e, i: number, j: number | string) {
    let animation = e.dataTransfer.getData('animation');
    let compInfo = e.dataTransfer.getData('compInfo');
    let info: any = JSON.parse(compInfo);
    // 当前页面信息
    let sourceParent = this.pageData.compAttr.childList[i];
    let status = this.dropAllow()
    if (status && animation !== 'move') {
      return;
    }
    if (animation === 'move') { // 左侧移入新组件
      this.handleDrop(info, i, j)
    } else if (animation === 'out') { // website移入layout
      let index = e.dataTransfer.getData('compIndex');
      this.deleteComp(index);
      this.handleDrop(info, i, j)
    } else if (animation === 'layout') { // layout到layout
      let layoutIndex = j;
      if (this.bgPositon) { // bgPositon 有值时，说明在本层上移、下移
        let dragColumn = this.bgPositon.slice(1);
        if (dragColumn !== 'out' && this.dragStartColumn !== -1 && this.dragStartColumn < j) {
          layoutIndex = Number(j) - 1;
        }
      }
      setTimeout(() => {
        sourceParent.splice(layoutIndex, 0, info);
        this.showControl('layout', info, sourceParent);
      })
      // 拖拽组件正确落点drop
      this.setTempAppData({
        key: 'dropStatus',
        value: true
      })
    }
  }

  // 能否进行拖动条件
  dropAllow() {
    let status1 = this.tempAppData['dragStartUid'] === this.pageData.compAttr.uid; // 自身拖动
    let status2 = this.tempAppData['dragStartUid'] === this.layoutUidOut // 父拖动到子
    return status1 || status2
  }

  // drop处理函数
  handleDrop(info, i, j) {
    let sourceParent = this.pageData.compAttr.childList[i];
    sourceParent.splice(j, 0, info);
    let source = this.pageData.compAttr.childList[i][j];
    this.showControl('layout', source, sourceParent);
  }

  // 拖动过程
  dragover(e, i, j) {
    if(this.tempAppData['dragStartUid']) {
      this.bgPositon = String(i) + j;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.bgPositon = '';
        this.dragStartColumn = -1;
      }, 100);
    }
  }

  // 拖动结束
  dragend(e, i, j) {
    let sourceParent = this.pageData.compAttr.childList[i];
    // 保存拖拽组件uid
    let dropStatus = this.tempAppData['dropStatus'];
    if (dropStatus) {
      sourceParent.splice(j, 1);
      this.setTempAppData({
        key: 'dropStatus',
        value: false
      })
      // 拖拽组件uid
      this.setTempAppData({
        key: 'dragStartUid',
        value: ''
      })
    }
    this.resetView();
  }

  // 操作子菜单
  deleteChild(i, j) {
    let sourceParent = this.pageData.compAttr.childList[i];
    setTimeout(() => {
      sourceParent.splice(j, 1);
      this.showControl('empty');
    })
  }

  // 鼠标移入
  mouseEvent(uid:string, type?:string) {
    if (!this.layoutUidOut && type === 'mouseleave') {
      return
    }
    clearTimeout(this.tempAppData['mouseenterUidTimer']);
    this.setTempAppData({
      key: 'mouseenterUidTimer',
      value: setTimeout(() => {
        this.setTempAppData({
          key: 'mouseenterUid',
          value: uid
        })
      }, 200)
    })
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
    if (index === -1) {
      return;
    }
    let pointer = compStore[index].compAttr['pointer-event'];
    let status = pointer !== 'auto';
    return status
  }

  // layout-item hover时class
  getItemClass(i, j) {
    let status = this.isWidthStatus(i, j);
    let obj;
    if (status) {
      obj = {
        insert: this.bgPositon === (String(i) + j),
        'layout-choose ant-desigener-border-color': this.layoutHoverUid === this.compArray[i].data[j].compAttr.uid || this.selectedUid === this.compArray[i].data[j].compAttr.uid
      }
    } else {
      obj = {
        insert: this.bgPositon === (String(i) + j),
        'layout-choose ant-desigener-border-color none-hidden': this.layoutHoverUid === this.compArray[i].data[j].compAttr.uid || this.selectedUid === this.compArray[i].data[j].compAttr.uid
      }
    }
    return obj
  }

  // handle hover时class
  getHandleClass(i, j) {
    let status = this.isWidthStatus(i, j);
    let obj;
    if (status) {
      obj = { hover: this.layoutHoverUid === this.compArray[i].data[j].compAttr.uid || this.selectedUid === this.compArray[i].data[j].compAttr.uid }
    } else {
      if (i === 0) {
        obj = { 'hover-right': this.layoutHoverUid === this.compArray[i].data[j].compAttr.uid || this.selectedUid === this.compArray[i].data[j].compAttr.uid }
      } else {
        obj = { 'hover-left': this.layoutHoverUid === this.compArray[i].data[j].compAttr.uid || this.selectedUid === this.compArray[i].data[j].compAttr.uid }
      }
    }

    return obj
  }

  // width判断条件
  isWidthStatus(i, j) {
    let width = 0;
    if (this.$refs[`${this.compArray[i].data[j].compAttr.uid}-layout-item`] && this.$refs[`${this.compArray[i].data[j].compAttr.uid}-layout-item`][0]) {
      width = this.$refs[`${this.compArray[i].data[j].compAttr.uid}-layout-item`][0].offsetWidth;
    }
    return width > 50
  }
}
</script>
<style lang='less' scoped>
@import url("./layout.less");
</style>

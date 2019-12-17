<template>
  <div class="layout" ref="layout">
    <div
      class="column layout-view scroll-style"
      v-for="(item,i) in compArray"
      :key="'array'+i"
      :style="{'flex-grow': item.flex}"
      :class="getViewClass(i,item.viewList.length)"
      @dragover.prevent.stop="dragover($event,i,'out')"
      @drop.stop="drop($event,i,item.viewList.length)"
    >
      <div
        class="layout-item scroll-style"
        :class="{insert: bgPositon === (String(i) + j)}"
        v-for="(view,j) of item.viewList"
        :key="j"
        @click.stop="innerClick(i,j)"
        @contextmenu.prevent.stop="contextmenu(i,j)"
        @drop.stop="drop($event,i,j)"
        @dragover.prevent.stop="dragover($event,i,j)"
      >
        <a-popover
          trigger="contextmenu"
          placement="bottomRight"
          v-model="handleArr[i][j]"
          :destroyTooltipOnHide="true"
        >
          <template slot="content">
            <template v-for="btn of buttonArr">
              <a-button
                class="handle-button"
                type="primary"
                shape="circle"
                size="small"
                :key="btn"
                :icon="btn"
                v-if="!((btn==='up'||btn==='down')&&item.viewList.length === 1)"
                @click="handleChild(i,j,btn)"
              />
            </template>
          </template>
          <component
            :style="item.data[j].boxOptions"
            :is="view"
            :compData="item.data[j]"
          />
        </a-popover>
      </div>
      <div
        class="empty"
        :class="{'bg-green': bgPositon === (String(i)+item.viewList.length)}"
        @drop.stop="drop($event,i,item.viewList.length)"
        @dragover.prevent.stop="dragover($event,i,item.viewList.length)"
        v-show="$route.name === 'designer' && item.viewList.length > 0 && (Array.from(bgPositon)[0] == i)"
      />
      <div v-if="$route.name === 'designer' && item.viewList.length === 0" class="tips">拖拽组件到此处</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit, Inject } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

const buttonArr = ['up', 'down', 'left', 'right', 'delete'];
@Component({
  name: 'layout-component',
  components: {}
})
export default class layoutComponent extends Vue {
  $route
  $message
  @Prop() compData: any
  @Prop() compIndex: number

  pageData: any = this.compData
  bgPositon: string = ''
  handleArr: any[] = []
  timer: any = null
  buttonArr:string[] = buttonArr

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Mutation('changePageInfor')
  changePageInfor;

  @Inject('showControl') showControl
  @Inject('compList') compList

  // 将1维数组改变为多维数据进行渲染
  get compArray() {
    let childList = this.pageData.compAttr.childList;
    let compViewList = childList.map((item) => {
      let arr = this.compList(item);
      return arr;
    });
    let flexArr = this.pageData.compAttr.typeVal.split(':');
    let compArrayBox = compViewList.map((item, i) => {
      let obj = {
        viewList: item,
        flex: flexArr[i],
        data: childList[i]
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

  loadCompList(comps) {
    return this.compList(comps);
  }

  getViewClass(i, len) {
    return {
      droping: this.bgPositon === (i + 'out') || this.bgPositon === (String(i) + len)
    };
  }

  // 内部组件点击
  innerClick(i, j) {
    let source = this.pageData.compAttr.childList[i][j];
    let sourceParent = this.pageData.compAttr.childList[i];
    this.showControl('layout', source, sourceParent);
  }

  drop(e, i: number, j: number | string) {
    let animation = e.dataTransfer.getData('animation');
    if (animation === 'move') {
      let compInfo = e.dataTransfer.getData('compInfo');
      let info: any = JSON.parse(compInfo);
      let arr = this.pageData.compAttr.childList[i];
      arr.splice(j, 0, info);
      let source = this.pageData.compAttr.childList[i][j];
      let sourceParent = this.pageData.compAttr.childList[i];
      this.showControl('layout', source, sourceParent);
    }
  }

  dragover(e, i, j) {
    this.bgPositon = String(i) + j;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.bgPositon = '';
    }, 100);
  }

  handleChild(i, j, type) {
    if (j === 0 && type === 'up') {
      this.$message.warning('已经是最顶层啦!');
      return;
    }
    if (j === (this.pageData.compAttr.childList[0].length - 1) && type === 'down') {
      this.$message.warning('已经是最底层啦!');
      return;
    }
    if (i === 0 && type === 'left') {
      this.$message.warning('已经是最左边啦!');
      return;
    }
    if (i === (this.pageData.compAttr.childList.length - 1) && type === 'right') {
      this.$message.warning('已经是最右边啦!');
      return;
    }
    // 关闭显示
    this.$set(this.handleArr[i], j, false);
    // 处理数据
    let rowArr = this.pageData.compAttr.childList;
    let columnArr = rowArr[i];
    if (type === 'delete') {
      columnArr.splice(j, 1);
    } else if (type === 'up') {
      // 交换
      let newIndex = type === j - 1;
      let oldIndex = j;
      let oldVal = columnArr[oldIndex];
      // 删除老的节点
      columnArr.splice(oldIndex, 1);
      // 在列表中目标位置增加新的节点
      columnArr.splice(newIndex, 0, oldVal);
    } else if (type === 'down') {
      // 交换
      let newIndex = j + 1;
      let oldIndex = j;
      let oldVal = columnArr[oldIndex];
      // 删除老的节点
      columnArr.splice(oldIndex, 1);
      // 在列表中目标位置增加新的节点
      columnArr.splice(newIndex, 0, oldVal);
    } else if (type === 'left') {
      // 交换
      let newIndex = i - 1;
      let oldIndex = i;
      let oldVal = rowArr[oldIndex];
      // 删除老的节点
      rowArr.splice(oldIndex, 1);
      // 在列表中目标位置增加新的节点
      rowArr.splice(newIndex, 0, oldVal);
    } else if (type === 'right') {
      // 交换
      let newIndex = i + 1;
      let oldIndex = i;
      let oldVal = rowArr[oldIndex];
      // 删除老的节点
      rowArr.splice(oldIndex, 1);
      // 在列表中目标位置增加新的节点
      rowArr.splice(newIndex, 0, oldVal);
    }
  }

  // 鼠标右键
  contextmenu(i, j) {
    this.$set(this.handleArr[i], j, true);
  }
}
</script>
<style lang='less' scoped>
.layout {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.column {
  flex: 1;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  &.out-border {
    border: 1px dashed rgba(151, 151, 151, 1);
    &:nth-child(n + 1) {
      border-right: none;
    }
    &:last-child {
      border-right: 1px dashed rgba(151, 151, 151, 1);
    }
  }
  &.inner-border {
    border-right: 1px dashed rgba(151, 151, 151, 1);
    border-top: 1px dashed rgba(151, 151, 151, 1);
    border-bottom: 1px dashed rgba(151, 151, 151, 1);
    &:last-child {
      border-right: none;
    }
  }
  &.droping {
    background: #38c9a0;
    .layout-item {
      background: #ffffff;
    }
  }
  // &.bg-green {
  //   background: #38c9a0;
  // }
}
.handle-button {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
.layout-view {
  flex: 1;
  border: 1px dashed rgba(151, 151, 151, 1);
  overflow: auto;
  &.empty {
    padding-bottom: 20px;
  }
}
.tips {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.bg-green {
  background: #38c9a0;
}
.insert {
  position: relative;
  padding-top: 20px;
  &::after {
    content: "";
    width: 100%;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background: #38c9a0;
  }
}
.empty {
  height: 30px;
}

</style>

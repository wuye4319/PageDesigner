<template>
  <ul
    class="myTree"
    @drop.stop="dropComp($event,'',treeData)"
    @dragenter.prevent.stop="dragenter($event,'')"
    @dragover.prevent
  >
    <li
      v-for="(item,i) in treeData"
      :key="i + '-' + parseInt((Math.random()*10000).toFixed(0))"
      @drop.stop="dropComp($event,i,treeData,layoutComp)"
      @dragover.prevent
    >
      <span
        :draggable="draggable"
        @dragstart="dragstart($event,item)"
        @dragenter.prevent.stop="dragenter($event,item,i)"
        @dragend.prevent.stop="dragend(i,treeData,$event,item)"
        :class="itemClass(item)"
        @click.stop="handleChange(item,i,treeData)"
      >
        <span :class="item.compAttr?'element'+item.compAttr.uid:''">
          <i
            class="folderIcon"
            v-if="item.compAttr && (item.compAttr.childList || item.compAttr.tabs)"
          >
            <a-icon
              type="caret-right"
              v-if="!item.open"
              @click="handleFolder(item,true)"
            />
            <a-icon
              type="caret-down"
              v-else
              @click="handleFolder(item,false)"
            />
            <a-icon type="appstore"/>
          </i>
          <a-icon type="file" v-else/>
          {{ item.title }}
        </span>
        <span class="actions" v-if="!(initType && initType === 'common' && treeType === 'layout')">
          <template v-for="(act,j) in actions">
            <a-icon
              v-if="iconStatus(act,item)"
              :key="j"
              :type="act"
              :style="{'color': actionColor(item, act),'margin-left': j!= 0?'6px':'0'}"
              @click.stop="operateTree(act,item,i,treeData)"
            />
          </template>
        </span>
      </span>
      <!-- 渲染layout -->
      <ul v-if="item.compAttr && (item.compAttr.childList || item.compAttr.tabs) && item.open">
        <li
          v-for="(layout,h) in childList(item)"
          :key="h"
          @drop.stop="dropComp($event,'',layout,item)"
          @dragover.prevent
        >
          <span
            @dragenter.prevent.stop="dragenter($event,item,h,'layout')"
            :id="item.compAttr.uid + h"
            :class="enterIndex === (item.compAttr.uid + h)?'dragin layoutCell':'layoutCell'"
          >
            <i class="folderIcon">
              <a-icon
                type="caret-right"
                v-if="(item.compAttr.childListAttr && !item.compAttr.childListAttr[h].open) || (item.compAttr.tabs &&!item.compAttr.tabs[h].open)"
                @click="handleFolder(item.compAttr.childListAttr && item.compAttr.childListAttr[h] || (item.compAttr.tabs && item.compAttr.tabs[h]),true)"
              />
              <a-icon
                type="caret-down"
                v-else
                @click="handleFolder((item.compAttr.childListAttr && item.compAttr.childListAttr[h] || item.compAttr.tabs[h]),false)"
              />
              <a-icon type="appstore"/>
            </i>
            <span>{{ item.compAttr.tabs? layout.title + h: '布局格子' + h }}</span>
          </span>
          <my-tree
            v-show="item.compAttr.childListAttr && item.compAttr.childListAttr[h].open || item.compAttr.tabs && item.compAttr.tabs[h].open"
            :treeData="layout.content ? layout.content.compAttr.childList[0] : layout"
            :layoutComp="item"
            :change="change"
            :handleLayout="handleLayout"
            :actions="actions"
            :operateTree="operateTree"
            :drop="drop"
            :draggable="draggable"
            :treeType="'layout'"
            :initType="initType"
            :dropContainer="dropContainer"
            :selectedKey="selectedKey"
          ></my-tree>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { savePageActions } from '../../../service/index';
import { Icon } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'my-tree',
  components: {
    AIcon: Icon
  }
})
export default class MyTreeComponent extends Vue {
  @Prop() treeData;
  @Prop() layoutComp; // 追踪布局格子内子组件所在布局组件
  @Prop() initType;
  @Prop() treeType;
  @Prop() actions;
  @Prop() selectedKey;
  @Prop() change;
  @Prop() handleLayout;
  @Prop() drop;
  @Prop() operateTree;
  @Prop() draggable;
  @Prop() dropContainer;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  dropIndex: any = 0;
  dropParent: any = null;
  enterIndex: any = 0;
  selfDrag: any = false;
  dragElement: boolean = false;

  itemClass(item) {
    let className = 'nameItem';
    // 元素列表
    if (item.compAttr && item.compAttr.uid) {
      if (item.compAttr.uid === this.selectedKey) {
        className += ' active';
      }
      if (item.compAttr.uid === this.enterIndex) {
        className += ' dragin';
      }
    } else {
      // 页面列表
      if (item.key === this.selectedKey) {
        className += ' active';
      }
    }
    return className;
  }

  iconStatus(act, item) {
    if (act === 'retweet' && this.treeType === 'layout' && item.shared) {
      return false
    }
    return true;
  }

  childList(item) {
    return item.compAttr.childList || item.compAttr.tabs
  }

  actionColor(item, act) {
    if (item.shared && act === 'retweet') {
      if (item.compAttr.uid === this.selectedKey) {
        return 'white';
      }
      return '#17BC94';
    }
    return act === 'delete' ? 'red' : ''
  }

  handleChange(item, i, parent) {
    let page = this.$route.params.page;
    if (this.treeType === 'layout') {
      this.handleLayout && this.handleLayout(item, i, parent);
    } else if (this.initType === 'common') {
      this.change(item)
    } else if (this.treeType === 'pagelist') {
      this.change(item, i);
    } else {
      this.change(item, i, parent);
    }
  }
  handleFolder(item, type) {
    this.$set(item, 'open', type)
  }
  dragstart(e, item) {
    if (item.open) {
      item.open = false;
    }
    this.dragElement = true;
    delete item.sharePage;
    e.dataTransfer.setData('dragData', JSON.stringify(item));
  }
  dropComp(e, i, treeData, item?) {
    if (!e.dataTransfer.getData('dragData')) {
      return;
    }
    this.dropIndex = i === '' ? treeData.length : i;
    if (treeData.content) {
      this.drop(e, i, treeData.content.compAttr.childList[0], item)
      this.dropParent = treeData.content.compAttr.childList[0];
    } else {
      this.drop(e, i, treeData, item);
      this.dropParent = treeData;
    }
  }
  dragenter(e, item, i?, type?) {
    if (!this.dragElement) {
      return;
    }
    let uid = (item.compAttr && item.compAttr.uid) || '';
    this.enterIndex = type ? uid + i : uid;
  }
  dragend(i, parent, e, item) {
    let spliceIndex = i;
    if (this.dropParent === parent && this.dropIndex < i) {
      spliceIndex = i + 1;
    }
    if (this.dropParent || this.dropContainer) {
      parent.splice(spliceIndex, 1);
    }
    item.shared = false;
    this.$set(item, 'shared', false);
    this.enterIndex = '';
    this.$emit('setDropStatus', false);
    this.dragElement = false;
    this.dropParent = null;
  }
}
</script>

<style lang='less' scoped>
.myTree {
  margin-bottom: 0;
  // height: 100%;
  min-width: 100%;
  overflow-x: auto;
  li {
    cursor: pointer;
    text-align: left;
    padding: 3px 0 3px 12px;
  }
  .nameItem {
    border-radius: 2px;
    padding: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 12px;
    position: relative;
    transition: all 0.5;
    &:hover {
      background-color: rgba(23, 188, 148, 0.3);
    }
    &.active {
      background-color: rgb(23, 188, 148);
    }
    &.dragin {
      &:before {
        content: '';
        position: absolute;
        top: -4px;
        width: calc(100% - 12px);
        height: 2px;
        background-color: rgb(23, 188, 148);
      }
    }
  }
  .layoutCell {
    &.dragin {
      background-color: rgba(23, 188, 147, 0.4);
    }
  }
}
</style>

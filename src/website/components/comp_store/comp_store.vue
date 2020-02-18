<template>
  <div class="complist">
    <a-radio-group
      @change="onChange"
      v-model="compType"
      style="margin: 10px 0">
      <a-radio-button value="system">系统组件</a-radio-button>
      <a-radio-button value="custom">自定义组件</a-radio-button>
    </a-radio-group>
    <a-collapse v-model="activeKey">
      <a-collapse-panel
        v-for="(item,c) in classifyComp"
        :key="c"
        :header="item.title"
        :disabled="!item.data.length">
        <div class="details">
          <a-popover
            placement="bottomRight"
            :mouseEnterDelay="1"
            v-for="(base,i) of item.data"
            :key="i">
            <template slot="content" width="200px">
              <div class="imgBox" style="width: 154px;height: 128px;display: flex;justify-content: center;align-items: center;">
                <img
                  @click="addComp(base)"
                  :src="getImg(base)"
                  width="100%" />
              </div>
            </template>
            <span slot="title">{{ base.title }}</span>
            <a-button
              class="compItem"
              :class="{customer: item.title === '自定义组件'}"
              type="dashed"
              :icon="base.icon ? base.icon : 'user'"
              draggable
              @dragstart="dragstart($event,base)"
              @dragend="dragend"
              @click="addComp(base)">{{ base.title }}</a-button>
          </a-popover>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Collapse, Popover, Button, Radio } from 'ant-design-vue';
import { genID } from '@/common/utils/math'; // 创建唯一id
// import defaultImg from "/static/images/default.png";
import { baseUrl } from '@/common/config/env';

const webSite = namespace('webSite');
const defaultImg = require('../../../../static/images/img.png');

interface ComponentVal {
  type?: string;
  compName?: string;
  compAttr?: object;
  [propName: string]: any;
}

@Component({
  name: 'comp-store-component',
  components: {
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
    APopover: Popover,
    AButton: Button,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button
  }
})
export default class compStoreComponent extends Vue {
  @Prop() compData: Array<object>;

  @webSite.Mutation('addPageInfor')
  addPageInfor: any;

  @webSite.State('Global')
  global;

  @webSite.Mutation('tempAppData')
  setTempAppData; // 设置临时变量

  defaultImg = defaultImg;
  activeKey: string[] = ['base', 'layout'];
  baseUrl = baseUrl;
  compType: string = 'system'

  get classifyComp() {
    let obj:any = {
      layout: { title: '布局组件', data: [] },
      base: { title: '基础组件', data: [] },
      navi: { title: '导航组件', data: [] },
      form: { title: '表单组件', data: [] },
      data: { title: '数据展示', data: [] },
      back: { title: '反馈', data: [] },
      others: { title: '其他', data: [] },
      business: { title: '扩展组件', data: [] },
      cloudpivot: { title: '云枢组件', data: [] }
      // custom: { title: '自定义组件', data: [] }
    };
    if (this.compType === 'custom') {
      obj = {
        custom: { title: '自定义组件', data: [] }
      }
    }

    let compData = this.compData;
    compData &&
      compData.length &&
      compData.forEach((item: ComponentVal) => {
        if (item.compAttr['display'] !== 'hide' && obj[item.type]) {
          obj[item.type].data.push(item);
        }
      });
    return obj;
  }

  getImg(comp) {
    if (!comp.compImg) {
      return this.defaultImg;
    } else {
      if (comp.type !== 'custom') {
        return require(`../../../../static/images/${comp.compImg}.png`)
      } else {
        return baseUrl + comp.compImg;
      }
    }
  }

  created() {}

  mounted() {}

  onChange() {}

  addComp(comp: any) {
    let copyComp = JSON.parse(JSON.stringify(comp));
    let uid = genID();
    copyComp.compAttr['uid'] = copyComp.compAttr['uid']
      ? copyComp.compAttr['uid']
      : `${uid}`;
    this.addPageInfor(copyComp);
    this.$emit('addPageComp');
    if (comp.compName === 'bottomNav') {
      this.global.paddingBottom = true;
      // document.querySelector('.flip-list').setAttribute('class', 'flip-list bottomPadding')
    }
  }

  imgError(e) {
    let target = e.target || {};
    target.src = require('../../../../static/images/img.png');
    target.onerror = null;
  }

  dragstart(e, info) {
    let copyComp = JSON.parse(JSON.stringify(info));
    let uid = genID();
    copyComp.compAttr['uid'] = copyComp.compAttr['uid']
      ? copyComp.compAttr['uid']
      : `${uid}`;
    let compInfo = JSON.stringify(copyComp);
    e.dataTransfer.setData('compInfo', compInfo);
    e.dataTransfer.setData('animation', 'move');
    // 拖拽组件uid
    this.setTempAppData({
      key: 'dragStartUid',
      value: uid
    })
    this.$emit('moveDragstart');
  }
  dragend(event) {
    // 拖拽组件uid
    this.setTempAppData({
      key: 'dragStartUid',
      value: ''
    })
    event.dataTransfer.clearData();
    this.$emit('moveDragend');
  }
}
</script>
<style lang='less' scoped>
.details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .compItem {
    padding: 0;
    padding-left: 8px;
    width: 98px;
    height: 30px;
    margin-top: 8px;
    text-align: left;
    background: rgba(0, 0, 0, 0.02);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:nth-child(-n + 2) {
      margin-top: 0;
    }
    &.customer {
      width: 100%;
      &:nth-child(2) {
        margin-top: 8px;
      }
    }
  }
}
.description {
  margin-bottom: 10px;
}
.list {
  border-bottom: 1px solid #d9d9d9;
  margin-top: 20px;
  &:last-of-type {
    border: none;
  }
}
.complist {
  // background: rgba(255, 255, 255, 1);
  // border-radius: 4px;
  // flex: 1;
  // overflow: auto;
  .imgBox {
    width: 154px;
    height: 128px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/.ant-collapse {
    border: 0;
  }
  /deep/.ant-collapse-item {
    border: 0;
  }
  /deep/.ant-collapse-content {
    border: 0;
  }
  /deep/.ant-collapse-content-box {
    padding: 8px;
  }
}
/deep/.ant-collapse-header {
  text-align: left;
  font-size: 12px;
  border: 0;
}
</style>

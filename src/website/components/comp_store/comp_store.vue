<template>
  <div class="complist">
    <a-collapse v-model="activeKey">
      <a-collapse-panel
        v-for="(item,c) in classifyComp"
        :key="c"
        :header="item.title"
        :disabled="!item.data.length"
      >
        <div class="details">
          <a-popover
            placement="bottomRight"
            :mouseEnterDelay="1"
            v-for="(base,i) of item.data"
            :key="i"
          >
            <template slot="content" width="200px">
              <div
                class="imgBox"
                style="width: 154px;height: 128px;display: flex;justify-content: center;align-items: center;"
              >
                <img
                  @click="addComp(base)"
                  :src="base.compImg?require('../../../../static/images/' + base.compImg + '.png') : defaultImg"
                  width="100%"
                />
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
              @click="addComp(base)"
            >{{ base.title }}</a-button>
          </a-popover>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Collapse } from 'ant-design-vue';
// import defaultImg from "/static/images/default.png";

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
  components: {}
})
export default class compStoreComponent extends Vue {
  @Prop() compData: Array<object>;

  @webSite.Mutation('addPageInfor')
  addPageInfor: any;

  defaultImg = defaultImg;
  activeKey: string[] = ['base', 'layout']

  get classifyComp() {
    let obj = {
      base: { title: '基础组件', data: [] },
      layout: { title: '功能组件', data: [] },
      business: { title: '扩展组件', data: [] },
      custom: { title: '自定义组件', data: [] }
    };

    let compData = this.compData;
    compData && compData.length && compData.forEach((item: ComponentVal) => {
      if (item.compAttr['display'] !== 'hide') {
        obj[item.type].data.push(item);
      }
    });
    return obj;
  }

  created() {}

  mounted() {}

  addComp(comp: any) {
    let copyComp = JSON.parse(JSON.stringify(comp))
    this.addPageInfor(copyComp);
    this.$emit('addPageComp')
    if (comp.compName === 'bottomNav') {
      document.querySelector('.flip-list').setAttribute('class', 'flip-list bottomPadding')
    }
  }

  imgError(e) {
    let target = e.target || {};
    target.src = require('../../../../static/images/img.png');
    target.onerror = null;
  }

  dragstart(e, info) {
    let compInfo = JSON.stringify(info);
    e.dataTransfer.setData('compInfo', compInfo);
    e.dataTransfer.setData('animation', 'move');
  }
  dragend(event) {
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
    width:98px;
    height:30px;
    margin-top: 8px;
    text-align: left;
    background:rgba(0,0,0,0.02);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:nth-child(-n+2) {
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
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  flex: 1;
  overflow: auto;
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

<template>
  <div
    class="collapse"
    v-if="listData.length > 0"
    :class="{'arrow-right': pageData.arrow}"
  >
    <a-collapse
      v-model="activeKey"
      :bordered="bordered"
      :accordion="!pageData.accordion"
    >
      <a-collapse-panel
        v-for="(item,i) of listData"
        :header="item.title"
        :key="i.toString()"
        :style="customStyle"
        :showArrow="pageData.showArrow"
      >
        {{ item.cont }}
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import databind from '@/common/mixin/databind.ts';
import { Collapse } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'collapse-view',
  components: {
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel
  },
  mixins: [databind]
})
export default class CollapseView extends Vue {
  @Prop() compData: any;

  pageData: any = this.compData.compAttr;
  activeKey: string[] = [];
  defaultData = [
    {
      title: 'Ant Design Title 1',
      cont: 'Ant Design Description 1'
    },
    {
      title: 'Ant Design Title 2',
      cont: 'Ant Design Description 2'
    },
    {
      title: 'Ant Design Title 3',
      cont: 'Ant Design Description 3'
    }
  ];

  get bordered() {
    let bordered = this.pageData.style === 'one';
    return bordered;
  }

  get customStyle() {
    let style = '';
    if (this.pageData.style === 'three') {
      style =
        'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
    }
    return style;
  }

  created(): void {}
}
</script>

<style lang="less" scoped>
.collapse {
  text-align: left;
  &.arrow-right {
    /deep/ .ant-collapse .ant-collapse-item .ant-collapse-header .anticon {
      left: initial;
      right: 16px;
    }
  }
}
</style>

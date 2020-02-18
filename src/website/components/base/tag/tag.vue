<template>
  <div class="tag" :style="{'flex-direction': pageData.rank}">
    <div class="tag-list">
      <template v-for="(tag) in tags">
        <!-- 字符长度较长时隐藏 -->
        <a-tooltip
          v-if="tag.length > 20"
          :key="tag"
          :title="tag">
          <a-tag
            :key="tag"
            :color="color"
            :closable="pageData.closable"
            :visible="pageData.visible"
            :style="{'max-width': pageData.maxWidth}"
            @close="handleClose(tag)">
            {{ `${tag.slice(0, 20)}...` }}
          </a-tag>
        </a-tooltip>
        <a-tag
          v-else
          :key="tag"
          :color="color"
          :closable="pageData.closable"
          :visible="pageData.visible"
          :style="{'max-width': pageData.maxWidth}"
          @close="handleClose(tag)">
          {{ tag }}
        </a-tag>
      </template>
      <a-input
        v-if="inputVisible"
        ref="input"
        type="text"
        size="small"
        :style="{ width: '78px','max-width': pageData.maxWidth }"
        :value="inputValue"
        @change="handleInputChange"
        @blur="handleInputConfirm"
        @keyup.enter="handleInputConfirm"
      />
      <a-tag
        v-else
        @click="showInput"
        style="background: #fff; borderStyle: dashed;">
        <a-icon type="plus" /> New Tag
      </a-tag>
    </div>
    <!-- 描述信息 -->
    <div class="desc">
      {{pageData.desc}}
    </div>
    <div class="tips" v-if="pageData.required && tags.length === 0">
      请至少填写一个标签
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Tooltip, Tag, Input, Icon } from 'ant-design-vue';

const webSite = namespace('webSite');

@Component({
  name: 'tag-view',
  components: {
    ATooltip: Tooltip,
    ATag: Tag,
    AInput: Input,
    AIcon: Icon
  }
})

export default class TagView extends Vue {
  @Prop() compData: any
  @Prop() trigFunc: any;

  pageData:any = this.compData.compAttr
  tags:string[] = ['Unremovable', 'Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3']
  inputVisible:boolean = false
  inputValue:string = ''

  get color() { // 颜色
    let color = '';
    if (this.pageData.color !== '#FAFAFA') {
      color = this.pageData.color
    }
    return color
  }

  created():void {
    this.tags = this.pageData.tags;
  }

  // 关闭
  handleClose(removedTag) {
    if(this.pageData.visible) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      this.tags = tags;
      this.pageData.tags = this.tags;
      // 值变化触发事件
      this.trigFunc('change', this.compData.actionModel);
    }
  }

  // 展示输入框
  showInput() {
    this.inputVisible = true;
    this.$nextTick(function() {
      let input:any = this.$refs.input;
      input.focus()
    });
  }

  // 输入框值改变
  handleInputChange(e) {
    this.inputValue = e.target.value;
  }

  // 输入框确认
  handleInputConfirm() {
    const inputValue = this.inputValue;
    let tags = this.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    Object.assign(this, {
      tags,
      inputVisible: false,
      inputValue: '',
    });
    this.pageData.tags = this.tags;
    // 值变化触发事件
    this.trigFunc('change', this.compData.actionModel);
  }

  // 获取值
  getValue() {
    return this.tags
  }

  // 设置值
  setValue(tags) {
    this.tags = tags;
    this.pageData.tags = this.tags;
    // 值变化触发事件
    this.trigFunc('change', this.compData.actionModel);
  }

}
</script>

<style lang="less" scoped>
.tag-list {
  display: flex;
  justify-content: center;
  align-items: center;
}
.desc {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
.tips {
  color: #f5222d;
  font-size: 14px;
}
</style>

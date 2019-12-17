<template>
  <div class="tag">
    <template v-for="(tag) in tags">
      <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
        <a-tag :key="tag" :color="color" closable :afterClose="() => handleClose(tag)">
          {{`${tag.slice(0, 20)}...`}}
        </a-tag>
      </a-tooltip>
      <a-tag v-else  :key="tag" :color="color" closable :afterClose="() => handleClose(tag)">
        {{tag}}
      </a-tag>
    </template>
    <a-input
      v-if="inputVisible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'tag-view'
})

export default class TagView extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr
  tags:string[] = ['Unremovable', 'Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3']
  inputVisible:boolean = false
  inputValue:string = ''

  get color() {
    let color = '';
    if (this.pageData.color !== '#FAFAFA') {
      color = this.pageData.color
    }
    return color
  }

  created():void {
    this.tags = this.pageData.tags;
  }

  handleClose(removedTag) {
    const tags = this.tags.filter(tag => tag !== removedTag);
    this.tags = tags;
    this.pageData.tags = this.tags;
  }

  showInput() {
    this.inputVisible = true;
    this.$nextTick(function() {
      let input:any = this.$refs.input;
      input.focus()
    });
  }

  handleInputChange(e) {
    this.inputValue = e.target.value;
  }

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
  }
}
</script>

<style lang="less" scoped>

</style>

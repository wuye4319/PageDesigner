<template>
  <div class="compAttr input-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">路径:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入图片路径"
          v-model="src"
          @blur="changeVal('src')"
          @change="handleInput"
        >
          <a-upload
            slot="addonAfter"
            :showUploadList="false"
            :action="baseUrl + '/file/imgfile/' + userID"
            @change="handleChange"
          >
            <a-icon type="upload" style="cursor: pointer"/>
          </a-upload>
        </a-input>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">替代文本:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入替代文本"
          v-model="alt"
          @blur="changeVal('alt')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">线型:</div>
        </a-list-item-meta>
        <a-select
          v-model="borderStyle"
          @change="changeVal('borderStyle')"
          style="width: 100%"
        >
          <a-select-option value="none">无</a-select-option>
          <a-select-option value="solid"><a-icon type="minus"/></a-select-option>
          <a-select-option value="dashed"><a-icon type="dash"/></a-select-option>
          <a-select-option value="dotted"><a-icon type="small-dash"/></a-select-option>
        </a-select>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">颜色:</div>
        </a-list-item-meta>
        <color-picker v-model="compAttr.borderColor"/>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">圆角:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入边框圆角"
          v-model="borderRadius"
          @blur="changeVal('borderRadius')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">api事件:</div>
        </a-list-item-meta>
        <ul>
          <li><div>click()</div></li>
          <li><div>getImgSrc()</div></li>
          <li><div>setImgSrc(src)</div></li>
        </ul>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Upload, Icon, Button, Select } from 'ant-design-vue';
import { baseUrl } from '@/common/config/env';
import BaseAttr from '../../../common/base-common.vue';
import Tools from '@/common/utils/tools';
import { colorPicker } from '@/website/components/common';
const webSite = namespace('webSite');

const utils = new Tools();

@Component({
  name: 'active-component',
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    aUpload: Upload,
    aIcon: Icon,
    aButton: Button,
    colorPicker,
    BaseAttr
  }
})
export default class activeComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: number;
  compAttr: any = this.compData.compAttr;
  // 组件属性
  src: string = '';
  alt: string = '';
  borderRadius: string = '';
  borderStyle: string = 'none';
  borderCcolor: string = '#333';
  userID: string = '';
  fileList: any = [];
  baseUrl = baseUrl;
  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    this.userID = utils.getCookie('userID');
    for (let key of Object.keys(this.compAttr)) {
      this[key] = this.compAttr[key] || '';
    }
  }

  changeVal(name) {
    this.$set(this.compAttr, name, this[name])
  }

  handleInput() {
    this.fileList = [];
  }

  handleChange(file) {
    console.log(file)
    if (file.file.status === 'done') {
      this.fileList = file.fileList;
      this.compAttr.src = this.fileList[0] && this.fileList[0].response.data.fileUrl;
      this.src = this.fileList[0] && this.fileList[0].response.data.fileUrl;
    }
  }
}
</script>

<style lang="less" scoped>
.input-component {
  .radio-group {
    display: flex;
    flex-direction: row;
  }
}
.compAttr {
  font-size: 12px;
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.8;
    justify-content: flex-start;
    text-align: left;
  }
}
</style>

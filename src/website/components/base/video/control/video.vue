<template>
  <div class="compAttr input-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">视频地址:</div>
        </a-list-item-meta>
        <a-input
          placeholder="请输入视频地址"
          v-model="src"
          @blur="changeVal('src')"
          @change="handleInput"
        >
          <a-upload
            slot="addonAfter"
            :showUploadList="false"
            :action="baseUrl + '/file/videofile/' + userID"
            @change="handleChange"
          >
            <a-icon type="upload" style="cursor: pointer" />
          </a-upload>
        </a-input>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">自动播放:</div>
        </a-list-item-meta>
        <a-switch v-model="autoPlay" @change="changeVal('autoPlay')" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">循环播放:</div>
        </a-list-item-meta>
        <a-switch v-model="loop" @change="changeVal('loop')" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">预加载:</div>
        </a-list-item-meta>
        <a-switch v-model="preload" @change="changeVal('preload')" />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">线型:</div>
        </a-list-item-meta>
        <a-select
          v-model="borderStyle"
          @change="changeVal('borderStyle')"
          style="width: 100%">
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
        <color-picker v-model="compAttr.borderColor" />
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
          <li><div>getSrc()</div></li>
          <li><div>setSrc(src)</div></li>
          <li><div>play()</div></li>
          <li><div>pause()</div></li>
        </ul>

      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Upload, Select, Switch, Icon } from 'ant-design-vue';
import { colorPicker } from '@/website/components/common';
import { baseUrl } from '@/common/config/env';
import Tools from '@/common/utils/tools';
const webSite = namespace('webSite');
const utils = new Tools();

@Component({
  name: 'active-component',
  components: {
    colorPicker,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    AUpload: Upload,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea,
    ASwitch: Switch,
    AIcon: Icon
  }
})
export default class activeComponent extends Vue {
  @Prop() compData: any;

  compAttr: any = this.compData.compAttr;

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  src: string = '';
  autoPlay: boolean = false;
  loop: boolean = false;
  preload: boolean = false;
  borderStyle: string = 'none';
  borderRadius: string = '';
  borderColor: string = '#333';
  baseUrl = baseUrl;
  userID = '';
  created(): void {
    this.userID = utils.getCookie('userID');
    let keys = Object.keys(this.compAttr);
    for (let key of keys) {
      this[key] = this.compAttr[key];
    }
  }

  changeVal(name) {
    this.$set(this.compAttr, name, this[name])
  }

  handleInput() {

  }
  handleChange(info) {
    if (info.file.status === 'done') {
      this.compAttr.src = info.file.response.data.fileUrl;
      this.src = info.file.response.data.fileUrl;
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
  padding: 0 8px;
  /deep/.ant-list-item-content {
    flex: 1.5;
    justify-content: flex-start;
  }
}
</style>

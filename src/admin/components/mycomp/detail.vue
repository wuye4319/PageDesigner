<template>
  <div style="{height: 100%}" class="compDesc">
    <div class="header">
      <div class="backBox">
        <a-button
          type="primary"
          size="small"
          @click="backToComp"
        >
          <a-icon type="left"/>
        </a-button>
      </div>
      <div class="operateButton">
        <a-button
          v-if="!isEdit && from === 'mine' || !isEdit && from === 'default' && userType === 'manager'"
          @click="handleEdit(true)"
          type="primary"
        >编辑</a-button>
        <a-button v-if="isEdit" @click="handleEdit(false)">取消</a-button>
        <a-button
          v-if="isEdit"
          @click="handleSave"
          type="primary"
        >保存</a-button>
      </div>
    </div>
    <div>
      <h2>{{ compDetail.compName }}</h2>
      <h2 v-if="!isEdit">{{ title }}</h2>
      <div class="lable">
        <label v-if="isEdit">
          标题：
          <a-input
            v-if="isEdit"
            type="text"
            :defaultValue="compDetail.title"
            v-model="title"
          />
        </label>
      </div>
      <p v-if="!isEdit">{{ description }}</p>
      <div class="lable">
        <label v-if="isEdit">
          描述：
          <a-textarea
            v-if="isEdit"
            type="text"
            :defaultValue="compDetail.description"
            v-model="description"
            :rows="3"
          ></a-textarea>
        </label>
      </div>
    </div>
    <div class="markDownEditor" v-if="isEdit">
      <label v-if="isEdit">
        组件使用说明(支持markdown语法)：
        <Editor
          editorHeight="calc(100vh - 420px)"
          :language="'markdown'"
          :codes="markdown"
          @onCodeChange="textChange"
        />
      </label>
    </div>
    <div
      class="markDownShown"
      v-if="!isEdit"
      v-html="htmlelement"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import showDown from 'showdown';
import { editComp, getCompDetail } from '../../service/index';
import Editor from '../common/editor';
import Tools from '@/common/utils/tools';
import { Icon, Button, Input } from 'ant-design-vue'

const utils = new Tools();
@Component({
  name: 'detail-modal',
  components: {
    Editor,
    aButton: Button,
    aIcon: Icon,
    aInput: Input,
    aTextarea: Input.TextArea
  }
})
export default class detailModal extends Vue {
  $route;
  $router;
  $message;
  convertor: any;
  isEdit: boolean = false;
  description: string = '';
  markdown: string = ' ';
  htmlelement: any = '<div></div>';
  title: string = '组件名称';
  compDetail:any = {};
  from: string = '';
  userType: string = '';

  beforeCreate() {
    // markdown解释器
    this.convertor = new showDown.Converter({
      tables: true,
      parseImgDimensions: true,
      simplifiedAutoLink: true
    });
  }

  activated() {
    let compID = this.$route.query.id;
    let from = this.$route.query.from;
    this.from = from;
    this.userType = utils.getCookie('userType');
    getCompDetail(compID).then((res: any) => {
      this.compDetail = res;
      this.markdown = this.compDetail.useInfo || '';
      this.description = this.compDetail.description || '';
      this.title = this.compDetail.title || '';
      this.htmlelement = this.convertor.makeHtml(this.markdown);
    });
  }

  textChange(text, event) {
    this.markdown = text;
  }

  backToComp() {
    this.$router.back();
    this.isEdit = false;
  }

  handleEdit(bool) {
    this.isEdit = bool;
    if (!bool) {
      this.markdown = this.compDetail.useInfo || '';
      this.description = this.compDetail.description || '';
    }
  }

  handleChange(e) {
    let value = e.target.value;
    this.markdown = value;
  }

  async handleSave() {
    let compID = this.$route.query.id;
    let userID = utils.getCookie('userID');
    let res = await editComp('0', {
      title: this.title,
      description: this.description,
      useInfo: this.markdown,
      compID: compID,
      type: this.compDetail.type
    });
    if (res.data && res.data.status === 200) {
      this.isEdit = false;
      this.htmlelement = this.convertor.makeHtml(this.markdown);
      this.$message.success('保存成功！');
    } else {
      this.$message.error('保存失败，请重试！');
    }
  }
}
</script>

<style lang='less' scoped>
.compDesc {
  h1 {
    font-size: 22px;
  }
  h2 {
    font-size: 20px;
  }
  h3 {
    font-size: 18px;
  }
  h4 {
    font-size: 16px;
  }
  h5 {
    font-size: 14px;
  }
blockquote{
  border-left: 6px solid #e6e6e6;
  background: #fafafa;
}
code{
  background: #f2f2f2;
}
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
  .operateButton {
    button {
      margin-left: 10px;
    }
  }
}
  .label {
    margin-bottom: 12px;
  }
  .markDownEditor{
    margin-top: 12px;
  }
</style>

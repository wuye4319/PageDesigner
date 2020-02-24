<template>
  <div class="customer-comp-modal">
    <a-modal
      class="uploadModal"
      :title="type === 'add'? '新增组件' : '编辑组件'"
      :visible="visible"
      @cancel="handleCancle"
      :closable="true"
      :footer="null"
      :confirmLoading="confirmLoading"
      :bodyStyle="bodyStyle"
      width="1000px"
      :destroyOnClose="true">
      <a-form :form="form" @submit="handleSubmit">
        <p style="margin-bottom: 8px;">组件基本信息：</p>
        <a-form-item
          label="名称(name)"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-input
            placeholder="请输入组件英文名称"
            :disabled="type === 'edit'"
            v-decorator="[
              'compName',
              {
                rules: [{ required: true, message: '改英文名用来创建目录时使用' },
                        {validator: validateCompName}
                ],
                initialValue: ''
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="标题(title)"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-input
            placeholder="请输入组件标题"
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: '改中文名用来创建标题时使用' },
                { validator: validateCompTitle}],
                initialValue: ''
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="支持终端"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-checkbox-group
            v-decorator="[
              'suportPort',
              {
                rules: [{ required: true, message: '请选择支持终端!'  }]
              }
            ]">
            <a-checkbox value="mobile">移动端</a-checkbox>
            <a-checkbox value="desktop">PC端</a-checkbox>
          </a-checkbox-group>
          <a-tooltip placement="top">
            <template slot="title">
              <span>选择一个则支持相应类型的页面,只在对应页面中才能选择操作,同时选择则支持两种页面类型。</span>
            </template>
            <a-icon style="color: red;margin-left: 40px" type="question" />
          </a-tooltip>
        </a-form-item>
        <a-form-item
          label="描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-textarea
            placeholder="请输入组件描述"
            :autosize="{ minRows: 2, maxRows: 2 }"
            v-decorator="[
              'description',
              {
                rules: [{ message: '请输入组件描述!' }],
                initialValue: ''
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="缩略图"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-upload
            :action="baseUrl + '/upload/imgfile/' + userID"
            listType="picture"
            v-decorator="['imgFile',
                          {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                            rules: [{ required: true, message: '支持png, jpg格式，图片尺寸300*400' }]
                          },]"
            @change="handleImgChange">
            <a-button v-if="imgFiles.length < 1">
              <a-icon type="upload" />upload
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="组件文件"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-upload
            :action="baseUrl + '/upload/upload/' + userID"
            listType="picture"
            v-decorator="['vuefile',
                          {
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                            rules: [{ required: true, message: '请上传组件文件!' }]
                          }]">
            <a-button v-if="fileList.length < 1">
              <a-icon type="upload" />upload
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="控制器文件"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-upload
            :action="baseUrl + '/upload/ctrl/' + userID"
            listType="picture"
            v-decorator="['ctrlfile',
                          {valuePropName: 'fileList',
                           getValueFromEvent: normFile}
            ]">
            <a-button v-if="ctrlfiles.length < 1">
              <a-icon type="upload" />upload
            </a-button>
          </a-upload>
        </a-form-item>

        <!-- 属性 -->
        <p style="margin-bottom: 8px;">组件属性（请输入json格式的数据）：</p>
        <a-form-item
          label="默认属性"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-textarea
            placeholder="默认属性"
            :row="6"
            style="height: 200px"
            v-decorator="[
              'compAttr',
              {
                initialValue: '{}'
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="盒模型开关"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-switch
            v-decorator="[
              'boxSwitch',
              {
                valuePropName: 'checked',
                initialValue: false
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="盒模型"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
          v-show="form.getFieldValue('boxSwitch')">
          <a-textarea
            placeholder="盒模型"
            :row="6"
            style="height: 200px"
            v-decorator="[
              'boxOptions',
              {
                initialValue: JSON.stringify(boxOptions)
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="数据绑定开关"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-switch
            v-decorator="[
              'dataSwitch',
              {
                valuePropName: 'checked',
                initialValue: false
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="数据绑定"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
          v-show="form.getFieldValue('dataSwitch')">
          <a-textarea
            placeholder="数据绑定"
            :row="6"
            style="height: 200px"
            v-decorator="[
              'dataModel',
              {
                initialValue: '{}'
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="事件模型开关"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <a-switch
            v-decorator="[
              'actionSwitch',
              {
                valuePropName: 'checked',
                initialValue: false
              }
            ]" />
        </a-form-item>
        <a-form-item
          label="事件模型"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
          v-show="form.getFieldValue('actionSwitch')">
          <a-textarea
            placeholder="事件模型"
            :row="6"
            style="height: 200px"
            v-decorator="[
              'actionModel',
              {
                initialValue: '{}'
              }
            ]" />
        </a-form-item>

        <!-- 说明文档 -->
        <p style="margin-bottom: 8px;">说明文档(支持markdown语法)：</p>
        <a-form-item
          label="说明文档"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }">
          <Editor
            v-if="editorShow"
            editorHeight="calc(100vh - 420px)"
            :language="'markdown'"
            @onCodeChange="textChange"
            :codes="markdown" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 18, offset: 5 }">
          <a-button type="primary" html-type="submit">确认</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Emit,
  Provide,
  Inject,
  Model
} from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import {
  Upload,
  Form,
  Input,
  Modal,
  Button,
  Icon,
  Switch,
  Checkbox,
  Tooltip
} from 'ant-design-vue';
import { saveComp, editComp } from '../../service/index';
import { baseUrl } from '@/common/config/env';
import Tools from '../../../common/utils/tools';
import Editor from './editor'; // markdown

const utils = new Tools();

const boxOptions = {
  width: '100%',
  height: 'auto',
  paddingTop: '0',
  paddingLeft: '0',
  paddingRight: '0',
  paddingBottom: '0',
  borderTopWidth: '0',
  borderLeftWidth: '0',
  borderRightWidth: '0',
  borderBottomWidth: '0',
  marginTop: '0',
  marginLeft: '0',
  marginRight: '0',
  marginBottom: '0'
};

@Component({
  name: 'customer-comp-modal',
  components: {
    aModal: Modal,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aIcon: Icon,
    aTextarea: Input.TextArea,
    aUpload: Upload,
    aSwitch: Switch,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    aTooltip: Tooltip,
    Editor
  }
})
export default class CustomerCompModal extends Vue {
  @Prop({ type: Boolean, default: false }) visible; // 弹框显隐
  @Prop() closeModal; // 关闭弹框方法
  @Prop() getCompStore; // 获取组件列表方法
  @Prop({ type: String, default: 'add' }) type; // 类型（新增，编辑）
  @Prop() editCompAttr; // 编辑属性

  $form;
  $message;
  fileList: any = [];
  imgFiles: any = [];
  ctrlfiles: any = [];
  form: any;
  confirmLoading: boolean = false;
  baseUrl = baseUrl;
  suportPort: any = [];
  userID: string = '';
  bodyStyle: object = {
    // Modal body 样式
    height: '700px',
    overflow: 'auto'
  };
  boxOptions: object = boxOptions;
  markdown: any = null;
  editorShow: boolean = false;

  beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  mounted() {
    this.$nextTick(() => {
      if (this.type === 'edit') {
        let editCompAttr = this.editCompAttr;
        let obj = {
          compName: editCompAttr.compName,
          title: editCompAttr.title,
          description: editCompAttr.description,
          compAttr: editCompAttr.compAttr,
          dataSwitch: editCompAttr.dataModelSwitch === 1,
          dataModel: editCompAttr.dataModel,
          actionSwitch: editCompAttr.actionModelSwitch === 1,
          actionModel: editCompAttr.actionModel,
          boxSwitch: editCompAttr.boxSwitch === 1,
          boxOptions: editCompAttr.boxOptions,
          suportPort: editCompAttr.isMobile === 2 ? ['mobile', 'desktop'] : editCompAttr.isMobile === 1 ? ['mobile'] : ['desktop']
        };
        this.markdown = editCompAttr.useInfo;
        this.form.setFieldsValue(obj);
      }
    });
    this.userID = utils.getCookie('userID');
    this.editorShow = true;
  }

  activated() {
    this.userID = utils.getCookie('userID');
    console.log(this.userID);
  }

  handleCancle() {
    this.closeModal();
    this.form.resetFields();
    this.fileList = [];
    this.imgFiles = [];
    this.ctrlfiles = [];
  }
  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  // 上传图片
  handleImgChange(file) {
    this.imgFiles = file.fileList;
  }

  async handleSubmit(e) {
    e.preventDefault();
    let userID = utils.getCookie('userID');
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let data = {
          compName: values.compName,
          type: 'custom',
          title: values.title,
          description: values.description,
          compAttr: this.judgeJSON(values.compAttr),
          dataSwitch: values.dataModelSwitch ? 1 : 0,
          dataModel: this.judgeJSON(values.dataModel),
          actionSwitch: values.actionModelSwitch ? 1 : 0,
          actionModel: this.judgeJSON(values.actionModel),
          boxSwitch: values.boxSwitch ? 1 : 0,
          boxOptions: this.judgeJSON(values.boxOptions),
          useInfo: this.markdown,
          compImg: this.imgFiles[0] && this.imgFiles[0].response.data.fileUrl,
          isMobile: values.suportPort.length === 2 ? 2 : values.suportPort[0] === 'mobile' ? 1 : 0
        };
        let res;
        let msg;
        if (this.type === 'add') {
          res = await saveComp(userID, data);
          msg = '新增';
        } else if (this.type === 'edit') {
          data['compID'] = this.editCompAttr.compID;
          res = await editComp(userID, data);
          msg = '编辑';
        }
        if (
          res &&
          res.data &&
          res.data.status === 200 &&
          res.data.msg === 'success'
        ) {
          this.$message.success(`${msg}成功！`);
          this.handleCancle();
          this.getCompStore(userID, { type: 'custom', compName: '' });
        } else {
          this.$message.info(`${msg}失败！`);
        }
      }
    });
  }

  // 能否正确转换JSON
  isJSON(str) {
    if (typeof str === 'string') {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  // 判断JSON后提示
  judgeJSON(str) {
    if (this.isJSON(str)) {
      return str;
    } else {
      this.$message.error('请输入正确的json格式数据');
    }
  }

  textChange(text, event) {
    this.markdown = text;
  }

  // 校验组件名称
  validateCompName(rule, value, cbfn) {
    const form = this.form;
    if (value) {
      let reg = /[a-zA-Z]$/g;
      let res = reg.test(value);
      if (!res) {
        cbfn('改英文名用来创建目录时使用');
      }
      cbfn();
    }
    cbfn();
  }

  // 校验组件标题
  validateCompTitle(rule, value, cbfn) {
    const form = this.form;
    if (value) {
      let reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
      let res = reg.test(value);
      if (res) {
        cbfn('只能输入中文、英文和数字');
      }
      cbfn();
    }
    cbfn();
  }
}
</script>

<style lang='less' scoped>
.my-upload {
  width: 100%;
  height: 128px;
  border: 1px dashed #d9d9d9;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;

  .icon-upload {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>

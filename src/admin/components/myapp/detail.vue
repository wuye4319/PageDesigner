<template>
  <div style="{height: 100%}" class="compDesc">
    <div class="header">
      <div class="backBox">
        <a-button type="primary" size="small" @click="backToComp">
          <a-icon type="left" />
        </a-button>
      </div>
      <div class="operateButton">
        <a-button v-if="!isEdit" @click="handleEdit(true)" type="primary">编辑</a-button>
        <a-button v-if="isEdit" @click="handleEdit(false)">取消</a-button>
        <a-button v-if="isEdit" @click="handleSave" type="primary">保存</a-button>
      </div>
    </div>
    <div>
      <h2>{{ compDetail.title }}</h2>
      <p v-if="!isEdit">{{ compDetail.compDesc }}</p>
      <label v-if="isEdit">
        描述：
        <a-textarea v-if="isEdit" type="text" name id v-model="compDetail.compDesc" :rows="3"></a-textarea>
      </label>
    </div>
    <div class="markDownEditor" v-if="isEdit">
      <label v-if="isEdit">
        接口说明：
        <a-textarea placeholder="请输入组件说明" @change="handleChange" v-model="markdown" :rows="15"></a-textarea>
      </label>
    </div>
    <div class="markDownShown" v-if="!isEdit" v-html="htmlelement"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation, namespace } from "vuex-class";
import showDown from "showdown";
import { saveComp } from "../../service/index";

const app = namespace("app");

@Component({
  name: "detail-modal"
})
export default class detailModal extends Vue {
  $route;
  $router;
  $message;
  convertor: any;
  isEdit: boolean = false;
  markdown: string = "";
  htmlelement: any;
  title: string = "组件名称";

  @app.Getter("compDetail")
  compDetail;


  beforeCreate() {
    // markdown解释器
    this.convertor = new showDown.Converter({
      tables: true,
      parseImgDimensions: true,
      simplifiedAutoLink: true
    });
  }

  created() {
    this.markdown = this.compDetail.apiDesc;
    this.htmlelement = this.convertor.makeHtml(this.markdown);
  }

  backToComp() {
    this.$router.push({
      path: "/admin/myapp/comp"
    });
    this.isEdit = false;
  }

  handleEdit(bool) {
    this.isEdit = bool;
  }

  handleChange(e) {
    let value = e.target.value;
    this.markdown = value;
  }

  async handleSave() {
    let res = await saveComp("default", {
      edit: true,
      compDesc: this.compDetail.compDesc,
      apiDesc: this.markdown,
      compName: this.compDetail.compName,
      type: "custom"
    });
    if (res.data && res.data.status == 200) {
      this.isEdit = false;
      this.htmlelement = this.convertor.makeHtml(this.markdown);
      this.$message.success("保存成功！");
    } else {
      this.$message.error("保存失败，请重试！");
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
  label {
    margin-bottom: 10px;
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
</style>

<template>
  <div class="event-editor">
    <a-modal
      class="event-modal"
      title="自定义动作"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancle"
      width="80%"
      style="height: 80%"
    >
      <MyEditor
        height="calc(80vh - 100px)"
        editorHeight="calc(80vh - 175px)"
        :language="'typescript'"
        :codes="javascriptCodes"
        @onMounted="javascriptOnMounted"
        @onCodeChange="javascriptOnCodeChange"
      />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import MyEditor from '../editor';
import * as recast from "recast";
import { savePageActions } from '../../service';

const webSite = namespace('webSite');

@Component({
  components: {
    MyEditor
  }
})
export default class Editor extends Vue {
  $route;
  @Prop() visible;
  @Prop() closeModal;
  @Prop() events;
  @Prop() actionModel;
  @Prop() setActionModel;

  @webSite.Getter('pageInfor')
  pageInfor;

  javascriptCodes = `console.log("This is javascript");
function test(ctx) { console.log(ctx); };
function add(a, b) {return a + b}`
  jsEditor = null;

  javascriptOnMounted(edit) {
    this.jsEditor = edit;
    console.log(edit)
  }

  javascriptOnCodeChange(value) {
    this.javascriptCodes = value
  }

  showModal() {
    this.visible = true;
  }

  getFunctionName(ast) {
    let funcBox = []
    recast.visit(ast, {
      visitFunctionDeclaration: function (path) {
        const node = path.node
        const funcName = node.id.name
        const params = node.params
        const body = node.body
        funcBox.push(funcName)
        return false
      }
    });
    return funcBox
  }

  handleOk(e) {
    this.closeModal();
    const ast = recast.parse(this.javascriptCodes);
    // 获取所有的方法名，必须先执行
    let funcList = this.getFunctionName(ast)
    // 获取转换后的代码
    this.getCodeText(ast)
    console.log(funcList)

    let ctx = `const ctx='123456';`
    eval(ctx + this.javascriptCodes)
  }

  getCodeText(ast) {
    const add = ast.program.body;
    for (let i in add) {
      if (add[i].type === "FunctionDeclaration") {
        ast.program.body[i] = this.getFunctionBody(add[i])
      }
    }

    //将AST对象重新转回可以阅读的代码
    var output = recast.prettyPrint(ast, { tabWidth: 2 }).code;
    console.log(output)
  }

  getFunctionBody(add) {
    const { variableDeclaration, variableDeclarator, functionExpression } = recast.types.builders

    return variableDeclaration("const", [
      variableDeclarator(add.id, functionExpression(
        null, // Anonymize the function expression.
        add.params,
        add.body
      ))
    ]);
  }

  handleCancle() {
    this.closeModal();
  }

  savePageActions() {
    let appID = this.$route.params.appID;
    let pageName = this.$route.path.split('/')[3];
    let params = {
      appID: appID,
      pageName: pageName,
      actionsStr: this.javascriptCodes
    }
    // savePageActions(params);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.event-modal {
  /deep/.ant-modal-content {
    height: 100%;
  }
}
/deep/.ant-modal-body {
  height: calc(100% - 55px) !important;
}
</style>

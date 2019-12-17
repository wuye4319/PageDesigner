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
console.log("456");
const ab: string = "123";
function test() { console.log(ab); };
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

  handleOk(e) {
    this.closeModal();
    // console.log(this.javascriptCodes);
    const ast = recast.parse(this.javascriptCodes);
    const add = ast.program.body;
    // console.log(add);

    recast.visit(ast, {
      visitFunctionDeclaration: function (path) {
        const node = path.node
        const funcName = node.id.name
        const params = node.params
        const body = node.body
        console.log(node, funcName, params, body)
        return false
      }
    });

    const { variableDeclaration, variableDeclarator, functionExpression } = recast.types.builders

    ast.program.body[0] = variableDeclaration("const", [
      variableDeclarator(add.id, functionExpression(
        null, // Anonymize the function expression.
        add.params,
        add.body
      ))
    ]);

    //将AST对象重新转回可以阅读的代码
    var output = recast.prettyPrint(ast, { tabWidth: 2 }).code;
    console.log(output)

    // eval(this.javascriptCodes)
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

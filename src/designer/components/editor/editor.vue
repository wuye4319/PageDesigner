<template>
  <div class="myEditor">
    <!-- <p v-if="!isSave">
      <a-button @click="RunResult" type="primary">保存</a-button>
    </p>-->
    <div
      id="container"
      ref="container"
      :style="{'height':editorHeight || '600px'}"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import * as monaco from 'monaco-editor';
@Component({
  name: 'editor',
  components: {}
})

export default class Editor extends Vue {
  @Prop() codes: string
  @Prop() language: string
  @Prop() height: string;
  @Prop() editorHeight: string;
  // @Prop() isSave: boolean;

  codesCopy: any = null // 内容备份
  monacoEditor

  created() { }

  mounted() {
    this.initEditor();
  }

  initEditor() {
    let self = this;
    let container: any = this.$refs.container;
    if (container) {
      container.innerHTML = '';
    }
    this.monacoEditor = monaco.editor.create(container, {
      value: this.codes || '',
      language: this.language,
      theme: 'vs-dark', // vs, hc-black, or vs-dark
    });
    this.$emit('onMounted', self.monacoEditor); // 编辑器创建完成回调
    this.monacoEditor.onDidChangeModelContent(async function (event) {
      // 编辑器内容changge事件
      if (self.language === 'typescript') {
        self.codesCopy = await self.getTypeScriptText(self.monacoEditor)
      } else {
        self.codesCopy = self.monacoEditor.getValue();
      }

      self.$emit('onCodeChange', self.codesCopy, event);
    });
    // 编辑器随窗口自适应
    window.addEventListener('resize', function () {
      self.initEditor();
    });
  }

  getTypeScriptText(monacoEditor) {
    return new Promise((resolve, reject) => {
      // test
      monaco.languages.typescript.getTypeScriptWorker()
        .then(function (worker: (v: monaco.Uri) => Promise<any>) {
          worker(monacoEditor.getModel().uri)
            .then(function (proxy) {
              proxy.getEmitOutput(monacoEditor.getModel().uri.toString())
                .then((r) => {
                  // console.log(r.outputFiles[0].text);
                  resolve(r.outputFiles[0].text)
                });
            });
        });
    })
  }

  // RunResult() {
  //   this.$emit("onCodeChange", this.monacoEditor.getValue());
  // }
};
</script>
<style lang="less" scoped>
.myEditor {
  position: relative;
  height: 100%;
  overflow: auto;
  p {
    position: absolute;
    bottom: 8px;
    right: 12px;
    z-index: 99;
    margin: 0;
    button {
      padding: 0 6px;
    }
  }
}
#container {
  height: 100%;
  text-align: left;
}
</style>

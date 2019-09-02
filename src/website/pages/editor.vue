<template>
  <div>
    <a-tabs type="border-card">
      <a-tab-pane tab="html" key="1">
        <span slot="label">
          <i class="el-icon-document"></i> HTML
        </span>
        <MyEditor
          :language="'html'"
          :codes="htmlCodes"
          @onMounted="htmlOnMounted"
          @onCodeChange="htmlOnCodeChange"
        />
      </a-tab-pane>
      <a-tab-pane tab="Javascript" key="2">
        <MyEditor
          :language="'typescript'"
          :codes="javascriptCodes"
          @onMounted="javascriptOnMounted"
          @onCodeChange="javascriptOnCodeChange"
        />
      </a-tab-pane>
      <a-tab-pane tab="CSS" key="3">
        <MyEditor
          :language="'less'"
          :codes="cssCodes"
          @onMounted="cssOnMounted"
          @onCodeChange="cssOnCodeChange"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import MyEditor from '@/website/components/editor';
import { Tabs } from 'ant-design-vue';

export default {
  components: {
    MyEditor,
    ATabs: Tabs
  },
  data() {
    return {
      htmlCodes: '<div>This is html</div>',
      javascriptCodes: 'console.log("This is javascript")',
      cssCodes: 'body{}',
      htmlEditor: null,
      jsEditor: null,
      cssEditor: null
    };
  },
  methods: {
    htmlOnMounted(edit) {
      this.htmlEditor = edit;
    },
    javascriptOnMounted(edit) {
      this.jsEditor = edit;
    },
    cssOnMounted(edit) {
      this.cssEditor = edit;
    },
    htmlOnCodeChange(value, event) {},
    javascriptOnCodeChange(value, event) {},
    cssOnCodeChange(value, event) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

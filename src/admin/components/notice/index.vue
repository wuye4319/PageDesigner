<template>
  <div class="notice">
    <h1>自定义组件</h1>
    <p>Authine设计器，不但支持创建页面应用，也支持自定义组件，根据自己的喜好，创建极具个人特色的组件。也可将自己的成果分享到应用市场，让更多的人看到。</p>
    <p>以下整理了一些开发自定义组件注意事项和常见的问题，在进行组件开发前，请先了解一下。</p>
    <hr/>
    <h2>组件目录结构</h2>
    <a-textarea
      :rows="7"
      disabled
      v-model="description"
    ></a-textarea>
    <h2>组件开发步骤：</h2>
    <p>
      1. 下载
      <a>组件模版</a>,如需本地调试，可直接下载
      <a>设计器demo</a>，或通过命令行输入<i>npm install authineDesigner</i>,将组件demo放到项目website文件夹下的components文件夹中即可，设计器会根据后端数据自动渲染。
    </p>
    <p>2. 代码开发指引</p>
    <a-textarea
      :rows="10"
      disabled
      v-model="compCode"
    ></a-textarea>
    <h2>上传组件</h2>
    <p>先将编辑好的组件文件压缩，然后在我的组件模块通过上传组件将组件上传到服务器中。</p>
    <p>组件数据源格式如下：</p>
    <a-textarea
      :rows="14"
      disabled
      v-model="compData"
    ></a-textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

@Component({
  name: 'notice-component'
})
export default class noticeComponent extends Vue {
  $router;

  description: string =
  `compName // 文件夹命名为组件名称
    index.ts // 导出组件
    compName.vue // 组件文件，文件名命名为组件名称
    control // 文件夹，组件属性设置文件
      index.ts //导出属性设置
      compName.vue // 属性设置文件，文件名命名为组件名称
  `;

  compCode: string =
  `//设计器使用的typescript
    export default class demoCompnent extends Vue {
      //设计器已经设计好一整套数据逻辑，组件所需的数据均在compData中，通过vuex管理
      @Prop() compData: any;
      //以下是compData的数据结构说明
      //compData: {
       //"compName": "", //组件名称，英文
       //"type": "effect", //组件类型,(基础，功能，自定义。。)
       //"title": "轮播框", //组件名称，中文
       //"compAttr": { //组件的所有属性，自定义的，可以是样式的也可以是功能性的
         //"effect": "fade",
         //"arrows": true,
         //"vertical": false,
         //"autoplay": true,
         //"height": "300px",
         //"width": "100%",
         //"dots": true
       //}
     //}
    }
  `;

  compData: string =
  `{
      "compName": "", //组件名称，英文
      "type": "effect", //组件类型,(基础，功能，自定义。。)
      "title": "轮播框", //组件名称，中文
       "compAttr": { //组件的所有属性，自定义的，可以是样式的也可以是功能性的
         "effect": "fade",
         "arrows": true,
         "vertical": false,
         "autoplay": true,
         "height": "300px",
         "width": "100%",
         "dots": true
       }
     }
  }`
}
</script>

<style lang='less' scoped>

</style>

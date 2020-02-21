<template>
  <div class="myHeaderControl">
    <h3>导航配置</h3>
    <div style="margin-top: 12px;" ref="my-select1">
      <label>风格：</label>
      <a-select
        class="my-select"
        placeholder="请选择导航风格"
        style="width: 120px"
        v-model="compAttr.type"
        :getPopupContainer="getPopupContainer1"
      >
        <a-select-option value="line">风格一</a-select-option>
        <a-select-option value="outline">风格二</a-select-option>
        <a-select-option value="tab">风格三</a-select-option>
      </a-select>
    </div>
    <div style="margin-top: 12px;" ref="my-select2">
      <label>位置：</label>
      <a-select
        placeholder="请选择导航风格"
        style="width: 120px"
        v-model="compAttr.position"
        :getPopupContainer="getPopupContainer"
      >
        <a-select-option value="center">居中</a-select-option>
        <a-select-option value="left">靠左</a-select-option>
        <a-select-option value="right">靠右</a-select-option>
      </a-select>
    </div>
    <div style="margin-top: 12px;">
      <a-button
        type="primary"
        style="width: 100%"
        @click="addPage"
      >添加</a-button>
      <p style="margin:10px 0 0 0;font-size:12px">*添加导航时，请设置跳转页面</p>
      <a-collapse :bordered="false">
        <a-collapse-panel
          v-for="(item,i) in this.compAttr.data"
          :header="item.name"
          :key="i"
          :style="customStyle"
        >
          <div>
            <span>默认选中：</span>
            <a-radio
              :checked="Number(compAttr.defaultPage) === i"
              @click="setDefaultPage(i)"
              style="font-size: 12px"
            />
          </div>
          <div>
            <span>文字：</span>
            <a-input placeholder="标题" v-model="item.name"/>
          </div>
          <div>
            <span>链接至：</span>
            <a-select
              size="small"
              placeholder="请选择连接页面"
              style="width: 120px"
              v-model="item.route"
            >
              <a-select-opt-group label="站内路由">
                <a-select-option
                  v-for="page in pageList"
                  :key="page"
                  :value="page"
                >{{ page }}</a-select-option>
              </a-select-opt-group>
              <a-select-option value="custom">自定义</a-select-option>
            </a-select>
          </div>
          <div v-if="item.route === 'custom'">
            <!-- <a-input v-model="item.customLink"  placeholder="请输入链接地址" /> -->
            <a-input
              style="width: 100%"
              placeholder="请输入地址"
              @change="(e)=>{handleCustomLink(e,i)}"
            >
              <a-select
                slot="addonBefore"
                defaultValue="http://"
                style="width: 85px"
                v-model="linkPrefix"
              >
                <a-select-option value="http://">http://</a-select-option>
                <a-select-option value="https://">https://</a-select-option>
              </a-select>
            </a-input>
          </div>
          <div style="justify-content:center">
            <a-button
              size="small"
              type="danger"
              @click="deletePage(i)"
            >删除</a-button>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Collapse, Button, Input, Select, Radio } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'nav-component',
  components: {
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
    AButton: Button,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASelectOptGroup: Select.OptGroup,
    ARadio: Radio
  }
})
export default class navComponent extends Vue {
  @Prop() compData: any;

  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;

  compAttr: any = this.compData.compAttr;
  // type: 导航样式类型：line/outline/tab
  test: object = {};
  customStyle =
    'background: #f7f7f7;border-radius: 4px;margin-top: 8px;border: 0;overflow: hidden';
  linkPrefix:string = 'http://';

  created() {}

  mounted() {}

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  handleCustomLink(e, i) {
    this.compAttr.data[i].customLink = this.linkPrefix + e.target.value;
  }
  setDefaultPage(i) {
    this.compAttr.defaultPage = i;
  }

  addPage() {
    this.compAttr.data.push({
      id: this.compAttr.data.length + 1,
      name: '导航',
      route: ''
    });
  }
  deletePage(index) {
    if (this.compAttr.data.length <= 1) {
      this.$message.warning('已是最后一条数据，无法再删除！')
      return;
    }
    this.compAttr.data.splice(index, 1);
  }
  getPopupContainer1() {
    let myselect = this.$refs['my-select1'];
    return myselect
  }
  // 下拉框绑定位置
  getPopupContainer() {
    let myselect = this.$refs['my-select2'];
    return myselect
  }
}
</script>
<style lang='less' scoped>
/deep/.ant-collapse-content-box {
  & > div {
    text-align: left;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2px 0 0 0;
    & > span {
      width: 60px;
    }
    .ant-input {
      flex: 1;
    }
    .ant-select {
      flex: 1;
    }
  }
}

  .my-select {
    /deep/ .ant-select-dropdown-menu {
      max-height: 150px;
    }
  }
</style>

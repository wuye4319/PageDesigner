<template>
  <div class="myPortal">
    <a-collapse defaultActiveKey="1" :bordered="false">
      <a-collapse-panel header="header" key="1">
        <ul>
          <li>
            <h4>mode</h4>
            <a-select
              defaultValue="horizontal"
              @change="changeVal('header','mode')"
              v-model="header.mode"
            >
              <a-select-option value="vertical">vertical</a-select-option>
              <a-select-option value="vertical-right">vertical-right</a-select-option>
              <a-select-option value="horizontal">horizontal</a-select-option>
              <a-select-option value="inline">inline</a-select-option>
            </a-select>
          </li>
          <li>
            <h4>theme</h4>
            <a-select
              defaultValue="light"
              @change="changeVal('header','theme')"
              v-model="header.theme"
            >
              <a-select-option value="light">light</a-select-option>
              <a-select-option value="dark">dark</a-select-option>
            </a-select>
          </li>
          <li>
            <h4>show</h4>
            <a-switch v-model="header.show" @change="changeVal('header','show')"/>
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel
        header="sider"
        key="2"
        :disabled="false"
      >
        <ul>
          <li>
            <h4>mode</h4>
            <a-select
              defaultValue="horizontal"
              @change="changeVal('sider','mode')"
              v-model="sider.mode"
            >
              <a-select-option value="vertical">vertical</a-select-option>
              <a-select-option value="vertical-right">vertical-right</a-select-option>
              <a-select-option value="horizontal">horizontal</a-select-option>
              <a-select-option value="inline">inline</a-select-option>
            </a-select>
          </li>
          <li>
            <h4>theme</h4>
            <a-select
              defaultValue="light"
              @change="changeVal('sider','theme')"
              v-model="sider.theme"
            >
              <a-select-option value="light">light</a-select-option>
              <a-select-option value="dark">dark</a-select-option>
            </a-select>
          </li>
          <li>
            <h4>collapsible</h4>
            <a-switch v-model="sider.collapsible" @change="changeVal('sider','collapsible')"/>
          </li>
          <li>
            <h4>show</h4>
            <a-switch v-model="sider.show" @change="changeVal('sider','show')"/>
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel
        header="logo"
        key="3"
        :disabled="false"
      >
        <ul>
          <li>
            <h4>image</h4>
            <a-input v-model="logo.img" @change="changeVal('logo','img')"/>
          </li>
          <li>
            <h4>text</h4>
            <a-input v-model="logo.text" @change="changeVal('logo','text')"/>
          </li>
        </ul>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Collapse, Input, Select, Switch } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'table-component',
  components: {
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASwitch: Switch
  }
})
export default class tableComponent extends Vue {
  @Prop() compData: any
  @Prop() compIndex: number

  initData = {
    mode: true, // 是否使用动画切换 Tabs，在 tabPosition=top|bottom 时有效
    theme: 'line' // 页签的基本样式，可选 line、card editable-card 类型
  }
  pageData: any = this.compData;
  header: any = this.pageData.compAttr.header;
  sider: any = this.pageData.compAttr.sider
  logo: any = this.pageData.compAttr.logo

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 150
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 150
    },
    {
      title: 'Address',
      dataIndex: 'address'
    }
  ];
  data = [
    {
      key: 1,
      name: `Edward King ${1}`,
      age: 32,
      address: `London, Park Lane no. ${1}`
    },
    {
      key: 2,
      name: `Edward King ${2}`,
      age: 32,
      address: `London, Park Lane no. ${3}`
    },
    {
      key: 3,
      name: `Edward King ${3}`,
      age: 32,
      address: `London, Park Lane no. ${3}`
    }
  ];
  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this.initData[key] = this.pageData.compAttr[key];
    }
  }

  mounted() {}

  handleChange() {

  }

  changeVal(type, name) {
    if (type === 'header') {
      if (name === 'theme') {
        this.pageData.compAttr.logo.background = this[type][name] === 'dark' ? '#001529' : '#fff';
        this.pageData.compAttr.logo.color = this[type][name] === 'dark' ? '#fff' : '#001529';
      }
    }
    this.pageData.compAttr[type][name] = this[type][name];
  }
}
</script>
<style lang='less' scoped>
.myPortal {
  width: 100%;
  ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    li{
      width: 50%;
      text-align: left;
      margin: 10px 0 0 0;
    }
  }
}
</style>

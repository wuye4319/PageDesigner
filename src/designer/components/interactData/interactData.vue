<template>
  <div>
    <div class="user-tip"><span>组件ID: </span>{{ userData.id }}</div>
    <a-list itemLayout="horizontal">
      <!-- <a-list-item>
        <a-list-item-meta>
          <div slot="description">数据联动:</div>
        </a-list-item-meta>
      </a-list-item> -->
      <a-list-item>
        联动：
        <a-button
          type="primary"
          :size="size"
          @click="showMode('userModel',true)">数据传入</a-button>
        <a-button
          type="primary"
          :size="size"
          class="button"
          @click="showMode('userModel2',true)">数据接收</a-button>
      </a-list-item>
    </a-list>
    <a-modal
      :title="modeTitle"
      v-model="userModel"
      @ok="checkData"
      :centered="true">
      <div class="modal-warp">
        <p class="model-title">响应数据</p>
        <a-textarea
          placeholder="{  }"
          :rows="4"
          v-model="propData" />
        <p class="model-title">数据过滤器</p>
        <a-textarea
          placeholder="function(data){
          return data.aa;//把接收到的数据处理成适合自身组件的数据格式
        }"
          :rows="4"
          v-model="dataFilter" />
        <p class="model-title">响应数据示例</p>
        <div>{{ userData.tempData }}</div>
      </div>
    </a-modal>
    <a-modal
      :title="modeTitle2"
      v-model="userModel2"
      @ok="showMode('userModel2')"
      :centered="true">
      <div class="modal-warp">
        <ul class="list-warp">
          <li v-for="i of userData.canlisten__" :key="i.id+i.listen">
            <span>{{ i.id }}</span>
            <a-switch
              class="switch-position"
              checkedChildren="开"
              unCheckedChildren="关"
              @change="onSwitch(i)"
              :checked="i.listen" />
          </li>
        </ul>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'; // Component Prop Watch Emit Model Provide Inject Mixins
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { List, Button, Modal, Input, Switch } from 'ant-design-vue';
// 精准判断数据类型
function type(obj: any): string {
  return Object.prototype.toString
    .call(obj)
    .split(' ')[1]
    .toLocaleLowerCase()
    .slice(0, -1);
}
@Component({
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AButton: Button,
    AInput: Input.TextArea,
    ASwitch: Switch

  }
})
export default class AppForm extends Vue {
  userData: any = {};
  size: string = 'small';
  modeTitle: string = '用户传入数据设置';
  modeTitle2: string = '接收数据配置';
  userModel: boolean = false;
  userModel2: boolean = false;
  propData: any = '';
  dataFilter: any = '';
  showMode(key, ks?) {
    this[key] = !!ks;
  }
  @Watch('compData')
  compChange() {
    this.userData = this.compData.compAttr.interactData;
    this.dataFilter = this.userData.dataFilter;
    this.propData = this.userData.proData;
  }
  created() {
    this.userData = this.compData.compAttr.interactData;
    this.dataFilter = this.userData.dataFilter;
    this.propData = this.userData.proData;
  }

  // 用户改变监听组件
  onSwitch(obj) {
    obj.listen = !obj.listen;

    this.userData.canlisten__ = JSON.parse(
      JSON.stringify(this.userData.canlisten__)
    );
  }
  checkData() {
    let ks = true;
    let tipStr = '';
    let data: any;
    let typeStr = type(this.userData.tempData);
    function ev(str: string) {
      return eval('(' + str + ')'); // eslint-disable-line
    }
    let that = this;

    function tip(is?: any) {
      if (is || type(data) !== typeStr) {
        that.$message.error(tipStr);
        ks = false;
      }
    }
    try {
      if (this.propData) {
        if (typeStr === 'array') {
          tipStr = '请填写合法数组';
          data = ev(this.propData);
          tip();
        } else if (typeStr === 'Object') {
          tipStr =
            '请输入合法JSON串（注意引号）示例：{ "name": "string", "val": 123 }';
          data = JSON.parse(this.propData);
          tip();
        } else {
          data = this.propData;
        }
        this.userData.propData = data;
      }
    } catch (error) {
      tip(true);
    }
    try {
      if (this.dataFilter) {
        tipStr = '不是合法的函数';
        let fuc = ev(this.dataFilter);
        if (typeof fuc === 'function') {
          this.userData.dataFilter = fuc;
          this.userData.FilterStr = this.dataFilter;
        } else {
          tip(true);
        }
      }
    } catch (error) {
      tip(true);
    }
    if (ks) {
      this.userModel = false;
    }
  }
  /* ------------- */
  @Prop({
    type: Object, // type:String Number Boolean Function Object Array Symbol
    default: {}
  })
  compData!: any;
}
</script>
<style lang="less" scoped>
.user-tip {
  text-align: left;
  font-weight: bolder;
  span {
    font-weight: normal;
    padding-right: 6px;
  }
}
.button {
  margin-left: 20px;
}
.model-title {
  font-weight: bolder;
  padding: 10px 0;
  margin: 0;
}
.modal-warp {
  position: relative;
  top: -10px;
  max-height: 460px;
  overflow: auto;
}
.list-warp > li {
  position: relative;
  padding: 6px;
  padding-right: 56px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  .switch-position {
    position: absolute;
    right: 0;
    top: 6px;
  }
}
</style>

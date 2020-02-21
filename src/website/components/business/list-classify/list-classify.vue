
<template>
  <div class="list-classify">
    <a-radio-group
      class="option-list"
      :buttonStyle="buttonStyle"
      v-model="myVal"
      @change="radioChange"
    >
      <a-radio-button
        class="option-list-item"
        v-for="(item,i) of compAttr.data"
        :key="i"
        :class="{tab: compAttr.style === 'tabs'}"
        :value="i.toString()"
      >{{ item.label }}</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Radio } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'list-classify-view',
  components: {
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button
  }
})
export default class ListClassifyView extends Vue {
  @Prop() compData;

  @webSite.Getter('tables')
  tables;

  $store;
  compAttr: any = this.compData.compAttr;
  dataModel: any = this.compData.dataModel;
  mapData: any = this.compData.dataModel.mapData;
  myVal: string = '0';

  get buttonStyle() {
    let buttonStyle = this.compAttr.style === 'tabs' ? 'outline' : 'solid';
    return buttonStyle;
  }

  created() {
    if (this.compAttr.bindUid && this.compAttr.bindName) {
      let eventName = `${this.compAttr.bindUid}-tableName-classify`;
      // 绑定事件
      this.$store.off(eventName);
      this.$store.on(eventName, this.changeTableName);
    }
  }

  mounted() {}

  radioChange() {
    let tableName = this.dataModel.tableName;
    let i = Number(this.myVal);
    let val = this.compAttr.data[i].value;
    let params = {
      [this.mapData[0].tableMap]: val
    };
    if (val === 'list-all') {
      params = {
        [this.mapData[0].tableMap]: ''
      };
    }
    if (this.compAttr.bindUid && this.compAttr.bindName) {
      this.$store.$emit(`${this.compAttr.bindUid}-${this.compAttr.bindName}`, tableName, params, 'classify');
    } else {
      this.$store.$emit(this.compAttr.emit, tableName, params);
    }
  }

  // 改变tab名称
  changeTableName(name) {
    this.dataModel.tableName = name;
    this.dataModel.mapData.forEach((item, i) => {
      this.dataModel.mapData[i].tableMap = ''
    })
    this.compAttr.data.forEach((item, i) => {
      this.compAttr.data[i].value = ''
    })
    this.myVal = '0'
  }
}
</script>
<style lang='less' scoped>
.list-classify {
  width: 100%;
  padding: 5px 1px;
  &.checked {
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
  }
}
.option-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  .option-list-item {
    border-width: 0;
    padding: 0 8px;
    &::before {
      width: 0;
    }
    &.ant-radio-button-wrapper {
      border-radius: 4px;
      box-shadow: none;
    }
    &.tab {
      &.ant-radio-button-wrapper-checked {
        border-bottom-width: 2px;
        border-radius: 0;
      }
    }
  }
}
</style>

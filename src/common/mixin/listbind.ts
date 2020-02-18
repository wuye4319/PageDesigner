import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { genID } from '@/common/utils/math'; // 创建唯一id
import databind from './databind'

const webSite = namespace('webSite');

@Component
export default class ListBindMixins extends Mixins(databind) {
  $store
  @Prop() compData;

  getListDataFn:any

  @webSite.State('Tables') // 初始化接口返回的数据绑定表
  databindTables;

  @webSite.State('AppInfor') // 初始化接口返回的数据绑定表
  databindAppInfor;

  @Watch('compData.dataModel.tableName')
  tableNameChange(newVal) {
    let classifyName = `${this.compData.compAttr.uid}-tableName-classify`;
    this.$store.$emit(classifyName, newVal);
    let sortName = `${this.compData.compAttr.uid}-tableName-sort`;
    this.$store.$emit(sortName, newVal);
    this.apiData = []
  }

  created() {
    this.databindCteateID();
    this.databindEvent();
  }

  // 新增唯一id
  databindCteateID() {
    let uid = genID();
    this.compData.compAttr['uid'] = this.compData.compAttr['uid'] ? this.compData.compAttr['uid'] : `${uid}`;
  }

  // 绑定列表分类排序 查询事件
  databindEvent() {
    this.$store.off(`${this.compData.compAttr.uid}-${this.compData.compName}`);
    this.$store.on(`${this.compData.compAttr.uid}-${this.compData.compName}`, this.getListDataFn);
  }
}

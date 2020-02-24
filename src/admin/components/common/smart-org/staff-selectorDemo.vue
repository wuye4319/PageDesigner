<template>
  <staff-selector
    v-model="staff"
    :options="staffSelectorOpts"
    @change="staChange"
    :disabled="false"
  ></staff-selector>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'; // Component Prop Watch Emit Model Provide Inject Mixins
import StaffSelector from './staff-selector.vue';
@Component({
  name: 'StaffSelectorDemo',
  components: { StaffSelector }
})
export default class StaffSelectorDemo extends Vue {
  staffSelectorOpts = {
    key: 'orgRoot',
    selectOrg: true, // 是否可以选择组织
    selectUser: true, // 是否可以选择人
    mulpitle: true, // 是否可以多诜
    showModel: false, // ???
    showSelect: true, // 是否在页面显示选择框
    placeholder: '点击选择'
  };
  staff: any[] = [];
  staChange() {
    console.log(this.staff);
  }
}
</script>

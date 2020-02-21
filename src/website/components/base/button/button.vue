<template>
  <a-button
    class="mybutton"
    :type="compAttr.type || 'primary'"
    :style="setStyle()"
    @click="handleClick"
    :ref="compAttr.uid"
    :size="compAttr.size"
    :disabled="compAttr.status"
  ><a-icon
    v-if="compAttr.icon"
    :type="compAttr.iconType || 'plus'"
    :style="{'color': compAttr.iconColor}"
    :theme="compAttr.iconTheme || 'filled'"
  />{{ compAttr.value }}</a-button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { Button, Icon } from 'ant-design-vue';
import actions from '../../../store/actions';

const webSite = namespace('webSite');

@Component({
  name: 'button-component',
  components: {
    AButton: Button,
    AIcon: Icon
  }
})
export default class buttonComponent extends Vue {
  @Prop() compData: any;
  @Prop() trigFunc: any;
  compAttr: any = this.compData.compAttr;

  setStyle() {
    return {
      'margin': this.compAttr.margin,
      'width': this.compAttr.width || '200px'
    }
  }

  handleClick() {
    this.trigFunc('click', this.compData.actionModel);
  }
}
</script>

<style lang="less" scoped>
.mybutton {
  transition: 0.5s all;
  // margin-top: 5px;
}
</style>

<template>
  <div class="myCard">
    <h3>卡片内容配置</h3>
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">封面:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('cover')"
          v-model="initData.cover"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">标题:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('title')"
          v-model="initData.title"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">描述:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('description')"
          v-model="initData.description"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">头像:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('avatar')"
          v-model="initData.avatar"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">操作:</div>
        </a-list-item-meta>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          @change="changeVal('actions')"
          v-model="initData.actions"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">列数:</div>
        </a-list-item-meta>
        <a-input-number
          :min="1"
          :max="10"
          v-model="initData.column"
          @change="changeVal('column')"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'card-component',
  components: {}
})
export default class cardComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any;

  compAttr: any = this.compData.compAttr;

  initData: any = {
    cover: this.compAttr.cover,
    title: this.compAttr.title,
    description: this.compAttr.description,
    avatar: this.compAttr.avatar,
    actions: this.compAttr.actions,
    column: this.compAttr.column
  };

  created() {}

  mounted() {}

  changeVal(name) {
    this.compData.compAttr[name] = this.initData[name];
  }
}
</script>
<style lang='less' scoped>
.myFooter {
  width: 100%;
  // display: flex;
  background: #001529;
  padding: 0 10px;
  ul {
    padding: 20px 0;
    width: 80%;
    margin: 0 auto;
    text-align: left;
    color: #8d8d8d;
  }
}
</style>

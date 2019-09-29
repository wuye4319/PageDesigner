<template>
  <div class="myapp-comp">
    <upload-modal :getCompStore="getCompStore" />
    <a-list
      :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }"
      :dataSource="compStore"
      :pagination="{
        total: compStore.length, // 总数
      showQuickJumper: true,
      onChange: page => {
        console.log(page);
      },
      pageSize: 8,
      hideOnSinglePage: true
      }"
      class="mylist"
    >
      <a-list-item class="list" slot="renderItem" slot-scope="item">
        <a-card hoverable class="mycard">
          <img
            @click="showDetail(item)"
            width="100%"
            alt="example"
            :src="item.pic || defaultImg"
            slot="cover"
          />
          <template class="ant-card-actions" slot="actions">
            <a-icon type="edit" title="编辑" />
            <a-icon type="share-alt" title="分享" />
            <a-icon type="delete" @click="handleDelete(item)" title="删除" />
          </template>
          <a-card-meta :title="item.title" @click="showDetail(item)"></a-card-meta>
          <p @click="showDetail(item)">{{ item.compDesc }}</p>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { State, Action, Mutation, namespace } from "vuex-class";
import { Upload } from "ant-design-vue";
import UploadModal from "../common/uploadModal.vue";
import { getCompStore,deleteCompStore } from "../../service/index";
import compStoreComponent from "../../../website/components/comp_store/comp_store.vue";
import AppState from "../../store";

const app = namespace('app');
const defaultImg = require("../../../../static/images/img.png");

@Component({
  name: "myapp-comp",
  components: {
    UploadModal
  }
})
export default class MyappComp extends Vue {
  $route;
  $router;
  $confirm;
  uploadVisible: boolean = false;
  pagination: object = {};
  defaultImg = defaultImg;
  compStore: any = [];

  @app.Mutation("changeCompDetail")
  changeCompDetail;

  async created() {
    this.getCompStore();
  }

  //获取组件列表
  async getCompStore(){
    let res = await getCompStore("default", { type: "custom" });
    let compStore = res.data.status == 200 && res.data.data;
    this.compStore = compStore;
  }

  //删除组件
  async deleteComp(compName){
    let res = await deleteCompStore("default",{compName: compName,type: 'custom'});
    let compStore = res.data.status == 200 && res.data.data;
    this.compStore = compStore;
  }

  handleDelete(item) {
    this.showConfirm(item);
  }

  handleUpload() {
    this.uploadVisible = !this.uploadVisible;
  }

  closeUploadModal() {
    this.uploadVisible = false;
  }

  showConfirm(item) {
    let self = this;
    this.$confirm({
      title: `确认删除 ${item.title} 组件?`,
      cancelText: "取消",
      okText: "确认",
      onOk() {
        self.deleteComp(item.compName);
      },
      onCancel() {}
    });
  }

  showDetail(item) {
    this.$router.push({
      path: "/admin/myapp/detail"
    });
    this.changeCompDetail(item);
  }
}
</script>

<style lang='less' scoped>
.mylist {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  /deep/.ant-card-body {
    padding: 14px;
  }
}
.list {
  min-width: 120px;

  p {
    height: 100px;
    overflow: auto;
    margin-top: 5px;
  }
  .pic {
    height: 150px;
  }
}
</style>

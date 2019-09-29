<template>
  <div class="myapp-comp">
    <a-list
      :grid="{ gutter: 12, sm: 1, md: 3, lg: 4, xl: 4, xxl: 6 }"
      :dataSource="mydata"
      class="mylist"
    >
      <a-list-item
        class="list"
        slot="renderItem"
        slot-scope="item"
      >
        <a-card hoverable class="mycard">
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <template class="ant-card-actions" slot="actions">
            <a-icon type="delete" @click="handleDelete(item)"/>
            <a-icon type="edit"/>
          </template>
          <a-card-meta :title="item.title" :description="item.desc">
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { Upload } from 'ant-design-vue';

const data = [
  {
    title: '组件1',
    pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg',
    desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: '组件2',
    pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg',
    desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: '组件3',
    pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg',
    desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: '应用1',
    pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg',
    desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: '应用2',
    pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg',
    desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: '应用3',
    pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg',
    desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  }
];

@Component({
  name: 'myapp-share'
})
export default class MyappShare extends Vue {
  $route;
  $router;
  $confirm;

  get mydata(): object[] {
    let arr = [].concat(data);
    return arr;
  }

  handleChange(info) {
    console.log(info);
  }

  handleDelete(item) {
    this.showConfirm(item)
  }

  showConfirm(item) {
    this.$confirm({
      title: `确认删除 ${item.title}?`,
      content: '删除后将无法复原！',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  goDetails() {
    this.$router.push({
      path: '/designer/product'
    });
  }

  confirm() {}
}
</script>

<style lang='less' scoped>
.mylist {
  // height: 350px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.mycard{
  // width: 300px;
}
.list {
  .pic {
    height: 150px;
  }
}

.my-upload {
  margin-bottom: 10px;
}
</style>

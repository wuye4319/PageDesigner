<template>
  <div class="myapp-manage">
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }"
      :dataSource="mydata"
    >
      <a-list-item
        class="list"
        slot="renderItem"
        slot-scope="item,index"
      >
        <a-card hoverable class="mycard">
          <img
            class="pic"
            alt="example"
            :src="item.pic"
            slot="cover"
          />
          <div class="text">
            <div class="title">{{ item.title }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
          <template
            class="ant-card-actions"
            slot="actions"
            v-if="index > 0"
          >
            <a-popconfirm
              title="Are you sure delete this task?"
              @confirm="confirm"
              okText="Yes"
              cancelText="No"
            >
              <a-icon type="setting"/>
            </a-popconfirm>
            <a-icon type="edit" @click="goDetails"/>
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const data = [
  {
    title: 'Title 1', pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg', desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: 'Title 2', pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg', desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: 'Title 3', pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg', desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: 'Title 4', pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg', desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: 'Title 5', pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg', desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
  {
    title: 'Title 6', pic: 'http://www.agri35.com/UploadFiles/img_0_2427431679_2053781927_26.jpg', desc: '应用介绍应用介绍应用介绍应用介绍应用介绍应用介绍'
  },
]

@Component({
  name: 'myapp-manage'
})

export default class MyappManage extends Vue {
  $route
  $router

  get mydata():object[] {
    let arr = [].concat(data);
    arr.unshift({
      title: '创建新的应用',
      pic: '//bpic.588ku.com/element_origin_min_pic/19/04/09/d5d4859eda9836e9446ffb62661371e3.jpg'
    })
    return arr
  }

  goDetails() {
    this.$router.push({
      path: '/designer/product'
    })
  }

  confirm() {

  }
}
</script>

<style lang='less' scoped>
.mycard {
  height: 350px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    text-align: center;
  }

}
.list{
  .pic {
    height: 150px;
  }
  &:first-child{
    .pic {
      height: 200px;
    }
  }
}
</style>

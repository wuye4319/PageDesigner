<template>
  <div class="active-mobile" :style="{width:pageData.width}">
    <a-list
      :grid="pageData"
      :dataSource="navData"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card
          class="my-card"
          hoverable
        >
          <img
            :style="{height:pageData.imgHeight,borderRadius:pageData.borderRadius}"
            alt="example"
            :src="item.src"
            slot="cover"
          />
          <a-card-meta>
            <p
              class="desc"
              :style="{'-webkit-line-clamp':pageData.lineClamp,'font-size':pageData.fontSize,color:pageData.fontColor}"
              slot="description"
            >{{ item.desc }}</p>
          </a-card-meta>
          <div class="card-foot">
            <div class="card-time">2019-08-08</div>
            <div class="card-address">{{ item.address }} </div>
            <div class="card-people">60人报名</div>
          </div>
          <a-button
            v-show="pageData.titleChecked"
            class="card-title"
            :icon="item.icon"
          >{{ item.type }}</a-button>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { guid } from '../../../common/utils';

const webSite = namespace('webSite');

const numberData = [
  { src: 'http://47.112.11.232:8080/api/aliyun/download?refId=92998e01861641ffa34a17bf9e3cf1d5', desc: '6月25日，区委书记王强以南山区新时代文明实践志愿服务总队长的身份参加“垃圾分类”志愿服务，到南山区生活垃圾分类减量展示馆向参加暑期社会实践的小学生宣讲垃圾分类知识，以实际行动感召广大干部群众积极参与到新时代文明实践志愿服务活动中。', href: '', icon: 'cloud', type: '宣传日报', address: '南山区南山街道南园社区德馨街3号三楼' }, { src: 'http://47.112.11.232:8080/api/aliyun/download?refId=92998e01861641ffa34a17bf9e3cf1d5', desc: '6月25日，区委书记王强以南山区新时代文明实践志愿服务总队长的身份参加“垃圾分类”志愿服务，到南山区生活垃圾分类减量展示馆向参加暑期社会实践的小学生宣讲垃圾分类知识，以实际行动感召广大干部群众积极参与到新时代文明实践志愿服务活动中。', href: '', icon: 'search', type: '宣传日报', address: '南山区南山街道南园社区德馨街3号三楼' }, { src: 'http://47.112.11.232:8080/api/aliyun/download?refId=92998e01861641ffa34a17bf9e3cf1d5', desc: '6月25日，区委书记王强以南山区新时代文明实践志愿服务总队长的身份参加“垃圾分类”志愿服务，到南山区生活垃圾分类减量展示馆向参加暑期社会实践的小学生宣讲垃圾分类知识，以实际行动感召广大干部群众积极参与到新时代文明实践志愿服务活动中。', href: '', icon: 'search', type: '宣传日报', address: '南山区南山街道南园社区德馨街3号三楼' }, { src: 'http://47.112.11.232:8080/api/aliyun/download?refId=92998e01861641ffa34a17bf9e3cf1d5', desc: '6月25日，区委书记王强以南山区新时代文明实践志愿服务总队长的身份参加“垃圾分类”志愿服务，到南山区生活垃圾分类减量展示馆向参加暑期社会实践的小学生宣讲垃圾分类知识，以实际行动感召广大干部群众积极参与到新时代文明实践志愿服务活动中。', href: '', icon: 'search', type: '宣传日报', address: '南山区南山街道南园社区德馨街3号三楼' }, { src: 'http://47.112.11.232:8080/api/aliyun/download?refId=92998e01861641ffa34a17bf9e3cf1d5', desc: '6月25日，区委书记王强以南山区新时代文明实践志愿服务总队长的身份参加“垃圾分类”志愿服务，到南山区生活垃圾分类减量展示馆向参加暑期社会实践的小学生宣讲垃圾分类知识，以实际行动感召广大干部群众积极参与到新时代文明实践志愿服务活动中。', href: '', icon: 'search', type: '宣传日报', address: '南山区南山街道南园社区德馨街3号三楼' }, { src: 'http://47.112.11.232:8080/api/aliyun/download?refId=92998e01861641ffa34a17bf9e3cf1d5', href: '', icon: 'search', type: '宣传日报', address: '南山区南山街道南园社区德馨街3号三楼' }
]

@Component({
  name: 'active-mobile'
})

export default class activemobile extends Vue {
  @Prop() compData: any

  navData = numberData
  pageData:any = this.compData.compAttr

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  created():void {

  }
}
</script>

<style lang="less" scoped>
.active-mobile {
  margin: 0 auto;
}

.desc {
  text-overflow: ellipsis;
  display: block;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.my-card {
  position: relative;
  .card-title {
    position: absolute;
    left: 10px;
    top: 20px;
    opacity: .5;
  }
  .card-foot {
    display: flex;
    justify-content: space-between;
  }
  .card-address {
    width: 140px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>

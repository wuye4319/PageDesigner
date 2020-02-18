
<template>
  <div class="warp">
    <!--  <div class="tap-warp"><span class="user-action">最近学习</span><span>最新购买</span></div> -->
    <ul :class="{'list-warp':type===1,'list-warp2':type===2}" v-if="listData&&listData.length>0">
      <li v-for="(data,n) of listData" :key="n">
        <div class="img-warp"><img :src="data.imgUrl"></div>
        <div class="title">{{ data.title }}</div>
        <div class="dsc" v-if="type===2">{{ data.dsc }}</div>
        <div class="other-dsc"><span class="tip">共{{ data.total }}讲</span><span class="more" @click="showPoup(data)">···</span></div>
      </li>
    </ul>
    <div v-else class="no-data-tip">暂无数据</div>
    <div class="poup" :class="{'poup-show':option.show}"><i class="bg"></i>
      <ul class="user-option">
        <li @click="userTop">
          <a-icon type="to-top" class="icon-fz" /> 置顶</li>
        <li>
          <a @click="goTo(optionData.url)">
            <a-icon type="file-text" class="icon-fz" /> 详情</a></li>
        <li>
          <a-icon type="share-alt" class="icon-fz" /> 分享</li>
        <li class="cancel" @click="showPoup">取消</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import listind from '@/common/mixin/listbind.ts';
import { getTableContent, dataTop } from '@/website/service';
import { Icon } from 'ant-design-vue';
@Component({
  name: 'table-component',
  components: {
    AIcon: Icon
  }
})
export default class tableComponent extends Mixins(listind) {
  @Prop() compData: any;
  compAttr: any = this.compData.compAttr;
  option: any = {
    show: false
  };
  optionData: any = {};
  defaultData: any[] = [
    {
      imgUrl: '/images/user.png',
      title: '梁宁产品思维30讲',
      total: '30',
      dsc:
        '通用电气前CEO杰克·韦尔奇，告诉你赢得商业竞争和职场竞争的秘诀秘诀秘诀秘诀',
      url: 'https://www.baidu.com'
    }
  ];
  type: number = 1;
  getListDataFn = this.getListData;
  params: any = this.topKey;

  created() {
    let that = this;
    this.defaultData.push(this.defaultData[0]);
    this.defaultData.push(this.defaultData[0]);
    function set(key, obj) {
      if (!that.compAttr[key]) {
        that.$set(that.compAttr, key, obj);
      }
    }
    if (this.compData.dataModel.mapData.length === 0) {
      this.compData.dataModel.mapData = [
        {
          desc: '图片',
          key: 'imgUrl',
          tableMap: ''
        },
        {
          desc: '标题',
          key: 'title',
          tableMap: ''
        },
        {
          desc: '简介',
          key: 'dsc',
          tableMap: ''
        },
        {
          desc: '总共',
          key: 'total',
          tableMap: ''
        },
        {
          desc: '文稿地址',
          key: 'url',
          tableMap: ''
        },
        {
          desc: '置顶字段',
          key: 'topKey',
          tableMap: ''
        }
      ];
    }
    this.$store.on(this.compAttr.uid + 'Icon', this.iconClick);
  }
  get topKey() {
    let topKey = this.compData.dataModel.mapData[5].tableMap;
    let obj = {};
    if (topKey !== '') {
      obj = { topKey };
    }
    return obj;
  }
  iconClick(icon) {
    this.type = icon === 'bars' ? 1 : 2;
  }
  // 解绑事件
  beforeDestroy() {
    this.$store.off(this.compAttr.uid + 'Icon', this.iconClick);
  }
  goTo(url) {
    if (location.hash.search('/designer/') === -1) {
      location.href = url;
    } else {
      this.$message.info('请在预览中测试跳转链接');
    }
  }
  showPoup(data?) {
    this.optionData = data || {};
    this.option.show = !this.option.show;
  }
  // 用户置顶
  async userTop() {
    let name = this.compData.dataModel.tableName;
    if (name && this.optionData.id) {
      let parm = {
        tableName: name,
        id: this.optionData.id
      };
      Object.assign(parm, this.topKey);
      this.params = this.topKey;
      let res: any = await dataTop(parm);
      if (res.status === 200) {
        let getData: any = await getTableContent(name, this.params);
        this.apiData = getData.data || [];
        this.option.show = false;
      } else {
        this.$message.error(res.msg);
      }
    } else {
      this.$message.warning('请检查数据是否正确！');
    }
  }

  async getListData(tableName, params) {
    this.params = this.topKey;
    Object.assign(this.params, params);
    for (let k of Object.keys(this.params)) {
      if (!this.params[k]) {
        delete this.params[k];
      }
    }
    if (tableName) {
      let res = await getTableContent(tableName, this.params);
      this.dataSource = 'apiData';
      this.apiData = res.data || [];
    }
  }
}
</script>
<style lang='less' scoped>
.warp {
  width: 100%;
  text-align: left;
}
.tap-warp {
  height: 47px;
  line-height: 47px;
  font-size: 16px;
  border-bottom: 1px solid #f3f3f3;
  span {
    padding: 0 16px;
    cursor: pointer;
    color: #828282;
  }
  .user-action {
    color: #cd8755;
  }
}
.no-data-tip{
  text-align: center;
  line-height: 25px;
  font-size: 18px;
  color: #9d9d9d
}
.list-warp {
  overflow: hidden;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.list-warp > li {
  width: 28%;
  padding-bottom: 10px;
  box-sizing: border-box;
  .img-warp {
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #dadada;
    padding-top: 130%;
    height: 0;
    position: relative;
  }
  .img-warp > img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
  .title {
    font-size: 13px;
    color: #494947;
    padding: 5px 0 8px 0;
    height: 46px;
    text-overflow: ellipsis;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .other-dsc > .tip {
    font-size: 13px;
    color: #b8b8b8;
    display: inline-block;
    width: 75%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.other-dsc > .more {
  float: right;
  font-size: 12px;
  line-height: 24px;
  font-weight: bolder;
  color: #696969;
  cursor: pointer;
}
.poup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -999;
  overflow: hidden;
  opacity: 0;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    transition: opacity ease 300ms;
  }
  .user-option {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    margin-bottom: 0;
    padding: 0 15px;
    transform: translate(0, 100%);
    transition: transform ease 300ms;
  }
  .user-option > li {
    color: #565656;
    padding: 0 10px;
    line-height: 48px;
    border-top: 1px solid #efefef;
    font-size: 13px;
    cursor: pointer;
    a {
      color: #565656;
      display: block;
    }
  }
  .user-option > li:first-child {
    border: none;
  }
  .icon-fz {
    font-size: 15px;
    margin-right: 21px;
    font-weight: bolder;
  }
  .user-option > .cancel {
    text-align: center;
    color: #bd8a5e;
  }
}
.poup-show {
  opacity: 1;
  z-index: 999;
  .bg {
    opacity: 0.8;
  }
  .user-option {
    transform: translate(0, 0);
  }
}
.list-warp2 {
  overflow: hidden;
  margin-bottom: 0;
  padding: 15px;

  .img-warp > img {
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
  li {
    font-size: 13px;
    color: #9d9d9d;
    padding-left: 92px;
    height: 106px;
    position: relative;
    margin-top: 25px;
    .img-warp {
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #dadada;
      height: 100%;
      width: 80px;
      left: 0;
      top: 0;
      position: absolute;
    }

    .title {
      font-size: 15px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight: bolder;
      padding-bottom: 6px;
      color: #4e4e4e;
      padding-top: 4px;
    }
    .dsc {
      height: 42px;
      text-overflow: ellipsis;
      display: block;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      margin-bottom: 5px;
    }
  }
  li:first-child {
    margin-top: 0;
  }
}
</style>

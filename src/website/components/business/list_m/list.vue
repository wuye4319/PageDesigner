
<template>
  <div class="warp">
    <ul class="list-warp" v-if="listData&&listData.length>0">
      <li v-for="(data,n) of listData" :key="n">
        <div class="img-warp"><img :src="data.imgUrl"></div>
        <div class="title">{{ data.title }}</div>
        <div class="dsc">{{ data.dsc }}</div>
        <div class="other-dsc"><span class="time">{{ data.times|formatTime }}</span><span>共{{ data.total }}讲</span></div>
        <div class="button-warp">
          <a class="button1" @click="goTo(data.url)">
            <a-icon type="file-text" class="icon1"/>文稿</a>
          <span class="button2" @click="showPoup(data)">
            <a-icon type="caret-right" class="icon"/>播放</span></div>
      </li>

    </ul>
    <div v-else class="no-data-tip">暂无数据</div>
    <div
      class="play-warp"
      v-if="option.show"
      :style="compAttr.postionAttr"
    >
      <div class="img-warp"><img :src="audioData.imgUrl"></div>
      <div class="play-info">
        <div class="title">{{ audioData.title }}</div>
        <div class="time">{{ audioData.times|formatTime }}</div>
        <div class="option">
          <a-icon
            type="pause"
            class="icon"
            @click="play"
            v-if="option.play"
          />
          <a-icon
            type="caret-right"
            class="icon"
            v-else
            @click="play"
          />
          <a-icon
            type="close"
            class="icon"
            @click="showPoup"
          />
          <audio :src="audioData.audioUrl" ref="audio"></audio>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import listind from '@/common/mixin/listbind.ts';
import { getTableContent } from '@/website/service';
import { Icon } from 'ant-design-vue';
@Component({
  name: 'm-list-component',
  components: { AIcon: Icon },
  filters: {
    formatTime: (time: number) => {
      time = parseInt((time / 1000).toString());
      let m = time % 60;
      time = parseInt((time / 60).toString());
      return time + '分' + m + '秒';
    }
  }
})
export default class tableComponent extends Mixins(listind) {
  listData!: any[];
  audioData: any = {};
  @Prop() compData: any;
  compAttr: any = this.compData.compAttr;
  option: any = {
    show: false,
    play: false
  };
  params: any = {};
  defaultData: any[] = [
    {
      imgUrl: '/images/user.png',
      title: '《赢》| 张凯解读',
      dsc:
        '通用电气前CEO杰克·韦尔奇，告诉你赢得商业竞争和职场竞争的秘诀秘诀秘诀秘诀',
      times: (27 * 60 + 37) * 1000,
      total: '30',
      url: 'https://www.baidu.com',
      audioUrl: '/demoMusic/富士山下.mp3'
    }
  ];
  created() {
    let that = this;
    this.defaultData.push(this.defaultData[0], this.defaultData[0]);
    function set(key, obj) {
      if (!that.compAttr[key]) {
        that.$set(that.compAttr, key, obj);
      }
    }
    set('postionAttr', { bottom: '25px' });
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
          desc: '描述',
          key: 'dsc',
          tableMap: ''
        },
        {
          desc: '时间',
          key: 'times',
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
          desc: '音频地址',
          key: 'audioUrl',
          tableMap: ''
        },
        {
          desc: '是否已读',
          key: 'isRead',
          tableMap: ''
        }
      ];
    }
  }
  goTo(url) {
    if (location.hash.search('/designer/') === -1) {
      location.href = url;
    } else {
      this.$message.info('请在预览中测试跳转链接');
    }
  }
  showPoup(data?) {
    this.option.show = !this.option.show;
    this.audioData = data || {};
    this.option.play = false;
    if (this.option.show) {
      this.$nextTick(() => {
        this.play();
      });
    }
  }
  play() {
    let audio: HTMLAudioElement = this.$refs.audio as HTMLAudioElement;
    if (this.option.play) {
      audio.pause();
    } else {
      audio.play();
    }
    this.option.play = !this.option.play;
  }
  async getListData(tableName, params) {
    console.log(params, 'param')
    Object.assign(this.params, params);
    /*  for (let k of Object.keys(this.params)) {
      if (!this.params[k]) {
        delete this.params[k];
      }
    } */
    if (tableName) {
      console.log(this.params, 'sf')
      let res = await getTableContent(tableName, this.params);
      this.dataSource = 'apiData';
      this.apiData = res.data || [];
    }
  }
  // 根据数据绑定的条件更新列表 key为需要查询的字段
  updatedList(filters:{key:string, value:any}) {
    console.log(filters, 'fsf')
    let name = this.compData.dataModel.tableName;
    let key = filters.key// this.compData.dataModel.mapData[7].tableMap;
    let params = {};
    if (name && key) {
      params[key] = filters.value
    }
    this.getListData(name, params)
  }
  // 直接更新数据，适用于已得到数据的情况
  updatedData(data:{
      imgUrl: string,
      title: string,
      dsc:string,
      times: number,
      total: number,
      url: string,
      audioUrl: string
    }[]) {
    this.dataSource = 'userData'
    console.log('更新数据')
    this.defaultData = data;
  }
}
</script>
<style lang='less' scoped>
.warp {
  width: 100%;
  text-align: left;
}
.list-warp {
  overflow: hidden;
  margin-bottom: 0;
}
.img-warp > img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.no-data-tip{
  text-align: center;
  line-height: 25px;
  font-size: 18px;
  color: #9d9d9d
}
.list-warp > li {
  font-size: 13px;
  color: #9d9d9d;
  padding-left: 92px;
  height: 106px;
  position: relative;
  margin-top: 25px;
  margin-bottom: 8px;
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
    padding-bottom: 5px;
  }
  .dsc {
    height: 42px;
    text-overflow: ellipsis;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .other-dsc > .time {
    padding-right: 10px;
  }
  .button-warp {
    text-align: right;
    span {
      cursor: pointer;
    }
    .button1 {
      color: #747474;
    }
    .icon1 {
      margin-right: 2.5px;
    }
    .icon {
      margin-right: 5px;
    }
    .button2 {
      border-radius: 15px;
      background-color: #f3f2f0;
      padding: 5px 10px;
      color: #c27f5d;
      margin-left: 15px;
    }
  }
}
.list-warp > li:first-child {
  margin-top: 0;
}
.play-warp {
  background-color: #fff;
  position: fixed;
  left: 3%;
  width: 94%;
  bottom: 25px;
  height: 54px;
  box-sizing: border-box;
  padding-left: 50px;
  overflow: hidden;
  z-index: 99;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.4);
  .img-warp {
    overflow: hidden;
    height: 100%;
    width: 41px;
    left: 0;
    top: 0;
    position: absolute;
  }
  .play-info {
    position: relative;
    font-size: 12px;
    color: #9e9e9e;
    .title {
      color: #3c3c3c;
      font-size: 15px;
      line-height: 30px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 72%;
    }
  }
  .option {
    position: absolute;
    height: 60%;
    right: 0;
    top: 25%;
    font-size: 18px;
    color: #959595;
    .icon {
      margin: 0 15px 0 2.5px;
      cursor: pointer;
    }
  }
}
</style>

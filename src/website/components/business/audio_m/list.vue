
<template>
  <div class="warp">
    <div
      class="play-warp"
      v-if="option.show"
      :style="compAttr.postionAttr"
    >
      <div class="img-warp"><img :src="audioData.imgUrl"></div>
      <div class="play-info">
        <div class="title">{{ audioData.title }}</div>
        <div class="time">{{ audioData.times|formatTime }} 每天听本书</div>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Icon } from 'ant-design-vue';
@Component({
  name: 'm-audio-component',
  components: {
    AIcon: Icon
  },
  filters: {
    formatTime: (time: number) => {
      time = parseInt((time / 1000).toString());
      let m = time % 60;
      time = parseInt((time / 60).toString());
      return time + '分' + m + '秒';
    }
  }
})
export default class tableComponent extends Vue {
  audioData: any = {
    imgUrl: '/images/user.png',
    title: '《赢》| 张凯解读',
    dsc:
      '通用电气前CEO杰克·韦尔奇，告诉你赢得商业竞争和职场竞争的秘诀秘诀秘诀秘诀',
    times: (27 * 60 + 37) * 1000,
    total: '30',
    url: '',
    audioUrl: '/demoMusic/富士山下.mp3'
  };
  @Prop() compData: any;
  compAttr: any = this.compData.compAttr;
  option: any = {
    show: true,
    play: false
  };

  created() {
    let that = this;
    function set(key, obj) {
      if (!that.compAttr[key]) {
        that.$set(that.compAttr, key, obj);
      }
    }
    set('postionAttr', { bottom: '2.5px' });
  }
  showPoup(data) {
    data = data || {};
    if (!data.audioUrl) {
      return false;
    } else {
      this.audioData = data;
    }
    this.option.show = !this.option.show;

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
}
</script>
<style lang='less' scoped>
.warp {
  width: 100%;
  text-align: left;
}

.img-warp > img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
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
      margin: 0 15px 0 3px;
      cursor: pointer;
    }
  }
}
</style>

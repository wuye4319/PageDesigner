<template>
  <div class="active-mobile">
    <a-list
      :grid="pageData"
      :dataSource="navData"
      :class="{vertical:pageData.direction === 'column'}"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
        class="item"
      >
        <a-card
          class="my-card"
          hoverable
          :style="{width: pageData.itemWidth}"
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
            >{{ item.cont }}</p>
          </a-card-meta>
          <div class="card-foot" v-if="pageData.direction === 'row'">
            <div class="card-time">2019-08-08</div>
            <div class="card-address">{{ item.desc }} </div>
            <div class="card-people">60人报名</div>
          </div>
          <div class="card-foot" v-else-if="pageData.direction === 'column'">
            {{ item.desc }}
          </div>
          <div
            v-show="pageData.titleChecked"
            class="card-title"
          >
            <a-icon :type="item.icon"/>
            {{ item.type }}
          </div>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { List, Input, Card, Icon } from 'ant-design-vue';
const webSite = namespace('webSite');

const rowData = [
  { src: 'http://pic.taiyasaifu.com/UF/ArticleWX/201747/1084/7634/2958034/pc/201711211219460652.jpeg', cont: '6月25日，区委书记王强以南山区新时代文明实践志愿服务总队长的身份参加“垃圾分类”志愿服务，到南山区生活垃圾分类减量展示馆向参加暑期社会实践的小学生宣讲垃圾分类知识，以实际行动感召广大干部群众积极参与到新时代文明实践志愿服务活动中。', href: '', icon: 'cloud', type: '宣传日报', desc: '南山区南山街道南园社区德馨街3号三楼' },
  { src: 'http://www.wulanchabu.gov.cn/ewebeditor/uploadfile/2016/05/17/20160517083016893.jpg', cont: '为让社区青少年更好的发展兴趣爱好，提升艺术品位，南园社区党群服务中心联合蛇口国际学校（以下简称SIS）师生开展了“追梦新时代”大、小提琴培训。根据中心《志愿者管理制度》中的“有名额限制的公益服务资源志愿者优先原则”，参与本次大小提琴培训的青少年皆为小志愿者亦或是志愿者的家人。本次培训有五位SIS师生教课，共十名青少年参与，课程将延续到本学期期末。同时为了提升参与者的熟悉度，以便更快更好的学会，SIS给参与的青少年租借了大、小提琴，让他们可以在家练习。4月4日为大、小提琴培训的第一节课，参与的青少年都早早的来到训练教室，兴奋的等待老师的到来。本次课程实行一对二的教学模式，根据参与者的特点分配了大、小提琴。老师们从最基本的拿、放大小提琴开始教起，逐步教大家认识琴的各个部位以及简单的要领。尽管有的语言不通，但是大家靠着肢体语言也能理解顺畅。第一节课结束后，参与者都表达了对大小提琴的热爱，也对能够把琴带回家练习表现出了欣喜，期待着下节课的到来。', icon: 'cloud', type: '公益平台', desc: '南山区南山街道南园社区德馨街3号三楼' },
  { src: 'http://images1.wenming.cn/web_sx/ptlm_wmcj/201509/W020150901553643902852.jpg', cont: '南山流行音乐节作为深圳万众瞩目的城市音乐盛事，汇聚全城乐迷。享誉国际乐坛的小提琴演奏家朱丹携手法国著名钢琴演奏家Julien Quentin、国家大剧院管弦乐团特邀首席大提琴家——朱亦兵和深圳莫扎特音乐周艺术总监＆音乐鼓舞钢琴交响乐团团长——康咏泽，共同为深圳市民带来一场古典与流行碰撞，经典与现代相交融的新潮古典流行音乐会。以音乐为联结，为市民们开启一场穿越时间与空间的跨世纪音乐之旅。', icon: 'search', type: '理论宣讲', desc: '南山区南山街道南园社区德馨街3号三楼' },
  { src: 'https://www.banbaowang.com/uploads/allimg/170824/37-1FR4092P90-L.jpg', cont: '有这样一个机会，能让孩子在自由的空间里，充分发挥他们无尽的创造力，任意舞动着他们的手指，绘出绚烂的3D立体作品，这一次，把笔交给孩子，看看他们眼中的奇妙世界。南山区党群服务中心定于12月16日（周日）开展亲子科技乐园系列活动，诚邀您带上孩子参与3D打印笔体验，让孩子突破二维空间的限制，充分发挥他们奇思妙想的能力，既能加强孩子的创新力和空间想象力，又可以锻炼孩子的实践能力，创造出一份独一无二的作品。', icon: 'search', type: '科技服务', desc: '南山区南山街道南园社区德馨街3号三楼' },
  { src: 'http://img.juimg.com/tuku/yulantu/140126/328075-1401261S24296.jpg', cont: '南山区党群服务中心定于6月22日（周一）开展“红色鹊桥”主题联谊交友活动，诚邀你前来寻找美好情缘。“红色鹊桥”公益项目诞生于全国知名的经济大区、科技强区、创新高地——深圳南山区。项目由南山区委组织部指导，深圳市高新技术产业园区党委、南山区企业发展服务中心主办，珍爱家公益服务中心承办，独创“线上精准匹配+线下联谊活动+公益红娘”的模式，搭建的公益婚恋交友平台，服务于南山辖区内的高素质有志单身男女，解决单身男女交友难、婚恋难的问题，让幸福触手可及。', href: '', icon: 'search', type: '宣传日报', desc: '南山区南山街道南园社区德馨街3号三楼' }
];

const columnData = [
  { src: 'https://ss0.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=923850557,1363320823&fm=27&gp=0.jpg', cont: '南方有座山，一张青春的脸。桃源街道开展青春快闪活动，在最美的南山，遇见最好的你。', desc: '文明实践中心', icon: 'search' },
  { src: 'https://ss1.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1034947532,2260278233&fm=27&gp=0.jpg', cont: '在育才三小学校操场，一场别开生面的“快闪”表演精彩上演。活动中，全体师生、家长、蛇口边检警察、社区居民等1500余人共同唱响爱国歌曲《大中国》，向新中国70华诞表达最美好的祝愿。', desc: '文明实践中心', icon: 'search' },
  { src: 'https://ss2.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3355919771,686348055&fm=27&gp=0.jpg', cont: '前海港湾小学唱响《红旗飘飘》，随着悠扬的歌声响起，孩子们、家长们都自发地寻找歌声，聚到一起。如果奇迹有颜色， 那一定是中国红 。', desc: '文明实践中心', icon: 'search' },
  { src: 'http://img.zcool.cn/community/03835d256de694a6ac72531cbd04f51.jpg', cont: '“我和我的祖国，一刻也不能分割，无论我走到哪里，都流出一首赞歌。”耳熟能详的《我和我的祖国》响起，博伦师生唱响中华儿女浓浓爱国情！', desc: '文明实践中心', icon: 'search' },
  { src: 'http://pic71.nipic.com/file/20150707/8665245_110040837000_2.jpg', cont: '一场别开生面的快闪在南山医院举行，熟悉的旋律响彻医院。他们，用自己的方式歌唱我们的祖国，诉说着对祖国的热爱。', desc: '文明实践中心', icon: 'search' }
];

@Component({
  name: 'active-mobile',
  components: {
    AList: List,
    AListItem: List.Item,
    AInput: Input,
    ACard: Card,
    ACardMeta: Card.Meta,
    AIcon: Icon
  }
})

export default class activemobile extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  get navData() {
    let data = this.pageData.direction === 'column' ? columnData : rowData;
    return data;
  }

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  created():void {

  }
}
</script>

<style lang="less" scoped>
.active-mobile {
  margin: 0 auto;
  text-align: left;
}

.desc {
  margin-top: 10px;
  text-overflow: ellipsis;
  display: block;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.my-card {
  position: relative;
  border: none;
  /deep/ .ant-card-body{
    padding: 0;
  }
  .card-title {
    position: absolute;
    left: 10px;
    top: 20px;
    opacity: .5;
    background: rgba(0,0,0,.2);
    border-radius: 15px 15px 15px;
    z-index: 6;
    color: #fff;
  }
  .card-foot {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .card-address {
    width: 140px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.vertical {
  /deep/ .ant-row {
    display: flex;
    overflow: auto;
  }
  .item {
    width: 200px;
    margin-right: 50px;
  }
  .my-card {
    width: 200px;
  }
}
</style>

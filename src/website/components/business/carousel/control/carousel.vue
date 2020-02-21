<template>
  <a-list itemLayout="horizontal">
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">箭头显示:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="开"
        unCheckedChildren="关"
        v-model="arrows"
        @change="changeVal('arrows')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">动画效果函数:</div>
      </a-list-item-meta>
      <a-radio-group @change="changeVal('effect')" v-model="effect">
        <a-radio value="scrollx">默认</a-radio>
        <a-radio value="fade">渐显</a-radio>
      </a-radio-group>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">是否垂直:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="是"
        unCheckedChildren="否"
        v-model="vertical"
        @change="changeVal('vertical')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">自动播放:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="是"
        unCheckedChildren="否"
        v-model="autoplay"
        @change="changeVal('autoplay')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">显示面板指示点:</div>
      </a-list-item-meta>
      <a-switch
        checkedChildren="是"
        unCheckedChildren="否"
        v-model="dots"
        @change="changeVal('dots')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">图片高度:</div>
      </a-list-item-meta>
      <a-input
        placeholder="Basic usage"
        v-model="height"
        @blur="changeVal('height')"
      />
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <div slot="description">图片宽度:</div>
      </a-list-item-meta>
      <a-input
        placeholder="Basic usage"
        v-model="width"
        @blur="changeVal('width')"
      />
    </a-list-item>

    <a-list-item>
      <a-list-item-meta>
        <div slot="description">数据:</div>
      </a-list-item-meta>
      <div class="add">
        <a-button
          type="primary"
          size="small"
          class="handle-add"
          icon="plus"
          @click="addOptions"
        >添加</a-button>
      </div>
    </a-list-item>
    <div class="cont-base  ">
      <a-list-item v-for="(item,i) of data" :key="i">
        <div class="mylist-base">
          <div class="handle-base">
            <a-button
              type="danger"
              size="small"
              class="handle-icon"
              shape="circle"
              icon="delete"
              @click="deleteOptions(i)"
            />
          </div>
          <div class="list-data-base">
            <div class="item-base">
              <div class="name-base">图片标题{{ i+1 }}</div>
              <div class="desc-base"><a-input v-model="item.alt"/></div>
            </div>
            <div class="item-base">
              <div class="name-base">图片地址{{ i+1 }}</div>
              <div class="desc-base">
                <a-input v-model="item.src"/>
              </div>
            </div>
            <div class="item-base">
              <div class="name-base">跳转{{ i+1 }}</div>
              <div class="desc-base">
                <a-select
                  v-model="item.urlType"
                  style="width:100%"
                  @change="handleChange"
                >
                  <a-select-opt-group label="取消跳转">
                    <a-select-option value="无操作">无操作</a-select-option>
                  </a-select-opt-group>
                  <a-select-opt-group label="本地路由">
                    <a-select-option
                      v-for="item of pageList"
                      :key="item"
                      :value="item"
                    >{{ item }}</a-select-option>
                  </a-select-opt-group>
                  <a-select-opt-group label="自定义链接">
                    <a-select-option value="用户自定义">自定义</a-select-option>
                  </a-select-opt-group>
                </a-select>
              </div>
            </div>
            <div class="item-base" v-if="item.urlType === '用户自定义'">
              <div class="name-base">链接{{ i+1 }}</div>
              <div class="desc-base"><a-input v-model="item.url"/></div>
            </div>
            <div class="item-base">
              <div class="name-base">打开方式{{ i+1 }}</div>
              <div class="desc-base">
                <a-select style="width:100%" v-model="item.openType">
                  <a-select-option value="_blank">新页面</a-select-option>
                  <a-select-option value="_self">本页面</a-select-option>
                </a-select>
              </div>
            </div>
          </div>
        </div>
      </a-list-item>
    </div>

    <!-- api描述提示 -->
    <api-user-tip :apiList="apiList"/>
  </a-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { List, Switch, Input, Radio, Button, Select } from 'ant-design-vue';
import { apiUserTip } from '@/website/components/common'; // api提示

const webSite = namespace('webSite');

@Component({
  name: 'header-component',
  components: {
    apiUserTip,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    AInput: Input,
    ASwitch: Switch,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    AButton: Button,
    aSelect: Select,
    aSelectOption: Select.Option,
    aSelectOptGroup: Select.OptGroup
  }
})
export default class headerComponent extends Vue {
  @Prop()
  compData: any
  @Prop()
  compIndex: number

  effect:string = 'scrollx'
  height:string = '200px'
  width:string = '100%'
  arrows:boolean = true
  dots:boolean = true
  vertical:boolean = false
  autoplay:boolean = false
  pageData:any = this.compData
  data: object[] = [] // 轮播图数组
  apiList:any[]=[ // api提示
    { dsc: '//获取当前页码', api: 'getSlideNumber():number' },
    { dsc: '//下一张', api: 'next()' },
    { dsc: '//上一张', api: 'prev()' }
  ]

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Getter('appInfor')
  appInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  get pageList() {
    let comps = Object.keys(this.appInfor);
    return comps;
  }

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
  }

  // 添加选项
  addOptions() {
    if (this.data.length > 10) {
      this.$message.error('超出上限！')
      return
    }
    this.data.push({ src: '', url: '', urlType: '无操作', alt: '', openType: '_blank' });
  }

  // 删除选项
  deleteOptions(i) {
    this.data.splice(i, 1)
  }

  // 选择框
  handleChange(item) {

  }
}
</script>
<style lang='less' scoped>
.mylist-base {
  width: 100%;
  .handle-base {
    text-align: right;
    margin-bottom: -30px;
    margin-right: 5px;
  }
.cont-base {
  height: 400px;
  overflow: auto;
}
.item-base {
  margin-top: 10px;
  display: flex;
  align-items: center;
  width: 200px;
  .name-base {
    margin-right: 15px;
    width: 80px;
    text-align: right;
  }
  .desc-base {
    flex: 1;
  }
}
}

</style>

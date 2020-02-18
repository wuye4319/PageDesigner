<template>
  <div class="app-group-item" @click="openItem">
    <figure class="app-group-item__icon" :class="`random--${randomColor}`">
      <i class="icon aufontAll" :class="icon"></i>
    </figure>
    <span class="app-group-item__name">{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'app-group-item'
})
export default class AppGroupItem extends Vue {
  @Prop() icon!: string;

  @Prop() name!: string;

  @Prop() code!: string;

  @Prop() type!: string;

  @Prop() openMode!: string;

  @Prop() pcUrl!: string;

  @Prop() parentId!: string;

  get appCode() {
    return window.Environment && window.Environment.appCode;
  }

  get randomColor() {
    const letter:string = this.code.replace(/^([a-zA-Z]).+?$/, '$1');
    const index:number = 'abcdefghijklmnopqrstuvwxyz'.indexOf(letter.toLowerCase()) + 1;
    const position:number = index % 4 + 1;
    return `${position}`;
  }

  openItem() {
    if (this.type === 'BizModel') {
      this.bizModelGo();
    } else if (this.pcUrl) {
      this.pageGo();
    } else {
      this.$message.error('页面地址未设置，请联系管理员！');
    }
  }

  pageGo() {
    if (this.openMode === 'RECENT_PAGE_MODE') {
      this.$router.push({
        name: 'appDefine',
        params: {
          url: this.pcUrl
        },
        query: {
          parentId: this.parentId,
          code: this.code,
          openMode: this.openMode,
          pcUrl: this.pcUrl,
        },
      });
    } else if (this.openMode === 'NEW_PAGE_MODE') {
      window.open(this.pcUrl);
    } else {
      this.$router.push({
        path: this.pcUrl,
        query: {
          parentId: this.parentId,
          code: this.code,
          openMode: this.openMode,
          pcUrl: this.pcUrl,
        },
      });
    }
  }

  bizModelGo() {
    this.$router.push({
      name: 'appList',
      params: {
        appCode: this.appCode,
        schemaCode: this.code,
        displayName: this.name
      }
    });
  }
}

</script>
<style lang='less' scoped>

@import '../../common/assets/icons/iconfont.css';

.app-group-item {
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;
  width: 160px;
  height: 68px;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background: #F4F6FC;
  border-radius: 4px;
  cursor: pointer;
  // border:1px solid rgba(177,187,197,0.5);

  &__icon {
    display: inline-block;
    vertical-align: middle;
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin: 0;
    background: rgba(24, 144, 255, 1);
    border-radius: 8px;
    text-align: center;
    color: #fff;
    &.random {
      &--1 {
        background-color: #40A9FF;
      }
      &--2 {
        background-color: #36CFC9;
      }
      &--3 {
        background-color: #73D13D;
      }
      &--4 {
        background-color: #FFA940;
      }
    }
  }
  &__name {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
    max-width: 84px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(0, 0, 0, 0.85);
    // line-height: 20px;
  }
}
</style>

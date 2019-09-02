<template>
  <div class="nav-mobile" :style="{width:pageData.width}">
    <a-list
      :grid="pageData"
      :dataSource="navData"
      :bordered="false"
    >
      <a-list-item slot="renderItem">
        <a-card
          hoverable
        >
          <a-icon class="card-icon" type="safety-certificate"/>
          <a-card-meta>
            <template slot="description">产品类型</template>
          </a-card-meta>
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
  { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', title: '', href: '' }, { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', title: '', href: '' }, { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', title: '', href: '' }, { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', title: '', href: '' }, { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', title: '', href: '' }, { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', title: '', href: '' }, { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', title: '', href: '' }, { src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', title: '', href: '' }
]

@Component({
  name: 'nav-mobile'
})

export default class Navmobile extends Vue {
  @Prop() compData: any

  pageData:any = this.compData.compAttr

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  get navData():object[] {
    let row = this.pageData.row;
    let column = this.pageData.column;
    let maxLen = row * column;
    let arr = [];
    if (maxLen > numberData.length) {
      arr = numberData
    } else {
      arr = numberData.slice(0, maxLen)
    }
    return arr
  }

  created():void {

  }
}
</script>

<style lang="less" scoped>
.nav-mobile {
  margin: 0 auto;
}
.card-icon {
  font-size: 40px;
  color: blue;
}
</style>

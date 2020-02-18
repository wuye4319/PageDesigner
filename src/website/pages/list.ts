import { Component, Prop, Vue, Watch, Inject } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component
export default class DataBindMixins extends Vue {
  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor

  @webSite.Getter('appInfor')
  appInfor

  @Inject('showControl') listShowControl;

  // 全局
  deleteGlobal(i, fn) {
    let pageInfo: any = this.pageInfor;
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    if (!currentInfo['page-share']) {
      this.$set(currentInfo, 'page-share', {})
    }
    let appPageInfo = currentInfo['page-share'];
    if (!appPageInfo['global-list']) {
      this.$set(appPageInfo, 'global-list', [])
    }
    let listIndex = appPageInfo['global-list'].findIndex((item) => {
      let status1 = item.uid === pageInfo[i].compAttr.uid;
      let status2 = item.compName === pageInfo[i].compName;
      let status = status1 && status2;
      return status
    })
    let listClassifyIndex = appPageInfo['global-list'].findIndex((item) => {
      let status1 = item.uid === pageInfo[i].compAttr.bindUid;
      let status2 = item.compName === pageInfo[i].compAttr.bindName;
      let status3 = item['classify-compName'] === pageInfo[i].compName;
      let status = status1 && status2 && status3;
      return status
    })
    let listSortIndex = appPageInfo['global-list'].findIndex((item) => {
      let status1 = item.uid === pageInfo[i].compAttr.bindUid;
      let status2 = item.compName === pageInfo[i].compAttr.bindName;
      let status3 = item['sort-compName'] === pageInfo[i].compName;
      let status = status1 && status2 && status3;
      return status
    })
    if (listIndex > -1) {
      this.deleteList(i, listIndex, fn);
      return 'list'
    }
    if (listClassifyIndex > -1) {
      this.deleteListSon(i, listClassifyIndex, 'classify', fn);
      return 'list'
    }
    if (listSortIndex > -1) {
      this.deleteListSon(i, listSortIndex, 'sort', fn);
      return 'list'
    }
  }

  // 删除列表
  deleteList(i, listIndex, fn) {
    let pageInfo: any = this.pageInfor;
    let uid = pageInfo[i].compAttr.uid;
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    let appPageInfo = currentInfo['page-share'];
    let compName = appPageInfo['global-list'][listIndex]['compName'];
    this.$store['$emit'](`${uid}-clear`, 'classify');
    this.$store['$emit'](`${uid}-clear`, 'sort');
    let classifyIndex = this.findSonIndex('classify', listIndex);
    classifyIndex > -1 && pageInfo.splice(classifyIndex, 1);
    let sortIndex = this.findSonIndex('sort', listIndex);
    sortIndex > -1 && pageInfo.splice(sortIndex, 1);
    let index = pageInfo.findIndex(item => {
      let status1 = item.compName === compName;
      let status2 = uid === item.compAttr.uid;
      let status = status1 && status2;
      return status;
    });
    // 清理全局数据
    appPageInfo['global-list'].splice(listIndex, 1);
    fn(index)
  }

  // 删除列表子项
  deleteListSon(i, index, type, fn) {
    let pageInfo: any = this.pageInfor;
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    let appPageInfo = currentInfo['page-share'];
    let keyName = type === 'sort' ? appPageInfo['global-list'][index]['sort-key'] : appPageInfo['global-list'][index]['classify-key'];
    let sonIndex = this.findSonIndex(type, index)
    let compName = appPageInfo['global-list'][index]['compName'];
    let uid = appPageInfo['global-list'][index]['uid'];
    let pageindex = pageInfo.findIndex(item => {
      let status1 = item.compName === compName;
      let status2 = uid === item.compAttr.uid;
      let status = status1 && status2;
      return status;
    });
    pageInfo[pageindex].compAttr[keyName] = false;
    fn(sonIndex)
  }

  findSonIndex(type, index) {
    let pageInfo: any = this.pageInfor;
    let page = this.$route.params.page;
    let currentInfo = this.appInfor[page];
    let appPageInfo = currentInfo['page-share'];
    let sonName = type === 'sort' ? appPageInfo['global-list'][index]['sort-compName'] : appPageInfo['global-list'][index]['classify-compName'];
    let uid = appPageInfo['global-list'][index]['uid'];
    let compName = appPageInfo['global-list'][index]['compName'];
    let pageindex = pageInfo.findIndex(item => {
      let status1 = item.compName === sonName;
      let status2 = uid === item.compAttr.bindUid;
      let status3 = compName === item.compAttr.bindName;
      let status = status1 && status2 && status3;
      return status;
    });
    return pageindex
  }
}

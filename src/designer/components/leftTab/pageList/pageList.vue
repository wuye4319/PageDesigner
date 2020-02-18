<template>
  <div>
    <div class="header">
      <operate-modal :creatOk="createOk" />
    </div>
    <MyTree
      :treeType="'pagelist'"
      :treeData="treeData"
      :change="handleChange"
      :draggable="false"
      :actions="['edit','delete']"
      :operateTree="operateTree"
      :selectedKey="selectedKey">
    </MyTree>
    <a-modal
      title="编辑页面信息"
      v-model="visible"
      @ok="handleOk('edit',editPageInfor)"
      okText="确认"
      cancelText="取消"
      centered>
      <a-list itemLayout="horizontal">
        <a-list-item>
          <div class="model-cont">
            <div class="name">
              <span class="required">*</span>路由名称(英文):
            </div>
            <div class="desc">
              <a-input
                disabled
                placeholder="请输入需要添加的标题"
                v-model.trim="editPageInfor.title"
                @change="titleChange" />
            </div>
          </div>
        </a-list-item>
        <a-list-item>
          <div class="model-cont">
            <div class="name">
              <span class="required">*</span>页面名称:
            </div>
            <div class="desc">
              <a-input
                placeholder="请输入需要添加的页面名称"
                v-model.trim="editPageInfor.name"
                @change="nameChange" />
            </div>
          </div>
        </a-list-item>
        <a-list-item>
          <div class="model-cont">
            <div class="name"><span class="required">*</span>支持终端:</div>
            <div class="desc">
              <a-checkbox-group v-model="editPageInfor.screen" disabled>
                <a-checkbox value="mobile">移动端</a-checkbox>
                <a-checkbox value="desktop">PC端</a-checkbox>
              </a-checkbox-group>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>不同终端支持不同的组件库，选择支持多终端时，则只有在这些终端上都支持的组件才会显示出来。</span>
                </template>
                <a-icon style="color: red;margin-left: 40px" type="question" />
              </a-tooltip>
            </div>
          </div>
        </a-list-item>
        <a-list-item>
          <div class="model-cont">
            <div class="name">描述:</div>
            <div class="desc">
              <a-textarea
                placeholder="请输入需要添加的描述"
                :rows="2"
                v-model="editPageInfor.desc" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import operateModal from '@/designer/components/operateModal'; // 弹框
import MyTree from '../myTree';
import { Modal, List, Input, Checkbox, Tooltip, Icon } from 'ant-design-vue';
const webSite = namespace('webSite');

@Component({
  name: 'page-list',
  components: {
    operateModal,
    MyTree,
    AModal: Modal,
    AList: List,
    AListItem: List.Item,
    AInput: Input,
    ATextarea: Input.TextArea,
    ACheckbox: Checkbox,
    ACheckboxGroup: Checkbox.Group,
    ATooltip: Tooltip,
    AIcon: Icon

  }
})
export default class PageListComponent extends Vue {
  @webSite.Getter('appInfor')
  appInfor: Website.pageInfor;
  @webSite.Action('changePage')
  changePage;
  @webSite.Action('handleAppInfo')
  handleAppInfo;
  @webSite.State('TempAppData')
  tempAppData: Website.pageInfor;
  @webSite.Action('pageInfor')
  getPageInfor;
  @Prop() createOk;
  @Prop() pageChange;
  @Prop() changeScreenType;
  @Prop() pageSelect;
  $confirm;
  selectedKey: string = ''; // 当前选择的page
  editPageInfor: any = {};
  visible: boolean = false;

  get treeData(): any {
    let res = [];
    this.selectedKey = this.pageSelect;
    let currentRoute = this.$router.currentRoute.params.page;
    for (const key in this.appInfor) {
      let name = this.appInfor[key].title;
      res.push({ title: name + ' - ' + key, key: key });
    }
    return res;
  }

  // page变化
  handleChange(value, i) {
    let page = value.key;
    this.selectedKey = page;
    this.pageChange(page);
    this.tempAppData['selectedUid'] = '';
    this.$set(this.tempAppData, 'selectedUid', '')
  }

  // 清除元素选中状态
  clearSelected(data) {
    data &&
      data.forEach(element => {
        element.selected = false;
      });
  }

  operateTree(type, item, i, parent) {
    if (type === 'edit') {
      this.editPage(item);
    }
    if (type === 'delete') {
      this.deletePage(item);
    }
  }
  editPage(item) {
    this.visible = true;
    let screen = this.appInfor[item.key].screen;
    this.editPageInfor = {
      key: item.key,
      title: item.key,
      screen: screen === 'both' ? ['desktop', 'mobile'] : [screen],
      name: this.appInfor[item.key].title,
      desc: this.appInfor[item.key].desc
    };
  }

  deletePage(item) {
    let self = this;
    this.editPageInfor = { title: item.key };
    this.$confirm({
      title: '确认删除该页面吗?',
      content: '删除将无法复原',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        self.handleOk('delete', item);
      }
    });
  }
  // 只能输入英文和数字
  titleChange(e) {
    this.editPageInfor.title = this.editPageInfor.title.replace(/[\W]/g, '');
  }

  // 只能输入中文、英文和数字
  nameChange(e) {
    this.editPageInfor.name = this.editPageInfor.name.replace(
      /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, // eslint-disable-line
      ''
    );
  }

  // 页面操作弹框[确定]
  handleOk(oktype?, item?) {
    let appInfor = this.appInfor;
    let successText = '';
    let deletepage = false;
    if (oktype === 'delete') {
      delete appInfor[this.editPageInfor.title];
      successText = '删除成功';
      if (this.selectedKey !== this.editPageInfor.title) {
        deletepage = true;
      }
    } else {
      let screen = this.editPageInfor.screen.length === 2 ? 'both' : this.editPageInfor.screen[0];
      appInfor[this.editPageInfor.title] = {
        ...appInfor[this.editPageInfor.title],
        title: this.editPageInfor.name,
        desc: this.editPageInfor.desc,
        screen: screen
      };
      successText = '编辑成功';
    }
    let params = {
      page: appInfor
    };

    let appID = this.$router.currentRoute.params.appID;
    // 发请求更新数据
    this.handleAppInfo({
      url: '/page/pageconfig/' + appID,
      params
    }).then(async() => {
      this.visible = false;
      this.$message.success(successText);
      if (JSON.stringify(appInfor) === '{}') {
        let currentRoute = this.$router.currentRoute.params.page;
        await this.getPageInfor({ appID: appID, page: currentRoute });
      }
      if (oktype === 'delete' && this.selectedKey === item.key) {
        // 删除本身是需要让页面跳转,createOk事件在父组件中处理逻辑
        this.createOk(oktype);
      }
    }).catch((e) => {
      console.log(e)
      this.$message.error('操作失败，请重新尝试');
    });
  }
}
</script>

<style lang='less' scoped>
.header {
  text-align: right;
  padding: 3px 6px 3px 6px;
  margin-bottom: 6px;
}
.model-cont {
  width: 80%;
  display: flex;
  .name {
    display: flex;
    align-items: center;
    margin-right: 20px;
    flex: 1;
    justify-content: flex-end;
  }
  .desc {
    flex: 1.5;
  }
  .required {
    color: #f5222d;
  }
}
</style>

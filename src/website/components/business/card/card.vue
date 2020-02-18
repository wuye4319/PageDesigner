<template>
  <div class="myCard">
    <a-list
      class="myList"
      :grid="column"
      :dataSource="listData">
      <a-list-item
        slot="renderItem"
        slot-scope="item"
        :style="{'margin-bottom':compAttr.marginBottom}">
        <a-card hoverable>
          <img
            v-if="compAttr.cover"
            :src="item.cover"
            slot="cover" />
          <template
            v-if="compAttr.actions"
            class="ant-card-actions"
            slot="actions">
            <a-icon
              v-for="(action,i) in item.actions"
              :type="action"
              :key="action + i" />
          </template>
          <a-card-meta>
            <h5
              class="overElip"
              :title="item.title"
              v-if="compAttr.title"
              slot="title">{{ item.title }}</h5>
            <p
              class="desc overElip"
              :title="item.description"
              v-if="compAttr.description"
              slot="title">{{ item.description }}</p>
            <a-avatar
              v-if="compAttr.avatar"
              slot="avatar"
              :src="item.avatar" />
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import databind from '@/common/mixin/databind.ts';
import { List, Card, Icon, Avatar } from 'ant-design-vue';
const defaultImg = require('../../../../../static/images/img.png');
const webSite = namespace('webSite');

@Component({
  name: 'card-component',
  mixins: [databind],
  components: {
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    ACard: Card,
    ACardMeta: Card.Meta,
    AAvatar: Avatar,
    AIcon: Icon,
  }
})
export default class cardComponent extends Vue {
  @Prop() compData: any;
  @Prop() compIndex: any;

  @webSite.Getter('tables')
  tables: [];
  dataModel: any = this.compData.dataModel;
  mapData: any = this.compData.dataModel.mapData;
  compAttr: any = this.compData.compAttr;
  grid: any = { gutter: 16, column: 1 };
  defaultData = [
    {
      title: '我是标题示例',
      cover: '/images/carousel3.jpg',
      actions: ['heart', 'like', 'share-alt'],
      avatar: '/images/userIcon.jpg',
      description: '我是描述示例。'
    },
    {
      title: '我是标题示例',
      cover: '/images/carousel3.jpg',
      actions: ['heart', 'like', 'share-alt'],
      avatar: '/images/userIcon.jpg',
      description: '我是描述示例。'
    },
    {
      title: '我是标题示例',
      cover: '/images/carousel3.jpg',
      actions: ['heart', 'like', 'share-alt'],
      avatar: '/images/userIcon.jpg',
      description: '我是描述示例。'
    }
  ];

  // get listData() {
  //   let result: any = [];
  //   let tableName = this.dataModel && this.dataModel.tableName;
  //   let mapData = this.dataModel && this.dataModel.mapData;
  //   // 遍历找到需要的表
  //   this.tables && this.tables.forEach((item:any) => {
  //     if (tableName === item.tableName) {
  //       let content:any = item.content;
  //       // 遍历表内容，根据映射去对应的值
  //       content && content.forEach(element => {
  //         let cardData: any = {}
  //         this.mapData.forEach((model2:any) => {
  //           if (model2.key === 'actions') {
  //             try {
  //               cardData[model2.key] = JSON.parse(element[model2.tableMap])
  //             } catch (error) {
  //               console.log('操作选项参数不正确，请传入正确的json格式数据！')
  //               cardData[model2.key] = []
  //             }
  //           } else {
  //             cardData[model2.key] = element[model2.tableMap];
  //           }
  //         })
  //         result.push(cardData);
  //       });
  //     }
  //   })
  //   return result[0] && result || [{
  //     cover: defaultImg,
  //     title: '请添加数据绑定',
  //     description: '请添加数据绑定',
  //     avatar: defaultImg,
  //     actions: '["star","like","more"]'
  //   }];
  // }
  get column() {
    let column = this.compAttr.column;
    return { gutter: 24, column: column };
  }
  created() {}

  mounted() {}
}
</script>
<style lang='less' scoped>
.myList {
  width: 100%;
  /deep/.ant-row {
    margin: 0 !important;
    display: flex;
    flex-wrap: wrap;
    & > div {
      padding: 0 !important;
      // margin-bottom: 8px;
    }
  }
  /deep/.ant-card-body {
    padding: 12px;
  }
  /deep/.ant-list-item {
    margin: 0;
  }
  /deep/.ant-card-actions {
    background: white;
  }
}
.myCard {
  width: 100%;
  display: flex;
  padding: 10px 10px;
  justify-content: space-around;
}
.overElip {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 14px;
}
.desc {
  height: 32px;
  line-height: 32px;
  width: 100%;
  margin-bottom: 0;
  font-size: 12px;
}
</style>

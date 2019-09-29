
  <template>
  <div class="myList">
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
          <!-- <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          /> -->
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

const webSite = namespace("webSite");

@Component({
  name: "card-component",
  components: {}
})
export default class cardComponent extends Vue {
  data = [
    {
      title: "Ant Design Title 1"
    },
    {
      title: "Ant Design Title 2"
    },
    {
      title: "Ant Design Title 3"
    },
    {
      title: "Ant Design Title 4"
    }
  ];
  created() {}

  mounted() {}
}
</script>
<style lang='less' scoped>
.myList {
  width: 100%;
  /deep/.ant-list-item-meta{
    text-align: left;
    padding-left: 20px;
  }
}
</style>

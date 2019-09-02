<template>
  <div class="myapp">
    <a-list
      :grid="{ gutter: 16, column: 3 }"
      :dataSource="myappData"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card
          hoverable
          style="width: 240px"
          @click="myclick(item.router)"
          class="mycard"
        >
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta
            :title="item.title"
          >
            <template slot="description">{{ item.desc }}</template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';
import { App } from '../../store/types';

const app = namespace('app');
const data = [{ title: '我的应用', desc: '应用新增、应用管理', router: 'manage' }, { title: '我的收藏', desc: '收藏的所有应用都在这', router: 'collect' }, { title: '我的分享', desc: '即刻分享创建的应用', router: 'share' }]

@Component({
  name: 'myapp-component'
})

export default class myappComponent extends Vue {
  $router
  myappData:object[] = data

  @app.Getter('myapp')
  mydata:object

  @app.Action('myapp')
  myappAction;

  @app.Mutation('myapp')
  myappMutation;

  created():void {

  }

  myclick(name) {
    this.$router.push({
      name: `myapp-${name}`
    })
  }
}
</script>

<style lang='less' scoped>
.myapp {
  padding-top: 100px;
}

</style>

<template>
  <div class="complist">
    <div class="list" v-if="classifyComp.base.length">
      <div class="description">基础</div>
      <div class="details">
        <a-popover placement="topRight"
            v-for="(base,i) of classifyComp.base"
            :key="i">
          <template slot="content" width="200px">
            <div style="width: 200px;height: 60px;over-flow: hidden;">
            <img :src="require('../../../../static/images/' + base.compName + '.png')" v-on:error="imgError" width="100%"/>
            </div>
          </template>
          <span slot="title">{{base.title}}</span>
          <a-button
            class="compItem"
            @click="addComp(base)"
          >
            {{ base.compName }}
          </a-button>
        </a-popover>
      </div>
    </div>

    <div class="list" v-if="classifyComp.effect.length">
      <div class="description">功能</div>
      <div class="details">
        <a-popover placement="topRight"
          v-for="(effect,i) of classifyComp.effect"
          :key="i"
        >
          <template slot="content" width="200px">
            <div style="width: 200px;height: 180px;over-flow: hidden;">
              <img :src="require('../../../../static/images/' + effect.compName + '.png')" v-on:error="imgError" width="100%" />
            </div>
          </template>
          <span slot="title">{{effect.title}}</span>
          <a-button
            class="compItem"
            @click="addComp(effect)"
          >
            {{ effect.compName }}
          </a-button>
        </a-popover>
      </div>
    </div>

    <div class="list" v-if="classifyComp.business.length">
      <div class="description">业务</div>
      <div class="details">
        <a-popover placement="topRight"
          v-for="(business,i) of classifyComp.business"
          :key="i"
        >
          <template slot="content">
            <div style="width: 200px;height: 180px;over-flow: hidden;">
              <img :src="require('../../../../static/images/' + business.compName + '.png')" v-on:load="imgError" width="100%" alt=""/>
            </div>
          </template>
          <span slot="title">{{business.title}}</span>
          <a-button
            class="compItem"
            @click="addComp(business)"
          >
            {{ business.compName }}
          </a-button>
        </a-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Promise } from 'q';

const webSite = namespace('webSite');

interface ComponentVal {
  type?:string,
  compName?: string,
  compAttr?: object,
  [propName: string]: any;
}

@Component({
  name: 'comp-store-component',
  components: {}
})
export default class compStoreComponent extends Vue {
  @Prop() compData: Array<object>

  @webSite.Mutation('addPageInfor')
  addPageInfor: any

  get classifyComp() {
    let obj = {
      base: [],
      effect: [],
      business: []
    };

    this.compData.forEach((item:ComponentVal) => {
      obj[item.type].push(item)
    })
    return obj
  }

  created() {
  }

  mounted() {
  }

  addComp(comp: object) {
    this.addPageInfor(comp)
  }

  imgError(e){
    let target = e.target || {};
    target.src = require('../../../../static/images/default.png');
    target.onerror = null;
  }
}

</script>
<style lang='less' scoped>
.details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .compItem {
    width: 45%;
    margin-right: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    &:nth-child(even) {
      margin-right: 0;
    }
  }
}
.description {
  margin-bottom: 10px;
}
.list {
  border-bottom: 1px solid rgb(196, 187, 187);
  margin-bottom: 20px;
}
</style>

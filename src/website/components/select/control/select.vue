<template>
  <div class="input-component">
    <a-list itemLayout="horizontal">
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">宽度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="width"
          @blur="changeVal('width')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">size:</div>
        </a-list-item-meta>
        <div>
          <a-radio-group
            class="radio-group"
            name="radioGroup"
            v-model="size"
            @change="changeVal('size')"
          >
            <a-radio value="large">large</a-radio>
            <a-radio value="default">default</a-radio>
            <a-radio value="small">small</a-radio>
          </a-radio-group>
        </div>
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体大小:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="fontSize"
          @blur="changeVal('fontSize')"
        />
      </a-list-item>

      <a-list-item>
        <a-list-item-meta>
          <div slot="description">字体颜色:</div>
        </a-list-item-meta>
        <a-input
          type="color"
          placeholder="Basic usage"
          v-model="fontColor"
          @change="changeVal('fontColor')"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Mutation, namespace } from 'vuex-class';

const webSite = namespace('webSite');

@Component({
  name: 'active-component'
})
export default class activeComponent extends Vue {
  @Prop() compData: any
  @Prop()
  compIndex: number
	pageData:any = this.compData
  width:string = ''
  height:string = ''
  imgHeight:string = ''
  borderRadius:string = ''
  borderColor:string = ''
  borderStyle:string = ''
  borderWidth:string = ''
  lineClamp: number = 2
  fontSize:string = '14px'
  fontColor:string = '#000'
  titleChecked:boolean = true
	content:any = []
	size:string = ''

  @webSite.Getter('pageInfor')
  pageInfor: Website.pageInfor;

  @webSite.Mutation('editPageInfor')
  editPageInfor;

  created(): void {
    for (let key of Object.keys(this.pageData.compAttr)) {
      this[key] = this.pageData.compAttr[key];
    }
  }

  changeVal(name) {
    this.pageData.compAttr[name] = this[name];
    this.editPageInfor({ index: this.compIndex, data: this.pageData.compAttr });
  }
}
</script>

<style lang="less" scoped>
    .input-component{
        .radio-group{
            display: flex;
            flex-direction: row;
        }
    }
</style>

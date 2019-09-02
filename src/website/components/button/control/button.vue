<template>
  <div class="button-component">
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
          <div slot="description">高度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="height"
          @blur="changeVal('height')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">外边距:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="margin"
          @blur="changeVal('margin')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">内边距:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="padding"
          @blur="changeVal('padding')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">圆角:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="borderRadius"
          @blur="changeVal('borderRadius')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">边框颜色:</div>
        </a-list-item-meta>
        <a-input
          type="color"
          placeholder="Basic usage"
          v-model="borderColor"
          @change="changeVal('borderColor')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">边框宽度:</div>
        </a-list-item-meta>
        <a-input
          placeholder="Basic usage"
          v-model="borderWidth"
          @blur="changeVal('borderWidth')"
        />
      </a-list-item>
      <a-list-item>
        <a-list-item-meta>
          <div slot="description">样式:</div>
        </a-list-item-meta>
        <div>
          <a-radio-group
            class="radio-group"
            name="radioGroup"
            v-model="borderStyle"
            @change="changeVal('borderStyle')"
          >
            <a-radio value="solid">实线</a-radio>
            <a-radio value="dashed">虚线</a-radio>
            <a-radio value="dotted">点线</a-radio>
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
  pageData:any = this.compData
  size: string = ''
  margin: string = ''
  padding: string = ''

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
    .button-component{
        .radio-group{
            display: flex;
            flex-direction: row;
        }
    }
</style>

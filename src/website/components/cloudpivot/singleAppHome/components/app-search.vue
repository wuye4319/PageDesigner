<template>
  <div class="app-search">
    <a-input
      :placeholder="placeHolder"
      type="search"
      v-model="searchKey"
      @pressEnter="search"
    />
    <div
      class="app-search__clear"
      @click="clear"
      v-show="searchKey.length > 0"
    >
      <i class="icon aufontAll h-icon-all-close-circle"></i>
    </div>
    <div class="app-search__menu" @click="search">
      <i class="icon aufontAll h-icon-all-search-o"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'app-search',
  components: {
  }
})
export default class AppSearch extends Vue {
  @Prop() placeHolder!:string;

  searchKey: string = '';

  search() {
    if (!this.searchKey) {
      return;
    }
    this.$emit('search', this.searchKey);
  }

  clear() {
    this.searchKey = '';
    this.$emit('clear');
  }
}

</script>
<style lang='less' scoped>
.app-search {
  position: relative;
  display: block;
  height: 32px;
  // padding: 0 12px;
  // border: 1px solid #d9d9d9;
  border-radius: 4px;
  &__input {
    width: 100%;
    padding-right: 30px;
    line-height: 30px;
  }
  &__clear {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 2px;
  }
  &__menu {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 2px;
  }
}
</style>

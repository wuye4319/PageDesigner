import Vue from 'vue';
interface bus extends Vue{
    compList:any;
    pageMax:number
}
// 申明插件
declare module 'vue/types/vue' {
    interface Vue {
        $bus:bus;
    }
}

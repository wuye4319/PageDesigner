import Vue from 'vue';
interface bus extends Vue{
    compList:any;
    pageMax:number
}
// 申明插件
declare module 'vue/types/vue' {
    interface Vue {
        $bus:bus;
        $addLanguage(str:string, obj:object, force?:boolean):{locale:string, messages:any, default:any};
        $i18nLocale(str:string/** 切换语言的key值 */):string;
    }
}

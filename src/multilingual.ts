
import VueI18n from 'vue-i18n';
let lanObj:{lanArr:{key:string, val:string}[], data:any, default:any} = { lanArr: [
  /* { key: 'ar_EG', val: '阿拉伯' },
  { key: 'bg_BG', val: '保加利亚语' },
  { key: 'ca_ES', val: '加泰罗尼亚语' },
  { key: 'cs_CZ', val: '捷克语' },
  { key: 'de_DE', val: '德语' },
  { key: 'el_GR', val: '希腊语' },
  { key: 'en_GB', val: '英语' }, */
  { key: 'en_US', val: '英语（美式）' },
  /* { key: 'es_ES', val: '西班牙语' },
  { key: 'et_EE', val: '爱沙尼亚语' },
  { key: 'fa_IR', val: '波斯语' },
  { key: 'fi_FI', val: '芬兰语' },
  { key: 'fr_BE', val: '法语（比利时）' },
  { key: 'fr_FR', val: '法语' },
  { key: 'is_IS', val: '冰岛语' },
  { key: 'it_IT', val: '意大利语' },
  { key: 'ja_JP', val: '日语' },
  { key: 'ko_KR', val: '韩语/朝鲜语' },
  { key: 'nb_NO', val: '挪威' },
  { key: 'nl_BE', val: '荷兰语（比利时）' },
  { key: 'nl_NL', val: '荷兰语' },
  { key: 'pl_PL', val: '波兰语' },
  { key: 'pt_BR', val: '葡萄牙语(巴西)' },
  { key: 'pt_PT', val: '葡萄牙语' },
  { key: 'sk_SK', val: '斯洛伐克语' },
  { key: 'sr_RS', val: '塞尔维亚' },
  { key: 'sl_SI', val: '斯洛文尼亚' },
  { key: 'sv_SE', val: '瑞典语' },
  { key: 'th_TH', val: '泰语' },
  { key: 'tr_TR', val: '土耳其语' },
  { key: 'ru_RU', val: '俄罗斯语' },
  { key: 'uk_UA', val: '乌克兰语' },
  { key: 'vi_VN', val: '越南语' }, */
  { key: 'zh_CN', val: '简体中文' }
  /* { key: 'zh_TW', val: '繁体中文' } */
],
data: {},
default: {} };
lanObj.lanArr.forEach(arr => {
  lanObj.data[arr.key] = {};
  lanObj.default[arr.key] = arr.val;
});

function addI18n(Vue:any) {
  Vue.use(VueI18n);
  const i18n = new VueI18n({
    locale: 'zh_CN', // 语言标识
    messages: lanObj.data
  });
    // str 语言的key值，obj:语言包的json对像，ks是否强制设置语言包，如果强制设置不支持的语言包，设计器内建文案无法得到支持，用户组件不受影响
  Vue.prototype.$addLanguage = function(str:string, obj:object, force?:boolean) {
    let type:string = Object.prototype.toString.call(obj).split(' ')[1].toLocaleLowerCase().slice(0, -1);
    let temp = lanObj.data[str] || {};
    let dData = lanObj.default[str];
    function copy(o:any) { return JSON.parse(JSON.stringify(o)); }
    let userOjb = { locale: i18n.locale, messages: copy(lanObj.data), default: copy(lanObj.default) };
    if (type !== 'object') {
      console.error('语言包不合法');
      return userOjb;
    }

    if (dData) {
      lanObj.data[str] = Object.assign(temp, obj);
    } else {
      if (str && force) {
        lanObj.data[str] = Object.assign(temp, obj);
        console.warn('不支持的语言被强制增加语言：' + str);
      } else {
        console.error('增加语言包失败，该类型语言内置组件不支持，如需强制增加请修改参数');
      }
      console.warn('支持的语言列表为：' + JSON.stringify(lanObj.default));
    }
    userOjb.messages = copy(lanObj.data);
    return userOjb;
  };
  // 切换语言
  Vue.prototype.$i18nLocale = function(str:string) {
    if (lanObj.default[str]) {
      i18n.locale = str;
      this.$root.$emit('$i18nLocale__', str);
    } else if (lanObj.data[str]) {
      i18n.locale = str;
      console.warn('切换成内置组件不支持的语言包,当前语言为:' + str + '。支持的语言列表为：' + JSON.stringify(lanObj.default));
    } else {
      console.error('语言切换失败，不存在对应的语言包');
    }
    return i18n.locale;
  };
  return i18n;
}
export default addI18n;

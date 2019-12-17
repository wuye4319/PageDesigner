export default class Tools {
  getCookie(cookie_name) {
    let allcookies = document.cookie;
    // 索引长度，开始索引的位置
    let cookie_pos = allcookies.indexOf(cookie_name);
    // 如果找到了索引，就代表cookie存在,否则不存在
    if (cookie_pos !== -1) {
      let strcookie = document.cookie; // 获取cookie字符串
      let arrcookie = strcookie.split('; '); // 分割
      let value = '';
      // 遍历匹配
      for (let i = 0; i < arrcookie.length; i++) {
        let arr = arrcookie[i].split('=');
        if (arr[0] === cookie_name) {
          value = arr[1];
        }
      }
      if (cookie_name === 'userID' && !value) {
        window.location.hash = '/login';
      }
      return value;
    }
  }

  setCookie(cookie_name, cookie_value) {
    document.cookie = cookie_name + '=' + cookie_value;
  }
}

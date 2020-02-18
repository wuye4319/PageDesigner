(function flexible(window, document) {
  var realWidth = window.screen;
  realWidth = realWidth.width > realWidth.height ? realWidth.height : realWidth.width;
  var dpr = parseInt(window.devicePixelRatio);
  // adjust body font size
  function setBodyFontSize() {
    if (document.body) { document.body.style.fontSize = (14 * dpr) + 'px'; } else { document.addEventListener('DOMContentLoaded', setBodyFontSize) }
  }
  function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone',
      'SymbianOS', 'Windows Phone',
      'iPad', 'iPod'];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  };
  setBodyFontSize();
  var obj = { w: 0, h: 0 }
  function rem() {
    dpr = dpr >= 2 ? 2 : 1;
    setBodyFontSize();
    var win = window;
    var d = win.document;
    var dw = win.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
    var dh = win.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
    if (dw === obj.w) {
      return false;
    }
    obj.w = dw;
    obj.h = dh;
    if (dh > 372) {
      dw = dw > dh ? dh : dw;
    }
    if (realWidth > 750 || IsPC()) {
      dpr = 1;
      dw = 375;
    }
    if (dpr === 2 && realWidth * dpr !== dw) {
      dw = realWidth * dpr
    }
    if (dpr === 1) {
      var m = document.getElementsByName('viewport');
      for (var i = 0; i < m.length; i++) {
        if (m[i].nodeName === 'META') {
          m[i].setAttribute('content', 'initial-scale=1, maximum-scale=1, minimum-scale=1,user-scalable=0,width=device-width,user-scalable=no');
          break;
        }
      }
    }
    d.documentElement.style.fontSize = (dw / 10) + 'px';
    d.documentElement.setAttribute('data-dpr', dpr);
    setBodyFontSize();
  }
  rem();
  window.addEventListener('resize', function () { rem(); });
  window.addEventListener('pageshow', function (e) { if (e.persisted) { rem() } })
}(window, document))

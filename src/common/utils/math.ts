// 创建唯一id
export function genID() {
  // 随机字母的数量
  let lengthRandString: number = 6;
  return getRanNum(lengthRandString);
}

function getRanNum(lengthRandString) {
  let tim = Date.now().toString().substring(4)
  let codeBox = Array.from(tim)
  for (var i = 0; i < lengthRandString; i++) {
    const randStr = String.fromCharCode(64 + Math.ceil(Math.random() * 26));
    let randTim = Math.ceil(Math.random() * tim.length)
    codeBox.splice(randTim, 0, randStr)
  }
  return codeBox.join('');
}

// 十六进制转换成RGB颜色
export function getRGBColor(color) {
  let sColor = String(color).toLowerCase();
  // 十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }
    return sColorChange.join(',');
  }
  return sColor;
}

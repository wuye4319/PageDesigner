export const noop = () => { };

export const identity = () => { };

export const jsonParse = <T = any>(jsonString: string): T | false => {
  if (!jsonString) {
    return false
  }
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return false;
  }
};
/**
 * 获取guid类型数据
 */
export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 * 动态引入
 */
export const getCompsInfor = (basepath: string, componet: any, ctrl?: boolean) => {
  // let infor = () => import('../../website/components/header');
  // console.log(infor)
  // return infor
  if (Array.isArray(componet)) {
    let tempComponent = []
    for (let i in componet) {
      let url = basepath + componet[i]
      let lastFile: string = ctrl ? '/control/index.ts' : '/index.ts'
      let infor = () => import('../../' + url + lastFile);
      tempComponent.push(infor)
    }
    return tempComponent
  } else {
    let url = basepath + componet
    let lastFile: string = ctrl ? '/control/index.ts' : '/index.ts'
    let tempComponent: any = () => import('../../' + url + lastFile);
    return tempComponent
  }
}
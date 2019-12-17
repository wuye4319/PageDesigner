export const noop = () => { };

export const identity = () => { };

export const jsonParse = <T = any>(jsonString: string): T | false => {
  if (!jsonString) {
    return false;
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
};
/**
 * 动态引入
 */
export const getCompsInfor = (basepath: string, component: any, ctrl?: boolean) => {
  if (Array.isArray(component)) {
    let tempComponent = [];
    for (let i in component) {
      let infor = loadCompCode(basepath, component[i], ctrl);
      tempComponent.push(infor);
    }
    return tempComponent;
  } else {
    let tempComponent: any = loadCompCode(basepath, component, ctrl);
    return tempComponent;
  }
};

const loadCompCode = (basepath, component, ctrl) => {
  let url = '';
  if (component.type === 'custom') {
    let userID = component.userID
    url = component.type + '/' + userID + '/' + component.compName;
  } else {
    url = basepath + component.type + '/' + component.compName;
  }
  let lastFile: string = ctrl ? '/control/index.ts' : '/index.ts';
  let infor = () => import(/* webpackChunkName: "[request]" */'../../' + url + lastFile);
  return infor;
};

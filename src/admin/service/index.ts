/**
 * @desc service api
 */

import { baseUrl } from '@/common/config/env';
import axios from 'axios';

/**
 * 新增自定义组件接口
 * @param data 传参
 */
export const saveComp = (user, data) => {
  return axios.post(`${baseUrl}/page/compstore/${user}`, { params: data });
};

/**
 * 快速新增自定义组件接口
 * @param data 传参
 */
export const addComp = (user, data) => {
  return axios.post(`${baseUrl}/upload/newcomp/${user}`, { params: data });
};

// 修改组件
export const editComp = (user, data) => {
  return axios.put(`${baseUrl}/page/compstore/${user}`, { params: data });
};

/**
 * 获取组件列表接口
 */
export const getCompStore = (user, params) => {
  return axios.get(`${baseUrl}/page/compstore/${user}`, { params: params });
};

/**
  *
  * @param user 用户ID
  * @param params {compName: ""}
  */
export const deleteCompStore = (user, params) => {
  return axios.delete(`${baseUrl}/page/compstore/${user}`, { params: params });
};

/**
 * 获取组件详情
 */
export const getCompDetail = (compID) => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.get(baseUrl + '/comps/compdetail/' + compID);
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 获取操作文档接口
 * @param docName 文件名称
 */
export const getGuideDoc = (docName) => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.get(`${baseUrl}/page/guidedoc/${docName}`);
    if (res.data) {
      resolve(res.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 获取应用列表
 * @param userID 用户ID
 * @param query 查询条件
 */
export const getApps = (userID, query) => {
  return axios.get(`${baseUrl}/page/apps/${userID}`, { params: query });
};
/**
 * 新增应用
 * @param userID 用户ID
 * @param query 查询条件
 */
export const addApp = (userID, params) => {
  return axios.post(`${baseUrl}/page/apps/${userID}`, { params: params });
};

/**
 * 分享应用
 * @param userID 用户ID
 * @param query 查询条件
 */
export const shareApp = (userID, params) => {
  return axios.post(`${baseUrl}/page/shareapp/${userID}`, { params: params });
};
/**
 *
 * @param appID
 * @param params  编辑信息
 */

export const editApp = (appID, params) => {
  return axios.put(`${baseUrl}/page/apps/${appID}`, { params: params });
};

/**
 * 删除应用
 * @param appID 应用ID
 */

export const deleteApp = (userID, appID) => {
  return axios.delete(`${baseUrl}/page/apps/${userID}`, { params: appID });
};

export const getAppDetail = (appID) => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.get(baseUrl + '/apps/appdetail/' + appID);
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};
/**
 * 修改用户数据
 */
export const editUserInfo = async (userID, data) => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.put(baseUrl + '/user/infor/' + userID, { params: data });
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 获取应用市场数据
 */
export const getAppStore = async () => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.get(baseUrl + '/apps/appstore');
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 将应用发不到应用市场
 */
export const updateAppstore = (userID, data) => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.post(baseUrl + '/apps/appstore/' + userID, { params: data });
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 获取收藏的应用
 */
export const getAppCollect = (usrID) => {
  return new Promise(async (resolve, reject) => {
    let res: any = await axios.get(baseUrl + '/apps/appcollect/' + usrID);
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 收藏应用
 */
export const addAppCollect = (userID, params) => {
  return new Promise(async (resolve, reject) => {
    let res: any = await axios.post(baseUrl + '/apps/appcollect/' + userID, { params: params });
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 删除收藏应用
 */
export const deleteAppCollect = (userID, params) => {
  return new Promise(async (resolve, reject) => {
    let res: any = await axios.delete(baseUrl + '/apps/appcollect/' + userID, { params: params });
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 获取组件市场中的组件
 */
export const getCompMarket = async () => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.get(baseUrl + '/comps/compsmarket');
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 将组件发布到组件市场
 */
export const updateCompMarket = async (userID, params) => {
  return new Promise(async (resolve, reject) => {
    let res = await axios.post(baseUrl + '/comps/compsmarket/' + userID, { params: params });
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 获取收藏的组件
 */
export const getCompCollect = (userID) => {
  return new Promise(async (resolve, reject) => {
    let res: any = await axios.get(baseUrl + '/comps/compcollect/' + userID);
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 添加收藏的组件
 */
export const addCompCollect = (userID, params) => {
  return new Promise(async (resolve, reject) => {
    let res: any = await axios.post(baseUrl + '/comps/compcollect/' + userID, { params: params });
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};

/**
 * 删除收藏的组件
 */
export const deleteCompCollect = (userID, params) => {
  return new Promise(async (resolve, reject) => {
    let res: any = await axios.delete(baseUrl + '/comps/compcollect/' + userID, { params: params });
    if (res.data.status === 200) {
      resolve(res.data.data);
    } else {
      reject(new Error('error'));
    }
  });
};
/**
 * 分享组件
 * @param userID 用户ID
 * @param query 查询条件
 */
export const shareComp = (userID, params) => {
  return axios.post(`${baseUrl}/comps/sharecomp/${userID}`, { params: params });
};

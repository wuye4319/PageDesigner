/**
 * @desc service api
 */

// import { fetch } from '../util'
import { baseUrl } from '@/common/config/env';
import axios from '@/common/config/axios';
/**
 * 获取用户数据
 */
export const getUserInfo = async (page: 0, size: number = 100) => {
  return new Promise(resolve => {
    fetch(`${baseUrl}/sheets/AAA7f25B-8435-E39f-285f-dEf2cc0fAC19?pageIndex=${page}&pageSize=${size}`).then((res) => {
      return res.json();
    }).then((myJson) => {
      resolve(myJson);
    });
  });
};

export const getPageInfor = (appID: string) => {
  return axios.get(`/page/pageconfig/${appID}`);
};

export const getProductList = (id: string, pagesize: number, page: number) => {
  return axios.get(`/topic/${id}/${pagesize}/${page}`);
};

export const handlePageInfo = (url, params) => {
  return axios.post(url, params);
};

export const getTableContent = (tableName: string, params?) => {
  return axios.get(`tables/tablecontent/${tableName}`, { params });
};

/**
 * 存储页面代码
 */
export const savePageActions = (params) => {
  return new Promise(async(resolve) => {
    let res: any = await axios.post('/page/pageaction', params);
    resolve(res);
  });
};

/**
 * 获取页面代码
 */
export const getPageActions = async (query) => {
  return new Promise(resolve => {
    let res: any = axios.get('/page/pageaction', { params: query });
    resolve(res);
  });
};
/**
 * 获取页面代码
 */
export const dataTop = async (query) => {
  return new Promise(resolve => {
    let res: any = axios.get('/tables/settop', { params: query });
    resolve(res);
  });
};

// getCompList
/**
 * 获取组件列表
 */
export const getCompList = async (query) => {
  return new Promise(resolve => {
    let res: any = axios.get('/comps/complist', { params: query });
    resolve(res);
  });
};

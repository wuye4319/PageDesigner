/**
 * @desc service api
 */

import { baseUrl } from '@/common/config/env';
import Axios from '@/common/utils/axios';
const axios = new Axios();

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

/**
 * 获取用户数据
 */
export const savePageActions = async (params) => {
  return new Promise(resolve => {
    let res: any = axios.post(baseUrl + '/pageAction',params);
    resolve(res);
  });
};

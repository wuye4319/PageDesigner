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
 * 存储页面代码
 */
export const savePageActions = (params) => {
  return new Promise(async(resolve) => {
    let res: any = await axios.post(baseUrl + '/page/pageaction', params);
    resolve(res);
  });
};

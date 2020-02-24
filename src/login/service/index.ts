/**
 * @desc service api
 */

import { baseUrl } from '@/common/config/env';
import axios from 'axios';

/**
 * 获取用户数据
 */
export const getUserInfo = async (userID) => {
  return new Promise(async resolve => {
    let res = await axios.get(baseUrl + '/user/infor/' + userID);
    if (res.data.status === 200) {
      resolve(res.data.data);
    }
  })
}

/**
 * 新增用户数据
 */
export const addUserInfo = async (data) => {
  return new Promise(async resolve => {
    let res = await axios.post(baseUrl + '/user/infor', { params: data });
    if (res.data.status === 200) {
      resolve(res.data.data);
    }
  })
}

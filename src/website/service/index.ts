/**
 * @desc service api
 */

// import { fetch } from '../util'
import { baseUrl } from '@/common/config/env'
import axios from '@/common/config/axios'

/**
 * 获取用户数据
 */
export const getUserInfo = async (page: 0, size: number = 100) => {
  return new Promise(resolve => {
    fetch(`${baseUrl}/sheets/AAA7f25B-8435-E39f-285f-dEf2cc0fAC19?pageIndex=${page}&pageSize=${size}`).then((res) => {
      return res.json();
    }).then((myJson) => {
      resolve(myJson)
    });
  })
}

export const getPageInfor = (domain: string) => {
  return axios.get(`${baseUrl}/page/pageconfig/${domain}`);
}

export const getProductList = (id: string, pagesize: number, page: number) => {
  return axios.get(`${baseUrl}/topic/${id}/${pagesize}/${page}`);
}

/**
 * @desc service api
 */

import { baseUrl } from '@/common/config/env'
import axios from 'axios';

/**
 * 上传文件接口
 * @param user 用户ID
 */
// export const uploadComp = async (user) => {
//   return axios.post(`${baseUrl}/upload/upload`);
// }

/**
 * 新增自定义组件接口
 * @param data 传参
 */
export const saveComp = async (user, data) => {
  return axios.post(`${baseUrl}/page/compstore/${user}`, { params: data });
}

/**
 * 获取组件列表接口
 */
 export const getCompStore = async (user,params) => {
  return axios.get(`${baseUrl}/page/compstore/${user}`,{params: params});
 }

 /**
  * 
  * @param user 用户ID
  * @param params {compName: ""}
  */
 export const deleteCompStore = async (user,params) => {
  return axios.delete(`${baseUrl}/page/compstore/${user}`,{params: params});
 }
/**
 * ajax函数，实现统一传参，不管任何请求都用json对像传参，该工具会根据实际情况转换contentType及格式化数据,支持FormData
 * @Author: lizuping
 * @Date: 2018-03-05
 * @Last Modified by: lizuping
 * @Last Modified time: 2019-11-20 18:07:11
 */

// 这里写请求接口
import axios from 'axios';
import { baseUrl } from '@/common/config/env';
import setLoading from './loading'
let pmN = 0;
// 0表示GET方法，1表示DELETE方法，2表示PUT方法，3 表示POST方法  （注，由于该项目所有的参数都为json传参，所以统一转换为JSON串上传,第五个参数传true则不会转换,则会变成表单传输）
/*
 *五个参数
 *参数1：int 0表示GET方法，1表示POST方法，2表示PUT方法，3表示DELETE方法
 *参数2：string 请求地址
 *参数3：object 请求数据统一为json对像，支持FormData
 *参数4：boolean 可选参数 是否出现loading 默认出现loadin ,如果传true就不会出现loading
 *参数5：boolean 可选参数 默认是json传参，如果需要按表单的形式传参该参数就传true
 */

const instance = axios.create();
instance.defaults.baseURL = baseUrl;
// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    if (response.data && response.status) {
      return response.data;
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

function pm(met: number, url: string, data?: any, noLoad?: boolean, change?: boolean) {
  met = parseInt(met.toString());
  let ks = parseInt(met.toString()) > 1 && !change && data && (typeof data === 'object' && typeof data.append !== 'function');
  if (ks) {
    data = JSON.stringify(data);
  }
  if (!noLoad) {
    pmN++;
    setLoading(true);
    //  api.Vue.$loading(true);
  }
  var cy = 'application/json; charset=UTF-8';
  var mets: string[] = ['GET', 'DELETE', 'PUT', 'POST'];

  if (change) {
    cy = 'application/x-www-form-urlencoded; charset=UTF-8';
    if (typeof data === 'object') {
      data = obj(data);
    }
  }
  function obj(b: any): string {
    var temp = '';
    for (var i in b) {
      if (b.hasOwnProperty(i)) {
        temp += i + '=' + encodeURIComponent(b[i]) + '&';
      }
    }
    return temp.slice(0, -1);
  }
  let set = met < 2;
  let setCont = false;
  if (!set && (typeof data === 'object' && typeof data.append === 'function')) {
    setCont = true;
  }
  var config = {
    method: mets[met],
    url: url,
    data: data,
    headers: setCont ? {} : { 'Content-Type': cy },
    params: set ? JSON.parse(JSON.stringify(data || {})) : {}
  };
  let p = instance(config);
  if (!noLoad) {
    p.then(
      function() {
        pmN--;
        hide();
      },
      function() {
        pmN--;
        hide();
      }
    );
  }
  return p;
}
function hide() {
  if (pmN === 0) {
    setLoading(false);
    //  api.Vue.$loading();
  }
}
// 四种请求方式的快捷方式  三个参数，第一个为请求地址，第二个为请求参数，第三个为是否出现loading,默认自动出现loading,传true为不出现loading
/* function $get(url: string, data: any, noLoad?: boolean) {
    return pm(0, url, data, noLoad);
} */
/* function $post(url:string, data:any, noLoad?:boolean, c?:boolean,) {
    return pm(1, url, data, noLoad, c);
}
function $del(url:string, data:any, noLoad?:boolean, c?:boolean,) {
    return pm(3, url, data, noLoad, c);
}
function $put(url:string, data:any, noLoad?:boolean, c?:boolean,) {
    return pm(2, url, data, noLoad, c);
}
 */
export default pm;

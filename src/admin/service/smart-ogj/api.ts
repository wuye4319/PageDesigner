import Axios from 'axios';
const instance = Axios.create();
// 本地开发用反向代理，测试环境直连云枢测试服务器，这块代码线上应当是读配置或者直接相对地址
instance.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/cloudpivot' : 'http://47.106.247.123:8080';
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求之前检测sessionstorage存有token,那么都要放在请求头发送给服务器
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
interface HttpResponse<T> {
    errcode?: number
    errmsg?: string
    data?: T
}
export default {
  // 下一级-组织树
  getOrgTree(deptIds: any, filterType?:string) {
    return instance.get(`/api/organization/department/tree`, {
      params: {
        deptIds,
        filterType
      }
    });
  },
  // 下一级-用户
  getUsersTree(deptId: string, roleId?: string, filterType?:string) {
    return instance.get(`/api/organization/department/list_user`, {
      params: {
        deptId,
        roleId,
        filterType
      }
    });
  },
  /**
   * 选人控件根据名称搜索人或部门
   * @param name
   */
  search(name: string, deptIds?: string, roleIds?: string, filterType?: string) {
    return instance.get('/api/organization/user/tree/search', {
      params: {
        name,
        deptIds,
        roleIds,
        filterType
      }
    });
  },
  getOrganizationLevel(userId: string):
  Promise<HttpResponse<any[]>> {
    return instance.get('/api/organization/department/get_user_parent_depts', {
      params: {
        userId
      }
    });
  }
}

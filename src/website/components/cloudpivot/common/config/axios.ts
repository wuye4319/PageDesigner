import axios from 'axios';

const env = (window as any).config;

const prefixs = ['/api', '/externalLink', '/login/mobile/ajax', '/public/system/config'];

const withoutTokenApis = ['/login/mobile/ajax'];

const refreshToken = async (url:string) => {
  const expiration = localStorage.getItem('expireTime') || '';
  const refresh_token = localStorage.getItem('refresh_token');
  const nowDate = new Date().getTime();
  const isOther = /login\/Authentication\/get_refresh_token/g.test(url as string);
  // 距离超时时间20分钟时刷新token
  if (
    nowDate > parseInt(expiration as string) * 1000 - 1200000 &&
    !isOther &&
    nowDate <= parseInt(expiration as string) * 1000 &&
    refresh_token
  ) {
    const params = {
      url: `${env.oauthHost}`,
      client_id: 'api',
      client_secret: `${env.secret}`,
      refresh_token,
    };
    const res = await axios.get(`${env.apiHost}/login/Authentication/get_refresh_token`, { params });
    // console.log(res);
    if (typeof res === 'object') {
      const token = (res as any).access_token;
      const refresh_tokens = (res as any).refresh_token;
      const expireTime = (res as any).exp;

      localStorage.setItem('refresh_token', refresh_tokens);
      localStorage.setItem('expireTime', expireTime);
      localStorage.setItem('token', token);

      console.log('token refreshed');
    }
  }
}

axios.interceptors.request.use((config) => {
  if (!config.url) {
    return config;
  }
  /* 请求地址前缀处理 */
  if (prefixs.some((pre:string) => config.url.slice(0, pre.length) === pre)) {
    config.url = `${env.apiHost}${config.url}`;
  }
  /* token携带 */
  if (!withoutTokenApis.includes(config.url)) {
    refreshToken(config.url);
    const token = (window as any).externalLinkToken || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
  }

  return config;
}, error => Promise.reject(error));

// 响应拦截器
axios.interceptors.response.use(
  response => response.data,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (error.response.config && error.response.config.url.indexOf('public/system/config') === -1 && !env.isDingTalk) {
            window.location.href = '#/login';
          }
          break;
        case 500:
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;

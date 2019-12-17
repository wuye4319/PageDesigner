import axios from 'axios';
import Tools from './tools';
const utils = new Tools();
export default class Axios {
  get(url, params?) {
    utils.getCookie('userID');
    axios.get(url, { params: params });
  }
  post(url, params?) {
    utils.getCookie('userID');
    axios.post(url, { params: params });
  }
  put(url, params?) {
    utils.getCookie('userID');
    axios.put(url, { params: params });
  }
  delete(url, params) {
    utils.getCookie('userID');
    axios.delete(url, { params: params });
  }
}

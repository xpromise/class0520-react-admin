/*
  封装axios代码
 */
import axios from 'axios';
import { message } from 'antd';
import store from '@redux/store';

// 创建axios的实例
const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
  // headers: {}
});

// 设置请求拦截器：发送请求之前触发函数
instance.interceptors.request.use(
  (config) => {
    // /api/login 不需要加上请求头参数
    const { token } = store.getState().user;
    // 加上公共的请求头参数
    // config就是发送请求的配置信息（请求方法、请求头、请求参数。。。）
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  /*(err) => {
    return Promise.reject(err);
  }*/
);
// 设置响应拦截器：处理响应之前触发函数
instance.interceptors.response.use(
  (response) => {
    // 请求成功
    // result就是响应体数据
    const result = response.data;

    if (result.status === 0) {
      // 功能成功 --> 后面触发then
      return result.data;
    } else {
      // 功能失败 --> 后面触发catch
      // 错误提示
      message.error(result.msg);
      return Promise.reject(result.msg);
    }
  },
  (error) => {
    // 请求失败 --> 响应状态码 400 500
    console.log('axios请求失败：', error);
    message.error('未知错误，请联系管理员~');
    return Promise.reject('未知错误，请联系管理员~');
  }
);

export default instance;
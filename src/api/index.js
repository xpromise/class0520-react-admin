/*
 封装发送请求函数
 */
import axios from './request';

export const reqLogin = (username, password) => axios.post('/login', { username, password });
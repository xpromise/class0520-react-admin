/*
 封装发送请求函数
 */
import axios from './request';
// 请求登录
export const reqLogin = (username, password) => axios.post('/login', { username, password });
// 请求获取分类列表数据
export const reqGetCategories = () => axios.get('/category/get');
// 请求添加分类数据
export const reqAddCategory = (categoryName) => axios.post('/category/add', { categoryName });

export const reqUpdateCategory = (categoryId, categoryName) => axios.post('/category/update', { categoryId, categoryName });
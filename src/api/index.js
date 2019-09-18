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

export const reqGetProducts = (pageNum, pageSize) => axios.get('/product/list', { params: { pageNum, pageSize } });

export const reqAddProduct = ({name, desc, price, categoryId, detail}) => axios.post('/product/add', { name, desc, price, categoryId, detail });

export const reqUpdateProduct = ({name, desc, price, categoryId, detail, productId}) => axios.post('/product/update', { name, desc, price, categoryId, detail, productId });

export const reqSearchProducts = ({searchKey, searchValue, pageNum, pageSize}) => axios.get('/product/search', {params: { [searchKey]: searchValue , pageNum, pageSize }})

export const reqGetRoles = () => axios.get('/role/get');

export const reqAddRole = (name) => axios.post('/role/add', { name });

export const reqUpdateRole = (roleId, authName, menus) => axios.post('/role/update', { roleId, authName, menus });

export const reqGetUsers = () => axios.get('/user/get');

export const reqAddUser = ({ username, password, phone, email, roleId }) => axios.post('/user/add', { username, password, phone, email, roleId });


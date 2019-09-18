/*
  包含n个 生产action对象工厂函数 模块
 */
import {
  SAVE_USER,
  REMOVE_USER,
  SET_TITLE,
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  GET_ROLES_SUCCESS,
  ADD_ROLE_SUCCESS,
  UPDATE_ROLE_SUCCESS
} from './action-types';
import { reqGetCategories, reqAddCategory, reqUpdateCategory, reqGetRoles, reqAddRole, reqUpdateRole } from '@api';
import {async} from "q";

// 保存用户数据
export const saveUser = (user) => ({type: SAVE_USER, data: user});
// 清除用户数据
export const removeUser = () => ({type: REMOVE_USER});

// 设置title
export const setTitle = (title) => ({type: SET_TITLE, data: title});

// 获取分类数据 同步action creators
const getCategoriesSuccess = (categories) => ({type: GET_CATEGORIES_SUCCESS, data: categories});
// 获取分类数据 异步action creators
export const getCategories = () => {
  return async (dispatch) => {
    // 发送请求，请求分类列表数据
    const result = await reqGetCategories();
    // 更新redux状态
    dispatch(getCategoriesSuccess(result));
  }
};

const addCategorySuccess = (category) => ({type: ADD_CATEGORY_SUCCESS, data: category});
// 添加分类数据
export const addCategory = (categoryName) => {
  return async (dispatch) => {
    const result = await reqAddCategory(categoryName);
    dispatch(addCategorySuccess(result));
  }
};

const updateCategorySuccess = (category) => ({type: UPDATE_CATEGORY_SUCCESS, data: category});
// 添加分类数据
export const updateCategory = (categoryId, categoryName) => {
  return async (dispatch) => {
    const result = await reqUpdateCategory(categoryId, categoryName);
    dispatch(updateCategorySuccess(result));
  }
};

const getRolesSuccess = (roles) => ({type: GET_ROLES_SUCCESS, data: roles});
export const getRoles = () => {
  return async (dispatch) => {
    const result = await reqGetRoles();
    dispatch(getRolesSuccess(result));
  }
};

const addRoleSuccess = (role) => ({type: ADD_ROLE_SUCCESS, data: role});
export const addRole = (name) => {
  return async (dispatch) => {
    const result = await reqAddRole(name);
    dispatch(addRoleSuccess(result));
  }
};

const updateRoleSuccess = (role) => ({type: UPDATE_ROLE_SUCCESS, data: role});
export const updateRole = (roleId, authName, menus) => {
  return async (dispatch) => {
    const result = await reqUpdateRole(roleId, authName, menus);
    dispatch(updateRoleSuccess(result));
  }
};
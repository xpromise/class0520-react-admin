/*
  根据prevState和action来生成newState
 */
import { combineReducers } from 'redux';

import {
  SAVE_USER,
  REMOVE_USER,
  SET_TITLE,
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS
} from './action-types';
import { setItem, getItem, removeItem } from '../utils/storage';


// 初始化数据
const initUser = {
  user: getItem('user') || {},
  token: getItem('token') || ''
};

function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_USER :
      // 进行持久化存储
      setItem('user', action.data.user);
      setItem('token', action.data.token);
      return action.data;
    case REMOVE_USER :
      removeItem('user');
      removeItem('token');
      return {
        user: {},
        token: ''
      };
    default :
      return prevState;
  }
}

function title(prevState = '', action) {
  switch (action.type) {
    case SET_TITLE :
      return action.data;
    default :
      return prevState;
  }
}

function categories(prevState = [], action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS :
      return action.data;
    case ADD_CATEGORY_SUCCESS :
      return [...prevState, action.data];
    default :
      return prevState;
  }
}

export default combineReducers({
  user,
  title,
  categories
})
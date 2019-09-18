import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NotMatch from '@comps/not-match';
/*
  高阶组件：
    功能：用来做登录验证的
 */
function withCheckLogin(WrappedComponent) {

  return connect(
    (state) => ({token: state.user.token, menus: state.user.user.menus}),
    null
  )(class extends Component {
    static displayName = `CheckLogin(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    render() {
      /*
        登录校验
          1. 判断当前地址是否是 /login
             如果用户登录过， 跳转到 /
             如果用户没有登录过， 不变
          2. 判断当前地址是否是 /
            如果用户登录过， 不变
             如果用户没有登录过， 跳转到 /login

         权限控制
            如果当前访问路径是允许访问的路由，可以访问
            如果当前访问路径是不是允许访问的路由，返回 NotMatch
       */
      // 当前路径
      const {
        token,
        menus,
        ...rest // 包含剩下所有属性的一个对象  { location, history, match, children }
      } = this.props;
      const { location : { pathname } } = rest;

      /*if (pathname === '/login') {
        if (token) {
          return <Redirect to="/"/>
        }
      } else {
        if (!token) {
          return <Redirect to="/login"/>
        }
      }*/
      if (pathname === '/login' && token) return <Redirect to="/"/>;
      if (pathname !== '/login') {
        if (!token) return <Redirect to="/login"/>;
        // 权限控制
        if (!menus.includes(pathname)) return <WrappedComponent {...rest}><NotMatch /></WrappedComponent>;
      }

      return <WrappedComponent {...rest}/>;
    }
  })
}

export default withCheckLogin;

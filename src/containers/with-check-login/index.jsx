import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
/*
  高阶组件：
    功能：用来做登录验证的
 */
function withCheckLogin(WrappedComponent) {

  return connect(
    (state) => ({token: state.user.token}),
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
       */
      // 当前路径
      const { token, location, history, match } = this.props;
      const { pathname } = location;

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
      if (pathname !== '/login' && !token) return <Redirect to="/login"/>;
      return <WrappedComponent location={location} history={history} match={match}/>;
    }
  })
}

export default withCheckLogin;

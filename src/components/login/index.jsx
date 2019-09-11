import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';

import { reqLogin } from '../../api';

import { connect } from 'react-redux';
import { saveUser } from '@redux/action-creators';

import logo from './logo.png';
import './index.less';

@connect(
  null,
  { saveUser }
)
@Form.create()
class Login extends Component {

  /**
   * 自定义表单校验的方法
   * @param rule 包含表单项字段
   * @param value 表单项的值
   * @param callback 当callback传参时，说明校验失败，并提示传入参数。 当callback没有参数，说明校验成功
   */
  validator = (rule, value, callback) => {
    // console.log(rule, value);

    const name = rule.field === 'username' ? '用户名' : '密码';

    if (!value) {
      return callback(`请输入${name}`);
    }

    if (value.length < 3) {
      return callback(`${name}长度必须大于3位`);
    }

    if (value.length > 13) {
      return callback(`${name}长度必须小于13位`);
    }

    const reg = /^[a-zA-Z0-9_]{3,13}$/;
    if (!reg.test(value)) {
      return callback(`${name}只能包含英文、数字和下划线`);
    }

    // callback必须调用
    callback();
  };

  /**
   * 登录函数
   */
  login = (e) => {
    // 禁止默认行为
    e.preventDefault();
    // 校验表单
    this.props.form.validateFields((error, values) => {
      /*
        error 校验失败错误
          校验失败就是 {}
          校验通过就是 null
        values 所有表单项的值
       */
      if (!error) {
        // 校验通过
        // console.log(values);
        // 获取表单项的值
        const { username, password } = values;
        // 发送请求，请求登录
        /*
          发送请求，遇见了跨域问题：（当前服务器是3000，要访问的服务器5000）
          解决：
            1. jsonp 现在不适用
            2. cors 修改服务器代码
            3. proxy 服务器代理模式 （正向代理）
              正向代理
              反向代理（nginx）

              "proxy": "http://localhost:5000" 开启代理服务器

              http://localhost:5000 --> 就是目标服务器地址

              工作原理：
                1. 浏览器发送请求给代理服务器（这时候因为端口号一致，所以没有跨域问题）
                2. 代理服务器将请求转发给目标服务器（因为服务器和服务器直接通信，没有跨域问题）
                3. 目标服务器返回响应给代理服务器
                4. 代理服务器返回响应给浏览器
              缺点：
                1. 只能用于开发环境，不能用于上线环境
         */
        /*axios.post('/login', { username, password })
          .then(({data}) => {
            // {data} --> 对response解构赋值
            // 请求成功
            // 判断status的值，来决定是否登录成功
            if (data.status === 0) {
              // 登录成功
              message.success('登录成功~');
              // 保存用户数据  redux  localStorage / sessionStorage
              this.props.saveUser(data.data);
              // 跳转到 / 路由
              /!*
                <Redirect to="/"/> 用于再render方法中进行重定向
                this.props.history.replace('/'); 用于非render方法中进行路由跳转
               *!/
              // return <Redirect to="/"/>
              this.props.history.replace('/');
            } else {
              // 登录失败
              message.error(data.msg);
            }
          })
          .catch((error) => {
            // 请求失败 - 登录失败
            message.error('未知错误，请联系管理员~');
          })
          .finally(() => {
            // 不管成功/失败都会触发
            // 清空密码
            this.props.form.resetFields(['password']);
          })*/
        reqLogin(username, password)
          .then((result) => {
            // 登录成功
            message.success('登录成功~');
            // 保存用户数据  redux  localStorage / sessionStorage
            this.props.saveUser(result);
            // 跳转到 / 路由
            this.props.history.replace('/');
          })
          .catch(() => {
            // 清空密码
            this.props.form.resetFields(['password']);
          })
      }
    })
  };

  render() {
    // getFieldDecorator 专门表单校验的方法。 高阶组件
    const { getFieldDecorator } = this.props.form;

    return <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目: 后台管理系统</h1>
      </header>
      <section className="login-section">
        <h3>用户登录</h3>
        <Form onSubmit={this.login}>
          <Form.Item>
            {
              getFieldDecorator(
                'username',
                {
                  rules: [
                   /*
                    // 只适用于简单的检验场景
                    { required: true, message: '请输入用户名' },
                    { min: 3, message: '用户名长度必须大于3位' },
                    { max: 13, message: '用户名长度必须小于13位' },
                    { pattern: /^[a-zA-Z0-9_]{3,13}$/, message: '用户名只能包含英文、数字和下划线' },*/
                    { validator: this.validator }
                  ]
                }
              )(
                <Input prefix={<Icon type="user" />} placeholder="用户名"/>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator(
                'password',
                {
                  rules: [
                    {
                      validator: this.validator
                    }
                  ]
                }
              )(
                <Input prefix={<Icon type="lock" />} placeholder="密码" type="password"/>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
          </Form.Item>
        </Form>
      </section>
    </div>;
  }
}

// Form.create 是一个高阶组件
// 目的：给Login组件传递form属性
// const newLogin = Form.create()(Login);
// export default newLogin;
export default Login;
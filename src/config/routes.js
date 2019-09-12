import Login from '@conts/login';
import Home from '@comps/home';

const routes = [
  {
    path: '/', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Home // 组件
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
];

export default routes;
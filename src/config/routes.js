import Home from '@comps/home';
import Category from '@comps/category';

const routes = [
  {
    path: '/', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Home // 组件
  },
  {
    path: '/category', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Category // 组件
  }
];

export default routes;
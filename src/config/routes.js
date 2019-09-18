import Home from '@comps/home';
import Category from '@conts/category';
import Product from '@conts/product';
import SaveUpdate from '@conts/product/save-update';
import User from '@conts/user';
import Role from '@conts/role';
import Bar from '@comps/bar';
import Pie from '@comps/pie';

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
  },
  {
    path: '/product', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Product // 组件
  },
  {
    path: '/product/saveupdate', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: SaveUpdate // 组件
  },
  {
    path: '/user', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: User // 组件
  },
  {
    path: '/role', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Role // 组件
  },
  {
    path: '/charts/bar', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Bar // 组件
  },
  {
    path: '/charts/pie', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Pie // 组件
  },
];

export default routes;
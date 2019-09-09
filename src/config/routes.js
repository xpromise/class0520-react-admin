import Login from '../components/login';
import Home from '../components/home';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
];

export default routes;
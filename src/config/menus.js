
const menus = [
  {
    icon: 'home',
    title: '首页',
    key: '/'
  },
  {
    icon: 'appstore',
    title: '商品',
    key: '/products',
    children: [
      {
        icon: 'home',
        title: '商品管理',
        key: '/product'
      },
      {
        icon: 'home',
        title: '分类管理',
        key: '/category'
      }
    ]
  },
  {
    icon: 'user',
    title: '用户管理',
    key: '/user'
  },
  {
    icon: 'user',
    title: '权限管理',
    key: '/role'
  },
  {
    icon: 'appstore',
    title: '图形图表',
    key: '/charts',
    children: [
      {
        icon: 'home',
        title: '柱状图',
        key: '/charts/bar'
      },
      {
        icon: 'home',
        title: '折线图',
        key: '/charts/line'
      },
      {
        icon: 'home',
        title: '饼状图',
        key: '/charts/pie'
      }
    ]
  },
];

export default menus;
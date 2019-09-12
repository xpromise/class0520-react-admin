
const menus = [
  {
    icon: 'home',
    title: 'menus.home',
    key: '/'
  },
  {
    icon: 'appstore',
    title: 'menus.products',
    key: '/products',
    children: [
      {
        icon: 'bars',
        title: 'menus.category',
        key: '/category'
      },
      {
        icon: 'tool',
        title: 'menus.product',
        key: '/product'
      }
    ]
  },
  {
    icon: 'user',
    title: 'menus.user',
    key: '/user'
  },
  {
    icon: 'safety',
    title: 'menus.role',
    key: '/role'
  },
  {
    icon: 'area-chart',
    title: 'menus.charts',
    key: '/charts',
    children: [
      {
        icon: 'bar-chart',
        title: 'menus.bar',
        key: '/charts/bar'
      },
      {
        icon: 'line-chart',
        title: 'menus.line',
        key: '/charts/line'
      },
      {
        icon: 'pie-chart',
        title: 'menus.pie',
        key: '/charts/pie'
      }
    ]
  },
];

export default menus;
const {override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias} = require('customize-cra');
const { resolve } = require('path');

module.exports = override(
  // 按需加载组件代码和样式
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  // 自定义主题色
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#1DA57A'},
  }),
  // 添加babel插件支持 装饰器 语法：简化高阶组件使用
  addDecoratorsLegacy(),
  // 配置路径别名：简化路径(问题：路径没有提示)
  addWebpackAlias({
    '@comps': resolve(__dirname, 'src/components'),
    '@conts': resolve(__dirname, 'src/containers'),
    '@config': resolve(__dirname, 'src/config'),
    '@redux': resolve(__dirname, 'src/redux'),
  })
);
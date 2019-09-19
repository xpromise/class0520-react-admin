import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import { initThemeColor } from './utils/tools';
import App from './App';
// 引入国际化
import './i18n';
import './assets/less/index.less';

// 初始化主题色
initThemeColor();

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


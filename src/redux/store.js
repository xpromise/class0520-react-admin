import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

let store;
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
} else {
  // 生产环境
  store = createStore(reducers, applyMiddleware(thunk));
}

export default store;

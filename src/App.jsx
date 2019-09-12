import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '@conts/login';
import NotMatch from '@comps/not-match';
import BasicLayout from '@comps/basic-layout';
import routes from './config/routes';

class App extends Component {
  render() {
    return <Router>
      {/*<Switch>*/}
      {/*  <Route path="/" exact component={Home}/>*/}
      {/*  <Route path="/login" exact component={Login}/>*/}
      {/*</Switch>*/}
      <Switch>
        <Route path="/login" component={Login} exact/>
        <BasicLayout>
          <Switch>
            {
              routes.map((route, index) => {
                // return <Route path={route.path} exact={route.exact} component={route.component}/>
                return <Route {...route} key={index}/>;
              })
            }
            {/* 不写path 就是匹配所有路径 */}
            <Route component={NotMatch}/>
          </Switch>
        </BasicLayout>
      </Switch>
    </Router>;
  }
}

export default App;
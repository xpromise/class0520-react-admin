import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './config/routes';

class App extends Component {
  render() {
    return <Router>
      {/*<Switch>*/}
      {/*  <Route path="/" exact component={Home}/>*/}
      {/*  <Route path="/login" exact component={Login}/>*/}
      {/*</Switch>*/}
      <Switch>
        {
          routes.map((route, index) => {
            // return <Route path={route.path} exact={route.exact} component={route.component}/>
            return <Route {...route} key={index}/>;
          })
        }
      </Switch>
    </Router>;
  }
}

export default App;
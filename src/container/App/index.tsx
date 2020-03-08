import React from 'react';
import Dispenser from '../Dispenser';
import Maintenance from '../Maintenance';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.scss';

const customHistory = createBrowserHistory();

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <div className="machine">
          <div className="screen">
          <Router history={customHistory}>
            <Switch>
              <Route exact path="/">
                <Dispenser />
              </Route>
              <Route path="/maintenance">
                <Maintenance history={customHistory}/>
              </Route>
            </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

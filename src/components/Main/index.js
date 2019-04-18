import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from '../common/PageNotFound';
import TaskContainer from './TaskContainer';

class Main extends PureComponent {
  render() {
    console.log('Main router Rendered');
    return (
      <Switch>
        <Route exact path="/" render={() => <div>MAIN</div>} />
        <Route path="/list/:id" component={TaskContainer} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

export default Main;

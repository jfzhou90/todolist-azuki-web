import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from '../common/PageNotFound';
import TaskContainer from './TaskContainer';
import TaskEdit from '../Task/TaskEdit';
import Welcome from '../common/Welcome';

class Main extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/list/:id" component={TaskContainer} />
        <Route
          path="/task/edit/:id"
          render={props => <TaskEdit key={props.match.params.id} {...props} />}
        />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

export default Main;

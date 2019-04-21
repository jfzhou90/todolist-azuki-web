import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNotFound from '../common/PageNotFound';
import TaskContainer from './TaskContainer';
import TaskEdit from '../Task/TaskEdit';

class Main extends PureComponent {
  render() {
    console.log('Main router Rendered');
    return (
      <Switch>
        <Route exact path="/" render={() => <div>MAIN</div>} />
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Todos from './Todos';
import NotFound from './NotFound';
import Welcome from '../common/Welcome';

class Router extends Component {
  render() {
    return (
      <div id="page-wrap">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/list/:id" component={Todos} />
          <Route exact path="/404" component={NotFound} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Router);

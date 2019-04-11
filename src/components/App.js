import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getUserAndLists } from '../redux/actions/authActions';
import Login from './common/LoginPage';
import NotFound from './common/NotFound';
import Dashboard from './Dashboard';

class App extends Component {
  componentWillMount() {
    this.props.getUserAndLists();
  }

  render() {
    if (this.props.auth.id) {
      return (
        <Switch>
          <Route path="/*" component={Dashboard} />
          <Route path="/404" component={NotFound} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/*" component={NotFound} />
        </Switch>
      );
    }
  }
}
const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = { getUserAndLists };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

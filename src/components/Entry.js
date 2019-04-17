import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getUserAndLists } from '../redux/actions/authActions';
import Loading from './common/Loading';
import Login from './common/Login';
import PageNotFound from './common/PageNotFound';
import App from './App';

class Entry extends Component {
  componentWillMount() {
    this.props.getUserAndLists();
  }

  render() {
    console.log('Entry Rendered');
    if (this.props.auth.isLoading) {
      return <Loading />;
    } else if (!this.props.auth.isLoading && this.props.auth.id) {
      return <App />;
    } else if (!this.props.auth.isLoading && !this.props.auth.id) {
      return (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route component={PageNotFound} />
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
)(Entry);

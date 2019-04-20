import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { getUserAndLists } from '../redux/actions/authActions';
import { addSocketToApp } from '../redux/actions/socketActions';
import Loading from './common/Loading';
import Login from './common/Login';
import PageNotFound from './common/PageNotFound';
import App from './App';
import initializeSocket from '../utils/socket';

class Entry extends Component {
  componentWillMount() {
    this.props.getUserAndLists();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.auth.isLoading !== this.props.auth.isLoading;
  }

  render() {
    if (this.props.auth.isLoading) {
      console.log('Loading Screen');
      return <Loading />;
    } else if (!this.props.auth.isLoading && this.props.auth.id) {
      console.log('Entry Rendered');
      this.props.addSocketToApp(initializeSocket(this.props.auth.id));
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
const mapDispatchToProps = { getUserAndLists, addSocketToApp };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);

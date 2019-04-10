import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserAndLists } from '../redux/actions/authActions';
import Login from './common/LoginPage';
import Dashboard from './Dashboard';

class App extends Component {
  componentWillMount() {
    this.props.getUserAndLists();
  }

  render() {
    if (this.props.auth.id) {
      return <Dashboard />;
    } else {
      return (
        <>
          <Login />
        </>
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

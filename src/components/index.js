import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '../redux/actions/authActions';
import Login from './common/LoginPage';

class App extends Component {
  componentWillMount() {
    this.props.getUser();
  }

  render() {
    if (this.props.auth.id) {
      return <div>APP</div>;
    } else {
      return (
        <>
          <Login />
          <ToastContainer autoClose={3000} hideProgressBar />
        </>
      );
    }
  }
}
const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = { getUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
  render() {
    return (
      <>
        <Header />
        <ToastContainer autoClose={3000} hideProgressBar />
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Dashboard);

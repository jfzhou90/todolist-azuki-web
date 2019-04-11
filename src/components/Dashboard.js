import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';
import { ToastContainer } from 'react-toastify';
import ListMenu from './common/ListMenu';
import Main from './common/Main';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
  render() {
    return (
      <>
        <Header />
        <div id="outer-container">
          <ListMenu />
          <Main />
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Dashboard);

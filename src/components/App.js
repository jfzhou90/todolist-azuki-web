import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from './common/Header';
import Sidebar from './Sidebar';
import ReactModal from 'react-modal';
import Modals from './modals';

ReactModal.setAppElement('#root');
class App extends Component {
  render() {
    console.log('App Rendered');
    return (
      <>
        <Modals />
        <Header />
        <div id="outer-container">
          <Sidebar />
          <div id="page-wrap">test</div>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
      </>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
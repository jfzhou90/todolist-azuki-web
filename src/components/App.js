import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from './common/Header';
import Sidebar from './Sidebar';
import ReactModal from 'react-modal';
import Modals from './modals';
import Main from './Main';

ReactModal.setAppElement('#root');
class App extends Component {
  render() {
    return (
      <>
        <Modals />
        <Header />
        <div id="outer-container">
          <Sidebar />
          <Main />
        </div>
        <ToastContainer autoClose={2000} hideProgressBar />
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../media/bean.png';

class Header extends Component {
  render() {
    return (
      <div className="header--div-container">
        <h1 className="header--h1-title">
          <img src={logo} alt="bean brand" /> A z u k i
        </h1>
        <div className="header--div-menu">
          <div>{this.props.auth.name.split(' ')[0]}</div>
          <a href="/auth/logout">Logout</a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);

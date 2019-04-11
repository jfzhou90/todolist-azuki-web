import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../media/bean.png';
import { action as toggleMenu } from 'redux-burger-menu';
import { Link } from 'react-router-dom';

class Header extends Component {
  openMenu = () => {
    this.props.dispatch(toggleMenu(!this.props.listMenu.isOpen));
  };
  render() {
    return (
      <div className="header--div-container">
        <i className="fa fa-bars" onClick={this.openMenu} />
        <Link to={'/'}>
          <h1 className="header--h1-title">
            <img src={logo} alt="bean brand" /> A z u k i
          </h1>
        </Link>
        <div className="header--div-menu">
          <img className="name" src={this.props.auth.img} alt="profile" />
          <div className="profile-name">{this.props.auth.name.split(' ')[0]}</div>
          <a href="/auth/logout">Logout</a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ dispatch, auth, listMenu }) => ({ dispatch, auth, listMenu });

export default connect(mapStateToProps)(Header);

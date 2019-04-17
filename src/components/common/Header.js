import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action as toggleMenu } from 'redux-burger-menu';
import { Link } from 'react-router-dom';

class Header extends Component {
  toggleMenu = () => {
    this.props.dispatch(toggleMenu(!this.props.sidebar.isOpen));
  };

  shouldComponentUpdate() {
    return false; // prevent unnecessary re-render due to sidebar props
  }

  render() {
    console.log('Header Rendered');
    return (
      <div className="header--div-container">
        <div className="header--div-left">
          <i className="header--i-burger fa fa-bars" onClick={this.toggleMenu} />
        </div>
        <div className="header--div-mid">
          <Link to={'/'}>
            <h1 className="header--h1-title">A Z U K I</h1>
          </Link>
        </div>
        <div className="header--div-right">
          <img className="header--img-profile" src={this.props.auth.img} alt="profile" />
          <div className="header--profile-name"> {this.props.auth.name.split(' ')[0]} </div>
          <a href="/auth/logout">Logout</a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ dispatch, auth, sidebar }) => ({ dispatch, auth, sidebar });

export default connect(mapStateToProps)(Header);

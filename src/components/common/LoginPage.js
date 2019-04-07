import React from 'react';
import logo from '../../media/bean.png';

export default props => (
  <div className="login-body">
    <div className="login-container ">
      <img className="login-logo" src={logo} alt="Beans" />
      Login With
      <a className="login-button-link" href="/auth/google">
        Google
      </a>
    </div>
  </div>
);

import React from 'react';
import logo from '../../media/bean.png';

export default () => (
  <div className="login--div-full">
    <div className="login--div-container">
      <img className="login--img-logo" src={logo} alt="Beans" />
      <span className="login--span-title">Azuki</span>
      <span className="login--span-intro">Login With</span>
      <a className="login--a-provider" href="/auth/google">
        <i className="fab fa-google" /> <span style={{ color: '#4285F4' }}>G</span>
        <span style={{ color: '#DB4437' }}>o</span>
        <span style={{ color: '#F4B400' }}>o</span>
        <span style={{ color: '#4285F4' }}>g</span>
        <span style={{ color: '#0F9D58' }}>l</span>
        <span style={{ color: '#DB4437' }}>e</span>
      </a>
    </div>
  </div>
);

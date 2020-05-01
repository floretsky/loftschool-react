import React, { useState } from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';

import logo from '../../common/logo-white.svg';
import './Auth.css';

export const Auth = (props) => {
  const [currentState, setCurrentState] = useState('login');

  const changeState = (page) => {
    setCurrentState(page);
  };

  return (
    <div className="login-form-container">
      <div className="login-form container row align-items-center">
        <div className="col col-md-6 column-login-logo">
          <img src={logo} alt="Logo" width="156" />
        </div>
        <div className="col col-md-6 column-login-form">
          {currentState === 'login' && <Login changeState={changeState} />}
          {currentState === 'register' && (
            <Register changeState={changeState} />
          )}
        </div>
      </div>
    </div>
  );
};

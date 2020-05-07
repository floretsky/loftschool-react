import React, { useState } from 'react';

import Login from '../Login/Login';
import Register from '../Register/Register';

import logo from '../../common/logo-white.svg';
import { StyledColumnLogo } from './StyledAuth';
import {
  StyledBackgroundContainer,
  StyledFormWithBackground,
  StyledColumnForm,
} from '../App/StyledApp';

export const Auth = (props) => {
  const [currentState, setCurrentState] = useState('login');

  const changeState = (page) => {
    setCurrentState(page);
  };

  return (
    <StyledBackgroundContainer>
      <StyledFormWithBackground className="container row align-items-center">
        <StyledColumnLogo className="col col-md-6 ">
          <img src={logo} alt="Logo" width="156" />
        </StyledColumnLogo>
        <StyledColumnForm className="col col-md-6">
          {currentState === 'login' && <Login changeState={changeState} />}
          {currentState === 'register' && (
            <Register changeState={changeState} />
          )}
        </StyledColumnForm>
      </StyledFormWithBackground>
    </StyledBackgroundContainer>
  );
};

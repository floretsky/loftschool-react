import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../modules/store';
import Router from '../Router/Router';

import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #root,
  .main-area {
    width: 100%;
    height: 100%;
  }
`;

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle />
      <div className="main-area" data-testid="main-area">
        <Router />
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;

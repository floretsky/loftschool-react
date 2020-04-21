import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../modules/store';
import Router from '../Router/Router';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="main-area" data-testid="main-area">
        <Router />
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import * as serviceWorker from './serviceWorker';
import { theme } from 'loft-taxi-mui-theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './index.css';

function renderToDOM() {
  let root = document.getElementById('root');
  if (root !== null) {
    ReactDOM.render(
      <React.StrictMode>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </React.StrictMode>,
      root
    );
  }
}

renderToDOM();
export { renderToDOM };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

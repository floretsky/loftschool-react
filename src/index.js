import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.jsx";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./components/context/AuthContext/AuthContext.jsx";
import { theme } from "loft-taxi-mui-theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

function renderToDOM() {
  let root = document.getElementById("root");
  if (root !== null) {
    ReactDOM.render(
      <React.StrictMode>
        <MuiThemeProvider theme={theme}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MuiThemeProvider>
      </React.StrictMode>,
      root
    );
  }
}

renderToDOM();
export {renderToDOM};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

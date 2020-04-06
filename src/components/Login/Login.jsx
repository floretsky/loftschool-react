import React, { Component } from "react";
import { AuthContext } from "./AuthContext";
import logo from "../../common/logo-white.svg";
import "./Login.css";

export class Login extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {(values) => {
          return (
            <div className="login-form-container">
              <div className="login-form container row align-items-center">
                <div className="col col-md-6 column-login-logo">
                  <img src={logo} alt="Logo" width="156" />
                </div>
                <div className="col col-md-6 column-login-form">
                  <form>
                    <p>
                      <h1>Login</h1>
                    </p>
                    <p>
                      New user? <a href="./">Sign up.</a>
                    </p>
                    <p className="input-field username-field">
                      <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        required
                      />
                    </p>
                    <p className="input-field password-field">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        required
                      />
                    </p>
                    <p className="container sign-in-button-containter">
                      <a
                        href="#login"
                        class="button accent-button"
                        onClick={values.login}
                      >
                        Sign in
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

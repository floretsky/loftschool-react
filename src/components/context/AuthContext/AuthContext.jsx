import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext({});

export class AuthProvider extends Component {

  static propTypes = {
    switchPage: PropTypes.shape({
      authorized: PropTypes.bool,
      login: PropTypes.func,
      logout: PropTypes.func
    })
  };

  state = { authorized: false };

  login = () => {
    this.setState({ authorized: true });
  };

  logout = () => {
    this.setState({ authorized: false });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          authorized: this.state.authorized,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

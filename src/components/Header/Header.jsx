import React, { Component } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import logo from "../../common/logo-black.svg";
import "./Header.css";
import PropTypes from "prop-types";

export class Header extends Component {

  static propTypes = {
    switchPage: PropTypes.func
  };

  render() {
    const switchPage = this.props.switchPage;

    return (
      <div id="header" data-testid="header">
        <div className="logo-wrapper col-md-8">
          <img src={logo} alt="Logo" width="156" />
        </div>
        <nav className="navigation-panel col-md-4">
          <a
            href="#map"
            className="button map-button"
            onClick={() => switchPage("map")}
          >
            Map
          </a>
          <a
            href="#profile"
            className="button profile-button"
            onClick={() => switchPage("profile")}
          >
            Profile
          </a>
          <AuthContext.Consumer>
            {(values) => {
              return (
                <a href="#logout" className="button logout-button" onClick={values.logout}>
                  Sign Out
                </a>
              );
            }}
          </AuthContext.Consumer>
        </nav>
      </div>
    );
  }
}

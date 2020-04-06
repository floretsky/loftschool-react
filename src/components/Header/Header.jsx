import React, { Component } from "react";
import { AuthContext } from "../Login/AuthContext";
import logo from "../../common/logo-black.svg";
import "./Header.css";

export class Header extends Component {
  render() {
    const switchPage = this.props.switchPage;
    return (
      <div id="header">
        <div className="logo-wrapper col-md-8">
          <img src={logo} alt="Logo" width="156" />
        </div>
        <nav className="navigation-panel col-md-4">
          <a href="#map" className="button" onClick={() => switchPage("map")}>
            Map
          </a>
          <a
            href="#profile"
            className="button"
            onClick={() => switchPage("profile")}
          >
            Profile
          </a>
          <AuthContext.Consumer>
            {(values) => {
              return (
                <a href="#logout" className="button" onClick={values.logout}>
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

import React, { Component } from "react";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Map } from "../Map/Map";
import { Header } from "../Header/Header";
import { AuthContext } from "../Login/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "map",
    };
  }

  switchPage = (currentPage) => {
    this.setState({ page: currentPage });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {(values) => {
          return (
            <div className="main-area">
              {values.authorized ? (
                <>
                  <Header switchPage={this.switchPage} />
                  {this.state.page === "map" && <Map />}
                  {this.state.page === "profile" && <Profile />}
                </>
              ) : (
                <>{<Login />}</>
              )}
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default App;

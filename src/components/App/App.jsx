import React, { useContext, useState } from "react";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Map } from "../Map/Map";
import { Header } from "../Header/Header";
import { AuthContext } from "../context/AuthContext/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = (props) => {
  const auth = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState('map');

  const switchPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="main-area" data-testid="main">
      {auth.authorized ? (
        <>
          <Header switchPage={switchPage} />
          {currentPage && <Map />}
          {currentPage && <Profile />}
        </>
      ) : (
        <>{<Login />}</>
      )}
    </div>
  );
};

export default App;

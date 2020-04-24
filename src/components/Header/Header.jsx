import React from 'react';
import logo from '../../common/logo-black.svg';

import { postLogOut } from '../../modules/Auth/actions';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import './Header.css';

const Header = ({ postLogOut }) => {
  const handleSignOutClick = (event) => {
    event.preventDefault();
    postLogOut({ success: false, error: '' });
  };

  return (
    <div id="header" data-testid="header">
      <div className="logo-wrapper col-md-8">
        <Link to="/">
          <img src={logo} alt="Logo" width="156" />
        </Link>
      </div>
      <nav className="navigation-panel col-md-4">
        <Button component={Link} to="/map" className="button map-button">
          Map
        </Button>
        <Button
          component={Link}
          to="/profile"
          className="button profile-button"
        >
          Profile
        </Button>
        <Button
          className="button logout-button"
          component={Link}
          to="/"
          onClick={handleSignOutClick}
        >
          Sign Out
        </Button>
      </nav>
    </div>
  );
};

const mapDispatchToProps = {
  postLogOut,
};

export default withRouter(connect(null, mapDispatchToProps)(Header));

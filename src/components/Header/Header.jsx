import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { postLogOut } from '../../modules/Auth/actions';
import { clearCard } from '../../modules/Profile/actions';
import { clearRoute } from '../../modules/Route/actions';

import logo from '../../common/logo-black.svg';
import { Button } from '@material-ui/core';
import { StyledHeader, StyledLogoWrapper } from './StyledHeader';

const Header = ({ postLogOut, clearCard, clearRoute }) => {
  const handleSignOutClick = (event) => {
    event.preventDefault();
    postLogOut({ success: false, error: '' });
    clearCard();
    clearRoute();
  };

  return (
    <StyledHeader data-testid="header">
      <StyledLogoWrapper className="col-md-8">
        <Link to="/">
          <img src={logo} alt="Logo" width="156" />
        </Link>
      </StyledLogoWrapper>
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
    </StyledHeader>
  );
};

const mapDispatchToProps = {
  postLogOut,
  clearCard,
  clearRoute,
};

export default withRouter(connect(null, mapDispatchToProps)(Header));

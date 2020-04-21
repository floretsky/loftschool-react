import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../Header/Header';

const PrivateRoute = ({ isAuthorized, component: Component, ...rest }) => (
  <>
    <Header />
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  </>
);

const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
});

export default connect(mapStateToProps)(PrivateRoute);

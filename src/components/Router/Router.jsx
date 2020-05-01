import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Profile from '../Profile/Profile';
import Map from '../Map/Map';
import { Auth } from '../Auth/Auth';

const Router = () => {
  return (
    <Switch>
      <Route path="/" component={Auth} exact />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/map" component={Map} />
    </Switch>
  );
};

export default Router;

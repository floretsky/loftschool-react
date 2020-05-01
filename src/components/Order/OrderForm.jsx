import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Grid,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';

import { getRouteRequest } from '../../modules/Route/actions';

const OrderForm = ({ getRouteRequest, addresses }) => {
  const [routeFrom, setFrom] = useState('');
  const [routeTo, setTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const routeFrom = e.target.routeFrom.value;
    const routeTo = e.target.routeTo.value;
    getRouteRequest({ routeFrom, routeTo });
  };

  const handleFrom = (event) => {
    setFrom(event.target.value);
  };

  const handleTo = (event) => {
    setTo(event.target.value);
  };

  return (
    <form id="search-form" data-testid="search-form" onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12}>
          <FormControl>
            <InputLabel shrink>From:</InputLabel>
            <Select
              className="route-input"
              name="routeFrom"
              value={routeFrom || ''}
              onChange={handleFrom}
              children={addresses
                .filter((item) => (routeTo ? item !== routeTo : true))
                .map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel shrink>To:</InputLabel>
            <Select
              className="route-input"
              name="routeTo"
              value={routeTo || ''}
              onChange={handleTo}
              children={addresses
                .filter((item) => (routeFrom ? item !== routeFrom : true))
                .map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} align="right">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            data-testid="login-submit"
            disabled={!routeFrom || !routeTo}
          >
            Order a taxi
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

OrderForm.propTypes = {
  getRouteRequest: PropTypes.func.isRequired,
  addresses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  addresses: state.route.addresses,
});

const mapDispatchToProps = {
  getRouteRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);

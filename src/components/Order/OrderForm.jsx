import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from 'react-select';
import { Grid, Button, InputLabel, FormControl } from '@material-ui/core';

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
              onChange={setFrom}
              options={addresses
                .filter((item) =>
                  routeTo.value ? item !== routeTo.value : true
                )
                .map((item, index) => ({ value: item, label: item }))}
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
              onChange={setTo}
              options={addresses
                .filter((item) =>
                  routeFrom.value ? item !== routeFrom.value : true
                )
                .map((item, index) => ({ value: item, label: item }))}
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

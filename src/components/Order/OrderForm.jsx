import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { Grid, Button, InputLabel, FormControl } from '@material-ui/core';
import { OrderFormInput } from '../Input/OrderFormInput';

import { getRouteRequest } from '../../modules/Route/actions';

const OrderForm = ({ getRouteRequest, addresses }) => {
  const [routeFrom, setFrom] = useState('');
  const [routeTo, setTo] = useState('');

  const onSubmit = (e) => {
    const routeFrom = e.routeFrom.value;
    const routeTo = e.routeTo.value;
    getRouteRequest({ routeFrom, routeTo });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.routeFrom) {
      errors.routeFrom = 'Please select starting destination';
    }

    if (!values.routeTo) {
      errors.routeTo = 'Please select finishing destination';
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={(props) => (
        <form
          id="search-form"
          data-testid="search-form"
          onSubmit={props.handleSubmit}
        >
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <FormControl>
                <InputLabel shrink>From:</InputLabel>
                <Field
                  component={OrderFormInput}
                  name="routeFrom"
                  onChange={setFrom}
                  value={routeFrom}
                  options={addresses
                    .filter((item) =>
                      routeTo.value ? item !== routeTo.value : true
                    )
                    .map((item) => ({ value: item, label: item }))}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel shrink>To:</InputLabel>
                <Field
                  component={OrderFormInput}
                  name="routeTo"
                  onChange={setTo}
                  value={routeTo}
                  options={addresses
                    .filter((item) =>
                      routeFrom.value ? item !== routeFrom.value : true
                    )
                    .map((item) => ({ value: item, label: item }))}
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
      )}
    />
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

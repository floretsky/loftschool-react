import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Grid, Button, Typography, Paper } from '@material-ui/core';
import OrderForm from './OrderForm';

import './Order.css';

const Order = ({ hasCard, isOrdered, reset }) => {
  const handleClick = () => {
    reset();
  };

  const OrderLayout = () => {
    if (!hasCard) {
      return (
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <Typography component="h1" variant="h4" align="left">
              Please, fill in billing information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Enter your bank card information to place an order.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              className="button-link"
              color="primary"
              size="medium"
              variant="contained"
              fullWidth
              component={RouterLink}
              to="/profile"
            >
              Go to profile
            </Button>
          </Grid>
        </Grid>
      );
    }
    if (isOrdered) {
      return (
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <Typography component="h1" variant="h4" align="left">
              The order is complete!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Your taxi is on its way. The car will arrive in 10 minutes.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              className="button-link"
              color="primary"
              size="medium"
              variant="contained"
              fullWidth
              onClick={handleClick}
            >
              New order
            </Button>
          </Grid>
        </Grid>
      );
    }
    return <OrderForm />;
  };
  return (
    <Paper className="paper-container" elevation={1}>
      <Container>
        <OrderLayout />
      </Container>
    </Paper>
  );
};

Order.propTypes = {
  isOrdered: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  hasCard: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  hasCard: state.profile.hasCard,
});

export default connect(mapStateToProps, null)(Order);

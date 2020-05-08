import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Grid, Typography } from '@material-ui/core';
import OrderForm from './OrderForm';

import { StyledPaper, StyledButton } from './StyledOrder';

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
            <StyledButton
              color="primary"
              size="medium"
              variant="contained"
              fullWidth
              component={RouterLink}
              to="/profile"
            >
              Go to profile
            </StyledButton>
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
              Thank you for ordering LoftTaxi. Enjoy your ride!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              color="primary"
              size="medium"
              variant="contained"
              fullWidth
              onClick={handleClick}
            >
              New order
            </StyledButton>
          </Grid>
        </Grid>
      );
    }
    return <OrderForm />;
  };
  return (
    <StyledPaper elevation={1}>
      <Container>
        <OrderLayout />
      </Container>
    </StyledPaper>
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

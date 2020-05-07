import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import formatStringByPattern from 'format-string-by-pattern';

import { postCardRequest, getCardRequest } from '../../modules/Profile/actions';

import { Grid, Button, Typography } from '@material-ui/core';
import {
  StyledPaper,
  StyledIconContainer,
  StyledButtonContainer,
  StyledFormHelperText,
} from './StyledProfile';
import {
  StyledBackgroundContainer,
  StyledFormWithBackground,
  StyledColumnForm,
} from '../App/StyledApp';

import { ProfileInput } from '../Input/ProfileInput';
import logo from '../../common/mastercard.svg';

class Profile extends React.Component {
  state = {
    cardNumber: this.props.cardInfo.cardNumber || '',
    expiryDate: this.props.cardInfo.expiryDate || '',
    cardName: this.props.cardInfo.cardName || '',
    cvc: this.props.cardInfo.cvc || '',
    hasCard: this.props.cardInfo.hasCard || false,
  };

  formatCard = (value) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return formatStringByPattern('9999 9999 9999 9999', onlyNumbers);
  };

  formatExpiryDate = (value) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return formatStringByPattern('MM/YY', onlyNumbers);
  };

  formatCvc = (value) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');
    return formatStringByPattern('999', onlyNumbers);
  };

  componentDidMount() {
    this.setState({ token: this.props.token });
    const { getCardRequest } = this.props;
    getCardRequest(this.props.token);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { postCardRequest } = this.props;
    postCardRequest(this.state);
    this.setState({ hasCard: true });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ hasCard: false });
  };

  validate = (values) => {
    const errors = {};

    if (!values.cardNumber) {
      errors.cardNumber = 'Please enter your card number';
    }

    if (!values.expiryDate) {
      errors.expiryDate = 'Please enter your expiry date';
    }

    if (!values.cardName) {
      errors.cardName = 'Please enter your card name';
    }

    if (!values.cvc) {
      errors.cvc = 'Please enter your CVC';
    }

    return errors;
  };

  render() {
    return (
      <StyledBackgroundContainer>
        <StyledFormWithBackground className="container row align-items-center justify-content-center">
          <StyledColumnForm className="col col-sm-12 col-md-12 col-lg-10 col-xl-8 mt-0">
            <Form
              initialValues={this.props.cardInfo}
              onSubmit={this.handleSubmit}
              validate={this.validate}
              render={() => (
                <form onSubmit={this.handleSubmit}>
                  <Grid
                    container
                    spacing={3}
                    alignContent="center"
                    justify="center"
                  >
                    <Grid item xs={12}>
                      <Typography align="center" variant="h4">
                        Profile
                      </Typography>
                      <Typography
                        color="textSecondary"
                        align="center"
                        variant="body1"
                        paragraph
                      >
                        Payment Method
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledPaper elevation={3}>
                        <StyledIconContainer>
                          <img src={logo} alt="Mastercard" width="32" />
                        </StyledIconContainer>
                        <Field
                          component={ProfileInput}
                          type="text"
                          name="cardNumber"
                          label="Card Number:"
                          placeholder="0000 0000 0000 0000"
                          parse={this.formatCard}
                          onChange={this.handleInputChange}
                          autoFocus
                          required
                        />
                        <Field
                          component={ProfileInput}
                          type="text"
                          name="expiryDate"
                          label="Expiration Date:"
                          placeholder="04/20"
                          parse={this.formatExpiryDate}
                          onChange={this.handleInputChange}
                          required
                        />
                      </StyledPaper>
                    </Grid>
                    <Grid item xs={6}>
                      <StyledPaper elevation={3}>
                        <Field
                          component={ProfileInput}
                          type="text"
                          name="cardName"
                          label="Cardholder name:"
                          placeholder="USER NAME"
                          onChange={this.handleInputChange}
                          required
                        />
                        <Field
                          component={ProfileInput}
                          type="password"
                          name="cvc"
                          label="CVC:"
                          placeholder="CVC"
                          parse={this.formatCvc}
                          inputProps={{
                            maxLength: 3,
                          }}
                          onChange={this.handleInputChange}
                          required
                        />
                      </StyledPaper>
                    </Grid>
                  </Grid>
                  <StyledButtonContainer>
                    <StyledFormHelperText error={!!this.props.error}>
                      {this.props.error
                        ? this.props.error
                        : this.state.hasCard
                        ? 'Everything is fine'
                        : 'Please enter your card number'}
                    </StyledFormHelperText>
                    <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                  </StyledButtonContainer>
                </form>
              )}
            />
          </StyledColumnForm>
        </StyledFormWithBackground>
      </StyledBackgroundContainer>
    );
  }
}

Profile.propTypes = {
  token: PropTypes.string,
  cardInfo: PropTypes.shape({
    cardNumber: PropTypes.string,
    expiryDate: PropTypes.string,
    cardName: PropTypes.string,
    cvc: PropTypes.string,
    hasCard: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  cardInfo: state.profile,
});

const mapDispatchToProps = {
  postCardRequest,
  getCardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

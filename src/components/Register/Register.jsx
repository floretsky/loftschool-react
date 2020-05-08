import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form, Field } from 'react-final-form';
import { Input } from '../Input/Input';
import { Button, Grid, Typography } from '@material-ui/core';

import { EMAIL_REGEX, IS_A_NUMBER } from '../../const/index';
import { postRegisterRequest } from '../../modules/Auth/actions';

import {
  StyledFormHelperText,
  StyledButtonContainer,
} from '../Auth/StyledAuth';

class Register extends Component {
  state = {
    email: '',
    name: '',
    surname: '',
    password: '',
  };

  validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Please enter your email';
    } else {
      const match = values.email.match(EMAIL_REGEX);
      if (!match) {
        errors.email = 'Invalid email';
      }
    }

    if (!values.name) {
      errors.name = 'Please enter your name';
    } else {
      const match = values.name.match(IS_A_NUMBER);
      if (!match) {
        errors.name = 'Invalid first name';
      }
    }

    if (!values.surname) {
      errors.surname = 'Please enter your surname';
    } else {
      const match = values.surname.match(IS_A_NUMBER);
      if (!match) {
        errors.surname = 'Invalid last name';
      }
    }

    if (!values.password) {
      errors.password = 'Please enter your password';
    }

    return errors;
  };

  handleChangeInput = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { postRegisterRequest } = this.props;
    postRegisterRequest(this.state);
  };

  render() {
    const changeState = this.props.changeState;
    const { isAuthorized, error } = this.props;
    return isAuthorized ? (
      <Redirect to="/map" />
    ) : (
      <Form
        onSubmit={this.handleSubmitForm}
        validate={this.validate}
        render={() => (
          <form onSubmit={this.handleSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" paragraph>
                  Register
                </Typography>
                Already have an account?{' '}
                <a href="#login" onClick={() => changeState('login')}>
                  Sign in.
                </a>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter email *"
                  component={Input}
                  onChange={this.handleChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="name"
                  label="First Name"
                  type="text"
                  placeholder="First name *"
                  component={Input}
                  onChange={this.handleChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="surname"
                  label="Last Name"
                  type="text"
                  placeholder="Last name *"
                  component={Input}
                  onChange={this.handleChangeInput}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter password *"
                  component={Input}
                  onChange={this.handleChangeInput}
                  required
                />
              </Grid>
            </Grid>
            <StyledButtonContainer>
              <StyledFormHelperText error={!!error}>
                {error}
              </StyledFormHelperText>
              <Button
                type="submit"
                color="primary"
                size="medium"
                variant="contained"
              >
                Sign up
              </Button>
            </StyledButtonContainer>
          </form>
        )}
      />
    );
  }
}

Register.propTypes = {
  isAuthorized: PropTypes.bool,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
  error: state.auth.error,
});

const mapDispatchToProps = {
  postRegisterRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

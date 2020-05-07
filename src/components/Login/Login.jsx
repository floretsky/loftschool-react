import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form, Field } from 'react-final-form';
import { Input } from '../Input/Input';
import { Button, Grid, Typography } from '@material-ui/core';

import { EMAIL_REGEX } from '../../const/index';
import { postLoginRequest, postLoginSuccess } from '../../modules/Auth/actions';

import {
  StyledFormHelperText,
  StyledButtonContainer,
} from '../Auth/StyledAuth';

class Login extends Component {
  state = {
    email: '',
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

    if (!values.password) {
      errors.password = 'Please enter your password';
    }

    return errors;
  };

  componentDidMount() {
    const { isAuthorized } = this.props;
    if (isAuthorized) {
      const { postLoginSuccess } = this.props;
      postLoginSuccess({ success: true });
    }
  }

  handleChangeInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    this.props.postLoginRequest(this.state);
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" paragraph>
                  Login
                </Typography>
                New user?{' '}
                <a href="#register" onClick={() => changeState('register')}>
                  Sign up.
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
                Sign in
              </Button>
            </StyledButtonContainer>
          </form>
        )}
      />
    );
  }
}

Login.propTypes = {
  isAuthorized: PropTypes.bool,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
  error: state.auth.error,
});

const mapDispatchToProps = {
  postLoginRequest,
  postLoginSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

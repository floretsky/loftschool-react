import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Button,
  Grid,
  Input,
  FormHelperText,
  Typography,
} from '@material-ui/core';

import { postLoginRequest, postLoginSuccess } from '../../modules/Auth/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    const { isAuthorized } = this.props;
    if (isAuthorized) {
      const { postLoginSuccess } = this.props;
      postLoginSuccess({ success: true });
    }
  }

  handleChangeInput = (event) =>
    this.setState({ [event.target.name]: event.target.value });

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
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={2}>
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
            <Input
              error={!!error}
              type="text"
              name="email"
              placeholder="Enter email *"
              onChange={this.handleChangeInput}
              fullWidth
              autoFocus
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              error={!!error}
              type="password"
              name="password"
              placeholder="Enter password *"
              onChange={this.handleChangeInput}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <div className="button-containter">
          <FormHelperText error={!!error}>{error}</FormHelperText>
          <Button
            type="submit"
            color="primary"
            size="medium"
            variant="contained"
            onClick={this.handleSubmitForm}
          >
            Sign in
          </Button>
        </div>
      </form>
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

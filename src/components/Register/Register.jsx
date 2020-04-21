import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { postRegisterRequest } from '../../modules/Auth/actions';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

class Register extends Component {
  state = {
    email: '',
    name: '',
    surname: '',
    password: '',
  };

  handleChangeInput = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = (event) => {
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
      <form>
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
            <Input
              error={!!error}
              type="text"
              name="email"
              placeholder="Enter email *"
              onChange={this.handleChangeInput}
              autoFocus
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              error={!!error}
              type="text"
              name="name"
              placeholder="First Name *"
              onChange={this.handleChangeInput}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              error={!!error}
              type="text"
              name="surname"
              placeholder="Last name *"
              onChange={this.handleChangeInput}
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
            onClick={this.handleSubmit}
          >
            Sign up
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthorized: state.auth.isAuthorized,
  error: state.auth.error,
});

const mapDispatchToProps = {
  postRegisterRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

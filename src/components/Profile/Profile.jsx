import React from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { postCardRequest, getCardRequest } from '../../modules/Profile/actions';

import { Grid, Button, Typography, TextField } from '@material-ui/core';
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

import logo from '../../common/mastercard.svg';

class Profile extends React.Component {
  state = {
    cardNumber: this.props.cardInfo.cardNumber || '',
    expiryDate: this.props.cardInfo.expiryDate || '',
    cardName: this.props.cardInfo.cardName || '',
    cvc: this.props.cardInfo.cvc || '',
    hasCard: this.props.cardInfo.hasCard || false,
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

  render() {
    return (
      <StyledBackgroundContainer>
        <StyledFormWithBackground className="container row align-items-center justify-content-center">
          <StyledColumnForm className="col col-sm-12 col-md-12 col-lg-10 col-xl-8 mt-0">
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
                    <NumberFormat
                      customInput={TextField}
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      label="Card Number:"
                      placeholder="0000 0000 0000 0000"
                      format="#### #### #### ####"
                      onChange={this.handleInputChange}
                      autoFocus
                      fullWidth
                      required
                      value={this.state.cardNumber || ''}
                    />

                    <NumberFormat
                      customInput={TextField}
                      type="text"
                      name="expiryDate"
                      id="expiryDate"
                      label="Expiration Date:"
                      format="##/##"
                      mask={['M', 'M', 'Y', 'Y']}
                      placeholder="04/20"
                      onChange={this.handleInputChange}
                      fullWidth
                      required
                      value={this.state.expiryDate || ''}
                    />
                  </StyledPaper>
                </Grid>
                <Grid item xs={6}>
                  <StyledPaper elevation={3}>
                    <TextField
                      type="text"
                      name="cardName"
                      label="Cardholder name:"
                      id="cardName"
                      placeholder="USER NAME"
                      onChange={this.handleInputChange}
                      fullWidth
                      required
                      value={this.state.cardName || ''}
                    />
                    <NumberFormat
                      customInput={TextField}
                      type="password"
                      name="cvc"
                      id="cvc"
                      label="CVC:"
                      placeholder="CVC"
                      inputProps={{
                        maxLength: 3,
                      }}
                      onChange={this.handleInputChange}
                      fullWidth
                      required
                      value={this.state.cvc || ''}
                    />
                  </StyledPaper>
                </Grid>
              </Grid>
              <StyledButtonContainer>
                <StyledFormHelperText error={!this.state.hasCard}>
                  {this.state.hasCard
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

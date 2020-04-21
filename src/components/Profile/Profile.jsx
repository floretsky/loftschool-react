import React from 'react';
import { connect } from 'react-redux';
import { postCardRequest, getCardRequest } from '../../modules/Profile/actions';
import NumberFormat from 'react-number-format';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import logo from '../../common/mastercard.svg';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import './Profile.css';

class Profile extends React.Component {
  state = {
    token: '',
    cardNumber: '',
    expiryDate: '',
    cardName: '',
    cvc: '',
  };

  componentDidMount() {
    this.setState({ token: this.props.token });
    const { getCardRequest } = this.props;
    getCardRequest(this.props.token);
  }

  componentDidUpdate(prevProps) {
    let { cardInfo } = this.props;
    if (cardInfo !== prevProps.cardInfo) {
      this.setState({
        cardNumber: cardInfo.cardNumber,
        expiryDate: cardInfo.expiryDate,
        cardName: cardInfo.cardName,
        cvc: cardInfo.cvc,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { postCardRequest } = this.props;
    postCardRequest(this.state);
  };

  handlerInputChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    return (
      <div className="login-form-container">
        <div className="login-form container row align-items-center justify-content-center">
          <div className="col col-sm-12 col-md-12 col-lg-10 col-xl-8 column-login-form mt-0">
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
                  <Paper className="card-paper" elevation={3}>
                    <div className="material-icon">
                      <img src={logo} alt="Mastercard" width="32" />
                    </div>
                    <NumberFormat
                      customInput={TextField}
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      label="Card Number:"
                      placeholder="0000 0000 0000 0000"
                      format="#### #### #### ####"
                      onChange={this.handlerInputChange}
                      autoFocus
                      fullWidth
                      required
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
                      onChange={this.handlerInputChange}
                      fullWidth
                      required
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className="card-paper" elevation={3}>
                    <TextField
                      type="text"
                      name="cardName"
                      label="Cardholder name:"
                      id="cardName"
                      placeholder="USER NAME"
                      onChange={this.handlerInputChange}
                      fullWidth
                      required
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
                      onChange={this.handlerInputChange}
                      fullWidth
                      required
                    />
                  </Paper>
                </Grid>
              </Grid>
              <div className="button-containter text-center">
                <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  cardInfo: state.card,
});

const mapDispatchToProps = {
  postCardRequest,
  getCardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React from 'react';
import {
  injectStripe,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  CardCvcElement,
} from 'react-stripe-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { USERNAME_POSTFIX } from '../../constants/constants';

let Timer;
class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledButtonFlag: false,
    }
  }

  componentDidMount = () => {
    this.props.paymentMessage();
    this.props.onDisabledButton(false);
  }

  createOptions = () => ({
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        lineHeight: '30px',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    },
  });

  closeSuccessModal = () => {
    const { closeSuccessModal } = this.props;
    closeSuccessModal();
  }

  registerUser = e => {
    e.preventDefault();
    let { userName, userPassword, userEmail, password, amount, fromWallet, username } = this.props;
    // userName.value = `${userName.value.trim()}`
    // if(localStorage.getItem('stripePayment') == null || !localStorage.getItem('stripePayment')) {
      // localStorage.setItem('stripePayment', true);
      this.props.showLoader(true);
      this.props.onDisabledButton(true);
      this.props.stripe.createToken({ name: 'name' })
      .then(res => {
        if (res.error) {
          this.props.paymentMessage(res.error.message);
          this.props.showLoader(false);
          this.props.onDisabledButton(false);
        } else {
          this.props.getPayment({ token: res.id, user: userName, username: username, password: password ? password : userPassword.value, email: userEmail.value, isLogin: this.props.isLogin, isStripe: this.props.isStripe, fromBuyAla: this.props.fromBuyAla, isSufficient: this.props.isSufficient, selectedUser: this.props.selectedUser , accountNo: this.props.accountNo, closeSuccessModal: this.closeSuccessModal, amount: amount, fromWallet: fromWallet});
        }
      })
      .catch(err => {
        this.props.showLoader(false);
        this.props.onDisabledButton(false);
        this.props.paymentMessage(err.data);
      });
    // }

  }

  render() {
    return (
      <div id="radio-but">
        <form onSubmit={this.registerUser}>
        {/* <CardElement {...createOptions()} /> */}
        <div className="row"><div className="col-lg-12">
          <label>
            Card number
          <CardNumberElement className=" form-control mt-2"
              {...this.createOptions()}

            />
          </label>

        </div></div>
        <div className="row">
          <div className="col-lg-6 col-6"> <label>
            Expiration date
          <CardExpiryElement className=" form-control mt-2"

              {...this.createOptions()}
            />
          </label></div>
          <div className="col-lg-6 col-6"><label>
            CVV
          <CardCvcElement className=" form-control mt-2"
              {...this.createOptions()}
              placeholder="CVV"
              type='password'
            />
          </label></div> </div>
        <div>
          {/*<p>{this.props.fromWallet ? '' : this.props.fromBuyAla ? 'You will be charged $ 20 USD.' : 'You will be charged $ 25 USD.'} </p>*/}
          <p className="error-handler">{this.props.paymtMessage}</p>
          {this.props.fromWallet ? <button type='submit' className='btn  width-100 mt-4  btn-primary' onClick={this.registerUser} disabled={this.props.disabledButton || !this.props.amount.isValid}>{this.props.loaderFlag ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Buy'} </button> :
          <button type="submit" className="btn  width-100 mt-4  btn-primary" onClick={this.registerUser} disabled={this.props.disabledButton}>
          {this.props.loaderFlag ? <i className="fa fa-circle-o-notch fa-spin"></i> : this.props.fromWallet ? 'Buy' : this.props.fromBuyAla ? 'Buy ALA and Register' : 'Register'}
        </button>}

        </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = ({ auth, profile }) => {
  const { stripeToken, userPassword, userEmail, paymtMessage } = auth;
  const { loaderFlag, disabledButton } = profile;
  return { stripeToken, userPassword, userEmail, paymtMessage, loaderFlag, disabledButton };
}

const mapDispatchToProps = dispatch => ({
  getPayment: payload => dispatch(actions.getPayment(payload)),
  paymentMessage: payload => dispatch(actions.paymentMessage(payload)),
  stripeTokenChanged: payload => dispatch(actions.stripeTokenChanged(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  showLoader: payload => dispatch(actions.showLoader(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));

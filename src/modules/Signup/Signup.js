import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';
import * as aladin from 'aladinjs';
import { UserSession, AppConfig } from 'aladinjs';
import {
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
// import Input from '../../components/InputControls/Input/Input';
import Image from '../../components/Image/Image';
import Button from '../../components/InputControls/Button/Button';
import SecretKey from './SecretKey/SecretKey';
import * as actions from '../../actions';
import { USERNAME_POSTFIX } from '../../constants/constants';

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSecretKey: false,
      accept: false,
      clickedButton: false,
      isTouched: false,
      stripe: false,
      flagStripe: false,
      Ala: false,
      flagAla: false,
      usernameTimer: 10,
      timer: false
    };
    this.inputs = React.createRef();
    this.setTimer = this.setTimer.bind(this)
  }


  componentDidMount() {
    this.props.changeDisplayPayment(false);
    window.scrollTo(0, 0);
  }

  setTimer = () => {
    //this.setState({ timer: true });
    this.openTimerModal()
  }

  startTimer = async (duration, timerState) => {
    var timer = duration, minutes, seconds;
    if (this.props.displayPayment) {
      var t = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        let display = document.querySelector('#time');
        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          timerState()
          clearInterval(t)
        }
      }, 1000);
    }

  }

  showSecretKeySection = () => {
    this.setState({ showSecretKey: true });
  };

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  // Function for showing modal
  onShowModal = () => {
    const { openSuccessModal, closeSuccessModal, onClearUserName } = this.props;
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));
    let Location = this.props.history.location.search;
    if (mnemonicCode) {
      onClearUserName();
      if (Location.includes('auth')) {
        this.props.history.push(`/auth${Location}`)
      } else if (Location.includes('wallet/')) {
        this.props.history.push(`${Location.replace('?redirect=', '')}`)
      } else {
        openSuccessModal({
          title: 'Thank You',
          message: `We have successfully created your Aladin ID, recovery code has been sent to your email address.`,
          modalStatus: 2,
          showIcon: false,
          buttonClick: closeSuccessModal,
          redirectUrl: '/dappStore',
        });
      }
    }
  };
  callTimer = () => {

    var fiveMinutes = 60 * 1;
    this.startTimer(fiveMinutes, this.setTimer);

  }
  // Check userName availability
  checkUserNameAvailibility = e => {
    e.preventDefault();
    const {
      onCheckUserNameAvailaibility,
      userName,
      formValidatorOnCheckUser,
    } = this.props;
    if (userName.value.length === 0) {
      formValidatorOnCheckUser({});
    }
    if (
      userName.value.length > 0 && userName.value.length < 13 && userName.isValid
      // && /(?=\s|^)[^.\s]+\.[^.\s]+\.[^.\s]/gm.test(userName.value)
    ) {
      onCheckUserNameAvailaibility(`${userName.value}`);
    }

  };

  //on register
  registerUser = () => {
    const { userName, userPassword, userEmail, getPayment, stripeToken } = this.props;
    const userData = {
      username: `${userName.value.trim()}`,
      password: userPassword.value.trim(),
      useremail: userEmail.value.trim(),
    };

    getPayment({ token: stripeToken, user: userData.username, password: userData.password, email: userData.useremail });

  }

  backAction = () => {
    const {  onOpenModal, closeSignInModal } = this.props;
    onOpenModal({
      title: 'Confirm the action',
      body: [
        <p>Are you sure you want to cancel the process?</p>
      ],
      buttonName: 'Confirm',
      buttonClick: this.confirmAction,
      cancelButton: this.cancelAction,
      modalName: 'backAction',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
    });

  }

  confirmAction = () => {
    const { changeDisplayPayment, resetAuth, closeSignInModal } = this.props;
    resetAuth();
    this.setState({accept: false, isTouched: false});
    changeDisplayPayment(false);
    closeSignInModal();
  }

  cancelAction = () => {
    const { closeSignInModal } = this.props;
    closeSignInModal();
  }

  OnSubmitUserForm = e => {
    e.preventDefault();
    const { accept } = this.state;
    const {
      userName,
      userEmail,
      userPassword,
      userConfirmPassword,
      onStoreUserEmail,
      onStoreUserPassword,
      onStoreUserName,
      onStoreUserConfirmPassWord,
      onDisabledButton,
    } = this.props;
    let error = false;
    if (userName.value.length === 0) {
      onStoreUserName(userName.value);
      error = true;
    } else if(!accept) {
      this.setState({isTouched: true});
      error = true;
    }
    else if (!userName.isValid) {
    } else if (userEmail.value.length === 0) {
      onStoreUserEmail(userEmail.value);
      error = true;
    } else if (!regEx.test(userEmail.value)) {
      onStoreUserEmail(userEmail.value);

      error = true;
    } else if (userPassword.value.length === 0) {
      onStoreUserPassword(userPassword.value);
      error = true;
    } else if (userPassword.value.length < 8 ) {
      onStoreUserPassword(userPassword.value);
      error = true;
    } else if (userConfirmPassword.value.length === 0) {
      onStoreUserConfirmPassWord(userConfirmPassword.value);
      error = true;
    } else if (userConfirmPassword.value !== userPassword.value) {
      onStoreUserConfirmPassWord(userConfirmPassword.value);
      error = true;
    } else if (!userPassword.isValid) {
      error = true;
    } else if (!error) {
      onDisabledButton(true);
      this.props.setGoAction({ user: `${userName.value.trim()}`, email: userEmail.value, timer: this.timeForUsername, isLogin: false });

    }
  };

  timeForUsername = () => {
    if (this.state.usernameTimer == 0) {
      alert('Session time out');
    }
    setInterval(() => {
      this.setState({ usernameTimer: this.state.usernameTimer - 1 });
    }, 20000);
  }

  onSelectAla = () => {
    this.setState({ flagStripe: false });
  };

  onSelectStripe = () => {
    this.setState({ flagStripe: true });
  };
  openTimerModal = () => {
    this.props.openSuccessModal({
      title: 'Time Out',
      message: `We restict registration timing regarding to subject of availibility of Namespaces. Your registration process has cross that time. please re-register yourself. `,
      modalStatus: 2,
      showIcon: false,
      buttonClick: this.props.closeSuccessModal,

      redirectUrl: '/signup',
    });
    localStorage.clear()
    this.props.changeDisplayPayment(false);
    this.props.resetAuth();


  }
  changeUserName = (e) => {
    this.props.onStoreUserName(e.target.value.toLowerCase().trim());
  }
  render() {
    const {
      accept,
      clickedButton,
      isTouched,
    } = this.state;
    const {
      userName,
      userEmail,
      userPassword,
      userConfirmPassword,
      onStoreUserEmail,
      onStoreUserPassword,
      onStoreUserConfirmPassWord,
      userMnemonic,
      disabledInputs,
      disabledButton,
      displayPayment,
    } = this.props;
    return (
      <div>
        {/* {this.state.timer == true ? this.openTimerModal : null} */}
        <section className="" id="about">
          <div className="container">

            {!displayPayment && !userMnemonic ?
              <div className="row d-flex align-items-center justify-content-center m-50">
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-xs-12 d-flex aos-item mx-auto align-items-center justify-content-center"
                  data-aos="fade-down"
                >
                  <div className="text-center">
                    <h1 className="pb-1">Lets Register!!</h1>
                    <div className="bor-upper mx-auto" />
                    <p className="text-left">
                      Register yourself and enjoy the blockchain world of Aladin. <br/>
                      An Aladin ID is your passport to the Aladin Network

It provides you with a single secure login in that you can use to access any application, send/receive ALA coins, vote on the network, and access your own personal decentralized storage.
<br/>
The Aladin ID is also how you can buy ALA coins for your contribution and participation in the network. Through the Aladin ID users can stake and vote with their ALA coins in order to earn rewards.
                  </p>
                    {/* <button onClick={this.timeForUsername}> click me </button> */}

                    <form onSubmit={this.OnSubmitUserForm} className="user-form">
                      <div>
                        <div className="pos-relative">
                          <Image
                            src={require('../../assets/img/icon-a.png')}
                            className="mb-3 pos-absolute"
                          />
                          <Input
                            type="text"
                            valid={
                              userName.isTouched &&
                              userName.isValid &&
                              !disabledInputs
                            }
                            invalid={userName.isTouched && !userName.isValid}
                            placeholder="Username"
                            onBlur={this.checkUserNameAvailibility}
                            onChange={e => this.changeUserName(e)}
                            value={userName.value}
                            ref={this.inputs}
                            disabled={disabledInputs}
                            required
                          />
                          <p className='text-left' style={{fontSize: '14px'}}>Username can be of maximum 12 characters</p>
                          {userName.isTouched ? (
                            <FormFeedback
                              style={{ textAlign: 'left' }}
                              valid={userName.isValid}
                              invalid={!userName.isValid}
                            >
                              {userName.message}
                            </FormFeedback>
                          ) : null}

                        </div>
                        <div className="pos-relative mt-3">
                          <Image
                            src={require('../../assets/img/msg-icon.png')}
                            className="mb-3 pos-absolute"
                          />
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email ID"
                            valid={
                              userEmail.isTouched
                                ? userEmail.isValid && !disabledInputs
                                : null
                            }
                            invalid={
                              userEmail.isTouched ? !userEmail.isValid : null
                            }
                            onChange={e => onStoreUserEmail(e.target.value)}
                            value={userEmail.value}
                            disabled={disabledInputs}
                            required
                          />
                          <FormFeedback
                            style={{ textAlign: 'left' }}
                            valid={userEmail.isValid}
                            invalid={!userEmail.isValid}
                          >
                            {userEmail.message}
                          </FormFeedback>
                        </div>

                        <div className="pos-relative mt-3">
                          <Image
                            src={require('../../assets/img/lock-img.png')}
                            className="mb-3 lock-img pos-absolute"
                          />
                          <Input
                            type="password"
                            name="Password"
                            placeholder="Enter Password"
                            valid={
                              userPassword.isTouched
                                ? userPassword.isValid && !disabledInputs
                                : null
                            }
                            invalid={
                              userPassword.isTouched
                                ? !userPassword.isValid
                                : null
                            }
                            onChange={e => onStoreUserPassword(e.target.value)}
                            value={userPassword.value}
                            disabled={disabledInputs}
                            required
                          />
                          <FormFeedback
                            style={{ textAlign: 'left' }}
                            valid={userPassword.isValid}
                            invalid={!userPassword.isValid}
                          >
                            {userPassword.message}
                          </FormFeedback>

                        </div>
                        <div className="pos-relative mt-3">
                          <Image
                            src={require('../../assets/img/lock-img.png')}
                            className="mb-3 lock-img pos-absolute"
                          />
                          <Input
                            type="password"
                            name="Password"
                            placeholder="Confirm Password"
                            valid={
                              userConfirmPassword.isTouched
                                ? userConfirmPassword.isValid && !disabledInputs
                                : null
                            }
                            invalid={
                              userConfirmPassword.isTouched
                                ? !userConfirmPassword.isValid
                                : null
                            }
                            onChange={e =>
                              onStoreUserConfirmPassWord(e.target.value)
                            }
                            value={userConfirmPassword.value}
                            disabled={disabledInputs}
                            required
                          />
                          <FormFeedback
                            style={{ textAlign: 'left' }}
                            valid={userConfirmPassword.isValid}
                            invalid={!userConfirmPassword.isValid}
                          >
                            {userConfirmPassword.message}
                          </FormFeedback>

                        </div>

                        <label
                          className="container-a text-left"
                          htmlFor="checkbox"
                          onChange={() =>
                            this.setState({
                              accept: !accept,
                              isTouched: true,
                              clickedButton: !clickedButton,
                            })
                          }
                        >
                          <p
                            className="pad-10 color-black-a"
                            style={{
                              cursor: disabledInputs ? 'not-allowed' : 'pointer',
                            }}
                          >
                            <a
                              style={{
                                pointerEvents: disabledInputs ? 'none' : '',

                                textDecoration: disabledInputs ? 'none' : '',
                              }}
                            >
                              I accept the user license agreement
                          </a>
                          </p>
                          <Input
                            type="checkbox"
                            id="checkbox"
                            className="password-chekbox"
                            checked={accept}
                            disabled={disabledInputs}
                            style={{
                              cursor: disabledInputs ? 'not-allowed' : 'pointer',
                            }}
                          />
                          <span
                            className="checkmark left-align"
                            style={{
                              cursor: disabledInputs ? 'not-allowed' : 'pointer',
                            }}
                          />
                        </label>
                        <FormFeedback
                          style={
                            isTouched && !accept
                              ? { textAlign: 'left', display: 'block' }
                              : {}
                          }
                          // valid={accept}
                          invalid={!accept}
                        >
                          Please accept license agreement
                      </FormFeedback>
                        <Button
                          className="btn btn-primary mt-3 request_demo_send width-100"
                          type="submit"
                          disabled={disabledButton}
                        >
                          {disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Continue'}
                        </Button>
                        {/* {userMnemonic ? (
                          <SecretKey
                            open={this.onShowModal}
                            mnemonic={userMnemonic}
                          />
                        ) : null} */}


                        {/* for sign-in with block stack button uncomment below code. */}
                        {/* <Button
                        className="btn btn-primary btn-lg"
                        id="signin-button"
                        onClick={this.handleSignIn}>
                        Sign In with Aladin
                      </Button> */}
                      </div>
                    </form>
                  </div>
                </div>
              </div> : null}

            {/* New payment flow */}
            {displayPayment && !userMnemonic ?
              <div>
                <div className="row d-flex align-items-center justify-content-center m-50">
                  <div
                    className="col-lg-5 col-md-12 col-sm-12 col-xs-12 d-flex aos-item mx-auto align-items-center justify-content-center"
                    data-aos="fade-down"
                  >
                    <div className="text-center">
                      <h1 className="pb-1">Lets Register!!</h1>
                      <div className="bor-upper mx-auto" />
                      {/* <div>Registration closes in <span id="time">05:00</span> minutes!</div> */}
                      <p className="text-left">
                        Register yourself and enjoy the blockchain world of Aladin
                      </p>
                      {/* <p>User name <b>{userName.value}</b> is available to you for <b>{this.state.usernameTimer}</b> mins.</p> */}
                      <div className=" mt-3 text-left">
                        <h5 className="text-secondary font-weight-normal mr-4">
                          Free accounts for a limited time!!
                        </h5>
                        {/* {this.callTimer()} */}
                        <div>
                          <div className="pos-relative mt-3">
                            Use the following card details for this exclusive offer!
                            <br/>
                            <br/>
                            Card Number: 4659 3524 1635 3200
                            <br/>
                            Card Expiry: 06/24
                            <br/>
                            Card CVV: 123
                          </div>

                          <div className="row"><div className="col-lg-12"> <div className="mt-3">
                            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                              <Elements>
                                <CheckoutForm userName={userName} isStripe={true} />
                              </Elements>
                            </StripeProvider>
                          </div></div></div>

                          <Button
                          className="btn btn-primary mt-3 request_demo_send width-100" disabled={disabledButton} onClick={this.backAction} >Cancel</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : null}

            {userMnemonic ? (
              <div>
                <div className="row d-flex align-items-center justify-content-center m-50">
                  <div
                    className="col-lg-5 col-md-12 col-sm-12 col-xs-12 d-flex aos-item mx-auto align-items-center justify-content-center"
                    data-aos="fade-down"
                  >
                    <div className="text-center">
                      <h1 className="pb-1">Lets Register!!</h1>
                      <div className="bor-upper mx-auto" />

                      <p className="text-left">
                        Register yourself and enjoy the blockchain world of Aladin
                    </p>
                      {userMnemonic ? (
                        <SecretKey
                          open={this.onShowModal}
                          mnemonic={userMnemonic}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

          </div>
        </section>
      </div>
    );
  }
}

Signup.propTypes = {
  onOpenModal: PropTypes.func,
  closeSignInModal: PropTypes.func,
  openSuccessModal: PropTypes.func,
  closeSuccessModal: PropTypes.func,
  onCheckUserNameAvailaibility: PropTypes.func,
  onStoreUserName: PropTypes.func,
  userName: PropTypes.string,
  userEmail: PropTypes.string,
  userPassword: PropTypes.string,
  userConfirmPassword: PropTypes.string,
  onStoreUserEmail: PropTypes.func,
  onStoreUserPassword: PropTypes.func,
  onStoreUserConfirmPassWord: PropTypes.func,
  onCreatUserId: PropTypes.func,
  formValidatorOnCheckUser: PropTypes.func,
  userMnemonic: PropTypes.string,
  disabledInputs: PropTypes.bool,
};

const mapStateToProps = ({ auth, profile }) => {
  const {
    userName,
    userEmail,
    userPassword,
    userConfirmPassword,
    formValidator,
    userMnemonic,
    disabledInputs,
    stripeToken,
    displayPayment,
    paymentSuccess,
  } = auth;
  const { disabledButton, alaCoinId, loaderFlag } = profile;

  return {
    userName,
    userEmail,
    userPassword,
    userConfirmPassword,
    formValidator,
    userMnemonic,
    disabledInputs,
    disabledButton,
    alaCoinId,
    stripeToken,
    displayPayment,
    paymentSuccess,
    loaderFlag,
  };
};

const mapDispatchToProps = dispatch => ({
  onOpenModal: payload => dispatch(actions.openSignInModal(payload)),
  closeSignInModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  onCheckUserNameAvailaibility: payload =>
    dispatch(actions.checkUserNameAvailibility(payload)),
  onStoreUserName: payload =>
    dispatch(actions.storeUserNameOnCheckAvailibility(payload)),
  onStoreUserEmail: payload => dispatch(actions.storeUserEmail(payload)),
  onStoreUserPassword: payload => dispatch(actions.storeUserPassword(payload)),
  onStoreUserConfirmPassWord: payload =>
    dispatch(actions.storeUserConfirmPassword(payload)),
  onCreatUserId: payload => dispatch(actions.onCreatUserId(payload)),
  formValidatorOnCheckUser: payload =>
    dispatch(actions.formValidatorOnCheckUser(payload)),
  onClearUserName: () => dispatch(actions.clearStoredUserName()),
  onDisabledInput: payload => dispatch(actions.disabledInputs(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  setGoAction: payload => dispatch(actions.setGoAction(payload)),
  getPayment: payload => dispatch(actions.getPayment(payload)),
  alaCoinIdChanged: payload => dispatch(actions.alaCoinIdChanged(payload)),
  changeDisplayPayment: payload => dispatch(actions.displayPayment(payload)),
  resetAuth: payload => dispatch(actions.resetAuth(payload)),
  showLoader: payload => dispatch(actions.showLoader(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

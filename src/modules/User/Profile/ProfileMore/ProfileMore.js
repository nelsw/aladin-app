import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, FormFeedback } from 'reactstrap';
import * as actions from '../../../../actions';
import Button from '../../../../components/InputControls/Button/Button';
import Image from '../../../../components/Image/Image';
import CheckoutForm from '../../../Signup/CheckoutForm';
import {
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import { USERNAME_POSTFIX } from '../../../../constants/constants';
let PASSWORD, TIMEOUT;
class ProfileMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: 1,
          name: 'karsh.a.edu',
          id: '1233WDDDXXSDFFF',
          DefaultID: 'name is done by me',
        },
        {
          id: 2,
          name: 'karsh.a.edu',
          id: '1233WDDDXXSDFFF',
          DefaultID: 'name is done by me',
        },
      ],
      storeSelectedId: '',
      update: false,
      stripe: false,
      flagStripe: false,
      Ala: false,
      flagAla: true,
      selectedUser: JSON.parse(localStorage.getItem('userData')).currentUser,
      accountNo: '',
    };
  }

  componentWillMount = () => {
    const { address, currentUser } = JSON.parse(localStorage.getItem('userData'));
    this.props.clearCreateIdData();
    console.log("mefgga", JSON.parse(localStorage.getItem('userData')).currentUser)
  }

  componentDidMount = () => {
    const { selectedUser, accountNo } = this.state;
    const { onDisabledButton, hideLoader } = this.props;
    onDisabledButton(false);
    hideLoader();
    let { address } = JSON.parse(localStorage.getItem('userData'));
    let currentIndex;
    // let alaIndex = balance.toString().indexOf(" ");
    // let amount = balance.toString().trim().slice(0, alaIndex);
    const { currentUser } = JSON.parse(localStorage.getItem('userData'));
    address.map((item, index) => {
      if (item.username == currentUser) {
        currentIndex = index;
      }
    });
    this.setState({ accountNo: currentIndex + 1 });
    window.scrollTo(0, 0);
  }

  onSelectAla = () => {
    this.setState({ flagStripe: false, flagAla: true });
  };

  onSelectStripe = () => {
    this.setState({ flagStripe: true, flagAla: false });
  };

  onCloseModal = () => {
    const {
      onCloseSignInModal,
      clearStoredPasswrod,
      onClearStoredUserName,
      clearCreateIdData,
    } = this.props;
    onCloseSignInModal();
    clearCreateIdData();
    clearStoredPasswrod();
    onClearStoredUserName();
  };
  externalClose = () => {
    this.props.onCloseSuccessModal()
  }

  onCheckUsername = () => {
    const {
      userName,
      formValidatorOnCheckUser,
      checkUserNameAvailaibility,
    } = this.props;
    if (userName.value.length === 0) {
      formValidatorOnCheckUser({});
    }
    if (
      userName.value.length > 0 && userName.value.length < 6
      // && /(?=\s|^)[^.\s]+\.[^.\s]+\.[^.\s]/gm.test(userName.value)
    ) {
      checkUserNameAvailaibility(`${userName.value.trim()}`);
    }
  };

  createOptions = () => ({
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
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

  stripePayment = (password) => {
    const {
      userName,
      passwordForAnotherAccount,
      onCreateAnotherAccount,
      disabledButton,
      onOpenModal,
      paymtMessage,
      userEmail,
      alaCoinId,
      alaCoinIdChanged,
      balance
    } = this.props;
    let alaIndex = balance.toString().indexOf(" ");
    let amount = balance.toString().trim().slice(0, alaIndex);
    const { address, currentUser } = JSON.parse(localStorage.getItem('userData'));
    // this.state
    console.log("PARTH : TCL: ProfileMore -> stripePayment -> this.state", this.state)
    console.log('password===', PASSWORD);
    if (
      userName.userNameApiResponse &&
      PASSWORD.length > 0
    ) {

      onOpenModal({
        title: 'Create Another ID',
        body: [
          <div className="text-left">
            <div className="bor-upper mx-auto"></div>
            <p className='mb-2'>Provide any one of this payment detail:</p>
            <div className="custom-control custom-radio custom-control-inline mr-3">
              <input id="inlineRadio2"
                className="custom-control-input"
                defaultChecked={this.state.flagAla}
                type="radio"
                name="inlineRadioOptions"
                style={{ cursor: 'pointer' }}
                onChange={this.onSelectAla}
              />
              <label
                className="custom-control-label"
                htmlFor="inlineRadio2"
              >
                ALA coin
               </label>
            </div>
            <div className="custom-control custom-radio custom-control-inline  mr-3">
              <input id="inlineRadio1"
                className="custom-control-input"
                type="radio"
                defaultChecked={this.state.flagStripe}
                name="inlineRadioOptions"
                onChange={this.onSelectStripe}
                style={{ cursor: 'pointer' }}
              />
              <label
                className="custom-control-label"
                htmlFor="inlineRadio1"
              >
                Debit/Credit card
               </label>
            </div>

            {this.state.flagStripe ? (
              <div className="row"><div className="col-lg-12"> <div className="mt-3">
                <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                  <Elements>
                    <CheckoutForm userName={userName} isLogin={true} isStripe={true} />
                  </Elements>
                </StripeProvider>
              </div></div></div>

            ) : null}
            {this.state.flagAla ? (
                <form onSubmit={e => { e.preventDefault(); this.alaPayment(); }}>
                  <div className="pos-relative mt-3">
                    Select your account to pay through ALA :
                               <select onChange={this.getBalance} className="form-control mt-2 select-toggle pad-control mb-3 width-100">
                      {address.map((item, index) =>
                        <option selected={item.username === currentUser ? 'selected' : null}>{index + 1} {item.username}</option>
                      )}
                    </select>
                    <p className="mb-0" style={{ display: 'inline-block', fontSize: '24px' }}>{balance}</p>
                    <p className={amount > 10.0000 ? '' : 'color-red'}>{amount > 10.0000 ? 'Pay from this amount' : 'Insufficient balance. buy Ala for this account.'}</p>
                    <p>You will be charged 10 ALAs.</p>
                    {amount > 10.0000 ?
                      <button type="submit" className="btn  width-100 mt-4  btn-primary" disabled={disabledButton}>{disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Pay and Register'}</button>
                      :

                      <div>
                        <div className="row"><div className="col-lg-12"> <div className="mt-3">
                          <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                            <Elements>
                              <CheckoutForm userName={userName} isLogin={true} password={PASSWORD}
                                selectedUser={this.state.selectedUser}
                                fromBuyAla={true} isSufficient={false} isStripe={false} accountNo={this.state.accountNo} closeSuccessModal={this.closeSuccessModal} />
                            </Elements>
                          </StripeProvider>
                        </div></div></div>
                        {/* <button className="btn  width-100 mt-4  btn-primary">Buy ALA and Register</button> */}
                      </div>
                    }

                  </div>
                </form>
              ) : null
            }

          </div>,
        ],
        buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Pay Register',
        hideButton: true,
        buttonClick: () => { },
        cancelButton: this.onCloseModal,
        modalName: 'stripePayment',
        cancelButtonFlag: true,
        cancelButtonName: 'Cancel',
        disabled: disabledButton,
      });
    }
  };

  getBalance = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    let spaceIndex = value.indexOf(' ');
    let accountNo = value.slice(0, spaceIndex);
    let user = value.slice(spaceIndex).trim();


    this.setState({ selectedUser: user, accountNo: accountNo });
    const { balance, getBalance } = this.props;

    console.log('from onchange of selectvalue==', e.target.value);
    getBalance(user);
  }

  alaPayment = () => {
    let { getPayment, userName, passwordForAnotherAccount, balance, onDisabledButton } = this.props;
    userName.value = `${userName.value.trim()}`;
    const { selectedUser, accountNo } = this.state;
    let { address } = JSON.parse(localStorage.getItem('userData'));
    let currentIndex;
    let alaIndex = balance.toString().indexOf(" ");
    let amount = balance.toString().trim().slice(0, alaIndex);
    const { currentUser } = JSON.parse(localStorage.getItem('userData'));
    address.map((item, index) => {
      if (item.username == currentUser) {
        currentIndex = index;
      }
    })
    onDisabledButton(true);
    getPayment({ user: userName, password: PASSWORD, closeSuccessModal: this.closeSuccessModal, onCreateAccountSuccess: this.onCreateAccountSuccess, isLogin: true, isSufficient: amount > 10.0000, selectedUser: selectedUser || currentUser, accountNo: accountNo || currentIndex + 1 });
  }

  getPayment = () => {

    let { userName, passwordForAnotherAccount, getPayment, paymentMessage, paymtMessage, balance } = this.props;
    userName.value = `${userName.value.trim()}`;
    const { selectedUser } = this.state;
    let alaIndex = balance.toString().indexOf(" ");
    let amount = balance.toString().trim().slice(0, alaIndex);

    this.props.stripe.createToken({ name: 'name' })
      .then(res => {
        console.log('from stripe token', res);
        if (res.error) {
          paymentMessage(res.error.message);
        } else {
          getPayment({ token: res.id, user: userName, password: passwordForAnotherAccount.value, closeSuccessModal: this.closeSuccessModal, onCreateAccountSuccess: this.onCreateAccountSuccess, isLogin: true, isSufficient: amount > 10.0000, selectedUser: selectedUser });
          // props.paymentMessage("success");
        }
      })
      .catch(err => {
        console.log(err.data);
        paymentMessage(err.data);
      });
  }

  onOpenSearchModal = () => {
    const {
      userName,
      onStoreUserNameOnCheckAvailibility,
      storePasswordForAnotherAccount,
      passwordForAnotherAccount,
      disabledButton,
      onDisabledButton,
      usernameApiValidation,
    } = this.props;
    const password = { ...passwordForAnotherAccount };

    this.props.getBalance(JSON.parse(localStorage.getItem('userData')).currentUser);
    this.props.onOpenModal({
      title: 'Search for your username',
      body: [
        <div>
          <div>
            <p>
              Add a username to your Aladin ID so you can interact with other
              people on the decentralized internet.
            </p>
          </div>

          <div className="pos-relative mt-3">
            <Image
              src={require('../../../../assets/img/icon-a.png')}
              className="mb-3 pos-absolute"
            />
            <Input
              type="text"
              name="Username"
              placeholder="Search for Username"
              valid={userName.isTouched ? userName.isValid : false}
              invalid={userName.isTouched ? !userName.isValid : false}
              onBlur={this.onCheckUsername}
              value={userName.value}
              onChange={e => onStoreUserNameOnCheckAvailibility(e.target.value.toLowerCase().trim())}
            />
            <FormFeedback
              style={{ textAlign: 'left' }}
              valid={userName.isValid}
              invalid={!userName.isValid}
            >
              {userName.message}
              {/* {password.message} */}
            </FormFeedback>
          </div>
          <div className="pos-relative mt-3">
            <Image
              src={require('../../../../assets/img/lock-img.png')}
              className="mb-3 lock-img pos-absolute"
              alt="yoo"
            />
            <Input
              type="password"
              name="Password"
              placeholder="Enter Password"
              valid={password.isTouched ? password.isValid : false}
              invalid={password.isTouched ? !password.isValid : false}
              onChange={e => storePasswordForAnotherAccount(e.target.value)}
            />
            <FormFeedback
              style={{ textAlign: 'left' }}
              valid={password.isValid}
              invalid={!password.isValid}
            >
              {password.message}
              {/* {password.message} */}
            </FormFeedback>
          </div>
        </div>,
      ],
      buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Submit',
      buttonClick: this.stripePayment,
      cancelButton: this.onCloseModal,
      modalName: 'onOpenSearchModal',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      disabled:
        !(
          userName.isValid &&
          password.isValid &&
          userName.userNameApiResponse
        ) || disabledButton,
    });
  };

  openSuccessModal = () => {
    this.props.onOpenSuccessModal({
      title: 'Success',
      message: 'You have successfully resgistered your user name.',
      modalStatus: 2,
      closeModal: this.props.onCloseSuccessModal,
      redirectUrl: '',
      showIcon: true,
    });
    this.props.onCloseSignInModal();
  };

  onCreateAccountSuccess = () => {
    console.log("MEGHA HERE")
    const { onOpenSuccessModal, onCloseSuccessModal } = this.props;
    // onOpenSuccessModal({
    //   title: 'Success',
    //   message: 'Your Id has been successfully created.',
    //   modalStatus: 2,
    //   closeModal: onCloseSuccessModal,
    //   redirectUrl: '',
    //   showIcon: true,
    // });
  }

  onClickHandler = (id, username, index) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    console.log(id, username);
    userData.defaultId = id;
    userData.currentUser = username;
    localStorage.setItem('userData', JSON.stringify(userData));
    this.setState({ storeSelectedId: id });
    this.props.setAccountNo(index);
  };

  checkForAnotherId = () => {
    const {
      userPassword,
      storeUserPassword,
      disabledButton,
      onDisabledButton,
      hideLoader,
    } = this.props;
    // const password = { ...passwordForAnotherAccount };
    // onDisabledButton(false);
    this.props.onOpenModal({
      title: 'Search for your username',
      body: [
        <div>
          <div>
            <p>
              Add a username to your Aladin ID so you can interact with other
              people on the decentralized internet.
            </p>
          </div>
          <div className="pos-relative mt-3">
            <Image
              src={require('../../../../assets/img/lock-img.png')}
              className="mb-3 lock-img pos-absolute"
              alt="yoo"
            />
            <Input
              type="password"
              name="Password"
              placeholder="Enter Password"
              valid={userPassword.isTouched ? userPassword.isValid : false}
              invalid={userPassword.isTouched ? !userPassword.isValid : false}
              onChange={e => storeUserPassword(e.target.value)}
            />
            <FormFeedback
              style={{ textAlign: 'left' }}
              valid={userPassword.isValid}
              invalid={!userPassword.isValid}
            >
              {userPassword.message}
              {/* {password.message} */}
            </FormFeedback>
          </div>
        </div>,
      ],
      buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Search',
      buttonClick: this.showAnotherId,
      cancelButton: this.onCloseModal,
      modalName: 'checkForAnotherId',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      disabled: !userPassword.isValid || disabledButton,
    });
  }

  closeSuccessModal = () => {
    const { onCloseSuccessModal } = this.props;
    onCloseSuccessModal();
  }

  showAnotherId = () => {
    const { checkForAnotherId, userPassword, closeSuccessModal, onDisabledButton } = this.props;
    this.props.getBalance(JSON.parse(localStorage.getItem('userData')).currentUser);
    onDisabledButton(true);
    PASSWORD = userPassword.value;
    checkForAnotherId({ password: PASSWORD, createAnotherId: this.createAnotherId, closeSuccessModal: this.closeSuccessModal });
    console.log(userPassword.value);
  }

  createAnotherId = () => {
    const {
      userName, userEmail,
      onStoreUserEmail,
      onStoreUserNameOnCheckAvailibility,
      storePasswordForAnotherAccount,
      passwordForAnotherAccount,
      disabledButton,
      usernameApiValidation,
      onOpenModal,
    } = this.props;
    const password = { ...passwordForAnotherAccount };

    onOpenModal({
      title: 'Create Another Id',
      body: [
        <div>
          <div>
            <p>
              Add a username to your Aladin ID so you can interact with other
              people on the decentralized internet.
            </p>
          </div>

          <div className="pos-relative mt-3">
            <Image
              src={require('../../../../assets/img/icon-a.png')}
              className="mb-3 pos-absolute"
            />
            <Input
              type="text"
              name="Username"
              placeholder="Search for Username"
              valid={userName.isTouched ? userName.isValid : false}
              invalid={userName.isTouched ? !userName.isValid : false}
              onBlur={this.onCheckUsername}
              value={userName.value}
              onChange={e => {
                let username = e.target.value.toLowerCase().trim();
                onStoreUserNameOnCheckAvailibility(username);
                clearTimeout(TIMEOUT);
                TIMEOUT = setTimeout(()=> {
                  if(username.length > 0 && username.length < 6 && /^[a-z1-5]*$/.test(username)) {
                    this.onCheckUsername();
                  }
                }, 1000);
              }}
            />
            <FormFeedback
              style={{ textAlign: 'left' }}
              valid={userName.isValid}
              invalid={!userName.isValid}
            >
              {userName.message}
              {/* {password.message} */}
            </FormFeedback>
          </div>
          {/* <div className="pos-relative mt-3">
            <Image
              src={require('../../../../assets/img/msg-icon.png')}
              className="mb-3 pos-absolute"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email ID"
              valid={
                userEmail.isTouched
                  ? userEmail.isValid
                  : null
              }
              invalid={
                userEmail.isTouched ? !userEmail.isValid : null
              }
              onChange={e => onStoreUserEmail(e.target.value)}
              value={userEmail.value}
              // disabled={disabledInputs}
              required
            />
            <FormFeedback
              style={{ textAlign: 'left' }}
              valid={userEmail.isValid}
              invalid={!userEmail.isValid}
            >
              {userEmail.message}
            </FormFeedback>
          </div> */}

          {/* <div className="pos-relative mt-3">
            <Image
              src={require('../../../../assets/img/lock-img.png')}
              className="mb-3 lock-img pos-absolute"
              alt="yoo"
            />
            <Input
              type="password"
              name="Password"
              placeholder="Enter Password"
              valid={password.isTouched ? password.isValid : false}
              invalid={password.isTouched ? !password.isValid : false}
              onChange={e => storePasswordForAnotherAccount(e.target.value)}
            />
            <FormFeedback
              style={{ textAlign: 'left' }}
              valid={password.isValid}
              invalid={!password.isValid}
            >
              {password.message}
            </FormFeedback>
          </div> */}
        </div>,
      ],
      buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Submit',
      // buttonClick: this.stripePayment,
      buttonClick: this.setGo,
      cancelButton: this.onCloseModal,
      modalName: 'createAnotherId',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      disabled:
        !(
          userName.isValid &&
          userName.userNameApiResponse
        ) || disabledButton,
    });
  }

  setGo = () => {
    const { userName, userEmail, passwordForAnotherAccount, setGoAction, onDisabledButton } = this.props;
    onDisabledButton(true);
    setGoAction({ user: `${userName.value.trim()}`, email: JSON.parse(localStorage.getItem('userData')).email, timer: this.timeForUsername, isLogin: true, stripePayment: this.stripePayment, password: PASSWORD });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.createdAnotherAccount && !this.state.update) {
  //     this.props.onOpenSuccessModal({
  //       title: 'Success',
  //       message: 'Your Id has been successfully created...',
  //       modalStatus: 2,
  //       closeModal: this.externalClose,
  //       redirectUrl: '',
  //       showIcon: true,
  //       buttonClick: this.externalClose,
  //       from: "AnotherID"
  //     })
  //     this.setState({ update: true })
  //   }
  // }

  render() {
    // const { addIdModal, availableNameModal, successModal } = this.state;
    // const { address } = JSON.parse(localStorage.getItem('userData'));
    console.log("MEGHA Selected User", this.state.selectedUser);
    // this.state
    console.log("PARTH : TCL: ProfileMore -> render -> this.state", this.state)
    const { modalName, balance } = this.props;
    const { storeSelectedId } = this.state;
    if (modalName !== '' && this[modalName] !== undefined) {
      this[modalName]();
    }
    let address;
    let defaultId;
    if (localStorage.getItem('userData') !== null) {
      ({ address, defaultId } = JSON.parse(localStorage.getItem('userData')));
    }
    console.log(defaultId);

    return (
      <div>
        <section className="page-section">
          <div className="bg-img1  d-flex align-items-center">
            <div
              className={
                address.length > 1
                  ? 'container back-color padingbt-40'
                  : 'container back-color p-41 height-pass'
              }
            >
              <div className="row aos-item" data-aos="fade-down">
                <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                  <NavLink to="/profile">
                    <Button className="btn btn-primary" type="button">
                      Back
                    </Button>
                  </NavLink>
                  <div id="Storage-more">
                    {address.length > 0
                      ? address.map((item, index) => (
                        <div
                          className="card-d"
                          key={index}
                          onClick={() =>
                            this.onClickHandler(item.address, item.username, index)
                          }
                        >
                          <ul>
                            {/* <li>
                                {' '}
                                <Image
                                  src={require('../../../../assets/img/img-more.png')}
                                />
                              </li> */}
                            <li>
                              {' '}
                              <p className="font-16 color-black">
                                {item.username.split('.')[0]}
                              </p>
                              <br />
                              <span className="font-14 color-grey">
                                {' '}
                                ID-{item.address}
                                <br />
                                {item.address === defaultId ||
                                  item.address === storeSelectedId ? (
                                    <span>
                                      Default ID
                                      <i
                                        className="fa fa-check color-black ml-1"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                {/* {index === 0
                                    ? (<p>Default ID</p>,
                                      (
                                        <i
                                          className="fa fa-check color-black ml-1"
                                          aria-hidden="true"
                                        />
                                      ))
                                    : null} */}
                              </span>
                            </li>
                          </ul>
                        </div>
                      ))
                      : null}

                    <div id="Storage-pro">
                      <Button
                        className="btn d-block mx-auto mt-4 btn-primary"
                        data-toggle="modal"
                        data-target="#more-profile"
                        type="button"
                        onClick={this.checkForAnotherId}
                      // onClick={this.onOpenSearchModal}
                      >
                        Add Another ID
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div >
    );
  }
}

const mapStateToProps = ({ profile, modal, auth }) => {

  const { passwordForAnotherAccount, disabledButton, alaCoinId, accountNo, createdAnotherAccount } = profile;
  const { modalName } = modal;
  const { userName, userEmail, usernameApiValidation, userPassword, paymtMessage, balance } = auth;
  return {
    passwordForAnotherAccount,
    modalName,
    userName,
    disabledButton, createdAnotherAccount,
    usernameApiValidation,
    userPassword,
    paymtMessage,
    userEmail,
    alaCoinId,
    balance,
    accountNo,
  };
};

const mapDispatchToProps = dispatch => ({
  onOpenModal: payload => dispatch(actions.openSignInModal(payload)),
  onCloseSignInModal: () => dispatch(actions.closeSignInModal()),
  onOpenSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  onCloseSuccessModal: () => dispatch(actions.closeSuccessModal()),
  storePasswordForAnotherAccount: payload =>
    dispatch(actions.storePasswordForAnotherAccount(payload)),
  clearStoredPasswrod: () => dispatch(actions.clearPasswordForAnotherAccount()),
  onStoreUserNameOnCheckAvailibility: payload =>
    dispatch(actions.storeUserNameOnCheckAvailibility(payload)),
  onClearStoredUserName: () => dispatch(actions.clearStoredUserName()),
  checkUserNameAvailaibility: payload =>
    dispatch(actions.checkUserNameAvailibility(payload)),
  formValidatorOnCheckUser: payload =>
    dispatch(actions.formValidatorOnCheckUser(payload)),
  onCreateAnotherAccount: payload =>
    dispatch(actions.checkUserPassword(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  storeUserPassword: payload => dispatch(actions.storeUserPassword(payload)),
  checkForAnotherId: payload => dispatch(actions.checkForAnotherId(payload)),
  clearCreateIdData: () => dispatch(actions.clearCreateIdData()),
  getPayment: payload => dispatch(actions.getPayment(payload)),
  paymentMessage: payload => dispatch(actions.paymentMessage(payload)),
  setGoAction: payload => dispatch(actions.setGoAction(payload)),
  onStoreUserEmail: payload => dispatch(actions.storeUserEmail(payload)),
  alaCoinIdChanged: payload => dispatch(actions.alaCoinIdChanged(payload)),
  getBalance: payload => dispatch(actions.getBalance(payload)),
  setAccountNo: payload => dispatch(actions.setAccountNo(payload)),
  hideLoader: () => dispatch(actions.showLoader()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMore);

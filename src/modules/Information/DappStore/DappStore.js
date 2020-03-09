import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, FormFeedback } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import Image from '../../../components/Image/Image.jsx';
import * as actions from '../../../actions';
import DappCard from '../../../components/Cards/DappCard/DappCard';
import { validateAndCleanRecoveryInput } from '../../../util/encryption-utils';

let KEY;

class DappStore extends Component {
  state = {
    copied: false,
  };

  componentWillMount() {
    const { getDapps } = this.props;
    getDapps();
  }

  componentDidMount() {
    if (window.location.search != '') {
      const index = window.location.href.indexOf('=');
      const temp = decodeURIComponent(window.location.href.slice(index + 1));
      const valid = validateAndCleanRecoveryInput(temp);
      const mCode = this.hexConvertor(temp);

      if (valid.isValid) {
        this.requestForRecoveryKey();
      } else {
        this.props.openSignInModal({
          title: 'Secret Recovery Key',

          body: [
            <div>
              <div className="pos-relative  ">
                <p>
                  There seems to be some issue with a link! Please check your
                  email and try again.
                </p>
              </div>
            </div>,
          ],
          buttonClick: this.props.closeSignInModal,

          buttonName: 'Ok',
          cancelButtonFlag: false,
          cancelButtonName: 'Cancel',
          cancelIconFlag: false,
          modalName: 'wrongkey',
        });
      }
    }
    window.scrollTo(0, 0);
  }

  requestForRecoveryKey = () => {
    this.props.openSignInModal({
      title: 'Save your Secret Recovery Key',

      body: [
        <div>
          <div className="pos-relative  ">
            <p>
              Your Secret Recovery Key is the most reliable way to access your
              Aladin ID. Aladin cannot reset your key. Save your key wherever
              you keep important, secret information.
            </p>
          </div>
        </div>,
      ],
      buttonClick: this.getRecoveryKey,

      buttonName: 'Secret Recovery Key',
      cancelButtonFlag: false,
      cancelButtonName: 'Cancel',
      cancelIconFlag: false,
      modalName: 'requestForRecoveryKey',
    });
  };

  getRecoveryKey = () => {
    const index = window.location.href.indexOf('=');
    const temp = decodeURIComponent(window.location.href.slice(index + 1));
    // decodeURIComponent(temp)
    const valid = validateAndCleanRecoveryInput(temp);
    const mCode = this.hexConvertor(temp);

    if (valid.isValid) {
      const {
        passwordForAnotherAccount,
        disabledButton,
        userSecretRecoveryCode,
        storePasswordForAnotherAccount,
        modalName,
        newPassword,
        storeNewPassword
      } = this.props;
      this.props.openSignInModal({
        title: 'Enter Password',
        body: [
          <div>
            <div className="pos-relative  ">
              <Image
                src={require('../../../assets/img/lock-img.png')}
                className="mb-3 lock-img pos-absolute"
                alt="yoo"
              />
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                // value={passwordForAnotherAccount.value}
                valid={
                  newPassword.isTouched
                    ? newPassword.isValid
                    : false
                }
                invalid={
                  newPassword.isTouched
                    ? !newPassword.isValid
                    : false
                }
                // value={email.value}
                onChange={e => storeNewPassword(e.target.value)}
              />
              <FormFeedback
                style={{ textAlign: 'left' }}
                valid={newPassword.isValid}
                invalid={!newPassword.isValid}
              >
                {newPassword.message}
              </FormFeedback>
            </div>
          </div>,
        ],
        buttonClick: this.onSubmitPassword,

        buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Submit',
        cancelButtonFlag: false,
        cancelButtonName: 'Cancel',
        cancelIconFlag: false,
        modalName: 'getRecoveryKey',
        disabled: disabledButton
      });
    } else {
      // handle wrong mcode
      alert('wrong mnemonic');
    }
  };

  onCopyHandler = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 3000);
  };

  hexConvertor = dataBuffer => {
    const buffer = new Buffer.from(dataBuffer, 'base64');
    const base = buffer.toString('hex');
    return base;
  };

  onSubmitPassword = () => {
    const { copied } = this.state;
    const {
      newPassword,
      onDisabledButton,
      recoverKey,
    } = this.props;

    if (newPassword.value.length > 0 && newPassword.isValid) {
      const index = window.location.href.indexOf('=');
      const temp = decodeURIComponent(window.location.href.slice(index + 1));
      const valid = validateAndCleanRecoveryInput(temp);
      const mCode = this.hexConvertor(temp);

      onDisabledButton(true);
      // if (valid.isValid) {
      recoverKey({
        code: mCode,
        password: newPassword.value,
        openLoginModal: this.openLoginModal,
        copyHandler: this.onCopyHandler,
        copied: this.state.copied,
        onGoBack: this.getRecoveryKey,
        recoverKeyModal: this.recoverKeyModal,
      });
      // } else {
      //   this.props.incorrectRecoveryCodeAtRedirect(
      //     newPassword.value
      //   );
      // }
    }
    // else {
    //   this.props.incorrectRecoveryCodeAtRedirect();
    // }
  };

  recoverKeyModal = () => {
    const { userSecretRecoveryCode } = this.props;
    KEY = userSecretRecoveryCode;
    const { openSignInModal } = this.props;
    openSignInModal({
      title: 'Recovery Key',
      body: [
        <div className="password-a   ">
          <div className=" d-block">
            <p>12 - Words Recovery Key</p>
            <textarea className="form-control mb-3" disabled="disabled">
              {userSecretRecoveryCode}
            </textarea>
          </div>
          <div className="pos-relative  ">
            <CopyToClipboard text={userSecretRecoveryCode} onCopy={this.onCopyHandler}>
              <a style={{ display: 'block', cursor: 'pointer' }}>
                <Image
                  src={require('../../../assets/img/copy-icon.png')}
                  className="mb-3 pos-absolute"
                />
                <span className="form-control">
                  {this.state.copied ? 'Copied' : 'Copy'} Secret Recovery Key
                </span>
              </a>
            </CopyToClipboard>
          </div>
        </div>,
      ],
      buttonClick: this.openLoginModal,
      buttonName: 'Go to Aladin',
      cancelButtonFlag: false,
      cancelButtonName: 'Cancel',
      cancelIconFlag: false,
      modalName: 'recoverKeyModal',
    })
  }

  onCloseSuccessModal = () => {
    this.props.recoveryKeyChanged(null);
    this.props.userPasswordChanged(null);
    this.props.userEmailChanged('');
    this.props.closeSuccessModal();
  };

  onOpenSuccessModal = () => {
    const { recoveryKey, password, createPassword, onDisabledButton,  email, userEmailChanged } = this.props;
    const { onCloseSuccessModal } = this;
    if(email.isValid) {
      if (this.props.password.isValid) {
        onDisabledButton(true);
        this.props.signInRequest({
          mnemonic_code: recoveryKey.value,
          password: password.value,
          onCloseSuccessModal,
          onCloseFailModal: this.props.closeSuccessModal,
          email: email.value,
        });
      } else if (this.props.confirmCreatePassword.isValid) {
        onDisabledButton(true);
        this.props.signInRequest({
          mnemonic: recoveryKey.value,
          password: createPassword.value,
          onCloseSuccessModal,
          onCloseFailModal: this.props.closeSuccessModal,
          email: email.value,
        });
      }
    } else {
      userEmailChanged(email.value);
    } 
    // else if (this.props.password.value == '') {
    //   this.props.userPasswordChanged(this.props.password.value);
    // }
  };

  passwordModal = () => {
    const {
      password,
      userPasswordChanged,
      recoveryKey,
      closeSignInModal,
      recoveryKeyChanged,
      disabledButton
    } = this.props;
    if (recoveryKey.isValid) {
      if (recoveryKey.type == 'code') {
        this.props.openSignInModal({
          title: 'Enter password',
          backButton: [
            <p
              className="color-red hover-icon mb-0 text-left back"
              onClick={this.openLoginModal}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa fa-long-arrow-left back" aria-hidden="true" />{' '}
              Back
            </p>,
          ],
          body: [
            <div>
              <div className="pos-relative  ">
                <Image
                  src={require('../../../assets/img/lock-img.png')}
                  className="mb-3 lock-img pos-absolute"
                  alt="yoo"
                />
                <Input
                  type="password"
                  name="Password"
                  placeholder="Enter Password"
                  valid={password.isTouched ? password.isValid : false}
                  invalid={password.isTouched ? !password.isValid : false}
                  value={password.value}
                  onChange={e => userPasswordChanged(e.target.value)}
                />
                <FormFeedback
                  style={{ textAlign: 'left' }}
                  valid={password.isValid}
                  invalid={!password.isValid}
                >
                  {password.message}
                </FormFeedback>
              </div>
            </div>,
          ],
          buttonClick: this.emailModal,
          cancelButton: () => {
            closeSignInModal();
            recoveryKeyChanged(null);
            userPasswordChanged(null);
          },
          buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Sign in',
          cancelButtonFlag: false,
          cancelButtonName: 'Cancel',
          cancelIconFlag: false,
          modalName: 'passwordModal',
          disabled: (!password.isValid) || disabledButton,
        });
      } else {
        const {
          createPassword,
          createPasswordChanged,
          confirmCreatePassword,
          confirmCreatePasswordChanged,
          closeSignInModal,
          recoveryKeyChanged,
        } = this.props;

        this.props.openSignInModal({
          title: 'Create a password',
          backButton: [
            <p
              className="color-red hover-icon mb-0 text-left back"
              onClick={this.openLoginModal}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa fa-long-arrow-left back" aria-hidden="true" />{' '}
              Back
            </p>,
          ],
          body: [
            <div>
              <div className="pos-relative  ">
                <Image
                  src={require('../../../assets/img/lock-img.png')}
                  className="mb-3 lock-img pos-absolute"
                />
                <Input
                  type="password"
                  name="Password"
                  placeholder="Enter Password"
                  valid={
                    createPassword.isTouched ? createPassword.isValid : null
                  }
                  invalid={
                    createPassword.isTouched ? !createPassword.isValid : null
                  }
                  value={createPassword.value}
                  onChange={e => {
                    createPasswordChanged(e.target.value);
                    if(confirmCreatePassword.value != '') {
                      confirmCreatePasswordChanged(confirmCreatePassword.value);
                    }
                  }}
                />
                <FormFeedback
                  style={{ textAlign: 'left' }}
                  valid={createPassword.isValid}
                  invalid={!createPassword.isValid}
                >
                  {createPassword.message}
                </FormFeedback>
              </div>
              <div className="pos-relative  ">
                <Image
                  src={require('../../../assets/img/lock-img.png')}
                  className="mb-3 lock-img pos-absolute"
                />
                <Input
                  type="password"
                  name="Password"
                  placeholder="Confirm Password"
                  valid={
                    confirmCreatePassword.isTouched
                      ? confirmCreatePassword.isValid
                      : null
                  }
                  invalid={
                    confirmCreatePassword.isTouched
                      ? !confirmCreatePassword.isValid
                      : null
                  }
                  value={confirmCreatePassword.value}
                  onChange={e => {
                    confirmCreatePasswordChanged(e.target.value);
                    if(createPassword.value != '') {
                      createPasswordChanged(createPassword.value);
                    }
                  }}
                />
                <FormFeedback
                  style={{ textAlign: 'left' }}
                  valid={confirmCreatePassword.isValid}
                  invalid={!confirmCreatePassword.isValid}
                >
                  {confirmCreatePassword.message}
                </FormFeedback>
              </div>
            </div>,
          ],
          buttonClick: this.emailModal,
          cancelButton: () => {
            closeSignInModal();
            recoveryKeyChanged(null);
            userPasswordChanged(null);
            confirmCreatePasswordChanged(null);
            createPasswordChanged(null);
          },
          buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Sign in',
          cancelButtonFlag: true,
          cancelButtonName: 'Cancel',
          modalName: 'passwordModal',
          disabled: (!createPassword.isValid || !confirmCreatePassword.isValid) || disabledButton,
        });
      }
    } else if (this.props.recoveryKey.value == '') {
      this.props.recoveryKeyChanged(this.props.recoveryKey.value);
    }
  };

  emailModal = () => {
    const { email, userEmailChanged, disabledButton, password, createPassword, confirmCreatePassword, recoveryKey } = this.props;
    this.props.openSignInModal({
      title: 'Email Address',
      backButton: [
        <p
          className="color-red hover-icon mb-0 text-left back"
          onClick={this.passwordModal}
          style={{ cursor: 'pointer' }}
        >
          <i className="fa fa-long-arrow-left back" aria-hidden="true" /> Back
        </p>,
      ],
      body: [
        <div>
          <div className="pos-relative mt-3">
            <Image
              src={require('../../../assets/img/msg-icon.png')}
              className="mb-3 lock-img pos-absolute"
              alt="yoo"
            />
            <Input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              valid={email.isTouched ? email.isValid : false}
              invalid={email.isTouched ? !email.isValid : false}
              value={email.value}
              onChange={e => userEmailChanged(e.target.value)}
            />
        
            <FormFeedback
              style={{ textAlign: 'left' }}
              valid={email.isValid}
              invalid={!email.isValid}
            >
              {email.message}
            </FormFeedback>
          </div>
        </div>,
      ],
      buttonClick: this.onOpenSuccessModal,
      cancelButton: this.props.closeSignInModal,
      buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Sign in',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      modalName: 'emailModal',
      // disabled: (recoveryKey.type == 'code' && !password.isValid) || (recoveryKey.type != 'code' && !createPassword.isValid || !confirmCreatePassword.isValid) || disabledButton,
      disabled: disabledButton,
    });
  };

  openLoginModal = () => {
    if (localStorage.getItem('mnemonicCode')) {
      this.props.closeSignInModal();
      this.props.history.replace('/dappStore');
    } else {
      const { recoveryKey, recoveryKeyChanged } = this.props;
      this.props.openSignInModal({
        title: 'Enter Secret Recovery Key or Magic Recovery Code',
        body: [
          <div>
            <div className=" d-block">
              <Input
                type="textarea"
                valid={recoveryKey.isTouched && recoveryKey.isValid}
                invalid={recoveryKey.isTouched && !recoveryKey.isValid}
                placeholder="Recovery Code/Key"
                onChange={e => recoveryKeyChanged(e.target.value)}
                value={recoveryKey.value}
              />
              {recoveryKey.isTouched ? (
                <FormFeedback
                  style={{ textAlign: 'left' }}
                  valid={recoveryKey.isValid}
                  invalid={!recoveryKey.isValid}
                >
                  {recoveryKey.message}
                </FormFeedback>
              ) : null}
            </div>
          </div>,
        ],
        buttonClick: this.passwordModal,
        cancelButton: () => {
          this.props.closeSignInModal();
          recoveryKeyChanged(null);
        },
        buttonName: 'Sign in',
        cancelButtonFlag: true,
        cancelButtonName: 'Cancel',
        modalName: 'openLoginModal',
      });
    }
  };

  render() {
    const { dappData, copied } = this.state;
    const { dapps, modalName, userSecretRecoveryCode } = this.props;
    // if (window.location.pathname === '/dappStore') {
    //   this.getRecoveryKey();
    // }
    if (modalName !== '' && this[modalName] !== undefined) {
      this[modalName]();
    }
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));
    return (
      // <!--start section -->
      <section className="m-101 " id="dapp-store">
        <div className="container-big">
          <div className="row ">
            <div
              className="col-lg-12 col-md-12 col-sm-12 col-12 aos-item "
              data-aos="fade-top"
            >
              {/* <h1 className="text-center">Top Apps</h1> */}
              {/* <div className="bor-upper ml-5 mx-auto" /> */}
              <div className="row">
                <div className="col col-12 d-flex justify-content-end align-items-center">
                  {mnemonicCode ? (
                    <NavLink to="/register-dapp">
                      <button
                        className="btn  btn-primary ml-5"
                        type="button"
                      >
                        Submit DApp
                      </button>
                    </NavLink>
                  ) : null}

                  {/* <NavLink to="">View All</NavLink> */}
                </div>
              </div>
              {/* <div className="row bor-bottom   mob-mar-none"> */}
              {/* {dapps.all.map(dapp => (
                  <DappCard
                    id={1}
                    key={dapp.url}
                    title={dapp.dappname}
                    description={dapp.dappdetails}
                    src={dapp.dapplogo}
                    rating={dapp.rating}
                  />
                ))} */}
              {/* </div> */}

                
              <div className="mt-4">
                {localStorage.getItem('userData') != null ? 
                <>
                <h1 className="text-center">My Dapps</h1>
                <div className="bor-upper mx-auto" />
                </>
               : null}
               {localStorage.getItem('userData') != null?
                dapps.myDapps.length > 0 ? (
                  <div>
                    <div className="text-right mar-53">
                      {/* <NavLink to="">View All</NavLink> */}
                    </div>
                    <div className="row bor-bottom   mob-mar-none">
                      {dapps.myDapps.map(dapp => (
                        // <div onClick={this.dapplink}>
                        <DappCard
                          developer={dapp.devloperName}
                          time={dapp.createdTime}
                          id={dapp._id}
                          key={dapp._id}
                          url={dapp.dappurl}
                          title={dapp.dappname}
                          description={dapp.dappdetails}
                          src={dapp.dapplogo}
                          rating={dapp.rating}
                          dappcategory={dapp.dappcategory}
                          from="myDapps"
                        />
                        // </div>
                      ))}
                    </div>
                  </div>
                ) : (
                    <p className="text-center">
                      You have not uploaded any Dapps yet.
                  </p>
                  ) : null}
              </div>
              {dapps.art.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Art</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.art.map(dapp => (
                      // <div onClick={this.dapplink}>
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp._id}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                      // </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.utilitiesAndProductivity.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Utilities & Productivity</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.utilitiesAndProductivity.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.businessTools.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Business Tools</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.businessTools.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.chat.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Chat</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.chat.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.developerTools.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Developer Tools</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.developerTools.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.documentsAndStorage.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Documents and Storage</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.documentsAndStorage.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.educationAndNews.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Education and News</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.educationAndNews.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.financialServices.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Financial Services</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.financialServices.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.gamesAndDigitalAssets.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Games and Digital Assets</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.gamesAndDigitalAssets.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.healthAndFitness.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Health and Fitness</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.healthAndFitness.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.marketPlaces.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Marketplaces</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.marketPlaces.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.musicPhotoAndVideo.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Music, Photo & Video</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.musicPhotoAndVideo.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.socialImpact.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Social Impact</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.socialImpact.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.socialNetworking.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Social Networking</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.socialNetworking.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {dapps.wallets.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Wallets</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    {/* <NavLink to="">View All</NavLink> */}
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.wallets.map(dapp => (
                      <DappCard
                        developer={dapp.devloperName}
                        time={dapp.createdTime}
                        id={dapp._id}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null}




              {/* {dapps.all.length > 0 ? (
                <div className="mt-4">
                  <h1 className="text-center">Art</h1>
                  <div className="bor-upper mx-auto" />
                  <div className="text-right mar-53">
                    // <NavLink to="">View All</NavLink>
                  </div>
                  <div className="row bor-bottom   mob-mar-none">
                    {dapps.all.map(dapp => (
                      <DappCard
                        id={1}
                        key={dapp.dappurl}
                        url={dapp.dappurl}
                        title={dapp.dappname}
                        description={dapp.dappdetails}
                        src={dapp.dapplogo}
                        rating={dapp.rating}
                      />
                    ))}
                  </div>
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

DappStore.propTypes = {
  dapps: PropTypes.array,
  getDapps: PropTypes.func,
};

const mapStateToProps = ({ dapp, auth, successModal, modal, profile }) => {
  const { dapps } = dapp;
  const {
    recoveryKey,
    password,
    createPassword,
    confirmCreatePassword,
    email,
  } = auth;
  const { signInModalFlag, modalName } = modal;
  const { successModalFlag } = successModal;
  const {
    passwordForAnotherAccount,
    disabledButton,
    userSecretRecoveryCode,
    newPassword,
  } = profile;
  return {
    dapps,
    recoveryKey,
    password,
    createPassword,
    confirmCreatePassword,
    email,
    signInModalFlag,
    successModalFlag,
    passwordForAnotherAccount,
    disabledButton,
    userSecretRecoveryCode,
    modalName,
    newPassword,
  };
};

const mapDispatchToProps = dispatch => ({
  getDapps: payload => dispatch(actions.getDapps(payload)),
  openSignInModal: payload => dispatch(actions.openSignInModal(payload)),
  storePasswordForAnotherAccount: payload =>
    dispatch(actions.storePasswordForAnotherAccount(payload)),
  clearPassword: () => dispatch(actions.clearPasswordForAnotherAccount()),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  closeSignInModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  userPasswordChanged: payload =>
    dispatch(actions.userPasswordChanged(payload)),
  recoverWallet: payload => dispatch(actions.recoverWallet(payload)),
  recoverWalletSuccess: payload =>
    dispatch(actions.recoverWalletSuccess(payload)),
  incorrectRecoveryCodeAtRedirect: () =>
    dispatch(actions.incorrectRecoveryCodeAtRedirect()),
  recoverKey: payload => dispatch(actions.recoverKey(payload)),
  recoveryKeyChanged: payload => dispatch(actions.recoveryKeyChanged(payload)),
  userPasswordChanged: payload =>
    dispatch(actions.userPasswordChanged(payload)),
  signInRequest: payload => dispatch(actions.signInRequest(payload)),
  createPasswordChanged: payload =>
    dispatch(actions.createPasswordChanged(payload)),
  confirmCreatePasswordChanged: payload =>
    dispatch(actions.confirmCreatePasswordChanged(payload)),
  userEmailChanged: payload => dispatch(actions.userEmailChanged(payload)),
  storeNewPassword: payload => dispatch(actions.storeNewPassword(payload)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DappStore)
);

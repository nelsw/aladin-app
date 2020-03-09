import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';
import Image from '../Image/Image';
// import Input from '../InputControls/Input/Input';
import * as actions from '../../actions';

class NavbarWithoutLogin extends Component {
  constructor(props) {
    super(props);
    this.refCollapse = new React.createRef()
  }
  onCloseSuccessModal = () => {
    this.props.recoveryKeyChanged(null);
    this.props.userPasswordChanged(null);
    this.props.closeSuccessModal();
  };

  onOpenSuccessModal = () => {
    const { recoveryKey, password, createPassword, onDisabledButton, email, userEmailChanged } = this.props;
    const { onCloseSuccessModal } = this;
    let Location = this.props.history.location.search;
    if(email.isValid) {
      if (this.props.password.isValid) {
        onDisabledButton(true);
        this.props.signInRequest({
          mnemonic_code: recoveryKey.value,
          password: password.value,
          onCloseSuccessModal,
          onCloseFailModal: this.props.closeSuccessModal,
          Location: Location,
          email: email.value,
        });
      } else if (this.props.confirmCreatePassword.isValid) {
        onDisabledButton(true);
        this.props.signInRequest({
          mnemonic: recoveryKey.value,
          password: createPassword.value,
          onCloseSuccessModal,
          onCloseFailModal: this.props.closeSuccessModal,
          Location: Location,
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

  emailModal = () => {
    const { email, userEmailChanged, disabledButton} = this.props;
    this.props.onOpenModal({
      title: 'Email Address',
      backButton: [
        <p
          className="color-red hover-icon mb-0 text-left back"
          onClick={this.emailData}
          style={{ cursor: 'pointer' }}
        >
          <i className="fa fa-long-arrow-left back" aria-hidden="true" /> Back
        </p>,
      ],
      body: [
        <div>
          <div className="pos-relative mt-3">
            <Image
              src={require('../../assets/img/msg-icon.png')}
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

  clearCloseModal = () => {
    this.props.recoveryKeyChanged(null);
    this.props.userPasswordChanged(null);
    this.props.closeSignInModal();
  };

  emailData = () => {
    const {
      password,
      userPasswordChanged,
      recoveryKey,
      closeSignInModal,
      recoveryKeyChanged,
      disabledButton,
    } = this.props;
    // console.log('recoveryKey', recoveryKey)
    if (recoveryKey.value !== "" && recoveryKey.isValid) {
      if (recoveryKey.type === 'code') {
        this.props.onOpenModal({
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
              <div className="pos-relative mt-3">
                <Image
                  src={require('../../assets/img/lock-img.png')}
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
          buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Next',
          cancelButtonFlag: true,
          cancelButtonName: 'Cancel',
          modalName: 'emailData',
          disabled: !password.isValid || disabledButton,
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
        
        this.props.onOpenModal({
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
                    createPassword.isTouched ? createPassword.isValid : null
                  }
                  invalid={
                    createPassword.isTouched ? !createPassword.isValid : null
                  }
                  value={createPassword.value}
                  onChange={e => {
                    createPasswordChanged(e.target.value);
                    if(confirmCreatePassword.value !== '') {
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
                    if(createPassword.value !== '') {
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
          buttonClick: () => {
            this.emailModal();
            // if (createPassword.isValid && confirmCreatePassword.isValid) {
            //   this.onOpenSuccessModal();
            // }
          },
          cancelButton: () => {
            closeSignInModal();
            recoveryKeyChanged(null);
            userPasswordChanged(null);
            confirmCreatePasswordChanged(null);
            createPasswordChanged(null);
          },
          buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Next',
          cancelButtonFlag: true,
          cancelButtonName: 'Cancel',
          modalName: 'emailData',
          disabled: (!createPassword.isValid || !confirmCreatePassword.isValid) || disabledButton,
        });
      }
    } else if (this.props.recoveryKey.value === '') {
      this.props.recoveryKeyChanged(this.props.recoveryKey.value);
    }
  };

  openLoginModal = () => {
    const { recoveryKey, recoveryKeyChanged } = this.props;
    if(this.refCollapse.current != null || this.refCollapse.current != undefined) { this.closeCollapse(); }
    this.props.onOpenModal({
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
      buttonClick: this.emailData,
      cancelButton: () => {
        this.props.closeSignInModal();
        recoveryKeyChanged(null);
      },
      buttonName: 'Sign in',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      modalName: 'openLoginModal',
    });
  };

  closeCollapse = () => {
    this.refCollapse.current.classList.remove('show');
  }

  render() {
    const { modalName, history } = this.props;
    let Location = this.props.history.location.search;
    const path = history.location.pathname;
    if (modalName !== '' && this[modalName] !== undefined) {
      this[modalName]();
    }
    return (
      <div id="myHeader" className="sticky-top">
        <div className="container-big">
          <nav className="navbar navbar-expand-xl navbar-light  sticky-top">
            {
              Location.includes('auth') ? (
                <Image src={require('../../assets/img/img-logo.png')} />
              ) : (
                  <NavLink className="slideanim" to="/" title="Aladin">
                    <Image src={require('../../assets/img/img-logo.png')} />
                  </NavLink>
                )
            }

            {
              Location.includes('auth') ? (
                <button
                  className="btn btn-primary ml-3"
                  type="button"
                  data-toggle="modal"
                  data-target="#modalLoginForm"
                  onClick={this.openLoginModal}
                  style={{float: 'right'}}
                >
                  Sign In
                    </button>
              )
                : (
                  <>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarText"
                      aria-controls="navbarText"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon" />
                    </button>
                    <div
                      className="collapse navbar-collapse justify-content-end"
                      id="navbarText"
                      ref={this.refCollapse}
                    >
                      <ul className="navbar-nav d-flex align-items-center">
                        {/* <!--  <li className="nav-item ">
                           <a className="nav-link features-anchor" href="#">Try Aladin
                           </a>
                        </li> --> */}
                        <li className="nav-item dropdown">
                          <NavLink
                            className={
                              path.includes('sdk') ||
                                path.includes('document') ||
                                path.includes('dappStore') ||
                                path.includes('tokenPage')
                                ? 'nav-link dropdown-toggle active'
                                : 'nav-link dropdown-toggle'
                            }
                            to="/technology"
                            id="navbardrop"
                            data-toggle="dropdown"
                          >
                            Technology
                    <i className="fa fa-chevron-down" aria-hidden="true" />
                          </NavLink>
                          <ul className="dropdown-menu">
                            <li
                              className={
                                path.includes('sdk')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                              <NavLink
                                to="/sdk"
                                onClick={this.closeCollapse}
                              // data-toggle="collapse"
                              // data-target="#navbarText"
                              >
                                SDK
                      </NavLink>
                            </li>
                            <li
                              className={
                                path.includes('document')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                              <NavLink
                                to="/document"
                                onClick={this.closeCollapse}
                              // data-toggle="collapse"
                              // data-target="#navbarText"
                              >
                                Documentation
                      </NavLink>
                            </li>
                            <li
                              className={
                                path.includes('dappStore')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                              <NavLink
                                to="/dappStore"
                                onClick={this.closeCollapse}
                              // data-toggle="collapse"
                              // data-target="#navbarText"
                              >
                                DApp store
                      </NavLink>
                            </li>
                            <li
                              className={
                                path.includes('tokenPage')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                              <NavLink
                                to="/tokenPage"
                                onClick={this.closeCollapse}
                              // data-toggle="collapse"
                              // data-target="#navbarText"
                              >
                                ALA Token
                      </NavLink>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item dropdown">
                          {/* <!--  <a className="nav-link" href="about-us.html" id="navbardrop">
                           About Us  
                           </a> --> */}

                          <a
                            className={
                              path.includes('team') ||
                                path.includes('aboutus') ||
                                path.includes('road-map')
                                ? 'nav-link dropdown-toggle active'
                                : 'nav-link dropdown-toggle'
                            }
                            href="#"
                            id="navbardrop"
                            data-toggle="dropdown"
                          >
                            About Us
                    <i
                              className="fa fa-chevron-down  d-inline"
                              aria-hidden="true"
                            />
                          </a>

                          <ul className="dropdown-menu">
                            <li
                              className={
                                path.includes('team')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                              <NavLink
                                to="/team"
                                onClick={this.closeCollapse}
                              // data-toggle="collapse"
                              // data-target="#navbarText"
                              >
                                Team
                      </NavLink>
                            </li>
                            <li className="dropdown-item">
                              <a href="pdf/whitepaper.pdf" target="_blank">
                                Whitepaper
                      </a>
                            </li>
                            <li className="dropdown-item">
                              <a href="pdf/Aladin-Tech-doc.pdf" target="_blank">
                                Tech-Document
                      </a>
                            </li>
                            <li className="dropdown-item" >
                              <a href="pdf/faq.pdf" target="_blank">
                                FAQ
                      </a>
                            </li>
                            <li className="dropdown-item">
                              <a href="pdf/Aladin-Pitchdeck.pdf" target="_blank">
                                Pitchdeck
                      </a>
                            </li>
                            <li
                              className={
                                path.includes('aboutus')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                              <NavLink
                                to="/aboutus"
                                onClick={this.closeCollapse}
                              // data-toggle="collapse"
                              // data-target="#navbarText"
                              >
                                About Us
                      </NavLink>
                            </li>
                            <li
                              className={
                                path.includes('road-map')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                              <NavLink
                                to="/road-map"
                                onClick={this.closeCollapse}
                              // data-toggle="collapse"
                              // data-target="#navbarText"
                              >
                                Road Map
                      </NavLink>
                            </li>
                            {/* <!--   <li className="dropdown-item" ><a  href="#">Road Map</a></li> --> */}
                          </ul>
                        </li>
                        <li className="nav-item dropdown">
                          <a
                            className={
                              path.includes('forum') || path.includes('events')
                                ? 'nav-link dropdown-toggle active'
                                : 'nav-link dropdown-toggle'
                            }
                            href="#"
                            id="navbardrop"
                            data-toggle="dropdown"
                          >
                            Community
                    <i className="fa fa-chevron-down" aria-hidden="true" />
                          </a>
                          <ul className="dropdown-menu">
                            <li
                              className={
                                path.includes('forum')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                             
                              <a href="https://forum.aladinnetwork.org/" target="_blank">

                                Forum 
                              </a>
                            </li>
                            <li
                              className={
                                path.includes('events')
                                  ? 'dropdown-item active'
                                  : 'dropdown-item'
                              }
                            >
                              <a
                                href="http://aladinnetwork.org/community/events/"
                                target="_blank"
                              >
                                Events
                              </a>
                            </li>
                            <li className="dropdown-item">
                              <a href="http://aladinnetwork.org/community/blogs/" target="_blank">
                                Blog
                              </a>
                            </li>
                          </ul>
                        </li>
                        {/* <!--   <li className="nav-item ">
                           <a className="nav-link pr-0 contact-anchor" href="our-team.html">Aladin Team
                           </a>
                        </li> --> */}
                        <li className="nav-item ">
                          {/* <NavLink to="/404"> */}
                            <a
                              href="http://explorer.aladinnetwork.org/"
                              className={
                                path.includes('404')
                                  ? 'nav-link pr-0 contact-anchor active'
                                  : 'nav-link pr-0 contact-anchor'
                              }
                              target='_blank'
                            >
                              Aladin Explorer
                            </a>
                          {/* </NavLink> */}
                        </li>
                        <li className="nav-item">
                          <div className="btn-grp">
                            <NavLink
                              to="/signup"
                              onClick={this.closeCollapse}
                            // data-toggle="collapse"
                            // data-target="#navbarText"
                            >
                              <button
                                className="btn  btn-secondary mr-3 ml-5"
                                type="button"
                              >
                                Create ID
                              </button>
                            </NavLink>
                            <button
                              className="btn btn-primary ml-3"
                              type="button"
                              data-toggle="modal"
                              data-target="#modalLoginForm"
                              onClick={this.openLoginModal}
                            >
                              Sign in
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
          </nav>
        </div>
      </div>
    );
  }
}
NavbarWithoutLogin.propTypes = {
  onOpenModal: PropTypes.func,
  openSuccessModal: PropTypes.func,
  closeSignInModal: PropTypes.func,
  closeSuccessModal: PropTypes.func,
  recoveryKeyChanged: PropTypes.func,
  recoveryKey: PropTypes.string,
  password: PropTypes.string,
  userPasswordChanged: PropTypes.func,
  createPassword: PropTypes.string,
  confirmCreatePassword: PropTypes.string,
  createPasswordChanged: PropTypes.func,
  confirmCreatePasswordChanged: PropTypes.func,
  email: PropTypes.string,
  userEmailChanged: PropTypes.func,
};

const mapStateToProps = ({ auth, modal, user, profile }) => {
  const {
    recoveryKey,
    password,
    createPassword,
    confirmCreatePassword,
    email,
  } = auth;
  const { modalName } = modal;
  const { userData } = user;
  const { disabledButton } = profile;
  return {
    recoveryKey,
    password,
    createPassword,
    confirmCreatePassword,
    email,
    modalName,
    userData,
    disabledButton,
  };
};

const mapDispatchToProps = dispatch => ({
  onOpenModal: payload => dispatch(actions.openSignInModal(payload)),
  closeSignInModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  recoveryKeyChanged: payload => dispatch(actions.recoveryKeyChanged(payload)),
  userPasswordChanged: payload =>
    dispatch(actions.userPasswordChanged(payload)),
  signInRequest: payload => dispatch(actions.signInRequest(payload)),
  createPasswordChanged: payload =>
    dispatch(actions.createPasswordChanged(payload)),
  confirmCreatePasswordChanged: payload =>
    dispatch(actions.confirmCreatePasswordChanged(payload)),
  userEmailChanged: payload => dispatch(actions.userEmailChanged(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavbarWithoutLogin)
);

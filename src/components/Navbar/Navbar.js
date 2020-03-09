import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';
import Image from '../Image/Image';
// import Input from '../InputControls/Input/Input';
import * as actions from '../../actions';
import { userPasswordChanged } from '../../actions';

class Navbar extends Component {
  onCloseSuccessModal = () => {
    this.props.closeSuccessModal();
  };

  onOpenSuccessModal = () => {
    const { recoveryKey, password, createPassword } = this.props;
    const { onCloseSuccessModal } = this;
    if (this.props.password.isValid) {
      this.props.signInRequest({
        mnemonic_code: recoveryKey.value,
        mnemonic_code_password: password.value,
        onCloseSuccessModal,
      });
    } else if (this.props.confirmCreatePassword.isValid) {
      this.props.signInRequest({
        mnemonic: recoveryKey.value,
        password: createPassword.value,
        onCloseSuccessModal,
      });
    }
    // else if (this.props.password.value == '') {
    //   this.props.userPasswordChanged(this.props.password.value);
    // }
  };

  emailModal = () => {
    const { email, userEmailChanged } = this.props;
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
      buttonName: 'Sign in',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      modalName: 'emailModal',
    });
  };

  createPasswordModal = () => {
    const {
      createPassword,
      createPasswordChanged,
      confirmCreatePassword,
      confirmCreatePasswordChanged,
    } = this.props;

    this.props.onOpenModal({
      title: 'Create a password',
      backButton: [
        <p
          className="color-red hover-icon mb-0 text-left back"
          // onClick={this.openLoginModal}
          style={{ cursor: 'pointer' }}
        >
          <i className="fa fa-long-arrow-left back" aria-hidden="true" /> Back
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
              valid={createPassword.isTouched ? createPassword.isValid : null}
              invalid={
                createPassword.isTouched ? !createPassword.isValid : null
              }
              onChange={e => createPasswordChanged(e.target.value)}
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
              onChange={e => confirmCreatePasswordChanged(e.target.value)}
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
        if (confirmCreatePassword.isValid) {
          this.onOpenSuccessModal();
        }
      },
      cancelButton: this.props.closeSignInModal,
      buttonName: 'Sign in',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      modalName: 'emailData',
    });
  };

  emailData = () => {
    const {
      password,
      userPasswordChanged,
      recoveryKey,
      recoveryKeyChanged,
    } = this.props;
    if (recoveryKey.isValid) {
      if (recoveryKey.type == 'code') {
        this.props.onOpenModal({
          title: 'Enter password',
          backButton: [
            <p
              className="color-red hover-icon mb-0 text-left back"
              onClick={() => {
                userPasswordChanged(null);
                this.openLoginModal();
              }}
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
          buttonClick: this.onOpenSuccessModal,
          cancelButton: () => {
            this.props.closeSignInModal();
            userPasswordChanged(null);
            recoveryKeyChanged(null);
          },
          buttonName: 'Sign in',
          cancelButtonFlag: true,
          cancelButtonName: 'Cancel',
          modalName: 'emailData',
        });
      } else {
        const {
          createPassword,
          createPasswordChanged,
          confirmCreatePassword,
          confirmCreatePasswordChanged,
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
                  onChange={e => createPasswordChanged(e.target.value)}
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
                  onChange={e => confirmCreatePasswordChanged(e.target.value)}
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
            if (confirmCreatePassword.isValid) {
              this.onOpenSuccessModal();
            }
          },
          cancelButton: this.props.closeSignInModal,
          buttonName: 'Sign in',
          cancelButtonFlag: true,
          cancelButtonName: 'Cancel',
          modalName: 'emailData',
        });
      }
    } else if (this.props.recoveryKey.value == '') {
      this.props.recoveryKeyChanged(this.props.recoveryKey.value);
    }
  };

  openLoginModal = () => {
    const { recoveryKey, recoveryKeyChanged, userPasswordChanged } = this.props;
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
            {console.log(recoveryKey.message)}
          </div>
        </div>,
      ],
      buttonClick: this.emailData,
      cancelButton: () => {
        this.props.closeSignInModal();
        recoveryKeyChanged(null);
        userPasswordChanged(null);
      },
      buttonName: 'Sign in',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      modalName: 'openLoginModal',
    });
  };

  render() {
    const { modalName, history } = this.props;
    const path = history.location.pathname;
    if (modalName != '' && this[modalName] != undefined) {
      this[modalName]();
    }
    return (
      <div id="myHeader" className="sticky-top">
        <div className="container-big">
          <nav className="navbar navbar-expand-xl navbar-light  sticky-top">
            <NavLink
              className="slideanim"
              to="/"
              title="Aladin"
              target="_blank"
            >
              <Image src={require('../../assets/img/img-logo.png')} />
            </NavLink>
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
            >
              {!localStorage.getItem('mnemonicCode') ? (
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
                      <li className="dropdown-item">
                        <NavLink
                          to="/sdk"
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
                          // data-toggle="collapse"
                          // data-target="#navbarText"
                        >
                          Dapp store
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
                      About
                      <i
                        className="fa fa-chevron-down  d-inline"
                        aria-hidden="true"
                      />
                    </a>

                    <ul className="dropdown-menu">
                      <li className="dropdown-item">
                        <NavLink
                          to="/team"
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
                      <li className="dropdown-item">
                        <a href="pdf/Aladin-Pitchdeck.pdf" target="_blank">
                          Pitchdeck
                        </a>
                      </li>
                      <li className="dropdown-item">
                        <NavLink
                          to="/aboutus"
                          // data-toggle="collapse"
                          // data-target="#navbarText"
                        >
                          About Us
                        </NavLink>
                      </li>
                      <li className="dropdown-item">
                        <NavLink
                          to="/road-map"
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
                      <li className="dropdown-item">
                        <NavLink
                          to="/forum"
                          // data-toggle="collapse"
                          // data-target="#navbarText"
                        >
                          Forum
                        </NavLink>
                      </li>
                      <li className="dropdown-item">
                        <NavLink
                          to="/events"
                          // data-toggle="collapse"
                          // data-target="#navbarText"
                        >
                          Events
                        </NavLink>
                      </li>
                      <li className="dropdown-item">
                        <a
                          href="http://aladinnetwork.org/blogs/"
                          target="_blank"
                        >
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
                    <a
                      className={
                        path.includes('404')
                          ? 'nav-link pr-0 contact-anchor active'
                          : 'nav-link pr-0 contact-anchor'
                      }
                      href="aladin-explorer.html"
                    >
                      Aladin Explorer
                    </a>
                  </li>
                  <li className="nav-item">
                    <div className="btn-grp">
                      <NavLink
                        to="/signup"
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
                        Sign In
                      </button>
                    </div>
                  </li>
                </ul>
              ) : (
                // This is second navbar started
                <ul className="navbar-nav width-inherit d-flex align-items-center">
                  <li className="nav-item hover-effect">
                    <NavLink
                      to="/dappStore"
                      // data-toggle="collapse"
                      // data-target="#navbarText"
                    >
                      <div className="d-flex">
                        <svg
                          version="1.1"
                          width="28"
                          height="28"
                          className="mr-3"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 24 24"
                          style={{ enableBackground: 'new 0 0 24 24' }}
                          xmlSpace="preserve"
                        >
                          <circle
                            className="st0"
                            cx="12"
                            cy="12"
                            r="12"
                            style={{
                              fillRule: 'evenodd',
                              clipRule: 'evenodd',
                              fill: '#333333',
                            }}
                          />
                          <g>
                            <path
                              className="st1"
                              style={{ fill: '#fff' }}
                              d="M16.4,15.6c0-0.9,0-1.8,0-2.8c0-1.6-1-2.6-2.6-2.6c-1.2,0-2.3,0-3.5,0c-1.6,0-2.6,1.3-2.6,2.6
                                             c0,1.2,0,2.4,0,3.6c0,0.2,0,0.4,0,0.6c0.3,1.2,1.2,2,2.5,2c1.9,0,3.9,0,5.8,0c0.3,0,0.3-0.1,0.3-0.3C16.4,17.7,16.4,16.7,16.4,15.6
                                             z M14.4,17.3c-0.7,0-1.4,0-2.1,0v0c-0.7,0-1.4,0-2,0c-0.6,0-0.9-0.3-0.9-0.9c0-1.2,0-2.4,0-3.5c0-0.6,0.3-0.9,0.9-0.9
                                             c1.2,0,2.4,0,3.5,0c0.6,0,0.9,0.3,0.9,0.9c0,1.4,0,2.7,0,4.1C14.7,17.2,14.6,17.3,14.4,17.3z"
                            />
                            <path
                              className="st1"
                              d="M16.3,5c-0.6,0-1.1,0-1.6,0c0,1.1,0,2.3,0,3.4c0.6,0,1.1,0,1.6,0C16.3,7.2,16.3,6.1,16.3,5z"
                            />
                          </g>
                        </svg>
                        Dapp Store
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item hover-effect  ">
                    <NavLink
                      to="/wallet"
                      // data-toggle="collapse"
                      // data-target="#navbarText"
                    >
                      <div className="d-flex ">
                        <svg
                          version="1.1"
                          width="28"
                          height="24"
                          className="mr-3"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 28 24"
                          style={{ enableBackground: 'new 0 0 24 24' }}
                          xmlSpace="preserve"
                        >
                          <path
                            className="st2"
                            style={{ fill: '#333' }}
                            d="M25.1,17.5c-1.5,0-3,0-4.5,0c-1.4,0-2.3-0.9-2.3-2.3c0-0.7,0-1.3,0-2c0-1.4,0.9-2.3,2.3-2.3c1.5,0,3,0,4.5,0
                                           h0.7c0-1.6,0.1-3.2,0-4.7c-0.1-1.1-1-1.8-2.3-1.8c-4.6,0-9.1,0-13.7,0c-2.1,0-4.2,0-6.3,0c-0.3,0-0.7,0-0.8-0.2
                                           C2.5,3.8,2.3,3.4,2.2,3.1c0-0.5,0.4-0.8,0.9-0.9c0.2,0,0.4,0,0.6,0c6.8,0,13.6,0,20.5,0c0.3,0,0.6,0,0.9-0.1
                                           c0.5-0.2,0.7-0.6,0.7-1.2c-0.1-0.5-0.4-0.9-1-0.9c-0.2,0-0.4,0-0.6,0C17.4,0,10.5,0,3.7,0C1.6,0,0.6,0.8,0.1,2.8
                                           C0.1,2.9,0,3,0,3.1v18.9c0.3,0.5,0.5,1.2,0.9,1.6C1.2,23.8,1.8,24,2.2,24c7.2,0,14.3,0,21.5,0c1.2,0,2.1-0.8,2.1-2
                                           c0-1.5,0-3,0-4.5H25.1z M26.8,12c-1.8,0-3.6,0-5.4,0c-1,0-1.7,0.6-2,1.5c-0.4,1.4,0.6,2.8,2,2.8c1.7,0,3.3,0,5,0
                                           c0.8,0,1.3-0.2,1.5-1V13C27.8,12.4,27.5,12,26.8,12z M21.5,15.3c-0.6,0-1.1-0.5-1.1-1.1c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1,0.5,1,1.1
                                           C22.5,14.8,22.1,15.3,21.5,15.3z"
                          />
                        </svg>
                        Wallet
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item hover-effect ">
                    <NavLink
                      to="/profile"
                      // data-toggle="collapse"
                      // data-target="#navbarText"
                    >
                      <div className="d-flex  align-items-center">
                        <svg
                          version="1.1"
                          id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          width="28"
                          height="28"
                          className="mr-3"
                          viewBox="0 0 311.541 311.541"
                          style={{
                            enableBackground: 'new 0 0 311.541 311.541',
                          }}
                          xmlSpace="preserve"
                        >
                          <path
                            d="M155.771,26.331C69.74,26.331,0,96.071,0,182.102c0,37.488,13.25,71.883,35.314,98.761
                          c3.404-27.256,30.627-50.308,68.8-61.225c13.946,12.994,31.96,20.878,51.656,20.878c19.233,0,36.894-7.487,50.698-19.936
                          c38.503,11.871,65.141,36.27,66.017,64.63c24.284-27.472,39.056-63.555,39.056-103.108
                          C311.541,96.071,241.801,26.331,155.771,26.331z M155.771,222.069c-9.944,0-19.314-2.732-27.634-7.464
                          c-20.05-11.409-33.855-34.756-33.855-61.711c0-38.143,27.583-69.176,61.489-69.176c33.909,0,61.489,31.033,61.489,69.176
                          c0,27.369-14.237,51.004-34.786,62.215C174.379,219.523,165.346,222.069,155.771,222.069z"
                          />
                        </svg>
                        Profile
                      </div>
                    </NavLink>
                  </li>
                  <li className="nav-item pad-bornone hover-effect ">
                    <NavLink
                      to="/settings"
                      // data-toggle="collapse"
                      // data-target="#navbarText"
                    >
                      <div className="d-flex ">
                        <svg
                          version="1.1"
                          width="24"
                          height="24"
                          className="mr-3"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 24 24"
                          style={{ enableBackground: 'new 0 0 24 24' }}
                          xmlSpace="preserve"
                        >
                          <path
                            className="st2"
                            style={{ fill: '#333' }}
                            d="M0,15.6c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0-0.4,0.2-0.6,0.6-0.8c0.6-0.2,1.1-0.7,1.5-1.2
                                           c0.7-0.9,0.6-2.1-0.1-2.9c-0.4-0.4-0.9-0.8-1.4-1C0.4,9.3,0.2,9.2,0.1,9C0.1,8.9,0,8.7,0,8.6c0-0.1,0-0.3,0-0.4c0,0,0,0,0-0.1
                                           c0.1-0.5,0.2-1,0.4-1.4C0.6,6.4,0.8,6.1,1,5.8c0.2-0.2,0.5-0.3,0.8-0.2c0.1,0,0.2,0.1,0.3,0.1c0.7,0.2,1.3,0.3,2,0
                                           c0.7-0.2,1.2-0.6,1.4-1.3C5.8,3.6,5.9,2.8,5.7,2c-0.1-0.4,0-0.7,0.2-0.9C6,1,6.1,0.9,6.3,0.8C6.9,0.3,7.7,0.1,8.5,0
                                           C9,0,9.2,0.1,9.4,0.6c0,0,0,0,0,0C9.8,1.4,10.3,2,11,2.3c1.3,0.5,2.9-0.2,3.4-1.5c0.1-0.2,0.3-0.4,0.4-0.6C15,0,15.1,0,15.3,0
                                           c0.5,0,0.9,0.1,1.4,0.3c0.5,0.2,1,0.5,1.4,1c0.2,0.3,0.3,0.5,0.2,0.9c0,0,0,0.1-0.1,0.1C18,2.6,18,2.9,17.9,3.2
                                           c-0.1,1.2,0.5,2.1,1.3,2.5c0.9,0.5,1.8,0.4,2.7,0c0.4-0.2,0.7-0.1,1,0.2c0.1,0.1,0.3,0.3,0.4,0.5c0.4,0.7,0.6,1.4,0.7,2.1
                                           c0.1,0.4-0.2,0.8-0.6,1c-0.5,0.2-0.9,0.5-1.3,0.9c-1,1.2-0.8,3.4,1,4.1c0.2,0.1,0.3,0.2,0.4,0.3c0.3,0.2,0.4,0.5,0.4,0.8
                                           c0,0.2,0,0.4-0.1,0.6c-0.1,0.7-0.4,1.3-0.8,1.8c-0.3,0.4-0.8,0.7-1.5,0.4c-0.6-0.2-1.2-0.3-1.8-0.1c-0.4,0.1-0.7,0.2-1,0.4
                                           c-0.3,0.3-0.5,0.6-0.6,0.9c-0.3,0.8-0.3,1.5,0.1,2.3c0.1,0.2,0.1,0.3,0.1,0.5c0,0.3-0.2,0.6-0.4,0.7c-0.7,0.5-1.5,0.9-2.4,1
                                           c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.3-0.3-0.4-0.5c-0.2-0.4-0.4-0.8-0.8-1.1c-0.9-0.8-2.1-1-3.1-0.4c-0.6,0.4-1,0.9-1.3,1.5
                                           C9.3,23.7,9,23.9,8.7,24c-0.2,0-0.3,0-0.5,0c-0.7-0.1-1.3-0.3-1.9-0.7C6,23.2,5.7,23,5.5,22.7c-0.2-0.3-0.3-0.6-0.2-0.9
                                           c0.1-0.2,0.1-0.3,0.2-0.5c0.3-0.9,0.3-1.9-0.5-2.7c-0.2-0.2-0.5-0.3-0.7-0.4c-0.7-0.2-1.4-0.1-2,0.1c-0.6,0.2-1,0-1.4-0.5
                                           c-0.3-0.4-0.5-0.9-0.6-1.4C0.1,16.1,0.1,15.9,0,15.6z M17.6,12c0-3.1-2.5-5.6-5.6-5.6c-3.1,0-5.6,2.5-5.6,5.6c0,3.1,2.5,5.6,5.6,5.6
                                           C15.1,17.6,17.6,15.1,17.6,12z"
                          />
                        </svg>
                        Setting
                      </div>
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
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

const mapStateToProps = ({ auth, modal, user }) => {
  const {
    recoveryKey,
    password,
    createPassword,
    confirmCreatePassword,
    email,
  } = auth;
  const { modalName } = modal;
  const { userData } = user;
  return {
    recoveryKey,
    password,
    createPassword,
    confirmCreatePassword,
    email,
    modalName,
    userData,
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
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);

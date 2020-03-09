import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, FormFeedback } from 'reactstrap';
// import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer.js';
import DynamicModal from '../components/Modals/DynamicModal/DynamicModal';
import SuccessModal from '../components/Modals/SuccessModal/SuccessModal';
import NavbarWithoutLogin from '../components/Navbar/NavbarWithoutLogin';
import NavbarWithLogin from '../components/Navbar/NavbarWithLogin';
import * as actions from '../actions';
import Image from '../components/Image/Image';

class Layout extends Component {
  componentDidMount() {
    if (localStorage.getItem('userData')) {
      if (
        this.props.history.location.pathname.includes('signup')
      ) {
        this.props.history.push('/dappStore');
      }
    } else {
      if (
        this.props.history.location.pathname.includes('settings') ||
        this.props.history.location.pathname.includes('storage-provider') ||
        this.props.history.location.pathname.includes('change-password') ||
        this.props.history.location.pathname.includes('backup-and-restore') ||
        this.props.history.location.pathname.includes('profile') ||
        this.props.history.location.pathname.includes('wallet') ||
        this.props.history.location.pathname.includes('file-manager') ||
        this.props.history.location.pathname.includes('reset-browser') ||
        this.props.history.location.pathname.includes('api-setting')
      ) {
        // console.log('this.props.match.params.user', this.props.match.params.user);
        if (this.props.location.pathname.includes('wallet/')) {
          this.props.history.push(`/signup?redirect=${this.props.location.pathname}`);
        } else {
          this.props.history.push('/');
        }
      }
    }

    window.addEventListener('popstate', this.closeBothModal, true);

    window.scrollTo(0, 0);
    const userStoredData = localStorage.getItem('mnemonicCode');

  }

  closeBothModal = () => {
    this.props.closeSuccessModal();
    this.props.closeSignInModal();
  }

  componentWillUpdate() {
    if (localStorage.getItem('userData')) {
      if (
        this.props.history.location.pathname.includes('signup')
      ) {
        this.props.history.push('/dappStore');
      }
    } else {
      if (
        this.props.history.location.pathname.includes('settings') ||
        this.props.history.location.pathname.includes('storage-provider') ||
        this.props.history.location.pathname.includes('change-password') ||
        this.props.history.location.pathname.includes('backup-and-restore') ||
        this.props.history.location.pathname.includes('profile') ||
        this.props.history.location.pathname.includes('wallet') ||
        this.props.history.location.pathname.includes('file-manager') ||
        this.props.history.location.pathname.includes('reset-browser') ||
        this.props.history.location.pathname.includes('api-setting')
      ) {
        this.props.history.push('/');
      }
    }
  }

  render() {
    const { successModalFlag, signInModalFlag, children } = this.props;
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));

    return (
      <div>
        {/* <Navbar /> */}
        {mnemonicCode ? <NavbarWithLogin /> : <NavbarWithoutLogin />}

        {signInModalFlag ? <DynamicModal /> : null}
        {successModalFlag ? <SuccessModal /> : null}
        <div className="hight-section">{children}</div>
        <Footer history={this.props.history} />
      </div>
    );
  }
}

Layout.propTypes = {
  successModalFlag: PropTypes.bool,
  signInModalFlag: PropTypes.bool,
  children: PropTypes.object,
};

const mapStateToProps = ({ auth, successModal, modal }) => {
  const { password } = auth;
  const { signInModalFlag } = modal;
  const { successModalFlag } = successModal;

  return {
    password,
    signInModalFlag,
    successModalFlag,
  };
};
const mapDispatchToProps = dispatch => ({
  openSignInModal: payload => dispatch(actions.openSignInModal(payload)),
  closeSignInModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  userPasswordChanged: payload =>
    dispatch(actions.userPasswordChanged(payload)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);

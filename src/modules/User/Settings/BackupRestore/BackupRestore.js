import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Input, FormFeedback } from 'reactstrap';
import HexCodeBarCode from './HexcodeBarcode';
// import Input from '../../../../components/InputControls/Input/Input';
import Image from '../../../../components/Image/Image';
import Button from '../../../../components/InputControls/Button/Button';
import * as actions from '../../../../actions';

// import '../../../Technology/SDK/SDK.css';

class BackupRestore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      magicRecoveryCodeCopied: false,
      secretRecoveryCodeCopied: false,
    };
  }

  componentWillMount() {
    const { getBalance, recoverWalletSuccess, clearPassword, storePasswordForAnotherAccount  } = this.props;
    getBalance();
    storePasswordForAnotherAccount(null);
    recoverWalletSuccess();
  }

  componentWillUnmount() {
    const { clearPassword } = this.props;
    clearPassword();
  }

  copyHandler = () => {
    this.setState({ magicRecoveryCodeCopied: true });
    setTimeout(() => {
      this.setState({ magicRecoveryCodeCopied: false });
    }, 3000);
  };

  copySecretKey = () => {
    this.setState({ secretRecoveryCodeCopied: true });
    setTimeout(() => {
      this.setState({ secretRecoveryCodeCopied: false });
    }, 3000);
  };

  submitHandler = e => {
    e.preventDefault();
    const {
      newPassword,
      recoverWallet,
      onDisabledButton,
    } = this.props;
    if (newPassword.value.length > 0) {
      onDisabledButton(true);
      const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));
      recoverWallet({
        code: mnemonicCode,
        password: newPassword.value,
      });
    }
  };

  render() {
    const {
      qrCode,
      newPassword,
      storePasswordForAnotherAccount,
      disabledButton,
      userSecretRecoveryCode,
    } = this.props;
    const { magicRecoveryCodeCopied, secretRecoveryCodeCopied } = this.state;
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));

    const hexConvertor = dataBuffer => {
      const buffer = new Buffer.from(dataBuffer, 'hex');
      const base = buffer.toString('base64');
      return base;
    };
    const hexCode = hexConvertor(mnemonicCode);

    return (
      <section className="page-section" id="view-a">
        <div className="bg-img1  d-flex align-items-center">
          <div className="container padbt-40 back-color">
            <div className="row  aos-item" data-aos="fade-down">
              <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                <NavLink to="/settings">
                  <Button className="btn btn-primary" type="button">
                    Back
                  </Button>
                </NavLink>
                <div id="Storage-pro">
                  <h4 className="pada-40">
                    <b>Magic Recovery Code</b>
                  </h4>

                  <div className="bor-upper" />
                  <p className="m-0">
                    Scan or enter the recovery code with your password to
                    restore your account or sign in on other devices.
                  </p>
                  <HexCodeBarCode
                    hexCode={hexCode}
                    copied={magicRecoveryCodeCopied}
                    qrCode={qrCode}
                    onCopy={this.copyHandler}
                  />

                  <p className="font-24 mb-1 pada-40">Secret Recovery Key</p>
                  <p>
                    Enter your password to view and backup secret recovery key.
                  </p>

                  {userSecretRecoveryCode.length > 0 ? (
                    <HexCodeBarCode
                      qrCode={userSecretRecoveryCode}
                      hexCode={userSecretRecoveryCode}
                      copied={secretRecoveryCodeCopied}
                      onCopy={this.copySecretKey}
                    />
                  ) : (
                    <form onSubmit={this.submitHandler}>
                    <div className="width-460 pt-3">
                      <div className=" pos-relative">
                        <Image
                          src={require('../../../../assets/img/lock-img.png')}
                          className="mb-3 lock-img pos-absolute"
                        />
                        <Input
                          type="password"
                          name="Password"
                          className="form-control "
                          placeholder="Enter Password"
                          valid={
                            newPassword.isTouched &&
                            newPassword.isValid
                          }
                          invalid={
                            newPassword.isTouched &&
                            !newPassword.isValid
                          }
                          onChange={e =>
                            storePasswordForAnotherAccount(e.target.value)
                          }
                          value={newPassword.value}
                        />
                        <FormFeedback
                          style={{ textAlign: 'left' }}
                          valid={newPassword.isValid}
                          invalid={!newPassword.isValid}
                        >
                          {newPassword.message}
                        </FormFeedback>
                      </div>
                      <Button
                        className="btn  mt-4 btn-primary"
                        type="submit"
                        disabled={
                          !newPassword.isValid || disabledButton
                        }
                        // onClick={this.submitHandler}
                      >
                        {disabledButton
                          ? <i className="fa fa-circle-o-notch fa-spin"></i>
                          : 'Display Keychain Phrase'}
                      </Button>
                    </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = ({ auth, profile }) => {
  const { qrCode } = auth;
  const {
    passwordForAnotherAccount,
    newPassword,
    disabledButton,
    userSecretRecoveryCode,
  } = profile;

  return {
    qrCode,
    passwordForAnotherAccount,
    disabledButton,
    userSecretRecoveryCode,
    newPassword,
  };
};
const mapDispatchToProps = dispatch => ({
  getBalance: payload => dispatch(actions.getBalance(payload)),
  storePasswordForAnotherAccount: payload =>
    dispatch(actions.storePasswordForAnotherAccount(payload)),
  recoverWallet: payload => dispatch(actions.recoverWallet(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  recoverWalletSuccess: payload =>
    dispatch(actions.recoverWalletSuccess(payload)),
  clearPassword: () => dispatch(actions.clearPasswordForAnotherAccount()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackupRestore);

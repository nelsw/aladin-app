import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import * as actions from '../../../../actions';
import Image from '../../../../components/Image/Image';
import Button from '../../../../components/InputControls/Button/Button';

// import Input from '../../../../components/InputControls/Input/Input';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // openSuccessModal = () => {
  //   const { onOpenSuccessModal, onCloseSuccessModal } = this.props;
  //   onOpenSuccessModal({
  //     title: 'Success',
  //     message: 'Updated Successfully',
  //     modalStatus: 2,

  //     closeModal: onCloseSuccessModal,
  //     redirectUrl: '',
  //     showIcon: true,
  //   });
  // };

  changePasswordHandler = e => {
    e.preventDefault();
    const {
      currentPassword,
      newPassword,
      confirmPassword,
      onChangePassword,
      onCloseSuccessModal,
      onDisabledButton,
    } = this.props;
    if (
      currentPassword.value.length > 0 &&
      newPassword.value.length > 0 &&
      newPassword.value.length >= 8 &&
      newPassword.value === confirmPassword.value
    ) {
      const data = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
        onCloseSuccessModal,
      };
      onChangePassword(data);
      onDisabledButton(true);
    }
  };

  componentWillMount () {
    this.props.clearPassword();
  }

  render() {
    // const { successModal } = this.state;
    const {
      currentPassword,
      confirmPassword,
      newPassword,
      storeConfirmPassword,
      storeCurrentPassword,
      storeNewPassword,
      disabledButton,
    } = this.props;
    return (
      <div>
        <section className="page-section" id="view-a">
          <div className="bg-img1  d-flex align-items-center">
            <div className="container p-41 height-in back-color chngpassword">
              <div className="row  aos-item" data-aos="fade-down">
                <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                  <NavLink to="/settings">
                    <Button className="btn btn-primary" type="button" onClick={() => this.props.clearChangePasswordData()}>
                      Back
                    </Button>
                  </NavLink>
                  <div className="text-center" id="Storage-pro">
                    <h4 className="pada-40">
                      <b>Change Password</b>
                    </h4>
                    <div className="bor-upper mx-auto" />
                    <form onSubmit={this.changePasswordHandler}>
                    <div className="width-460 pt-3">
                      <div className=" pos-relative mb-4">
                        <Image
                          src={require('../../../../assets/img/lock-img.png')}
                          className="mb-3 lock-img pos-absolute"
                        />
                        <Input
                          type="password"
                          name="Password"
                          className="form-control "
                          placeholder="Current Password"
                          valid={
                            currentPassword.isTouched
                              ? currentPassword.isValid
                              : false
                          }
                          invalid={
                            currentPassword.isTouched
                              ? !currentPassword.isValid
                              : false
                          }
                          value={currentPassword.value}
                          onChange={e => storeCurrentPassword(e.target.value)}
                        />
                        <FormFeedback
                          style={{ textAlign: 'left' }}
                          valid={currentPassword.isValid}
                          invalid={!currentPassword.isValid}
                        >
                          {currentPassword.message}
                          {/* {password.message} */}
                        </FormFeedback>
                      </div>
                      <div className=" pos-relative mb-4">
                        <Image
                          src={require('../../../../assets/img/lock-img.png')}
                          className="mb-3 lock-img pos-absolute"
                        />
                        <Input
                          type="password"
                          name="Password"
                          className="form-control "
                          placeholder="New Password"
                          data-error="Valid Password is required."
                          valid={
                            newPassword.isTouched ? newPassword.isValid : false
                          }
                          invalid={
                            newPassword.isTouched ? !newPassword.isValid : false
                          }
                          value={newPassword.value}
                          onChange={e => storeNewPassword(e.target.value)}
                        />
                        <FormFeedback
                          style={{ textAlign: 'left' }}
                          valid={newPassword.isValid}
                          invalid={!newPassword.isValid}
                        >
                          {newPassword.message}
                          {/* {password.message} */}
                        </FormFeedback>
                      </div>
                      <div className="pos-relative">
                        <Image
                          src={require('../../../../assets/img/lock-img.png')}
                          className="mb-3 lock-img pos-absolute"
                        />
                        <Input
                          type="password"
                          name="Password"
                          className="form-control "
                          placeholder="Confirm New Password"
                          data-error="Valid Password is required."
                          valid={
                            confirmPassword.isTouched
                              ? confirmPassword.isValid
                              : false
                          }
                          invalid={
                            confirmPassword.isTouched
                              ? !confirmPassword.isValid
                              : false
                          }
                          value={confirmPassword.value}
                          onChange={e => storeConfirmPassword(e.target.value)}
                        />
                        <FormFeedback
                          style={{ textAlign: 'left' }}
                          valid={confirmPassword.isValid}
                          invalid={!confirmPassword.isValid}
                        >
                          {confirmPassword.message}
                          {/* {password.message} */}
                        </FormFeedback>
                      </div>
                      <Button
                        className="btn  mt-4 btn-primary"
                        data-toggle="modal"
                        data-target="#passwordupdate"
                        type="submit"
                        // onClick={this.changePasswordHandler}
                        disabled={
                          !(
                            currentPassword.value.length > 0 &&
                            newPassword.value.length > 0 &&
                            newPassword.value.length >= 8 &&
                            newPassword.value === confirmPassword.value
                          ) || disabledButton
                        }
                      >
                        {disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : ' Update Password'}
                      </Button>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
ChangePassword.propTypes = {
  onCloseSuccessModal: PropTypes.func,
  onOpenSuccessModal: PropTypes.func,
};

const mapStateToProps = ({ profile }) => {
  const {
    confirmPassword,
    currentPassword,
    newPassword,
    disabledButton,
  } = profile;
  return {
    confirmPassword,
    currentPassword,
    newPassword,
    disabledButton,
  };
};
const mapDispatchToProps = dispatch => ({
  onOpenSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  onCloseSuccessModal: () => dispatch(actions.closeSuccessModal()),
  storeCurrentPassword: payload =>
    dispatch(actions.storeCurrentPassword(payload)),
  storeNewPassword: payload => dispatch(actions.storeNewPassword(payload)),
  storeConfirmPassword: payload =>
    dispatch(actions.storeConfirmPassword(payload)),
  onChangePassword: payload => dispatch(actions.onChangePassword(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  clearChangePasswordData: () => dispatch(actions.clearChangePasswordData()),
  clearPassword: () => dispatch(actions.clearPassword()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

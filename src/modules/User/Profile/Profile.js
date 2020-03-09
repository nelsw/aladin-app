import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../actions';
import Image from '../../../components/Image/Image';
import Button from '../../../components/InputControls/Button/Button';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: false,
      profileName: null,
      profileDescription: null,
      description: false,
      profileNameError: false,
      profileErrorMessage: '',
      descriptionError: false,
      descriptionErrorMessage: '',
      profilePictureError: false,
      picUrl: ''
    };
  }

  componentWillMount() {
    const { getBalance, getProfileData } = this.props;
    if(localStorage.getItem('userData') != null) {
      getBalance();
      getProfileData();
    } else {
      this.props.history.push('/')
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  // componentDidMount() {
  //   const { getBalance, getProfileData } = this.props;
  //   getBalance();
  //   getProfileData();
  // }

  uploadProfile = image => {
    const { profileImageChanged } = this.props;
    if (image.length > 0) {
      let dotIndex = image[0].name.toLowerCase().lastIndexOf('.');
      if (
        image[0].name.toLowerCase().slice(dotIndex, image[0].name.length) == ".jpg" ||
        image[0].name.toLowerCase().slice(dotIndex, image[0].name.length) == ".png" ||
        image[0].name.toLowerCase().slice(dotIndex, image[0].name.length) == ".jpeg"
      ) {
        profileImageChanged(image[0]);
        this.setState({ profilePictureError: false, picUrl: URL.createObjectURL(image[0]) })
      }
      else {
        this.setState({ profilePictureError: true })
      };
    }
  }

  editHandler = () => {
    this.setState({ userName: !this.state.userName });
    if (this.state.description) {
      this.setState({ description: false });
    }
  };

  changeHandler = e => {
    this.setState({ profileName: e.target.value });
    if (this.state.profileName != null) {
      this.setState({ profileNameError: false });
    }
  };

  onEditDescription = () => {
    this.setState({ description: !this.state.description });
    if (this.state.userName) {
      this.setState({ userName: false });
    }
  };

  changeDescriptionHandler = e => {
    this.setState({ profileDescription: e.target.value });
    if (this.state.profileDescription != null) {
      this.setState({ descriptionError: false });
    }
  };


  closeSuccessModal = () => {
    const { closeSuccessModal } = this.props;
    closeSuccessModal();
  }
  editAlert = data => {
    const { openSuccessModal } = this.props;
      openSuccessModal({
      title: 'Alert',
      message: `Please fill out the ${data}`,
      modalStatus: 2,
      closeModal: this.closeSuccessModal,
      showIcon: false,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { profileName, profileDescription } = this.state;
    const { updateUserProfile, profilePicture, onDisabledButton, closeSuccessModal, userProfileData } = this.props;
    // if (profileName == null) {
    //   this.setState({ profileName: userProfileData.name });
    // }

    // if (profileName != '' && profileDescription != '') {
    this.setState({ description: false, userName: false });
    // if(profileName == "" && userProfileData.user != null) {
    //   this.editAlert('name');      
    // } else if(profileDescription == "" && userProfileData.description != "") {
    //   this.editAlert('description');
    // } else {
      onDisabledButton(true);
      updateUserProfile({
        name: profileName != null ? profileName.trim() : "",
        description: profileDescription != null ? profileDescription.trim() : "",
        imageUrl: profilePicture,
        closeSuccess :closeSuccessModal,
      });
    // }

  };

  render() {
    const { balance, profilePicture, qrCode, userProfileData, disabledButton, usdBalance } = this.props;
    const {
      profileName,
      profileDescription,
      userName,
      description,
    } = this.state;
    // if(localStorage.getItem('userData') != null) {
    let { defaultId, currentUser } = JSON.parse(
      localStorage.getItem('userData')
    );
    if (
      (userName || description) &&
      (profileName == null || profileDescription == null)
    ) {
      this.setState({
        profileName: userProfileData.name,
        profileDescription: userProfileData.description,
      });
    }
    return (
      <section className="page-section" id="profile">
        <div className="bg-img1  d-flex align-items-center">
          <div className="container padingbt-40   back-color">
            <div className="row  aos-item" data-aos="fade-down">

              <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                <form onSubmit={this.submitHandler}>
                  <div className="row">
                    <div className="col-lg-4 col-md-12 profile-version col-sm-12 col-xs-12 mx-auto ">
                      <div className="profile-pic">
                        <Image
                          src={
                            this.state.picUrl !== ""
                              ? this.state.picUrl
                              : profilePicture ? profilePicture :
                                require('../../../assets/img/img-profile-dummy.png')
                          }
                          alt={"Not Supported Image"}
                        />
                        <div className="profile-pic-btn">
                          <input
                            type="file"
                            accept="image/*"
                            id="file"
                            onChange={e => this.uploadProfile(e.target.files)}
                          />
                          <a href="#" className="btn">
                            <i className="fa fa-camera" aria-hidden="true" />
                          </a>
                        </div>
                        {this.state.profilePictureError ? <span style={{ fontSize: '14px', color: 'red' }}>
                          Please Select Image Only!
                      </span> : null}
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 mx-auto center-profile mt-4">
                      <p className="sub-title" onClick={this.editHandler}>
                        {this.state.userName ? (
                          <input
                            type="text"
                            placeholder="Please enter your name"
                            value={this.state.profileName}
                            onChange={this.changeHandler}
                            onClick={e => e.stopPropagation()}
                            maxLength="25"
                          />
                        ) : userProfileData.name == null ? (
                          '...'
                        ) : this.state.profileName != null &&
                          this.state.profileName.length > 0 ? (
                                this.state.profileName
                              ) : userProfileData.name.length > 0 ? (
                                userProfileData.name
                              ) : (
                                  'Add your name'
                                )}

                        <i
                          className="fa fa-pencil ml-2 color-red"
                          aria-hidden="true"
                        />
                      </p>
                      {this.state.profileNameError ? (
                        <p style={{ fontSize: '12px', color: 'red' }}>{this.state.profileErrorMessage}</p>
                      ) : null}

                      <p className="sub-title ">{currentUser}</p>
                      <p className="font-16">ID - {defaultId}</p>
                      <p className="font-16" onClick={this.onEditDescription}>
                        {this.state.description ? (
                          <input
                            type="text"
                            placeholder="Please describe something"
                            value={this.state.profileDescription}
                            onChange={this.changeDescriptionHandler}
                            onClick={e => e.stopPropagation()}
                            maxLength="100"
                          />
                        ) : userProfileData.description == null ? (
                          '...'
                        ) : this.state.profileDescription != null &&
                          this.state.profileDescription.length > 0 ? (
                                this.state.profileDescription
                              ) : userProfileData.description.length > 0 ? (
                                userProfileData.description
                              ) : (
                                  'Describe yourself'
                                )}
                        <i
                          className="fa fa-pencil ml-2 color-red"
                          aria-hidden="true"
                        />
                      </p>

                      {this.state.descriptionError ? (
                        <p style={{ fontSize: '12px', color: 'red' }}>{this.state.descriptionErrorMessage}</p>
                      ) : null}
                      <div className="mob-button">
                      <button
                        className="btn mt-3 btn-primary profile-save mar-right mr-2"
                        //onClick={this.submitHandler}
                        disabled={disabledButton }
                        type="submit"
                        value="submit"
                      >
                        {disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Save'}
                      </button>
                        <NavLink to="/manage-resources" >
                          <Button className="btn mt-3 mr-2 btn-primary profile-save">Manage Resources</Button>
                        </NavLink>
                        <NavLink to="/file-manager" >
                          <Button className="btn mt-3  btn-primary profile-save">File Manager</Button>
                        </NavLink>
                      {/* <NavLink to="/profile-more">
                        <Button className="btn mt-3 btn-primary profile-save">
                          More
                      </Button>
                      </NavLink> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="mt-3 text-cen">
                  <p>
                    <a href="#" data-toggle="modal" data-target="#modalstatus">
                      DApp Approval Status
                    </a>
                  </p>
                  <p className="color-black mt-2">Token Earned 30 ALa</p>
                </div> */}
                  <div id="Storage-pro" className="text-center mt-5">
                    <p className="mt-5 mb-1">Balance</p>
                    <h1 className="mb-1">
                      <b>{balance}</b>
                    </h1>
                    <p className="mb-4">${usdBalance} USD</p>
                    <Image src={qrCode} className="d-block mx-auto mt-3" />
                    {/* <p className="mt-4">{defaultId}</p> */}
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
    // } else {
    //   return null;
    // }
  }
}

Profile.propTypes = {
  balance: PropTypes.string,
  getBalance: PropTypes.func,
  profilePicture: PropTypes.string,
  qrCode: PropTypes.string,
};

const mapStateToProps = ({ auth, profile }) => {
  const { balance, qrCode, usdBalance } = auth;
  const { profilePicture, userProfileData, disabledButton } = profile;
  return { balance, profilePicture, qrCode, userProfileData, disabledButton, usdBalance };
};

const mapDispatchToProps = dispatch => ({
  getBalance: payload => dispatch(actions.getBalance(payload)),
  profileImageChanged: payload =>
    dispatch(actions.profileImageChanged(payload)),
  getProfileData: () => dispatch(actions.getProfileData()),
  updateUserProfile: payload => dispatch(actions.updateUserProfile(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

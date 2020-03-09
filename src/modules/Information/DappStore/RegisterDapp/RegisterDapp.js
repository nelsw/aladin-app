import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import {
  ButtonDropdown,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  FormFeedback,
} from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';
import * as actions from '../../../../actions';
import Image from '../../../../components/Image/Image';
// import Input from '../../../../components/InputControls/Input/Input';
import 'react-dropzone-uploader/dist/styles.css';

let tokenFiles = [];
let productScreenShotFiles = [];
const valuesDropDown = [
  'Art',
  'Business Tools',
  'Chat',
  'Developer Tools',
  'Documents and Storage',
  'Education and News',
  'Financial Services',
  'Games and Digital Assets',
  'Health and Fitness',
  'Marketplaces',
  'Music, Photo & Video',
  'Social Impact',
  'Social Networking',
  'Utilities and Productivity',
  'Wallets',
];

class RegisterDapp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagUserLicense: false,
      flagDappLicense: false,
      userLicenseTouched: false,
      dappLicenseTouched: false,
      userButton: false,
      dappButton: false,
      dropDownValue: 'Select action',
      dropdownOpen: false,
      nameError: '',
      urlError: '',
      categoryError: '',
      emailError: '',
      detailError: '',
      storageError: '',
      tokenError: '',
      dropDownError: '',
      nameTouched: false,
      urlTouched: false,
      categoryTouched: false,
      emailTouched: false,
      emailValid: true,
      detailTouched: false,
      storageTouched: false,
      tokenTouched: false,
      dropdownTouched: false,
      logoValid: true,
      logoError: '',
      ssValid: true,
      ssError: '',
      dappPreference: true,
      fileName: '',
      test: false,
      uploadProcess: false,
    };
  }

  onCloseSuccessModal = () => {
    this.props.closeSuccessModal();
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    tokenFiles = [];
    productScreenShotFiles = [];
    this.props.onDisabledButton(false);
    this.props.resetDapp();
  }

  // fix this toggle
  toggleAcceptUserLicense = value => {
    this.setState({ flagUserLicense: !value });
  };

  toggleAcceptDappLicense = value => {
    this.setState({ flagDappLicense: !value });
  };

  onChangeHandler = (type, value) => {
    // const {
    //   dappName,
    //   dappUrl,
    //   dappEmail,
    //   dappStorage,
    //   dappCategory,
    //   dappDetails,
    //   dappToken,
    // } = this.props;
    const { flagUserLicense, flagDappLicense } = this.state;
    let error = false;
    if (type == 'dappName' && value == '') {
      this.setState({ nameError: 'Please enter dapp name', nameTouched: true });
      error = true;
    } else if (type == 'dappUrl' && value == '') {
      this.setState({ urlError: 'Please enter dapp url', urlTouched: true });
      error = true;
    } else if (
      type == 'dappUrl' &&
      !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
        value
      )
    ) {
      this.setState({
        urlError: 'Please enter valid dapp url',
        urlTouched: true,
      });
      error = true;
    } else if (type == 'dappEmail' && value == '') {
      this.setState({ emailError: 'Please enter email', emailTouched: true });
      error = true;
    } else if (
      type == 'dappEmail' &&
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)
    ) {
      this.setState({
        emailError: 'Please enter valid email',
        emailTouched: true,
      });
      error = true;
    }
    else if (type == 'dropDownValue' && value == 'Select action') {
      this.setState({
        dropDownError: 'Please select category',
        dropdownTouched: true,
      });
      error = true;
    } else if (type == 'dappDetails' && value == '') {
      this.setState({
        detailError: 'Please enter dapp detail',
        detailTouched: true,
      });
      error = true;
      // } else if (type == 'dappToken' && value == '') {
      //   console.log('error dappToken');
      //   this.setState({
      //     tokenError: 'Please enter dapp token',
      //     tokenTouched: true,
      //   });
      //   error = true;
    } else if (!flagDappLicense) {
      error = true;
    } else if (!flagUserLicense) {
      error = true;
    }
    // else {
    //   this.props.onDisabledButton(false);
    // }
  };

  handleSubmit = e => {
    e.preventDefault();
    // e.stopPropagation();
    const {
      dappName,
      dappUrl,
      dappEmail,
      // dappStorage,
      dappCategory,
      dappDetails,
      dappNameAvailability
      // dappToken,
    } = this.props;
    const { flagUserLicense, flagDappLicense, dappPreference } = this.state;
    let error = false;
    if (dappName == '') {
      this.setState({ nameError: 'Please enter dapp name', nameTouched: true });
      error = true;
    }
    if (dappUrl == '') {
      this.setState({ urlError: 'Please enter dapp url', urlTouched: true });
      error = true;
    }
    if (dappEmail == '') {
      this.setState({ emailError: 'Please enter email', emailTouched: true });
      error = true;
    }
    if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(dappEmail)) {
      this.setState({
        emailError: 'Please enter valid email',
        emailTouched: true,
      });
      error = true;
    }
    // if (dappStorage == '') {
    //   console.log('error dappStorage');
    //   this.setState({
    //     storageError: 'Please enter dapp storage',
    //     storageTouched: true,
    //   });
    //   error = true;
    // }
    if (this.state.dropDownValue == 'Select action') {
      this.setState({
        dropDownError: 'Please select category',
        dropdownTouched: true,
      });
      error = true;
    }
    if (dappDetails == '') {
      this.setState({
        detailError: 'Please enter dapp detail',
        detailTouched: true,
      });
      error = true;
    }
    // if (dappToken == '') {
    //   console.log('error dappToken');
    //   this.setState({
    //     tokenError: 'Please enter dapp token',
    //     tokenTouched: true,
    //   });
    //   error = true;
    // }
    if (flagDappLicense == false) {
      this.setState({ userLicenseTouched: true });
      error = true;
    }
    if (flagUserLicense == false) {
      this.setState({ dappLicenseTouched: true });
      error = true;
    }
    // console.log('length', tokenFiles.length);
    if (tokenFiles.length == 0) {
      error = true;
      this.setState({ logoValid: false, logoError: 'Please select logo' });
    }
    // if (productScreenShotFiles.length == 0) {
    //   error = true;
    //   this.setState({ ssValid: false, ssError: 'Please select screenshots' });
    // }

    if (dappNameAvailability && !error) {
      // call API
      // add product screen shot and token arrays
      this.props.onDisabledButton(true);
      this.props.postRegisterDapp({
        dappname: dappName,
        dappurl: dappUrl,
        emailid: dappEmail,
        // dappstorage: dappStorage,
        dappcategory: this.state.dropDownValue,
        dappdetails: dappDetails,
        // token: dappToken,
        dappPreference: dappPreference ? 1 : 0,
        rating: 5,
        dapplogo: tokenFiles,
        screenshots: productScreenShotFiles,
        closeSuccessModal: this.onCloseSuccessModal,
      });
    }
  };

  getUploadParams = ({ meta }) => {
    const url = 'https://httpbin.org/post';
    const fileUrl = `${url}/${encodeURIComponent(meta.name)}`;
    return { url, meta: { fileUrl } };
  };

  // getUploadParams2 = ({ meta }) => {
  //   const url = 'https://httpbin.org/post';
  //   const fileUrl = `${url}/${encodeURIComponent(meta.name)}`;
  //   return { url, meta: { fileUrl } };
  // };

  handleDappName = (dappName) => {
    this.props.dappNameChanged(dappName);
    this.onChangeHandler('dappName', dappName);
  }
  fileToken = (file) => {
    if (file.meta.size < 10242880) {
      this.setState({ ssValid: true, ssError: '', logoValid: true, logoError: '' });
      file.restart()
      return true;
    } else {
      this.setState({ logoValid: true, logoError: 'Max file upload size must be less than 10 mb', test: true });
      file.remove()
      return false
    }
  }
  fileSs = (file) => {
    if (file.meta.size < 10242880) {
      this.setState({ ssValid: true, ssError: '', logoValid: true, logoError: '' });
      file.restart()
      return true;
    } else {
      this.setState({ ssValid: true, ssError: 'Max file upload size must be less than 10 mb', test: true });
      file.remove()
      return false
    }
  }

  handleChangeStatusToken = ({ meta, file }, status) => {

    if (status === 'done' && meta.size < 10242880) {
      // console.log('logo', file, status, meta);
      this.setState({ logoValid: true, logoError: '' });
      tokenFiles.push(file);
    } else if (status === 'rejected_file_type') {
    } else if (status === 'rejected_max_files') {
    }  else if(status == 'headers_received') {
      this.setState({uploadProcess: false});
    }
    else if (status === 'removed' && this.state.test) {
      tokenFiles = tokenFiles.filter(file1 => file.id != file1.id);
    } else if (status == 'uploading') {
      this.setState({uploadProcess: true, logoValid: true});
    }
  };

  handleChangeStatusProductScreenShot = ({ meta, file }, status) => {

    if (status === 'done' && meta.size < 10242880) {
      productScreenShotFiles.push(file);
      this.setState({ ssValid: true, ssError: '' });
    } else if (status === 'rejected_file_type') {
    } else if (status === 'rejected_max_files') {
    }  else if(status == 'headers_received') {
      this.setState({uploadProcess: false});
    }
    if (status === 'removed' && this.state.test) {
      productScreenShotFiles = productScreenShotFiles.filter(
        file1 => file.id != file1.id
      );
    } else if (status == 'uploading') {
      this.setState({uploadProcess: true, ssValid: true});
    }
  };

  onDropdownItem_Click = e => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  };
  chechkDappName = (e) => {
    e.preventDefault();
    this.props.checkDappNameAvailability({ dappName: this.props.dappName })
  }
  render() {
    const {
      dappName,
      dappUrl,
      dappEmail,
      dappStorage,
      dappCategory,
      dappDetails,
      disabledButton,
      dappNameAvailability
      // dappToken,
    } = this.props;
    const {
      flagUserLicense,
      flagDappLicense,
      userLicenseTouched,
      dappLicenseTouched,
      userButton,
      dappButton,
      uploadProcess,
    } = this.state;
    return (
      <section className="page-section" id="dapp-storea">
        <div className=" m-50   d-flex align-items-center">
          <div className="container ">
            <div className="row  aos-item" data-aos="fade-down">
              <div className="col-lg-8 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                <form onSubmit={this.handleSubmit}>
                  <div className="text-center">
                    <h4 className="pada-40 mb-3">
                      <b>Aladin-Register DApp</b>
                    </h4>
                    <div className="bor-upper mx-auto" />
                  </div>
                  <div className="row flex-column-reverse-mob">
                    <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                      <p>
                        Aladin is the first blockchain to truly bridge the gap
                        between the modern internet and decentralized
                        applications. A built-in fully transparent universal
                        oracle.
                    </p>
                      <p>
                        Register your Dapp with Aladin and enjoy the simplest and
                        fastest world of Aladin blockchain.
                    </p>
                    </div>
                    <div className="col-lg-5 text-center col-md-12 col-sm-12 col-xs-12 ">
                      <Image
                        className='m-20'
                        src={require('../../../../assets/img/img-dpp.png')}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="form-grp pr-3">
                        <p className="color-black">
                          <i
                            className="fa fa-check-circle  d-inline"
                            aria-hidden="true"
                          />
                          Dapp Name
                        <span className="color-red">(required)</span>
                        </p>
                        <Input
                          type="text"
                          value={dappName}
                          onChange={e => {
                            this.handleDappName(e.target.value)

                          }}
                          onBlur={() => this.props.checkDappNameAvailability({ dappName: this.props.dappName })}
                          className="form-control ml-3"
                          placeholder="e.g. Dmail"
                          valid={dappName.length > 0 && dappNameAvailability}
                          invalid={this.state.nameTouched && dappName.length == 0 || !dappNameAvailability}
                        />
                        <FormFeedback
                          style={{ textAlign: 'left' }}
                          invalid={dappName.length == 0 || !dappNameAvailability}
                          valid={dappName.length > 0 && dappNameAvailability == true}
                        >
                          {dappName.length > 0 ? dappNameAvailability == true ? '' : "Dapp already exist with same name!" : this.state.nameError}

                        </FormFeedback>

                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                      <div className="form-grp pr-3">
                        <p className="color-black">
                          <i
                            className="fa fa-check-circle  d-inline"
                            aria-hidden="true"
                          />
                          Dapp Url
                        <span className="color-red">(required)</span>
                        </p>
                        <Input
                          type="text"
                          value={dappUrl}
                          onChange={e => {
                            this.props.dappUrlChanged(e.target.value);
                            this.onChangeHandler('dappUrl', e.target.value);
                          }}
                          className="form-control ml-3"
                          placeholder="e.g. www.aladin.com"
                          valid={
                            this.state.urlTouched &&
                            dappUrl.length > 0 &&
                            /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
                              dappUrl
                            )
                          }
                          invalid={
                            this.state.urlTouched &&
                            !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
                              dappUrl
                            )
                          }
                        />

                        <FormFeedback
                          style={{ textAlign: 'left' }}
                          valid={false}
                          invalid={
                            this.state.urlTouched &&
                            !(
                              dappUrl.length == 0 &&
                              /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi.test(
                                dappUrl
                              )
                            )
                          }
                        >
                          {this.state.urlError}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="form-grp pr-3">
                        <p className="color-black">
                          <i
                            className="fa fa-check-circle  d-inline"
                            aria-hidden="true"
                          />
                          Email ID
                        <span className="color-red">(required)</span>
                        </p>
                        <Input
                          type="text"
                          value={dappEmail}
                          onChange={e => {
                            this.props.dappEmailChanged(e.target.value);
                            this.onChangeHandler('dappEmail', e.target.value);
                          }}
                          className="form-control ml-3"
                          placeholder="e.g. Dmail@abc.com"
                          valid={
                            this.state.emailTouched &&
                            dappEmail.length > 0 &&
                            /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                              dappEmail
                            )
                          }
                          invalid={
                            this.state.emailTouched &&
                            !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                              dappEmail
                            )
                          }
                        />

                        <FormFeedback
                          style={{ textAlign: 'left' }}
                          valid={false}
                          invalid={
                            this.state.emailTouched &&
                            !(
                              dappEmail.length == 0 &&
                              /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(
                                dappEmail
                              )
                            )
                          }
                        >
                          {this.state.emailError}
                        </FormFeedback>
                      </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                    <div className="form-grp pr-3">
                      <p className="color-black">
                        <i
                          className="fa fa-check-circle  d-inline"
                          aria-hidden="true"
                        />
                        DApp Storage
                      </p>
                      <Input
                        type="text"
                        value={dappStorage}
                        onChange={e => {
                          this.props.dappStorageChanged(e.target.value);
                        }}
                        className="form-control ml-3"
                        placeholder="e.g. www.finalgaia.com"
                      />
                    </div>
                  </div> */}
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="form-grp custom-dropdown pr-3">
                        <p className="color-black">
                          <i
                            className="fa fa-check-circle  d-inline"
                            aria-hidden="true"
                          />
                          Dapp Category
                        <span className="color-red">(required)</span>
                        </p>
                        <Dropdown
                          isOpen={this.state.dropdownOpen}
                          toggle={this.toggle}
                          direction='up'
                        >
                          <DropdownToggle caret>
                            {this.state.dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu>
                            {valuesDropDown.map(e => (
                              <DropdownItem key={e} onClick={this.onDropdownItem_Click}>
                                <div
                                  key={e}
                                  onChange={this.onChangeHandler(
                                    'dropDownValue',
                                    e
                                  )}
                                  dropdownvalue={e}
                                >
                                  {e}
                                </div>
                              </DropdownItem>
                            ))}
                            {/* })} */}
                          </DropdownMenu>
                        </Dropdown>
                        <FormFeedback
                          style={{ textAlign: 'left', display: 'block' }}
                          invalid={dappCategory == 'Select action'}
                        >
                          {this.state.dropDownValue !== 'Select action' &&
                            this.state.dropdownTouched
                            ? ''
                            : this.state.dropDownError}
                        </FormFeedback>
                        {/* <Input
                        type="text"
                        value={dappCategory}
                        onChange={e => {
                          this.props.dappCategoryChanged(e.target.value);
                        }}
                        className="form-control ml-3"
                        placeholder="e.g. Dmail"
                      /> */}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                      <div className="form-grp pr-3">
                        <p className="color-black">
                          <i
                            className="fa fa-check-circle  d-inline"
                            aria-hidden="true"
                          />
                          Dapp Details
                        <span className="color-red">(required)</span>
                        </p>
                        <Input
                          type="text"
                          value={dappDetails}
                          onChange={e => {
                            this.props.dappDetailsChanged(e.target.value);
                            this.onChangeHandler('dappDetails', e.target.value);
                          }}
                          className="form-control ml-3"
                          placeholder="e.g. Lifestyle"
                          valid={dappDetails.length > 0}
                          invalid={
                            this.state.detailTouched && dappDetails.length == 0
                          }
                        />

                        <FormFeedback
                          style={{ textAlign: 'left' }}
                          valid={dappDetails.length > 0}
                          invalid={dappDetails.length == 0}
                        >
                          {dappDetails.length > 0 ? '' : this.state.detailError}
                        </FormFeedback>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="form-grp custom-dropdown pr-3">
                        <p className="color-black">
                          <i
                            className="fa fa-check-circle  d-inline"
                            aria-hidden="true"
                          />
                          Dapp Preference
                        <span className="color-red">(required)</span>
                        </p>
                        <div className="col-12">
                          <div className="custom-control custom-radio custom-control-inline mr-3">
                            <input id="inlineRadio2"
                              className="custom-control-input"
                              checked={this.state.dappPreference}
                              type="radio"
                              name="inlineRadioOptions"
                              style={{ cursor: 'pointer' }}
                              onChange={() => this.setState({ dappPreference: true })}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="inlineRadio2"
                            >
                              Based on users
                        </label>
                          </div>
                          <div className="custom-control custom-radio custom-control-inline  mr-3">
                            <input id="inlineRadio1"
                              className="custom-control-input"
                              type="radio"
                              checked={!this.state.dappPreference}
                              disabled={true}
                              name="inlineRadioOptions"
                              onChange={() => this.setState({ dappPreference: false })}
                              style={{ cursor: 'pointer' }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="inlineRadio1"
                            >
                              Based on tokens
                        </label>
                          </div>
                        </div>
                        {/* <div className="col-12">
                        <input type='radio' name='dappPreference' className="" value="0" defaultChecked={true} />
                        <span>Test 1</span>
                      </div>
                      <div className="col-12">
                        <input type='radio' name='dappPreference' className="" value="1" />
                        <span>Test 2</span>
                      </div> */}

                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                      <div className="form-grp pr-3">
                        <p className="color-black">
                          <i
                            className="fa fa-check-circle  d-inline"
                            aria-hidden="true"
                          />
                          Logo
                        <span className="color-red">(required)</span>
                        </p>
                      </div>
                      <div id="drop-area" className="ml-3">
                        <form id="form1" className="my-form text-center ">
                          {/* <!--  <i className="fa fa-times" aria-hidden="true"></i> --> */}

                          {/* <Input
                          type="file"
                          id="fileElem"
                          accept="image/*"
                          onChange="handleFiles(this.files)"
                        /> */}
                          <Dropzone
                            getUploadParams={this.getUploadParams}
                            onChangeStatus={this.handleChangeStatusToken.bind(this)}
                            // {() => {
                            //   this.handleChangeStatusToken();
                            //   this.onChangeHandler();
                            // }}

                            accept="image/*"
                            maxFiles={1}
                            inputContent=""
                            //maxSizeBytes={5242880}
                            canRemove={true}
                            validate={this.fileToken}
                            styles={{
                              dropzone: {
                                overflow: 'visible'
                              }
                            }}

                          // onSubmit={handleSubmit}
                          />
                          <label htmlFor="fileElem">
                            Drop a new logo here, or <br />
                            click to select one
                          <progress id="progress-bar" max="100" value="0" />
                            <div id="gallery" />
                          </label>
                          <FormFeedback
                            style={{ textAlign: 'left', display: 'block' }}
                            invalid={!this.state.logoValid}
                          >
                            {this.state.logoError}
                          </FormFeedback>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <div className="form-grp pr-3">
                        <p className="color-black">
                          {productScreenShotFiles.length > 0 ? null : (
                            <i
                              className="fa fa-check-circle  d-inline"
                              aria-hidden="true"
                            />
                          )}
                          Product screenshot
                      </p>
                      </div>
                      <div id="drop-area" className="ml-3">
                        <form className="my-form text-center ">
                          <Dropzone
                            getUploadParams={this.getUploadParams}
                            onChangeStatus={
                              this.handleChangeStatusProductScreenShot
                            }
                            accept="image/*"
                            maxFiles={20}
                            inputContent=""
                            validate={this.fileSs}
                            styles={{
                              dropzone: {
                                overflow: 'visible'
                              }
                            }}
                          />
                          <label htmlFor="fileElem">
                            Drop a new product screenshot here, or
                          <br /> click to select one
                          <progress id="progress-bar" max="100" value="0" />
                            <div id="gallery" />
                          </label>
                          <FormFeedback
                            style={{ textAlign: 'left', display: 'block' }}
                            invalid={!this.state.ssValid}
                          >
                            {this.state.ssError}
                          </FormFeedback>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pt-4 ml-3"
                  // onClick={() => this.toggleAcceptUserLicense(flagUserLicense)}
                  >
                    <label
                      className="container-a text-left"
                      htmlFor="password"
                      onChange={() =>
                        this.setState({
                          flagUserLicense: !flagUserLicense,
                          userLicenseTouched: true,
                          userButton: !userButton,
                        })
                      }
                    >
                      <p className="pad-10">
                        I accept the user license agreement&nbsp;
                      <NavLink to="/term-condition" target="_blank">Terms & Condition</NavLink>
                      </p>
                      <Input
                        type="checkbox"
                        id="password"
                        className="password-chekbox"
                        // onChange={e =>
                        //   this.toggleAcceptUserLicense(e.target.checked)
                        // }
                        checked={flagUserLicense}
                      />
                      <span className="checkmark left-align" />
                    </label>
                    <FormFeedback
                      style={
                        userLicenseTouched && !flagUserLicense
                          ? { textAlign: 'left', display: 'block', marginLeft: '12px' }
                          : {}
                      }
                      invalid={!flagUserLicense}
                    >
                      Please accept user license agreement
                  </FormFeedback>
                  </div>
                  <div
                    className="pt-2 ml-3"
                  // onClick={() => this.toggleAcceptDappLicense(flagDappLicense)}
                  >
                    <label
                      className="container-a text-left"
                      htmlFor="password1"
                      onChange={() =>
                        this.setState({
                          flagDappLicense: !flagDappLicense,
                          dappLicenseTouched: true,
                          dappButton: !dappButton,
                        })
                      }
                    >
                      <p className="pad-10">
                        I accept the DApp license agreement&nbsp;
                      <NavLink to="/term-condition" target="_blank">Terms & Condition</NavLink>
                      </p>
                      <Input
                        type="checkbox"
                        className="password-chekbox"
                        // onChange={e =>
                        //   this.toggleAcceptDappLicense(e.target.checked)
                        // }
                        checked={flagDappLicense}
                        id="password1"
                      />
                      <span className="checkmark left-align" />
                    </label>
                    <FormFeedback
                      style={
                        dappLicenseTouched && !flagDappLicense
                          ? { textAlign: 'left', display: 'block', marginLeft: '12px' }
                          : {}
                      }
                      invalid={!flagDappLicense}
                    >
                      Please accept dapp license agreement
                  </FormFeedback>
                  </div>
                  <div id="Storage-pro" className="mt-4 mb-5">
                    <button
                      className="btn btn-primary mt-3 request_demo_send width-100 mx-auto d-block"
                      type="submit"
                      value="submit"
                      data-toggle="modal"
                      data-target="#modalsubmitForm"
                      disabled={disabledButton || uploadProcess}
                    // onClick={this.handleSubmit}
                    // disabled={
                    //   !(flagUserLicense && flagDappLicense) &&
                    //   dappName &&
                    //   dappDetails &&
                    //   dappEmail &&
                    //   dappStorage &&
                    //   dappToken &&
                    //   dappUrl
                    // }
                    >
                      {disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Confirm'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ dapp, dappRegister, profile }) => {
  const { dapps } = dapp;
  const { disabledButton } = profile;
  const {
    dappName,
    dappUrl,
    dappEmail,
    dappStorage,
    dappCategory,
    dappDetails,
    dappToken,
    dappNameAvailability,
  } = dappRegister;
  return {
    dapps,
    dappName,
    dappUrl,
    dappEmail,
    dappStorage,
    dappCategory,
    dappDetails,
    dappToken,
    dappNameAvailability,
    disabledButton,
  };
};

const mapDispatchToProps = dispatch => ({
  dappNameChanged: data => dispatch(actions.dappNameChanged(data)),
  dappUrlChanged: data => dispatch(actions.dappUrlChanged(data)),
  dappEmailChanged: data => dispatch(actions.dappEmailChanged(data)),
  dappStorageChanged: data => dispatch(actions.dappStorageChanged(data)),
  dappCategoryChanged: data => dispatch(actions.dappCategoryChanged(data)),
  dappDetailsChanged: data => dispatch(actions.dappDetailsChanged(data)),
  dappTokenChanged: data => dispatch(actions.dappTokenChanged(data)),
  postRegisterDapp: data => dispatch(actions.postRegisterDapp(data)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)), checkDappNameAvailability: payload => dispatch(actions.dappNameAvailability(payload)),
  resetDapp: () => dispatch(actions.resetDapp()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterDapp));

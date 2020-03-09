import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../../../components/InputControls/Button/Button';
import Input from '../../../../components/InputControls/Input/Input';
import * as actions from '../../../../actions';
import { GAIA_HUB_URL_USER, GAIA_HUB_URL } from '../../../../constants/constants';

class APISettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accept: false,
      gaiaHubConfig: '',
      gaiaHubUrl: '',
      API: null,
      saveButton: false,
      resetButton: false,
    };
  }

  componentWillMount() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData != null) {
      // this.readTextFile(`${GAIA_HUB_URL}/${userData.defaultId}/profile.json`, (user) => {
      //   let API = JSON.parse(user)[0].decodedToken.payload.claim.api;
        this.setState({gaiaHubConfig: userData.gaia.gaiaHubConfig, gaiaHubUrl: userData.gaia.gaiaHubUrl });
      // });
    }
  }

  readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
  }

  openResetModal = () => {
    const { openSuccessModal } = this.props;
    openSuccessModal({
      title: 'Success',
      message: 'API reset successfully',
      modalStatus: 2,
      closeModal: this.closeSuccessModal,
      showIcon: true,
    });
    this.setState({ resetButton: false });
  };
  
  openSaveModal = () => {
    const { openSuccessModal } = this.props;
    openSuccessModal({
      title: 'Success',
      message: 'API updated successfully',
      modalStatus: 2,
      closeModal: this.closeSuccessModal,
      showIcon: true,
    });
    this.setState({ saveButton: false });
  };

  closeSuccessModal = () => {
    const { closeSuccessModal } = this.props;
    closeSuccessModal();
  };

  saveApiEndPoint = () => {
    const { gaiaHubConfig, gaiaHubUrl } = this.state;
    this.props.onDisabledButton(true);
    this.props.saveApiEndPoint({ gaiaHubConfig, gaiaHubUrlUser: gaiaHubUrl, openSaveModal: this.openSaveModal });
    this.setState({ saveButton: true });
  }

  openResetApiModal = () => {
    this.setState({ gaiaHubConfig: GAIA_HUB_URL, gaiaHubUrl: GAIA_HUB_URL_USER });
    this.props.onDisabledButton(true);
    this.props.saveApiEndPoint({ gaiaHubConfig: GAIA_HUB_URL, gaiaHubUrlUser: GAIA_HUB_URL_USER, openSaveModal: this.openResetModal });
    this.setState({ resetButton: true });
  };

  render() {
    const { accept, gaiaHubConfig, gaiaHubUrl, saveButton, resetButton } = this.state;
    const { disabledButton } = this.props;
    return (
      <div>
        <section className="page-section" id="view-a">
          <div className="bg-img1  d-flex align-items-center">
            <div className="container padingbt-40 back-color">
              <div className="row  aos-item" data-aos="fade-down">
                <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                  <NavLink to="/settings">
                    <Button className="btn btn-primary" type="button">
                      Back
                    </Button>
                  </NavLink>
                  <div className="text-left" id="Storage-pro">
                    <h4 className="pada-40">
                      <b>Aladin API Options</b>
                    </h4>
                    <div className="bor-upper" />
                    <div className="border-bot pt-0">
                      <h2 className="font-22">URL for Gaia Hub Config</h2>
                      <Input value={gaiaHubConfig} className="form-control api-option-textbox" placeholder=" " onChange={(e) => this.setState({ gaiaHubConfig: e.target.value })} />
                    </div>
                    <div className="border-bot">
                      <h2 className="font-22">URL for Gaia Hub</h2>
                      <Input value={gaiaHubUrl} className="form-control api-option-textbox" placeholder=" " onChange={(e) => this.setState({ gaiaHubUrl: e.target.value })} />
                    </div>
                    {/* <label className="container-a text-left" htmlFor="password">
                      <p className="pad-10">
                        <a>Display anonymous analytics</a>
                      </p>
                      <Input
                        type="checkbox"
                        className="password-chekbox"
                        id="password"
                        checked={accept}
                        onChange={() => this.setState({ accept: !accept })}
                      />
                      <span className="checkmark left-align" />
                    </label> */}
                    {/* {disabledButton ? (
                      <div className="width-460 pt-3">
                        <Button
                          className="btn  mt-4 btn-primary"
                          data-toggle="modal"
                          data-target="#passwordupdate"
                          type="button"
                          ><i className="fa fa-circle-o-notch fa-spin"></i>
                        </Button>
                      </div>
                    ) : */}
                     {/* ( */}
                      <div className="width-460 pt-3">
                        <Button
                          className="btn  mt-4 btn-primary"
                          data-toggle="modal"
                          data-target="#passwordupdate"
                          type="button"
                          disabled={disabledButton}
                          onClick={this.saveApiEndPoint}
                        >
                          {saveButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Save"}
                        </Button>
                        <Button
                          className="btn  mt-4 btn-secondary"
                          data-toggle="modal"
                          data-target="#passwordupdate"
                          type="button"
                          disabled={disabledButton}
                          onClick={this.openResetApiModal}
                        >
                          {resetButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Reset API"}
                        </Button>
                      </div>
                    {/* )} */}
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
APISettings.propTypes = {
  openSuccessModal: PropTypes.func,
  closeSuccessModal: PropTypes.func,
};

const mapStateToProps = ({ profile }) => {
  const {
    disabledButton,
  } = profile;

  return {
    disabledButton,
  };
};

const mapDisptchToProps = dispatch => ({
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  saveApiEndPoint: payload => dispatch(actions.saveApiEndPoint(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  
});

export default connect(
  mapStateToProps,
  mapDisptchToProps
)(APISettings);

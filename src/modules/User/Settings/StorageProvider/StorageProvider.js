import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../../../components/InputControls/Button/Button';
import * as actions from '../../../../actions';

class StorageProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  test = () => {
    console.log('checked');
  };

  closeStorageModal = () => {
    const { closeSignInModal } = this.props;
    closeSignInModal();
  };

  openStorageModal = () => {
    const { onOpenModal } = this.props;
    onOpenModal({
      title: 'Storage Selection',
      body: [
        <div className="row" id="checkmark">
          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
            <label className="container-a">
              <p className="float-none">
                <a>AWS</a>
              </p>
              <input
                type="checkbox"
                className="password-chekbox"
                onChange={this.test}
              />
              <span className="checkmark" />
            </label>
          </div>
          <div className="col-lg-3  col-md-3 col-sm-6 col-6">
            <label className="container-a">
              <p className="float-none">
                <a>Azure</a>
              </p>
              <input type="checkbox" className="password-chekbox" />
              <span className="checkmark" />
            </label>
          </div>
          <div className="col-lg-3  col-md-3 col-sm-6 col-6">
            <label className="container-a">
              <p className="float-none">
                <a>DropBox</a>
              </p>
              <input type="checkbox" className="password-chekbox" />
              <span className="checkmark" />
            </label>
          </div>
          <div className="col-lg-3  col-md-3 col-sm-6 col-6">
            <label className="container-a">
              <p className="float-none">
                <a>GDrive</a>
              </p>
              <input type="checkbox" className="password-chekbox" />
              <span className="checkmark" />
            </label>
          </div>
        </div>,
      ],
      buttonClick: this.closeStorageModal,
      buttonName: 'Next',
      cancelButton: this.closeStorageModal,
      cancelButtonFlag: false,
    });
  };

  storageModalClose = () => {
    this.setState({ storageSelectionModal: false });
  };

  openStorageUrl = () => {
    // window.location.href = 'https://github.com/dev-aladin/gaia';
    window.open('https://github.com/dev-aladin/gaia', '_blank');
  };

  render() {
    return (
      <div>
        <section className="page-section">
          <div className="bg-img1  d-flex align-items-center">
            <div className="container p-41 p-41-a back-color">
              <div className="row  aos-item" data-aos="fade-down">
                <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                  <NavLink to="/settings">
                    <Button className="btn btn-primary" type="button">
                      Back
                    </Button>
                  </NavLink>
                  <div id="Storage-pro">
                    <h4 className="pada-40">
                      <b>Storage Providers </b>
                    </h4>
                    <div className="bor-upper mb-3" />
                    <p>
                      Your profile and app data will be securely stored in the
                      storage provider you connect. <br />
                    </p>
                    <div className="mt-1 mb-5">
                      <p>
                        <b>Note :</b> Our storage migration feature will be
                        included in a future version
                      </p>
                    </div>
                    {/* <Button
                      className="btn d-block mx-auto  btn-secondary mr-3"
                      type="button"
                      onClick="window.location.href=''"
                    >
                      Disconnect Default Storage (Free Storage Hub)
                    </Button> */}
                    <Button
                      className="btn d-block   mx-auto mt-4 btn-primary"
                      data-toggle="modal"
                      data-target="#modalLoginForm"
                      type="button"
                      onClick={this.openStorageUrl}
                    >
                      Run Your Own Gaia Storage Hub
                    </Button>
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
StorageProvider.propTypes = {
  onOpenModal: PropTypes.func,
  closeSignInModal: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onOpenModal: payload => dispatch(actions.openSignInModal(payload)),
  closeSignInModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
});
export default connect(
  null,
  mapDispatchToProps
)(StorageProvider);

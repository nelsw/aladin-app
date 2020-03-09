import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../../../actions';
import Button from '../../../../components/InputControls/Button/Button';

class ResetBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  onOpenResetBrowserModal = () => {
    const { onOpenModal, onCloseModal } = this.props;
    onOpenModal({
      title: 'Log out',
      body: [
        <div>
          <p>
            Are you sure you want to reset Aladin browser?
            <br />
            Please make sure you have a written copy of your secret recovery phrase before continuing otherwise you will lose access to this account and any money or IDs associated with it.
          </p>
        </div>,
      ],
      buttonName: 'Ok',

      buttonClick: this.confirmAction,
      cancelButton: onCloseModal,
    });
  };

  confirmAction = () => {
    localStorage.clear();
    this.props.clearCreateIdData();
    this.props.onCloseModal();
    this.props.displayPayment(false);
    this.props.history.push('/');
  };

  render() {
    return (
      <section className="page-section">
        <div className="bg-img1  d-flex align-items-center">
          <div className="container p-41 p-41-b back-color">
            <div className="row  aos-item" data-aos="fade-down">
              <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                <NavLink to="/settings">
                  <Button className="btn btn-primary" type="button">
                    Back
                  </Button>
                </NavLink>
                <div id="Storage-pro">
                  <h4 className="pada-40">
                    <b>Log out </b>
                  </h4>
                  <div className="bor-upper mb-3" />
                  <p>
                  Erase your local data so you can create a new or restore existent account.
                  </p>

                  <Button
                    className="btn d-block mx-auto mt-5 btn-primary"
                    type="button"
                    onClick={this.onOpenResetBrowserModal}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

ResetBrowser.propTypes = {
  onCloseSuccessModal: PropTypes.func,
  onOpenModal: PropTypes.func,
  onCloseModal: PropTypes.func,
  onOpenSuccessModal: PropTypes.func,
};
const mapDispatchToProps = dispatch => ({
  onOpenModal: payload => dispatch(actions.openSignInModal(payload)),
  onCloseModal: () => dispatch(actions.closeSignInModal()),
  onOpenSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  onCloseSuccessModal: () => dispatch(actions.closeSuccessModal()),
  clearCreateIdData: () => dispatch(actions.clearCreateIdData()),
  displayPayment: payload => dispatch(actions.displayPayment(payload)),
});
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ResetBrowser)
);

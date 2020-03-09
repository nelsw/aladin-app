import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

function SuccessModal(props) {
  let modal = null;
  const {
    modalStatus,
    title,
    redirectUrl,
    buttonClick,
    message,
    showIcon,
    closeModal,
    children,
    history,
    cancelIconFlag,
  } = props;
  const onRedirect = () => {
    history.push(redirectUrl);
    buttonClick();
  };
  if (modalStatus === 1) {
    modal = (
      <div>
        <div
          className="modal fade show"
          id="Submit-que"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
          onClick={props.close}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-sm"
            role="document"
          >
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="arrow modal-header">
                {cancelIconFlag ? (
                  <button type="button" className="close" onClick={props.close}>
                    &times;
                  </button>
                ) : null}
              </div>
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <div className="modal-body text-center">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </div>
    );
  }
  if (modalStatus === 2) {
    modal = (
      <div>
        <div
          className="modal fade show"
          id="successfully"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block', zIndex: 1051 }}
          onClick={closeModal}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="arrow modal-header">
                {cancelIconFlag ? <button type="button" className="close" onClick={closeModal}>
                  &times;
                </button> : null}
                
              </div>
              <div className="row">
                <div className="col-lg-10 mx-auto">
                  <div className="modal-body text-center">
                    <h5 className="modal-font">{title}</h5>
                    {showIcon ? (
                      <i
                        className="fa fa-check-circle color-red arrow-suca"
                        aria-hidden="true"
                      />
                    ) : null}

                    <p className=" mt-2">{message}</p>

                    <button
                      className="btn btn-primary request_demo_send width-100"
                      // data-dismiss="modal"
                      // data-toggle="modal"
                      // data-target="#successfully"
                      type="button"
                      onClick={
                        buttonClick
                          ? redirectUrl
                            ? onRedirect
                            : buttonClick
                          : closeModal
                      }
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" style={{ zIndex: 1050 }} />
      </div>
    );
  }

  return <div>{modal}</div>;
}

SuccessModal.propTypes = {
  modalStatus: PropTypes.number,
  title: PropTypes.string,
  redirectUrl: PropTypes.string,
  buttonClick: PropTypes.func,
  message: PropTypes.string,
  showIcon: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.string,
  history: PropTypes.object,
};

const mapStateToProps = ({ successModal }) => {
  const {
    title,
    redirectUrl,
    modalStatus,
    message,
    buttonClick,
    showIcon,
    closeModal,
    cancelIconFlag,
  } = successModal;
  return {
    title,
    redirectUrl,
    modalStatus,
    message,
    buttonClick,
    showIcon,
    closeModal,
    cancelIconFlag,
  };
};
// const mapDispatchToProps = dispatch => ({
//   onCloseModal: () => dispatch(actions.closeSuccessModal()),
// });
export default withRouter(connect(mapStateToProps)(SuccessModal));

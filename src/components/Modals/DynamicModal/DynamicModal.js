import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../InputControls/Button/Button';
import * as actions from '../../../actions';

class LoginWrapper extends Component {
  render() {
    const {
      title,
      backButton,
      cancelButton,
      buttonClick,
      body,
      buttonName,
      cancelButtonName,
      cancelButtonFlag,
      cancelIconFlag,
      closeModal,
      disabled,
      hideButton,
      data
    } = this.props;
    return (
      <div>
        <div
          className="modal fade show"
          id="modalLoginForm"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
          onClick={cancelButton}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <form onSubmit={(e) => { e.preventDefault(); buttonClick(data);}}>
              
              <div className="arrow modal-header">
                {cancelIconFlag ? (
                  <Button
                    type="button"
                    className="close"
                    onClick={cancelButton}
                  >
                    &times;
                  </Button>
                ) : null}
              </div>
              <div className="row">
                <div className="col-lg-10 col-10 mx-auto modalss">
                  <div className="modal-body text-center">
                    {backButton || null}
                    <h5>{title}</h5>
                    {body}
                    {hideButton ? null : 
                    <Button
                      className="btn btn-primary mt-3 request_demo_send width-100 open"
                      type="submit"
                      data-toggle="modal"
                      data-target="#userpassword"
                      data-dismiss="modal"
                      // onClick={buttonClick}
                      disabled={disabled}
                    >
                      {buttonName}
                    </Button>
                    }
                    {cancelButtonFlag ? (
                      <Button
                        className="btn btn-secondary mt-3 request_demo_send width-100 cancel"
                        type="button"
                        data-dismiss="modal"
                        onClick={cancelButton}
                      >
                        {cancelButtonName}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </div>
    );
  }
}

LoginWrapper.propTypes = {
  title: PropTypes.string,
  backButton: PropTypes.func,
  cancelButton: PropTypes.func,
  buttonClick: PropTypes.func,
  body: PropTypes.string,
  buttonName: PropTypes.string,
  cancelButtonName: PropTypes.string,
  cancelButtonFlag: PropTypes.bool,
  closeModal: PropTypes.func,
};

const mapStateToProps = ({ modal }) => {
  const {
    title,
    body,
    backButton,
    buttonClick,
    cancelButton,
    cancelButtonName,
    cancelButtonFlag,
    cancelIconFlag,
    buttonName,
    disabled,
    hideButton,
    data
  } = modal;
  return {
    title,
    body,
    backButton,
    buttonClick,
    cancelButton,
    cancelButtonName,
    cancelButtonFlag,
    cancelIconFlag,
    buttonName,
    disabled,
    hideButton,
    data,
  };
};
const mapDispatchToProps = dispatch => ({
  // closeModal: () => dispatch(actions.closeSignInModal()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWrapper);

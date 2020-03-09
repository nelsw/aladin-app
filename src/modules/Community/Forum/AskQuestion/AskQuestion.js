import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../../../components/InputControls/Input/Input';
import Select from '../../../../components/InputControls/Select/Select';
import TextField from '../../../../components/InputControls/TextField/TextField';
import * as actions from '../../../../actions';

class AskQuestion extends Component {
  openModal = () => {
    const { openSuccessModal, closeSuccessModal } = this.props;
    openSuccessModal({
      title: 'Success',
      message: 'New topic/Question has been added successfully.',
      modalStatus: 2,
      closeModal: closeSuccessModal,
      redirectUrl: '',
      showIcon: true,
    });
  };

  render() {
    return (
      <section className="page-section " id="ask-que">
        <div className="bg-img1 d-flex align-items-center">
          <div className="container padingbt-40 back-color">
            <div className="row  aos-item" data-aos="fade-down">
              <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto ">
                <NavLink to="/forum">
                  <button className="btn btn-primary" type="button">
                    Back
                  </button>
                </NavLink>
                {/* <!-- ask Question section --> */}
                <form>
                  <div className="row">
                    <div className="col-lg-9 text-left mx-auto col-md-12 col-sm-12 col-12">
                      <div className="text-left">
                        <h1 className="pada-40 text-center">Ask a Question?</h1>
                        <div className="bor-upper mb-3 mx-auto" />
                        <div className="">
                          <label htmlFor="form_email">Title</label>
                          <Input
                            id="form_email"
                            type="text"
                            name="user"
                            className="form-control"
                            placeholder=""
                            data-error="Valid User Name is required."
                            value=""
                          />
                        </div>
                        <div className="mt-3">
                          <label htmlFor="categories">Category</label>
                          <Select
                            id="categories"
                            options={['categories1', 'categories2']}
                            placeholder="select-categories"
                          />
                          {/* <select className="form-control select-toggle">
                            <option />
                            <option>Category1</option>
                          </select> */}
                        </div>
                        <div className="mt-3">
                          <label htmlFor="form_email">Question</label>
                          <TextField
                            id="form_email"
                            type="text"
                            name="user"
                            className="form-control border-bottoma-0"
                            placeholder=""
                            data_error="Valid User Name is required."
                          />
                          <div className="form-control border-top-0 pos-relative">
                            <div className="pos-abs">
                              <input type="file" name="myFile" multiple />
                              <i
                                className="fa fa-paperclip"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary mt-3  width-100"
                          type="button"
                          // data-toggle={this.state.modal ? 'modal' : ''}
                          // data-target={t}
                          onClick={this.openModal}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {/* <!-- //ask Question section --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
AskQuestion.propTypes = {
  openSuccessModal: PropTypes.func,
  closeSuccessModal: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
});

export default connect(
  null,
  mapDispatchToProps
)(AskQuestion);

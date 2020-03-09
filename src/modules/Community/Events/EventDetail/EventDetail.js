import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Image from '../../../../components/Image/Image';
import * as actions from '../../../../actions';

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openEventShareModal = e => {
    e.preventDefault();
    const { onOpenModal, closeModal } = this.props;
    onOpenModal({
      title: 'Share Event',
      body: [
        <div>
          <p>
            Copy this URL to share the event. Anybody will be able to view the
            event.
          </p>
          <div className="pos-relative">
            <button
              className="btn btn-primary request_demo_send  pos-absolutea"
              type="button"
            >
              Copy
            </button>
            <input
              id="form_email-a"
              type="email"
              name="user"
              className="form-control pl-3"
              value="https://app.zeplin.io/project/5b34cbbf"
              data-error="Valid User Name is required."
            />
          </div>
          <p className="mt-3"> Or share this event on:</p>
          <div className="mx-auto" id="blog">
            <i className="fa fa-phone" aria-hidden="true" />
            <i className="fa fa-linkedin" aria-hidden="true" />
            <i className="fa fa-facebook" aria-hidden="true" />
            <i className="fa fa-twitter" aria-hidden="true" />
          </div>
        </div>,
      ],
      buttonName: 'Done',
      buttonClick: this.openSuccessModal,
      cancelButton: closeModal,
    });
  };

  openSuccessModal = () => {
    const { openSuccessModal, closeSuccessModal, closeModal } = this.props;
    openSuccessModal({
      title: 'Success',
      message: 'Shared Successfully',
      modalStatus: 2,
      closeModal: closeSuccessModal,
      redirectUrl: '',
      showIcon: true,
    });
    closeModal();
  };

  render() {
    return (
      <section className="m-101 mt-0" id="blog">
        <div className="container">
          <div className="row ">
            <div
              className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aos-item "
              data-aos="fade-top"
            >
              <div className="row  ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="ipad-mar">
                    <Image
                      src={require('../../../../assets/img/img-aa1.jpg')}
                      width="100%"
                    />
                    <div className="padding-17">
                      <div className="clearfix mb-2">
                        <div className="float-left sub-title">
                          Aladin -Revolution in Blockchain
                        </div>
                        <NavLink onClick={this.openEventShareModal} to="">
                          <Image
                            src={require('../../../../assets/img/img-share.png')}
                            className="float-right  mt-1"
                          />
                        </NavLink>
                      </div>
                      <p className="mt-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus luctus efficitur dolor, at venenatis tellus
                        dignissim et. Donec placerat tempor augue, eu semper
                        metus ullamcorper auctor. Maecenas varius, urna non
                        luctus sodales, nisl ipsum rhoncus eros, id posuere
                        libero mauris consequat velit. Phasellus gravida ut
                        neque quis accumsan. Donec congue luctus enim, in
                        volutpat diam luctus at. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Nunc nec luctus metus. Nunc
                        nec sem hendrerit leo convallis congue. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit.
                        Pellentesque fermentum lacus risus, varius ullamcorper
                        ipsum bibendum eu. Integer maximus, sapien eget sodales
                        vestibulum, nibh lectus eleifend est, non egestas augue
                        neque ut lacus. In sit amet fringilla elit. Vivamus
                        ipsum lectus, rutrum ac dui vitae, rutrum imperdiet est.
                        Duis ac nisl auctor, sagittis risus a, consequat est.
                        Phasellus porttitor orci condimentum libero tempus, vel
                        luctus tortor vehicula. Maecenas faucibus tempus quam,
                        ut pellentesque magna fringilla a. Proin ac nibh rutrum,
                        congue mauris ac, egestas nisl. Phasellus tempus a erat
                        a fermentum. In vestibulum vitae urna quis mattis. Nulla
                        suscipit neque vitae elementum pellentesque. In sodales
                        ornare leo vel auctor. Cras id consequat libero.
                        Praesent ut turpis nisl. Mauris ultricies malesuada
                        gravida. Quisque hendrerit, sem viverra dignissim
                        placerat, tortor nisi condimentum elit, non volutpat
                        elit lorem nec ligula. Fusce porta sapien magna, at
                        feugiat ipsum tristique ut. Maecenas eleifend, nulla
                        eget consequat scelerisque, turpis diam eleifend mi, at
                        scelerisque tortor massa at urna. Aliquam pretium, ex
                        vitae sagittis fermentum, sem purus efficitur eros, at
                        venenatis nisl urna at leo. Duis eu diam porta, congue
                        tortor ut, auctor massa. Ut non suscipit lorem, eget
                        volutpat nunc. Proin pharetra tempus est, sed dictum
                        tortor vestibulum nec. Donec vel nunc augue. Duis non
                        dapibus est. Donec ornare libero nec vehicula mattis.
                        Etiam porttitor, nisi a aliquet vehicula, justo sem
                        aliquet arcu, sit amet euismod felis nulla a eros. Sed
                        sit amet leo nec leo imperdiet vestibulum.
                      </p>
                      <div className="row  ">
                        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                          <p className="color-black">
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            />
                            664 Dennison Street Modesto, CA 95354
                          </p>
                          <p className="color-black">
                            <i
                              className="fa fa-calendar ml-0 mr-2"
                              aria-hidden="true"
                            />
                            9:00 PM IST - 9th Jan 2020
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <div className="clearfix">
                            <div className="float-left mt-1">
                              Posted 02 hrs ago
                            </div>
                            <div className="float-right">
                              <i className="fa fa-phone" aria-hidden="true" />
                              <i
                                className="fa fa-linkedin"
                                aria-hidden="true"
                              />
                              <i
                                className="fa fa-facebook"
                                aria-hidden="true"
                              />
                              <i className="fa fa-twitter" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

EventDetail.propTypes = {
  onOpenModal: PropTypes.func,
  closeModal: PropTypes.func,
  openSuccessModal: PropTypes.func,
  closeSuccessModal: PropTypes.func,
};
const mapDispatchToProps = dispatch => ({
  onOpenModal: payload => dispatch(actions.openSignInModal(payload)),

  closeModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
});

export default connect(
  null,
  mapDispatchToProps
)(EventDetail);

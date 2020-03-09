import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventCard from '../../../components/Cards/EventCard/EventCard';
import * as actions from '../../../actions';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          imgURL: 'img-a.jpg',
          title: 'Aladin -Revolution in  Blockchain',
          location: '664 Dennison Street Modesto, CA 95354',
          date: '9:00 PM IST - 9th Jan 2020',
          id: 1,
        },
        {
          imgURL: 'img-a.jpg',
          title: 'Aladin -Revolution in  Blockchain',
          location: '664 Dennison Street Modesto, CA 95354',
          date: '9:00 PM IST - 9th Jan 2020',
          id: 2,
        },
        {
          imgURL: 'img-a.jpg',
          title: 'Aladin -Revolution in  Blockchain',
          location: '664 Dennison Street Modesto, CA 95354',
          date: '9:00 PM IST - 9th Jan 2020',
          id: 3,
        },
        {
          imgURL: 'img-a.jpg',
          title: 'Aladin -Revolution in  Blockchain',
          location: '664 Dennison Street Modesto, CA 95354',
          date: '9:00 PM IST - 9th Jan 2020',
          id: 4,
        },
      ],
      showEventShareModal: false,
    };
  }

  openEventModal = e => {
    e.preventDefault();
    const { onOpenModal, closeSignInModal } = this.props;
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
      cancelButton: closeSignInModal,
    });
  };

  openSuccessModal = () => {
    const {
      closeSuccessModal,
      openSuccessModal,
      closeSignInModal,
    } = this.props;
    openSuccessModal({
      title: 'Success',
      message: 'Shared Successfully',
      modalStatus: 2,
      closeModal: closeSuccessModal,
      redirectUrl: '',
      showIcon: true,
    });
    closeSignInModal();
  };

  render() {
    const { events } = this.state;
    return (
      <div>
        <section className="m-101 " id="blog">
          <div className="container">
            <div className="row " id="blog-a">
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aos-item "
                data-aos="fade-top"
              >
                <h1 className="text-center">Aladin Upcoming Events</h1>
                <div className="bor-upper mx-auto ipad-mara" />
                <div className="row ">
                  {events.map(event => {
                    if (event.id === 1 || event.id === 2 || event.id === 3) {
                      return (
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                          <NavLink to="/event-detail">
                            <EventCard
                              imgURL={event.imgURL}
                              title={event.title}
                              location={event.location}
                              date={event.date}
                              margin=""
                              showModal={this.openEventModal}
                              // closeModal={this.closeEventModal}
                              key={event.id}
                            />
                          </NavLink>
                        </div>
                      );
                    }
                    return (
                      <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-4">
                        <NavLink to="/event-detail">
                          <EventCard
                            imgURL={event.imgURL}
                            title={event.title}
                            location={event.location}
                            date={event.date}
                            margin="mt-4"
                            showModal={this.openEventModal}
                            closeModal={this.closeEventModal}
                            key={event.id}
                          />
                        </NavLink>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

// Props types for the component
Events.propTypes = {
  closeSuccessModal: PropTypes.func,
  onOpenModal: PropTypes.func,
  closeSignInModal: PropTypes.func,
  openSuccessModal: PropTypes.func,
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
)(Events);

import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../Image/Image';

const EventCard = props => {
  const {
    imgURL,
    title,
    location,
    date,
    margin,
    showModal,
    closeModal,
  } = props;
  return (
    <div className="border-a ipad-mar">
      <Image src={require(`../../../assets/img/${imgURL}`)} className="imga" />
      <div className="padding-17">
        <div className="clearfix mb-2">
          <div className="float-left sub-title">{title}</div>
          <a
            // href="#share-event"
            // data-toggle="modal"
            onClick={showModal}
          >
            <Image
              src={require('../../../assets/img/img-share.png')}
              className="float-right  mt-1"
              // onClick={e => e.stopPropagation()}
              // onClick={showModal}
            />
          </a>
        </div>

        <p className="color-black">
          <i className="fa fa-map-marker" aria-hidden="true" /> {location}
        </p>
        <p className="color-black">
          <i className="fa fa-calendar ml-0 mr-2" aria-hidden="true" />
          {date}
        </p>
        <div className="clearfix">
          <div className="float-left">Posted 02 hrs ago</div>
          <div className="float-right">
            <i className="fa fa-phone" aria-hidden="true" />
            <i className="fa fa-linkedin" aria-hidden="true" />
            <i className="fa fa-facebook" aria-hidden="true" />
            <i className="fa fa-twitter" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imgURL: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  date: PropTypes.string,
  margin: PropTypes.string,
  showModal: PropTypes.func,
  closeModal: PropTypes.func,
};

export default EventCard;

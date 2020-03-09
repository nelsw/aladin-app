import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from '../Image/Image';
import VideoModal from '../Modals/VideoModal/VideoModal';

function IntroBar(props) {
  const { children, videoLink } = props;
  const [showVideo, setVideoModal] = useState(false);
  const [closeVideo, setCloseModal] = useState(false);

  const openVideoModal = () => {
    setVideoModal(true);
    setCloseModal(true);
  };
  const closeVideoModal = () => {
    setVideoModal(false);
    // setCloseModal(false);
  };
  return (
    <section className="bg-img img-bg-a1 aos" data-aos="fade-down">
      {
        showVideo ?
        <VideoModal
          close={closeVideoModal}
          show={showVideo}
          videoLink={videoLink}
          closeModal={closeVideo}
        /> : null
      }

      <div className="container-fluid">
        <div className="pt-4">
          <div className="row flex-column-reverse-mob">
            <div className="col-lg-6 col-sm-12 col-xs-12 d-flex align-items-center">
              <div className="pr-4 pl-4 margin-left">{children}</div>
            </div>
            <div
              className="col-lg-6 col-sm-12 col-xs-12 videomodal"
              id="one"
              onClick={openVideoModal}
            >
              <Image
                src={require('../../assets/img/com-mobile-img.png')}
                className="img-fluid img-t-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

IntroBar.propTypes = {
  children: PropTypes.string,
};

export default IntroBar;

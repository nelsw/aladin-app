import React from 'react';
import PropTypes from 'prop-types';

function VideoModal(props) {
  const { close, show, closeModal, videoLink } = props;
  return (
    <div
      id="modal-container"
      className={closeModal ? (show ? 'one' : 'one out') : ''}
      onClick={close}
    >
      <div className="modal-background">
        <div className="modal" role="dialog">
          <div className="modal-dialog modal-dialog-centered  modal-lg">
            {/* Modal content */}
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-body">
                {/* <video
                  style={{ height: '370', width: '100%' }}
                  controls
                  className="with-auto"
                >
                  <source src="https://www.youtube.com/watch?v=PqiPH76dZlQ" type="video/mp4" />
                </video> */}
                <iframe width="560" height="315" src={videoLink} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

VideoModal.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
  closeModal: PropTypes.bool,
};

export default VideoModal;

import React from 'react';
import PropTypes from 'prop-types';

function Feature(props) {
  const { heading, description } = props;
  return (
    <div className="pos-relative">
      <div className="dapp_store-icon" />
      <div className=" margin-80">
        <h1 className="pad-40">{heading}</h1>
        <div className="bor-upper mb-2" />
        <div className="row">
          <div className="col-lg-12">
            <p className="margin-left-124">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

Feature.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default Feature;

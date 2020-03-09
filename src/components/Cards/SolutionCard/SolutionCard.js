import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../Image/Image';

function SolutionCard(props) {
  const { src, children } = props;
  return (
    <div className="card-a pad-50-a">
      <div className="d-flex align-items-center height-421 ">
        <div>
          <Image src={require(`../../../assets/img/${src}`)} />
          {children}
        </div>
      </div>
    </div>
  );
}

SolutionCard.propTypes = {
  src: PropTypes.string,
  children: PropTypes.string,
};

export default SolutionCard;

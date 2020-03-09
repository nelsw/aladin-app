import React from 'react';
import PropTypes from 'prop-types';

function ForumTopic(props) {
  const { subTitle, capacity } = props;
  return (
    <tr>
      <td>
        <div className="row">
          <div className="col-12 col-lg-6 col-md-12 col-sm-12 ">
            <p className="sub-title">
              <a href="forum-3.html">{subTitle}</a>
            </p>
            <p>
              <span className="square light-green" />
              {capacity}
            </p>
          </div>
          <div className="col-12 col-lg-6 col-md-12 col-sm-12  text-right font-mar-left">
            <span className="line-22 round grey">A</span>
            <span className="round line-22 extra-light-green">B</span>
            <span className="round line-22 merun">C</span>
            <span className="round line-22 light-green">D</span>
            <span className="round line-22 vibrant-green">E</span>
          </div>
        </div>
      </td>
      <td>1</td>
      <td>93</td>
      <td>8th</td>
    </tr>
  );
}
ForumTopic.propTypes = {
  subTitle: PropTypes.string,
  capacity: PropTypes.string,
};
export default ForumTopic;

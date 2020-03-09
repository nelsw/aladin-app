import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import StarRatings from 'react-star-ratings';
import Image from '../../Image/Image';
import { BACK_URL } from '../../../constants/constants';

function DappCard(props) {
  const { id, src, title, description, rating, key, url, dappcategory, from, developer, time } = props;

  return (
    <div className="col-md-3 col-lg-3 col-sm-6 col-6">

      <div className="dapp-box ipad-mar ">
        <div className="pos-relative" style={{ marginTop: "25px" }}>
          <div className="card-c show-hidea">&nbsp;</div>
          <div className="custme-height">
            {/* {url} */}
            <a href={url.includes('http') ? url : `https://${url}`} target='_blank' style={{ textDecoration: 'none' }}>
              {from == "myDapps" ?
                <div>

                  <span className="notify-badge">{dappcategory}</span>
                </div>
                : null}
              <Image
                src={`${BACK_URL}${src}`}
                // src={require(`../../../assets/img/img${id}.jpg`)}
                className="imga pos-relative-a width-100 d-block mx-auto img-fluid"
              />
            </a>
          </div>
        </div>
        <div className="padding-17">
          {from == "myDapps" ? (
            <NavLink to={`/edit-dapp/${id}`}>
              <i
                className="fa fa-pencil ml-2 color-red"
                aria-hidden="true"
              />
            </NavLink>
          ) : null
          }
          <a href={url.includes('http') ? url : `https://${url}`} target='_blank' style={{ textDecoration: 'none' }}>
            <div className="sub-title mb-0">{title}</div>
          </a>
          <span style={{ fontSize: '13px' }}> {developer != undefined ? `Developed by ${developer.split('.')[0]}` : null} </span>
          <p className="mt-1" style={{ marginBottom: "5px" }}>{description}</p>
          <div className="">
        
          </div>

        </div>
      </div>
    </div>
  );
}

DappCard.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
};

export default withRouter(DappCard);

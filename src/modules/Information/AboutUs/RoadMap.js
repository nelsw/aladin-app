import React, { Component } from 'react';
import Image from '../../../components/Image/Image';

class roadMap extends Component {
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  render () {
    return (
      <section className="m-50 aos-item" data-aos="fade-down">
        <div className="container ">
          <div className="row flex-column-reverse-mob padingbt-40 ">
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <div className="pr-4 pl-4  text-center ">
                <h1 className="pada-40">Aladin Road Map</h1>
    
                <div className="bor-upper mx-auto" />
    
                <div className="text-center">
                  <Image
                    src={require('../../../assets/img/roadmap.jpg')}
                    className="img-fluid "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
} 

export default roadMap;

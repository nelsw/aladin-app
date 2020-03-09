import React, { Component } from 'react';

class termCondition extends Component {
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  render () {
    return (
      <section className="m-101 " id="about">
        <div className="container">
          <div className="row ">
            <div
              className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex aos-item align-items-center"
              data-aos="fade-down"
            >
              <div>
                <h1>TERMS AND CONDITIONS</h1>
                <div className="bor-upper" />
                <p>
                  <b>Introduction</b>
                </p>
    
                <p>
                  These aladinnetwork.org Standard Terms and Conditions written on
                  this webpage shall manage your use of our aladinnetwork.org,
                  Aladin network accessible at aladinnetwork.org
                </p>
                <p>
                  These Terms will be applied fully and affect to your use of this
                  aladinnetwork.org. By using this aladinnetwork.org, you agreed to
                  accept all terms and conditions written in here. You must not use
                  this aladinnetwork.org if you disagree with any of these
                  aladinnetwork.org Standard Terms and Conditions.
                </p>
                <p>
                  Minors or people below 18 years old are not allowed to use this
                  aladinnetwork.org.
                </p>
    
                <p>
                  <b>Intellectual Property Rights</b>
                </p>
                <p>
                  Other than the content you own, under these Terms, Aladin and/or
                  its licensors own all the intellectual property rights and
                  materials contained in this aladinnetwork.org.
                </p>
                <p>
                  You are granted limited license only for purposes of viewing the
                  material contained on this aladinnetwork.org.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
} 

export default termCondition;

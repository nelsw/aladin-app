import React, { Component } from 'react';

class AboutUs extends Component {

  componentDidMount () {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <div>
        {/* <!-- about us section --> */}
        <section className="m-101 pt-3" id="about">
          <div className="container">
            <div className="row ">
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex aos-item align-items-center"
                data-aos="fade-down"
              >
                <div>
                  <h1>ABOUT US</h1>
                  <div className="bor-upper" />
                  
                  <h2 className="pad-40">Mission</h2>
                  <p>
                    The Aladin Corporation is on a mission to create a better internet. 
                    The Network is here to make the internet work for the people, 
                    using blockchain technology designed to benefit everyone.
                  </p>

                  <h2 className="pad-40">Vision</h2>

                  <p>
                    Aladin is working to build a new decentralized standard for the internet. 
                    For too long, large corporations have taken control of how we use the internet, 
                    and how much we rely on their platforms and technology. Blockchain has emerged as 
                    a challenger to this old standard, but we believe it has not fully delivered yet. 
                    That is why we built Aladin, we wanted to solve the core limitations that were 
                    holding back blockchain from truly setting a new standard.
                  </p>

                  <p>
                    Usability, Simplicity, Speed, Cost, Universality- 
                    These are some of the problems we have solved with Aladin.
                  </p>

                  <h2 className="pad-40">What makes us different</h2>

                  <p>
                    Aladin is built around the user. Every aspect of the platform is based 
                    around simplifying the blockchain experience so that it is as smooth and 
                    easy as the internet. Blockchain can only displace the internet when it 
                    becomes as easy to use and as useful as the current standards. This is the 
                    goal with Aladin.
                  </p>

                  <p>
                    However, we also ensure the autonomy of the user by limiting the ability 
                    for large ALA holders to dominate network direction, or for the nodes to 
                    dominate the network. Many other networks struggle with either the nodes or 
                    the large coin holders having the ability to dominate what decisions the network 
                    makes.
                  </p>

                  <p>
                    Aladin has two key protections: We rely on the user to determine key 
                    network decisions, not the node and users are limited to a maximum amount 
                    of voting power- regardless of how many coins they hold.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
}

export default AboutUs;

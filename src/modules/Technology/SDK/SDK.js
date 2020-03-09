import React, { Component } from 'react';
import Button from '../../../components/InputControls/Button/Button';
import Image from '../../../components/Image/Image';
import { NavLink } from 'react-router-dom';

class SDK extends Component {
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <section className="bg-img img-bg-a1 aos-item" data-aos="fade-down">
          <div className="container-fluid mt-4 marging-bottom-0">
            <div className="row flex-column-reverse-mob ">
              <div className="col-lg-5 col-sm-12 col-xs-12 d-flex align-items-center">
                <div className="pr-4 pl-4 margin-left">
                  <h1 className="font-50">
                    <span className="color-red">Easily</span> build blockchain
                    apps that scale
                  </h1>
                  <p className="sub-title pb-3">
                    Get started with our Zero-to-Dapp tutorial, view our
                    documentation, or visit our GitHub.
                  </p>
                  <div className="btn-grp">
                    <a href="https://github.com/dev-aladin/aladin-android" target="_blank">                    
                      <Button type="button" className="btn btn-primary  mr-3">
                        Android
                      </Button>
                    </a>
                    <a href="https://github.com/dev-aladin/ios-sdk" target="_blank">
                      <Button type="button" className="btn btn-primary ml-3">
                        IOS
                      </Button>
                    </a>
                    <a href="https://github.com/dev-aladin/aladin-app-generator" target="_blank">
                      <Button type="button" className="btn btn-primary  ml-3">
                        Web
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-sm-12 col-xs-12 text-right" id="one">
                <div className="bg-img-skd">
                  <Image
                    src={require('../../../assets/img/img-banner.png')}
                    className="img-fluid  computer-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* //  <!-- about us section --> */}
        <section className="m-101 " id="about">
          <div className="container">
            <div className="row ">
              <div
                className="col-lg-5 col-md-5 col-sm-12 col-xs-12 d-flex aos-item align-items-center"
                data-aos="fade-right"
              >
                <div>
                  <h4 className="pt-0">
                    Aladin is a decentralized computing network and app
                    ecosystem that puts users in control of their identity and
                    data.
                  </h4>
                </div>
              </div>
              <div
                className="col-lg-7 col-md-7 col-sm-12 col-xs-12 aos-item"
                data-aos="fade-left"
              >
                <p>
                  <b>100 Teams</b>
                  <br />
                  have built production apps on our infrastructure the past five
                  months.
                </p>
                <p className="mt-2">
                  <b>3000 Developers</b>
                  <br />
                  have attended our global hackathons and meetups in the past
                  two months.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- app built section --> */}
        <section className=" qr-back-color page-section" id="Aladin">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aos-item mx-auto"
                  data-aos="fade-down"
                >
                  <div className="pos-relative text-center">
                    <h1 className=" social-head-font">Apps built on Aladin</h1>
                    <div className="bor-upper mb-3 mx-auto" />
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c built-pad-30 text-left">
                          <div>
                            <Image
                              src={require('../../../assets/img/img-dummy1.jpg')}
                              className="mr-2 mt-1"
                            />
                          </div>
                          <p>
                            <b>Truly Decentralized</b>
                            <br />
                            Safely store and access your photos
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c built-pad-30 text-left">
                          <div>
                            <Image
                              src={require('../../../assets/img/img-dummy1.jpg')}
                              className="mr-2 mt-1"
                            />
                          </div>
                          <p>
                            <b>Truly Decentralized</b>
                            <br />
                            Safely store and access your photos
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c built-pad-30 text-left">
                          <div>
                            <Image
                              src={require('../../../assets/img/img-dummy1.jpg')}
                              className="mr-2 mt-1"
                            />
                          </div>
                          <p>
                            <b>Truly Decentralized</b>
                            <br />
                            Safely store and access your photos
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row marging-top mt-3">
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c built-pad-30 text-left">
                          <div>
                            <Image
                              src={require('../../../assets/img/img-dummy1.jpg')}
                              className="mr-2 mt-1"
                            />
                          </div>
                          <p>
                            <b>Truly Decentralized</b>
                            <br />
                            Safely store and access your photos
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c built-pad-30 text-left">
                          <div>
                            <Image
                              src={require('../../../assets/img/img-dummy1.jpg')}
                              className="mr-2 mt-1"
                            />
                          </div>
                          <p>
                            <b>Truly Decentralized</b>
                            <br />
                            Safely store and access your photos
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c built-pad-30 text-left">
                          <div>
                            <Image
                              src={require('../../../assets/img/img-dummy1.jpg')}
                              className="mr-2 mt-1"
                            />
                          </div>
                          <p>
                            <b>Truly Decentralized</b>
                            <br />
                            Safely store and access your photos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Resources section --> */}
        <section className="page-section" id="Resources">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <div className="row  aos-item" data-aos="fade-down">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mx-auto ">
                  <div className="pad-bot-a">
                    <h1>Resources</h1>
                    <div className="bor-upper mb-2" />
                    <h4>
                      Everything you need, from authentication to data storage,
                      ready and in production.
                    </h4>
                  </div>
                </div>
              </div>
              <div className="row  text-center   ">
                <div
                  className="col-lg-6  col-md-6 col-sm-12 aos-item col-xs-12 "
                  data-aos="fade-left"
                >
                  <p className="text-left">
                    <b>Learn about Aladin</b>
                  </p>
                  <div className="text-left border-resource">
                    <p>
                      <a href="pdf/whitepaper.pdf" target="_blank">
                        Whitepapers
                      </a>
                    </p>
                    <p>
                      <a href="#">Ecosystem news</a>
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-6  col-md-6 col-sm-12 aos-item col-xs-12 "
                  data-aos="fade-right"
                >
                  <p className="text-left">
                    <b>Build your Dapps</b>
                  </p>
                  <div className="text-left border-resource">
                    <p>
                    <NavLink to="/document">Documentation</NavLink>
                    </p>
                    <p>
                      <a href="https://forum.aladinnetwork.org/" target="_blank">Forum</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- our design section --> */}
        <section className="page-section qr-back-color">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <div className="row  text-center ">
                <div
                  className="col-lg-6 d-flex align-items-center  col-md-6 col-sm-12 aos-item col-xs-12 text-left "
                  data-aos="fade-left"
                >
                  <h4>
                    We abstract the blockchain complexity so you can focus on
                    building great apps.
                  </h4>
                </div>
                <div
                  className="col-lg-6  col-md-6 col-sm-12 aos-item col-xs-12 "
                  data-aos="fade-right"
                >
                  <p className="text-left">
                    <b>Our design principles</b>
                  </p>
                  <div className="text-left border-resource">
                    <table border="0">
                      <tbody>
                        <tr>
                          <td>
                            <i
                              className="fa fa-check mr-1"
                              aria-hidden="true"
                            />
                          </td>
                          <td>Keep auth and smart contracts on-chain</td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0">
                      <tbody>
                        <tr>
                          <td>
                            <i
                              className="fa fa-check mr-1"
                              aria-hidden="true"
                            />
                          </td>
                          <td>Keep Application secure using our Network </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0">
                      <tbody>
                        <tr>
                          <td>
                            <i
                              className="fa fa-check mr-1"
                              aria-hidden="true"
                            />
                          </td>
                          <td>Create everything with our Libraries </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- developertool section --> */}
        <section className="page-section">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <div className="row  flex-column-reverse-mob text-center  ">
                <div
                  className="col-lg-6  d-flex align-items-center col-md-6 col-sm-12 aos-item col-xs-12 text-left "
                  data-aos="fade-left"
                >
                  <div>
                    <h1 className=" social-head-font">Developer tools</h1>
                    <div className="bor-upper mb-3 " />
                    <p>
                      Comprehensive programming libraries are available to
                      create a DApp on Aladin Blockchain. Our libraries are
                      designed to help developers create Dapps swiftly.
                    </p>
                  </div>
                </div>
                <div
                  className="col-lg-6  col-md-6 col-sm-12 aos-item col-xs-12 "
                  data-aos="fade-right"
                >
                  <Image
                    src={require('../../../assets/img/img-source-a.jpg')}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Oracle section --> */}
        <section className="page-section qr-back-color" id="oracle">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <div className="row  text-center  ">
                <div
                  className="col-lg-5    col-md-6 col-sm-12 aos-item col-xs-12 "
                  data-aos="fade-left"
                >
                  <div className=" card-c ">
                    <Image
                      src={require('../../../assets/img/img-source-b.jpg')}
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div
                  className="col-lg-7  align-items-center d-flex col-md-6 col-sm-12 aos-item col-xs-12 text-left "
                  data-aos="fade-right"
                >
                  <div className="row d-flex justify-content-end">
                    <div className="col-lg-10">
                      <div>
                        <h1 className=" social-head-font pad-20">Oracle</h1>
                        <div className="bor-upper mb-3 " />
                        <p>
                          Aladin is the first blockchain to offer a built in
                          oracle, deployed across the blockchain, that any
                          developer can access to draw data from external data
                          sources. The Aladin oracle sets Aladin apart from
                          other blockchain, and makes it the easiest, simplest,
                          and fastest blockchain for anyone to deploy a truly
                          useful application on.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- developertool section --> */}
        <section className="page-section">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <div className="row  flex-column-reverse-mob text-center   ">
                <div
                  className="col-lg-6  d-flex align-items-center col-md-6 col-sm-12 aos-item col-xs-12 text-left "
                  data-aos="fade-left"
                >
                  <div className="row d-flex justify-content-start">
                    <div className="col-lg-10">
                      <div>
                        <h1 className=" social-head-font pad-20">
                          Smart Contract
                        </h1>
                        <div className="bor-upper mb-3 " />
                        <p>
                          Aladin network enables the creation of smart
                          contracts, whose execution and resource consumption is
                          handled just like a typical application running on an
                          operating system. The smart contract will run on the
                          Aladin nodes, whose persistent data is stored on the
                          node’s RAM and events of actions are stored and synced
                          on the blockchain. Smart contracts will be written in
                          C++.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-6  col-md-6 col-sm-12 aos-item col-xs-12 "
                  data-aos="fade-right"
                >
                  <Image
                    src={require('../../../assets/img/img-source-c.jpg')}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- developertool section --> */}
        <section className="page-section">
          <div className="bg-img1 p-101 qr-back-color d-flex align-items-center">
            <div className="container text-center">
              <h1 className=" social-head-font pad-20">
                Aladin is better for app builders
              </h1>
              <div className="bor-upper mb-3 mx-auto " />
              <div className="row mt-4">
                <div className="col-lg-4 col-md-4  col-sm-12 col-12">
                  <div className=" d-flex align-items-center hover-class ">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      width="40"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 40 40"
                      style={{ enableBackground: 'new 0 0 40 40' }}
                      xmlSpace="preserve"
                    >
                      {/* <style type="text/css">
                                .st0{
                                fill-rule:evenodd;
                                clip-rule:evenodd;
                                fill:#333333;
                                }
                                .st1{
                                fill:#333333;
                                }
                                .st2{
                                clip-path:url(#SVGID_2_);
                                fill-rule:evenodd;
                                clip-rule:evenodd;
                                fill:#FFFFFF;
                                }
                            </style> */}
                      <path
                        className="st1"
                        d="M16,27.4c1.3,1.3,2.5,2.4,3.7,3.6c1,1,1,1.9,0,2.9c-1.8,1.8-3.5,3.5-5.3,5.3c-1,1-1.9,1-2.9,0
                                                c-1.2-1.2-2.4-2.4-3.8-3.8c-0.3,0.4-0.4,0.8-0.7,1.1c-1.4,1.4-3.4,1.3-4.7,0c-1.3-1.3-1.3-3.3,0.1-4.7c4.3-4.3,8.6-8.6,12.8-12.8
                                                c0.9-0.9,1.7-1.8,2.6-2.6c0.5-0.4,0.5-0.7,0.3-1.3c-2.7-6.4,1-13.4,7.8-14.9C31.5-1,37.3,2.8,38.5,8.7c1.2,5.8-2.6,11.6-8.4,12.8
                                                c-2.2,0.4-4.4,0.2-6.5-0.6c-0.3-0.1-0.8-0.1-1,0.1C20.4,23,18.3,25.2,16,27.4z M27.9,6.7c-2.3,0-4.1,1.9-4.1,4.1
                                                c0,2.3,1.9,4.2,4.2,4.2c2.3,0,4.1-1.9,4.1-4.2C32,8.5,30.2,6.7,27.9,6.7z"
                      />
                    </svg>
                    <span className="ml-3 sub-title1 color-black">
                      Authentication
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4  col-sm-12 col-12">
                  <div className=" d-flex align-items-center hover-class">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      width="40"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 40 40"
                      style={{ enableBackground: 'new 0 0 40 40' }}
                      xmlSpace="preserve"
                    >
                      {/* <style type="text/css">
                                .st0{
                                fill-rule:evenodd;
                                clip-rule:evenodd;
                                fill:#333333;
                                }
                                .st1{
                                fill:#333333;
                                }
                                .st2{
                                clip-path:url(#SVGID_2_);
                                fill-rule:evenodd;
                                clip-rule:evenodd;
                                fill:#FFFFFF;
                                }
                            </style> */}
                      <g>
                        <g>
                          <g>
                            <path
                              className="st1"
                              d="M21.2,36.3c-0.8-0.4-1.7-0.3-2.3,0.4c-0.3,0.3-0.6,0.3-1,0.2c-0.3-0.1-0.6-0.1-0.9-0.1
                                                        c-1.6-0.2-3.1-0.7-4.6-1.3C10,34.4,8,32.9,6.3,30.9c-1.2-1.4-2.2-3-3-4.8c-0.9-2.1-1.3-4.2-1.3-6.4c0-1,0.1-1.9,0.2-2.9
                                                        c0.3-1.7,0.8-3.4,1.6-5c0.3-0.7,0.7-1.3,1.1-1.9c0.3-0.5,0.1-1.1-0.2-1.4C4.1,8.1,3.4,8.4,3.1,8.9C2.5,9.9,2,10.8,1.5,11.9
                                                        c-0.6,1.4-1,2.9-1.3,4.5c-0.1,0.3,0.1,0.7-0.2,1c0,0.1,0,0.1,0,0.2c0,0.1,0,0.3,0,0.4c0,1.1,0,2.2,0,3.3c0,0.1,0,0.3,0,0.4
                                                        c0,0.1,0,0.1,0,0.2c0.1,0,0.2,0.1,0.2,0.3c0.1,1.2,0.4,2.3,0.7,3.5c0.5,1.5,1.1,2.9,1.9,4.2c1.2,2,2.8,3.8,4.7,5.2
                                                        c1.3,1,2.8,1.9,4.3,2.5c2.1,0.8,4.2,1.4,6.4,1.5c0.2,0,0.4,0,0.5,0.2c0.3,0.4,0.7,0.6,1.1,0.9c0.3,0,0.7,0,1,0
                                                        c0-0.1,0.1-0.1,0.1-0.1c0.9-0.3,1.3-0.9,1.4-1.7C22.4,37.3,22,36.6,21.2,36.3z M39.7,16c-0.3-0.8-1.5-1.3-2.4-0.9
                                                        c-0.8,0.3-1.3,1-1.3,1.8c0,0.7,0.3,1.4,1,1.8c0.2,0.1,0.2,0.2,0.2,0.4c0,0.6,0,1.3-0.1,1.9c-0.1,0.9-0.2,1.7-0.4,2.6
                                                        c-0.4,1.7-1.1,3.3-2,4.9c-1.3,2.2-3.1,4.1-5.2,5.6c-1.1,0.8-2.3,1.4-3.6,1.9c-0.7,0.2-0.9,0.8-0.7,1.4c0.2,0.5,0.8,0.7,1.4,0.5
                                                        c0.4-0.1,0.7-0.3,1.1-0.4c1.5-0.7,2.9-1.5,4.2-2.6c1.2-1,2.3-2.1,3.2-3.3c1.1-1.4,2-2.9,2.6-4.5c0.8-2.1,1.3-4.2,1.4-6.4
                                                        c0-0.6,0-1.2,0-1.8c0-0.1,0-0.2,0.1-0.3c0.3-0.3,0.5-0.7,0.7-1c0,0,0-0.1,0-0.1c0-0.3,0-0.5,0-0.8c0,0,0-0.1,0-0.1
                                                        C39.9,16.3,39.8,16.2,39.7,16z M19.6,28.9c5.2,0,9.4-4.1,9.4-9.4c0-5.3-4.2-9.1-8.8-9.4c-5.9-0.4-10,4.2-10.1,9.1
                                                        C10.1,24.7,14.2,28.9,19.6,28.9z M13,32.5c2.1,1,4.3,1.6,6.7,1.5c0.7,0.1,1.6,0,2.4-0.2c1.7-0.3,3.2-0.9,4.7-1.7
                                                        c1.8-1.1,3.4-2.5,4.6-4.2c1.9-2.6,2.7-5.5,2.7-8.7c0-0.5-0.1-1.1-0.1-1.6c-0.2-1.5-0.6-2.9-1.2-4.2C31.7,11,30,9,27.8,7.6
                                                        c-0.2-0.1-0.2-0.2-0.2-0.4c-0.1-0.7-0.7-1.4-1.3-1.6c-1.4-0.4-2.6,0.7-2.6,2c0.1,0.9,1,2,2.3,1.8c0.2,0,0.5-0.3,0.9,0
                                                        c0.7,0.6,1.5,1.2,2.1,1.9c1.1,1.2,1.9,2.5,2.4,4c0.7,1.9,0.9,3.9,0.7,5.9c-0.1,1.2-0.5,2.3-0.9,3.4c-0.8,1.7-1.8,3.1-3.2,4.3
                                                        c-0.8,0.6-1.6,1.2-2.4,1.7c-1.4,0.7-2.9,1.2-4.6,1.4c-1.3,0.1-2.7,0-4-0.2c-1.2-0.3-2.3-0.7-3.4-1.2c-0.7-0.3-1.4,0.1-1.4,0.8
                                                        C12.1,31.9,12.5,32.2,13,32.5z M7.6,7.5c1,0,2-0.8,1.9-1.9c0-0.3,0.1-0.4,0.3-0.6c0.8-0.5,1.7-1,2.6-1.4c2.8-1.3,5.8-1.7,8.9-1.4
                                                        c1.3,0.1,2.5,0.4,3.7,0.8c1.7,0.5,3.3,1.3,4.7,2.3c1.8,1.2,3.2,2.7,4.5,4.5c0.6,0.8,1,1.7,1.5,2.6c0.3,0.6,0.9,0.8,1.5,0.5
                                                        c0.4-0.2,0.6-0.9,0.4-1.4c-0.4-0.7-0.7-1.5-1.2-2.1c-1.2-1.9-2.7-3.6-4.4-4.9C30.3,3,28.6,2,26.7,1.3C24.4,0.4,22,0,19.6,0
                                                        c-0.7,0-1.4,0-2,0.1c-1.3,0.1-2.5,0.4-3.8,0.8c-2,0.6-3.8,1.5-5.5,2.7C8.2,3.6,8.1,3.7,8,3.6C6.8,3.3,5.5,4.4,5.6,5.5
                                                        C5.5,6.6,6.5,7.5,7.6,7.5z M6.9,26.7C7.1,26.9,7.1,27,7,27.2c-0.4,1.2,0.4,2.6,1.8,2.5c1.1,0.1,1.9-0.7,2-1.9
                                                        c0.1-0.9-0.8-1.9-1.7-2c-0.2,0-0.3,0-0.4-0.2c-1.3-2.4-1.8-4.9-1.5-7.6c0.2-1.4,0.5-2.7,1.2-4c0.8-1.6,1.9-3,3.3-4.2
                                                        c2.3-1.9,5-2.8,7.9-2.8c0.6,0,1-0.4,1-0.9c0-0.7-0.4-1.1-1-1.1c-0.7,0-1.4,0.1-2.1,0.2c-1.4,0.2-2.7,0.5-3.9,1.1
                                                        c-2,0.9-3.7,2.2-5.1,3.8c-1.4,1.6-2.4,3.5-3,5.5c-0.4,1.3-0.5,2.6-0.5,3.9c0,0.8,0.1,1.6,0.2,2.4C5.6,23.7,6.1,25.2,6.9,26.7z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span className="ml-3 sub-title1 color-black">Oracle</span>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4  col-sm-12 col-12">
                  <div className=" d-flex align-items-center hover-class">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      width="40"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 40 40"
                      style={{ enableBackground: 'new 0 0 40 40' }}
                      xmlSpace="preserve"
                    >
                      {/* <style type="text/css">
                                .st0{
                                fill-rule:evenodd;
                                clip-rule:evenodd;
                                fill:#333333;
                                }
                                .st1{
                                fill:#333333;
                                }
                                .st2{
                                clip-path:url(#SVGID_2_);
                                fill-rule:evenodd;
                                clip-rule:evenodd;
                                fill:#FFFFFF;
                                }
                            </style> */}
                      <g>
                        <path
                          className="st1"
                          d="M17.4,40c-1.8-0.2-3.5-0.4-5.3-0.7c-2.2-0.4-4.3-1.1-6.1-2.5c-0.9-0.6-1.4-1.4-1.3-2.5C5,32.2,5,30,5.3,27.9
                                                    c0.4-3.3,2.4-5.3,5.4-6.4c1.3-0.4,2.7-0.8,4.1-1.1c0.4-0.1,0.9,0.1,1.2,0.3c2.2,1.7,5.8,1.7,8,0c0.2-0.2,0.6-0.4,0.8-0.3
                                                    c2,0.5,4,1,5.8,1.8c2.8,1.2,3.8,3.8,4.2,6.7c0.2,1.9,0.2,3.7,0.4,5.6c0.1,1-0.3,1.6-1,2.1c-1.7,1.3-3.6,2.1-5.6,2.5
                                                    c-1.7,0.4-3.4,0.5-5.2,0.8c-0.3,0-0.6,0.1-0.9,0.2C20.9,40,19.1,40,17.4,40z"
                        />
                        <path
                          className="st1"
                          d="M21.3,0c0.4,0.1,0.9,0.2,1.3,0.3c2.5,0.5,4.2,2,4.8,4.5c0.9,3.3,1,6.6-0.5,9.8c-1.4,3-3.6,4.9-7.1,4.9
                                                    c-3.2,0-5.3-1.8-6.7-4.5c-1.8-3.6-1.7-7.4-0.3-11.2c0.8-2.3,2.7-3.3,5.1-3.7c0.2,0,0.5-0.1,0.7-0.2C19.6,0,20.4,0,21.3,0z"
                        />
                      </g>
                    </svg>
                    <span className="ml-3 sub-title1 color-black">Users</span>
                  </div>
                </div>
              </div>
              <div className="row mt-4 mar-0">
                <div className="col-lg-4 col-md-4  col-sm-12 col-12">
                  <div className=" d-flex align-items-center hover-class">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      width="40"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 40 40"
                      style={{ enableBackground: 'new 0 0 40 40' }}
                      xmlSpace="preserve"
                    >
                      {/* <style type="text/css">
                .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#333333;}
                .st1{fill:#333333;}
                .st2{clip-path:url(#SVGID_2_);fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
                </style> */}
                      <g>
                        <g>
                          <path
                            className="st1"
                            d="M20,0c8.8,0,16.3,3.6,16.5,8c-0.3,4.4-7.7,8-16.5,8c-8.8,0-16.3-3.6-16.5-8C3.7,3.6,11.2,0,20,0z"
                          />
                          <path
                            className="st1"
                            d="M36.5,31.8C36.5,36.2,29,40,20,40S3.5,36.2,3.5,31.8v-3.9c2.8,3.4,9.1,5.7,16.5,5.7s13.7-2.3,16.5-5.7
                    L36.5,31.8L36.5,31.8z"
                          />
                          <path
                            className="st1"
                            d="M36.5,23.7c0,4.5-7.6,8.2-16.5,8.2S3.5,28.2,3.5,23.7v-4.1c2.8,3.4,9.1,5.7,16.5,5.7s13.7-2.3,16.5-5.7
                    L36.5,23.7L36.5,23.7z"
                          />
                          <path
                            className="st1"
                            d="M36.5,15.5c0,4.5-7.6,8.2-16.5,8.2S3.5,20,3.5,15.5v-3.6c2.8,3.4,9.1,5.7,16.5,5.7s13.7-2.3,16.5-5.7V15.5z"
                          />
                        </g>
                      </g>
                    </svg>
                    <span className="ml-3 sub-title1 color-black">
                      Data Storage
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4  col-sm-12 col-12">
                  <div className=" d-flex align-items-center hover-class">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      width="40"
                      height="40"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 40 40"
                      style={{ enableBackground: 'new 0 0 40 40' }}
                      xmlSpace="preserve"
                    >
                      {/* <style type="text/css">
                .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#333333;}
                .st1{fill:#333333;}
                .st2{clip-path:url(#SVGID_2_);fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
                </style> */}
                      <g>
                        <path
                          className="st1"
                          d="M1.9,36c0.9-1.8,1.7-3.5,2.5-5.2c0.3-0.8,0.1-1.4-0.6-2c-5.4-4.4-5.1-11.2,0.6-15.2c5-3.5,12.5-3.5,17.4,0
                    c5.9,4.2,5.9,11.5,0,15.6c-3.1,2.2-6.6,2.9-10.2,2.6c-0.8-0.1-1.3,0.1-1.8,0.8C7.7,35.4,4.9,36.1,1.9,36z"
                        />
                        <path
                          className="st1"
                          d="M27.5,24.1c2.3-6.6-2.1-13.5-11.6-14.7c1.1-1.1,1.9-2.1,2.8-2.8c4.9-3.7,13.1-3.4,17.8,0.6
                    c4.6,4,4.6,10.1-0.2,13.8c-1,0.8-1.2,1.5-0.8,2.6c0.6,1.5,1.3,3,2,4.5c-1.9,0.5-4.9-0.6-6.4-2.7c-0.8-1.1-1.5-1.7-2.7-1.3
                    C28.2,24.2,27.9,24.1,27.5,24.1z"
                        />
                      </g>
                    </svg>
                    <span className="ml-3 sub-title1 color-black">
                      Community
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SDK;

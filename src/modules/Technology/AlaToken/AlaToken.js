import React, { Component } from 'react';
import IntroBar from '../../../components/IntroBar/IntroBar';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class AlaToken extends Component {
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <IntroBar videoLink="">
          <h1 className="font-50">
            <span className="color-red">Aladin</span>
            <br />
          </h1>
          <p>
            Tokens, or cryptocurrencies, are the backbone of the blockchain revolution. 
            Tokens allow blockchain networks to be truly decentralized, which is the very 
            reason they are valuable and revolutionary. The ALA Token powers all aspects of 
            the Aladin Network. It has an important role which differs depending on whether 
            you are a User, Developer, or Node.
          </p>
          <div className="btn-grp">
            <NavLink to={localStorage.getItem('mnemonicCode') ? '/wallet' : '/signup'}>
            <button className="btn btn-primary buy-botton" type="button" >
              Buy
            </button>
            </NavLink>
          </div>
        </IntroBar>
        {/* <section className="bg-img img-bg-a1 aos-item" data-aos="fade-down">
          <div className="container-fluid  mt-4 pr-3 marging-bottom-0">
            <div className="row flex-column-reverse-mob">
              <div className="col-lg-6 col-sm-12 col-xs-12 d-flex align-items-center">
                <div className="pr-4 pl-4 margin-left">
                  
                </div>
              </div>
              <div
                className="col-lg-6 col-sm-12 col-xs-12  videomodal"
                id="one"
              >
                <Image
                  src={require('../../../assets/img/com-mobile-img.png')}
                  className="img-fluid img-t-10"
                />
              </div>
            </div>
          </div>
          {/* <!-- //header section image and text --> */}
        {/* </section>  */}
        {/* <!-- text section --> */}
        <section className="m-101 " id="about">
          <div className="container">
            <div className="row ">
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex aos-item align-items-center"
                data-aos="fade-left"
              >
                <div>
                  <h3>
                    Aladin is a complete blockchain ecosystem. Aladin provides
                    leverage to the Dapp Developer to establish their DApps from
                    scratch, Using the SDK provided to them they would be able
                    to make world-class DApps that can be used in varied use
                    cases. The Aladin network allows them to deploy their DApp
                    on the Aladin blockchain which uses graphene framework. It
                    allows the users to make use of the decentralized storage
                    for their Dapps which lets them enters into a whole new
                    world of decentralization.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Resources section --> */}
        <section className=" qr-back-color page-section" id="token-Resources">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aos-item mx-auto"
                  data-aos="fade-down"
                >
                  <div className="pos-relative text-left">
                    <h1 className=" social-head-font">Resources</h1>
                    <div className="bor-upper mb-3" />

                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c">
                          <p>
                            <a href="pdf/Aladin-Tech-doc.pdf" target="_blank">
                              Tech-Document
                            </a>
                          </p>

                          <p className="border-top">
                            <a href="pdf/whitepaper.pdf" target="_blank">
                              Whitepaper
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c">
                          <p>
                            <a href="pdf/Aladin-Pitchdeck.pdf" target="_blank">
                              Pitchdeck
                            </a>
                          </p>

                          <p className="border-top"><a href="pdf/User-Guide.pdf" target="_blank">User guide</a></p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="card-c">
                          <p>
                            <a href="https://forum.aladinnetwork.org/" target="_blank">
                              Forum
                            </a>
                          </p>

                          <p className="border-top"><a href="pdf/Command-Manual.pdf" target="_blank">Command manual</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- About Us section --> */}
        <section className="page-section" id="Aladin-One">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <div className="row  aos-item" data-aos="fade-down">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mx-auto ">
                  <div>
                    <h1 className="pad-40">The ALA User</h1>
                    <div className="bor-upper mb-3" />
                    <p>
                      As a user of the Aladin Network you can use the ALA Token to earn revenue! 
                      As a holder of ALA coins you can earn part of the block reward (new token creation) 
                      just by using your coins to vote!
                    </p>
                    <p>
                      We rely on users to determine how to manage the Aladin Network. 
                      The network is in your hands, not ours! 
                      When users cast votes they become eligible to earn a portion of all 
                      the ALA which are being created, based on the number of ALA you have and how many votes you cast!
                    </p>
                  </div>
                  <div className="mt-5">
                    <h1 className="pad-40">ALA and the Developer</h1>
                    <div className="bor-upper mb-3" />
                    <p>
                      As an application developer you will be receiving a reward of ALA tokens 
                      for creating an application on the Aladin Network. Applications can be 
                      rewarded either in terms of total number of users or in total monetary volume.
                    </p>
                    <p>
                      Every month you will receive a reward of ALA coins based on how well 
                      your application performed against the rest of the network.
                    </p>
                  </div>
                  <div className="mt-5">
                    <h1 className="pad-40">Nodes and ALA Rewards</h1>
                    <div className="bor-upper mb-3" />
                    <p>
                      As a node you will receive a constant distribution of ALA coins for the 
                      hard work of maintaining the security and decentralization of the network. 
                      However, you will also have to stake a substantial amount of ALA to earn the 
                      right to run a node. This benefits all members of the network as it aligns all 
                      participants incentives.
                    </p>
                    <p>
                      The ALA Token is also used as a medium of exchange, everyone can send and receive ALA as a payment.
                    </p>
                    <p>
                      All ALA transactions are free, unlike almost every other blockchain network. 
                      We believe that free transactions are the only possibility for successful 
                      application development.
                    </p>
                    <p>
                      As a community, all users gain the ability to wield the “Community Fund”, 
                      a substantial fund of ALA that the network can vote on how to use. 
                      The Community Fund is constantly being replenished by the block reward and will 
                      drive future development of the network- in the users interest!
                    </p>
                    <p>
                      The user is at the center of the Aladin Network, every aspect has been designed 
                      to ensure that users make all key decisions and that voting and decision making is 
                      democratized. We even have made sure to limit the voting power of large ALA holders, 
                      unlike other networks!
                    </p>
                    <p>
                      We know this will produce the best experience.
                    </p>
                    <p>
                      Welcome to a new internet, guided by the people.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Key Dates section --> */}
        <section
          className=" qr-back-color  page-section aos-item"
          id="features"
          data-aos="fade-down"
        >
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container">
              <h1 className=" social-head-font">Key Dates</h1>
              <div className="bor-upper mb-2" />
              <div className="kyc-top-bar  clearfix">
                <ul>
                  <li className="current">
                    <div className="box">
                      <div className="icon ic-1" />
                    </div>
                    <div>
                      <p>Aladin Blockchain Goes Live</p>
                    </div>
                  </li>

                  <li className="current">
                    <div className="box">
                      <div className="icon ic-1" />
                    </div>
                    <div>
                      <p>Agreessive Global Marketing</p>
                    </div>
                  </li>
                  <li className="current">
                    <div className="box">
                      <div className="icon ic-2" />
                    </div>
                    <div>
                      <p>Seminar's for Global Developer</p>
                    </div>
                  </li>
                  <li>
                    <div className="box">
                      <div className="icon ic-3" />
                    </div>
                    <div>
                      <p>
                        Aladin will Develop and Launch Dapps on Aladin to Drive
                        the Ecosytem
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="box">
                      <div className="icon ic-3" />
                    </div>
                    <div>
                      <p>DaPP Marketplace Launches</p>
                    </div>
                  </li>
                  <li>
                    <div className="box">
                      <div className="icon ic-3" />
                    </div>
                    <div>
                      <p>Searchable Blockain Browser Goes Live</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* END */}
      </div>
    );
  }
}

export default AlaToken;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, FormFeedback } from 'reactstrap';
import IntroBar from '../../../components/IntroBar/IntroBar';
import Image from '../../../components/Image/Image.jsx';
import FearturesCard from '../../../components/Cards/FeaturesCard/Feature';
import SolutionCard from '../../../components/Cards/SolutionCard/SolutionCard';
import SocialFeed from './SocialFeed/SocialFeed';
import * as actions from '../../../actions';
import { NavLink } from 'react-router-dom';

class Home extends Component { 

  componentWillMount = () => {
    const { getInstagramData } = this.props;
    getInstagramData();
  };

  render() {
    return (
      <div>
        <IntroBar videoLink="https://www.youtube.com/embed/PqiPH76dZlQ">
          <h1 className="font-50">
            <span className="color-red">Aladin</span> Blockchain: Decentralized
            Internet for Financially Rewarding Businesses and Community
          </h1>
          <p className="sub-title pb-3">
            Aladin is the first blockchain to truly bridge the gap between the
            modern internet and decentralized applications. A built-in fully
            transparent universal oracle, a blockchain browser for easy
            navigation, human readable addresses, decentralized storage,
            blockchain’s best DApp store, and the first protocol to natively
            reward developers for building the future of applications. Aladin,
            welcome to the new internet.
          </p>
          <div className="btn-grp">
          <NavLink to="/dappStore" >
            <button className="btn btn-primary mr-3" type="button">
              Visit Store
            </button>
          </NavLink>
          {localStorage.getItem('mnemonicCode') ? 
            <NavLink to="/register-dapp" >
              <button className="btn btn-secondary ml-3" type="button">
                Build DApp
              </button>
            </NavLink> : null
          }
          
          </div>
        </IntroBar>
        {/* <!-- about us section --> */}
        <section className="m-101 " id="about">
          <div className="container">
            <div className="row ">
              <div
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12 aos-item"
                data-aos="fade-right"
              >
                <Image
                  src={require('../../../assets/img/img-sidea.jpg')}
                  className="img-fluid-b img-fluid"
                />
              </div>
              <div
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12 d-flex aos-item align-items-center"
                data-aos="fade-left"
              >
                <div>
                  <h1>Aladin Oracle</h1>
                  <div className="bor-upper" />
                  <p className="sub-title">Truly Decentralized</p>
                  <h3>
                    Aladin is the first blockchain to offer a built in oracle ,
                    deployed across the blockchain, that any developer can
                    access to draw data from external data sources. The Aladin
                    oracle sets Aladin apart from other blockchain, and makes it
                    the easiest, simplest, and fastest blockchain for anyone to
                    deploy a truly useful application on.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- app store section --> */}
        <section className=" back-color page-section" id="Aladin">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container-big">
              <div className="row">
                <div
                  className="col-lg-8 float-left col-md-12 col-sm-12 col-xs-12 aos-item"
                  data-aos="fade-down"
                >
                  {/* <div className="pos-relative">
                    <div className="dapp_store-icon" />
                    <div className=" margin-80">
                      <h1 className="pad-40" />
                      <div className="bor-upper mb-2" />
                      <div className="row">
                        <div className="col-lg-12">
                          <p className="margin-left-124" />
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <FearturesCard
                    heading="DApp Store"
                    description="Aladin features a native DApp store where users can
                            find the latest applications and developers can
                            offer or sell their creations."
                  />
                </div>
              </div>
              <div
                className="row m-66 m-t-101 d-flex justify-content-end  aos-item"
                data-aos="fade-left"
              >
                <div className="col-lg-9 col-md-10 col-sm-12 col-xs-12 ">
                  <div className="card-a">
                    <div className="d-flex justify-content-center align-items-center">
                      <Image src={require('../../../assets/img/icon1.png')} />
                      <div className="mar-30">
                        <h2>No Transaction Fees</h2>
                        <p>
                          No one wants to pay a fee to use an application, on
                          Aladin developers can build applications without
                          needing to charge any transaction fees.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Develop --> */}
              <div
                className="row m-66 d-flex justify-content-start  aos-item"
                data-aos="fade-right"
              >
                <div className="col-lg-9 col-md-10 col-sm-12 col-xs-12 ">
                  <div className="card-a">
                    <div className="d-flex justify-content-center align-items-center">
                      <Image src={require('../../../assets/img/icon2.png')} />
                      <div className="mar-30">
                        <h2>Develop</h2>
                        <p>
                          Aladin is the first blockchain to offer part of the
                          block reward to developers and provide an ever
                          expanding SDK toolkit selection. Aladin also provides
                          decentralized storage for users and applications to
                          make new projects possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Develop -->
               <!-- Deploy --> */}
              <div
                className="row m-66 d-flex justify-content-end aos-item"
                data-aos="fade-left"
              >
                <div className="col-lg-9 col-md-10 col-sm-12 col-xs-12 ">
                  <div className="card-a">
                    <div className="d-flex justify-content-center align-items-center">
                      <Image src={require('../../../assets/img/icon3.png')} />
                      <div className="mar-30">
                        <h2>Deploy</h2>
                        <p>
                          Aladin makes it easier than ever to deploy an
                          application on the blockchain due to a a robust
                          toolkit, human readable names, and a built in
                          universal oracle that lets you access external data
                          without all the work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Deploy --> */}
              {/* <!-- Earn --> */}
              <div
                className="row m-66 d-flex justify-content-start  aos-item"
                data-aos="fade-right"
              >
                <div className="col-lg-9 col-md-10 col-sm-12 col-xs-12 ">
                  <div className="card-a">
                    <div className="d-flex justify-content-center align-items-center">
                      <Image src={require('../../../assets/img/user.png')} />
                      <div className="mar-30">
                        <h2>Earn</h2>
                        <p>
                          Aladin is an incentivized network that rewards all
                          community members for their participation in the
                          network. Earn revenue through voting or by developing
                          an application
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Earn --> */}
            </div>
          </div>
        </section>
        {/* <!-- Aladin-One stop solution section --> */}
        <section className="page-section" id="Aladin-One">
          <div className="bg-img1 p-101 d-flex align-items-center">
            <div className="container-big">
              <div className="row  aos-item " data-aos="fade-down">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mx-auto ">
                  {/* <div className="pos-relative">
                    <div className="dapp_store-icon" />
                    <div className=" margin-80">
                      <h1 className="pad-40">Aladin-One stop solution</h1>
                      <div className="bor-upper mb-2" />
                      <div className="row">
                        <div className="col-lg-10">
                          <p className="margin-left-124">
                            Aladin is unique among blockchain ecosystems as it
                            offers an unparalleled range of features. No other
                            blockchain offers native decentralized storage, a
                            universal oracle, human readable addresses, SDK
                            tools, and a browser for easy navigation. Aladin
                            brings all the tools that users and developers
                            should have into one place.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <FearturesCard
                    heading="Aladin-One stop solution"
                    description="Aladin is unique among blockchain ecosystems as it
                            offers an unparalleled range of features. No other
                            blockchain offers native decentralized storage, a
                            universal oracle, human readable addresses, SDK
                            tools, and a browser for easy navigation. Aladin
                            brings all the tools that users and developers
                            should have into one place."
                  />
                </div>
              </div>
              <div className="row m-66 mar-15 text-center ipad-mar ">
                <div
                  className="col-lg-3  mar-top-220 col-md-12 col-sm-12 aos-item col-xs-12 p-0  "
                  data-aos="fade-down"
                >
                  {/* <div className="card-a pad-50-a">
                    <div className="d-flex align-items-center height-421 ">
                      <div>
                        <Image src={require(')} />
                      
                      </div>
                    </div>
                  </div> */}
                  <SolutionCard src="icon4.png">
                    <h4>Decentralized Storage</h4>
                    <p>
                      Aladin provides a decentralized storage solution so that
                      users and applications can use as much data as they need.
                      All data is authentic.
                    </p>
                  </SolutionCard>
                </div>
                <div
                  className="col-lg-3 col-md-12 col-sm-12 aos-item col-xs-12 p-0 z-index-9 "
                  data-aos="fade-up"
                >
                  {/* <div className="card-b pad-50-a">
                    <div className="d-flex align-items-center height-421 ">
                      <div>
                        <Image src={require('../../../assets/img/icon5.png')} />
                       
                      </div>
                    </div>
                  </div> */}
                  <SolutionCard src="icon5.png">
                    <h4>Smart Contract</h4>
                    <p>
                      Aladin features turing complete smart contracts and
                      industry leading transaction speeds.
                    </p>
                  </SolutionCard>
                </div>
                <div
                  className="col-lg-3 mar-top-220 col-md-12 col-sm-12 aos-item col-xs-12 p-0 "
                  data-aos="fade-down"
                >
                  {/* <div className="card-a pad-50-a">
                    <div className="d-flex align-items-center height-421 ">
                      <div>
                        <Image
                          src={require('../../../assets/img/icon-w.png')}
                          className="img-class-50"
                        />
                       
                      </div>
                    </div>
                  </div> */}
                  <SolutionCard src="icon-w.png">
                    <h4>Aladin Wallet</h4>
                    <p>
                      Aladin provides human readable addresses to make using the
                      Aladin Blockchain as easy as surfing the web.
                    </p>
                  </SolutionCard>
                </div>
                <div
                  className="col-lg-3 col-md-12 col-sm-12 aos-item col-xs-12 p-0 "
                  data-aos="fade-up"
                >
                  {/* <div className="card-b pad-50-a">
                    <div className="d-flex align-items-center height-421 ">
                      <div>
                        <Image
                          src={require('../../../assets/img/icon7.png')}
                          className="img-class-50"
                        />
                      
                      </div>
                    </div>
                  </div> */}
                  <SolutionCard src="icon7.png">
                    <h4>An Economic Network</h4>
                    <p>
                      Aladin rewards users for staking and voting with their
                      coins, rewards developers for creating applications and
                      rewards nodes and witnesses for maintaining the network.
                      No matter who you are, if you use the Aladin network you
                      can earn rewards through a system designed for growth.
                    </p>
                  </SolutionCard>
                </div>
              </div>
            </div>
          </div>
        </section>
        <SocialFeed instaData={this.props.instaData} />
        {/* END OF FILE */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, successModal, modal, socialFeed }) => {
  const { password } = auth;
  const { signInModalFlag } = modal;
  const { successModalFlag } = successModal;
  const { instaData } = socialFeed;

  return {
    password,
    signInModalFlag,
    successModalFlag,
    instaData,
  };
};
const mapDispatchToProps = dispatch => ({
  openSignInModal: payload => dispatch(actions.openSignInModal(payload)),
  closeSignInModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  userPasswordChanged: payload =>
    dispatch(actions.userPasswordChanged(payload)),
  getInstagramData: () => dispatch(actions.getInstagramData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

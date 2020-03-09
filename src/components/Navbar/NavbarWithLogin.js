import React, { Component } from 'react';
import { NavLink, withRouter,Link } from 'react-router-dom';

import Image from '../Image/Image';
// import Input from '../InputControls/Input/Input';
// import * as actions from '../../actions';

class NavbarWithLogin extends Component {
  constructor(props) {
    super(props);
    this.refCollapse = new React.createRef()
  }
  componentDidMount() {
    const userStoredData = localStorage.getItem('mnemonicCode');
    if (!userStoredData) {
        this.props.history.push('/');
    }
  }
  
  closeCollapse = () => {
    this.refCollapse.current.classList.remove('show');
  }

  render() {
    const {pathname}=window.location
    let Location = this.props.history.location.search;
    return (
      <div id="myHeader" className="sticky-top">
        <div className="container-big">
          <nav className="navbar navbar-expand-xl navbar-light  sticky-top">
            {Location.includes('auth') ? (
              <Image src={require('../../assets/img/img-logo.png')} />              
            ) : (
              <NavLink
                className="slideanim"
                to="/"
                title="Aladin"
              >
                <Image src={require('../../assets/img/img-logo.png')} />
              </NavLink>
            ) }
            
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarText"
              ref={this.refCollapse}
            >
              <ul className={Location.includes('auth') ? 'navbar-nav width-inherit d-none align-items-center' : "navbar-nav width-inherit d-flex align-items-center"}>
                <li className="nav-item hover-effect">
                  <NavLink
                    to="/dappStore"
                    onClick={this.closeCollapse}
                    // data-toggle="collapse"
                    // data-target="#navbarText"
                  >
                    <div className="d-flex">
                    <svg version="1.1" width="28" height="28" className="mr-3" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style={{enableBackground: 'new 0 0 24 24'}} xmlSpace="preserve">
                    
                      <circle className="st0 st0-a" cx="12" cy="12" r="12"></circle>
                      <g>
                        <path className="st1 st1-a" d="M16.4,15.6c0-0.9,0-1.8,0-2.8c0-1.6-1-2.6-2.6-2.6c-1.2,0-2.3,0-3.5,0c-1.6,0-2.6,1.3-2.6,2.6
                                             c0,1.2,0,2.4,0,3.6c0,0.2,0,0.4,0,0.6c0.3,1.2,1.2,2,2.5,2c1.9,0,3.9,0,5.8,0c0.3,0,0.3-0.1,0.3-0.3C16.4,17.7,16.4,16.7,16.4,15.6
                                             z M14.4,17.3c-0.7,0-1.4,0-2.1,0v0c-0.7,0-1.4,0-2,0c-0.6,0-0.9-0.3-0.9-0.9c0-1.2,0-2.4,0-3.5c0-0.6,0.3-0.9,0.9-0.9
                                             c1.2,0,2.4,0,3.5,0c0.6,0,0.9,0.3,0.9,0.9c0,1.4,0,2.7,0,4.1C14.7,17.2,14.6,17.3,14.4,17.3z"></path>
                        <path className="st1 st1-a" d="M16.3,5c-0.6,0-1.1,0-1.6,0c0,1.1,0,2.3,0,3.4c0.6,0,1.1,0,1.6,0C16.3,7.2,16.3,6.1,16.3,5z"></path>
                      </g>
                    </svg>
                      DApp Store
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item hover-effect  ">
                  <NavLink
                    to="/wallet"
                    onClick={this.closeCollapse}
                    // data-toggle="collapse"
                    // data-target="#navbarText"
                  >
                    <div className="d-flex ">
                      <svg
                        version="1.1"
                        width="28"
                        height="24"
                        className="mr-3"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 28 24"
                        style={{ enableBackground: 'new 0 0 24 24' }}
                        xmlSpace="preserve"
                      >
                        <path
                          // className="st2"
                          d="M25.1,17.5c-1.5,0-3,0-4.5,0c-1.4,0-2.3-0.9-2.3-2.3c0-0.7,0-1.3,0-2c0-1.4,0.9-2.3,2.3-2.3c1.5,0,3,0,4.5,0
                                           h0.7c0-1.6,0.1-3.2,0-4.7c-0.1-1.1-1-1.8-2.3-1.8c-4.6,0-9.1,0-13.7,0c-2.1,0-4.2,0-6.3,0c-0.3,0-0.7,0-0.8-0.2
                                           C2.5,3.8,2.3,3.4,2.2,3.1c0-0.5,0.4-0.8,0.9-0.9c0.2,0,0.4,0,0.6,0c6.8,0,13.6,0,20.5,0c0.3,0,0.6,0,0.9-0.1
                                           c0.5-0.2,0.7-0.6,0.7-1.2c-0.1-0.5-0.4-0.9-1-0.9c-0.2,0-0.4,0-0.6,0C17.4,0,10.5,0,3.7,0C1.6,0,0.6,0.8,0.1,2.8
                                           C0.1,2.9,0,3,0,3.1v18.9c0.3,0.5,0.5,1.2,0.9,1.6C1.2,23.8,1.8,24,2.2,24c7.2,0,14.3,0,21.5,0c1.2,0,2.1-0.8,2.1-2
                                           c0-1.5,0-3,0-4.5H25.1z M26.8,12c-1.8,0-3.6,0-5.4,0c-1,0-1.7,0.6-2,1.5c-0.4,1.4,0.6,2.8,2,2.8c1.7,0,3.3,0,5,0
                                           c0.8,0,1.3-0.2,1.5-1V13C27.8,12.4,27.5,12,26.8,12z M21.5,15.3c-0.6,0-1.1-0.5-1.1-1.1c0-0.6,0.5-1.1,1.1-1.1c0.6,0,1,0.5,1,1.1
                                           C22.5,14.8,22.1,15.3,21.5,15.3z"
                        />
                      </svg>
                      Wallet
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item hover-effect ">
                  <Link
                    to="/profile"
                    className={(pathname=="/profile" || pathname=="/file-manager" || pathname=="/votes" || pathname=="/profile-more" || pathname=="/manage-resources") ? "active":""}
                    onClick={this.closeCollapse}
                    // data-toggle="collapse"
                    // data-target="#navbarText"
                  >
                    <div className="d-flex  align-items-center">
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="28"
                        height="28"
                        className="mr-3"
                        viewBox="0 0 311.541 311.541"
                        style={{
                          enableBackground: 'new 0 0 311.541 311.541',
                        }}
                        xmlSpace="preserve"
                      >
                        <path
                          d="M155.771,26.331C69.74,26.331,0,96.071,0,182.102c0,37.488,13.25,71.883,35.314,98.761
                          c3.404-27.256,30.627-50.308,68.8-61.225c13.946,12.994,31.96,20.878,51.656,20.878c19.233,0,36.894-7.487,50.698-19.936
                          c38.503,11.871,65.141,36.27,66.017,64.63c24.284-27.472,39.056-63.555,39.056-103.108
                          C311.541,96.071,241.801,26.331,155.771,26.331z M155.771,222.069c-9.944,0-19.314-2.732-27.634-7.464
                          c-20.05-11.409-33.855-34.756-33.855-61.711c0-38.143,27.583-69.176,61.489-69.176c33.909,0,61.489,31.033,61.489,69.176
                          c0,27.369-14.237,51.004-34.786,62.215C174.379,219.523,165.346,222.069,155.771,222.069z"
                        />
                      </svg>
                      Profile
                    </div>
                  </Link>
                </li>
                <li className="nav-item pad-bornone hover-effect ">
                  <Link
                    to="/settings" 
                    className={pathname=="/settings" || pathname=="/storage-provider" ||pathname=="/change-password"||pathname=="/backup-and-restore" || pathname=="/reset-browser"|| pathname=="/api-setting" ?"active":""}
                    onClick={this.closeCollapse}
                    // data-toggle="collapse"
                    // data-target="#navbarText"
                  >
                    <div className="d-flex ">
                      <svg
                        version="1.1"
                        width="24"
                        height="24"
                        className="mr-3"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 24 24"
                        style={{ enableBackground: 'new 0 0 24 24' }}
                        xmlSpace="preserve"
                      >
                        <path
                          className="st2"
                          style={{ fill: '#333' }}
                          d="M0,15.6c0-0.1,0-0.1,0-0.2c0,0,0-0.1,0-0.1c0-0.4,0.2-0.6,0.6-0.8c0.6-0.2,1.1-0.7,1.5-1.2
                                           c0.7-0.9,0.6-2.1-0.1-2.9c-0.4-0.4-0.9-0.8-1.4-1C0.4,9.3,0.2,9.2,0.1,9C0.1,8.9,0,8.7,0,8.6c0-0.1,0-0.3,0-0.4c0,0,0,0,0-0.1
                                           c0.1-0.5,0.2-1,0.4-1.4C0.6,6.4,0.8,6.1,1,5.8c0.2-0.2,0.5-0.3,0.8-0.2c0.1,0,0.2,0.1,0.3,0.1c0.7,0.2,1.3,0.3,2,0
                                           c0.7-0.2,1.2-0.6,1.4-1.3C5.8,3.6,5.9,2.8,5.7,2c-0.1-0.4,0-0.7,0.2-0.9C6,1,6.1,0.9,6.3,0.8C6.9,0.3,7.7,0.1,8.5,0
                                           C9,0,9.2,0.1,9.4,0.6c0,0,0,0,0,0C9.8,1.4,10.3,2,11,2.3c1.3,0.5,2.9-0.2,3.4-1.5c0.1-0.2,0.3-0.4,0.4-0.6C15,0,15.1,0,15.3,0
                                           c0.5,0,0.9,0.1,1.4,0.3c0.5,0.2,1,0.5,1.4,1c0.2,0.3,0.3,0.5,0.2,0.9c0,0,0,0.1-0.1,0.1C18,2.6,18,2.9,17.9,3.2
                                           c-0.1,1.2,0.5,2.1,1.3,2.5c0.9,0.5,1.8,0.4,2.7,0c0.4-0.2,0.7-0.1,1,0.2c0.1,0.1,0.3,0.3,0.4,0.5c0.4,0.7,0.6,1.4,0.7,2.1
                                           c0.1,0.4-0.2,0.8-0.6,1c-0.5,0.2-0.9,0.5-1.3,0.9c-1,1.2-0.8,3.4,1,4.1c0.2,0.1,0.3,0.2,0.4,0.3c0.3,0.2,0.4,0.5,0.4,0.8
                                           c0,0.2,0,0.4-0.1,0.6c-0.1,0.7-0.4,1.3-0.8,1.8c-0.3,0.4-0.8,0.7-1.5,0.4c-0.6-0.2-1.2-0.3-1.8-0.1c-0.4,0.1-0.7,0.2-1,0.4
                                           c-0.3,0.3-0.5,0.6-0.6,0.9c-0.3,0.8-0.3,1.5,0.1,2.3c0.1,0.2,0.1,0.3,0.1,0.5c0,0.3-0.2,0.6-0.4,0.7c-0.7,0.5-1.5,0.9-2.4,1
                                           c-0.2,0-0.4,0-0.6-0.1c-0.2-0.1-0.3-0.3-0.4-0.5c-0.2-0.4-0.4-0.8-0.8-1.1c-0.9-0.8-2.1-1-3.1-0.4c-0.6,0.4-1,0.9-1.3,1.5
                                           C9.3,23.7,9,23.9,8.7,24c-0.2,0-0.3,0-0.5,0c-0.7-0.1-1.3-0.3-1.9-0.7C6,23.2,5.7,23,5.5,22.7c-0.2-0.3-0.3-0.6-0.2-0.9
                                           c0.1-0.2,0.1-0.3,0.2-0.5c0.3-0.9,0.3-1.9-0.5-2.7c-0.2-0.2-0.5-0.3-0.7-0.4c-0.7-0.2-1.4-0.1-2,0.1c-0.6,0.2-1,0-1.4-0.5
                                           c-0.3-0.4-0.5-0.9-0.6-1.4C0.1,16.1,0.1,15.9,0,15.6z M17.6,12c0-3.1-2.5-5.6-5.6-5.6c-3.1,0-5.6,2.5-5.6,5.6c0,3.1,2.5,5.6,5.6,5.6
                                           C15.1,17.6,17.6,15.1,17.6,12z"
                        />
                      </svg>
                      Setting
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(NavbarWithLogin);

import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from '../Image/Image';

function Footer(props) {
  let Location = props.history.location.search;
  let LocationFlag = Location.includes('auth');
  return (
    <footer id="contact" className="page-section">
      <div className="container">
        <div className="row mt-5" id="footer-text">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 text">


            <ul className="">
              <li className="text-uppercase mb-3 font-18"><a id="navbardrop" >Technology
                </a></li>
              <li ><NavLink to="/SDK" activeClassName="text-underline">SDK</NavLink></li>
              <li ><NavLink to="/document" activeClassName="text-underline">Documentation</NavLink></li>
              <li ><NavLink to="/dappStore" activeClassName="text-underline">DApp store</NavLink></li>
              <li ><NavLink to="/tokenPage" activeClassName="text-underline">ALA Token</NavLink></li>
            </ul>



          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 text">
            <ul>
              <li className="text-uppercase mb-3 font-18"><a>About Us</a></li>
            </ul>
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12"><ul>

                <li><NavLink to="/team" activeClassName="text-underline">Team</NavLink></li>
                <li><a href="pdf/whitepaper.pdf" target="_blank">Whitepaper</a></li>
                <li><a href="pdf/Aladin-Tech-doc.pdf" target="_blank">Tech-Document</a></li>
                <li><a href="pdf/faq.pdf" target="_blank">FAQ</a></li>
                <li><a href="pdf/Aladin-Pitchdeck.pdf" target="_blank">Pitchdeck</a></li>


              </ul></div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">  <ul>

                <li><NavLink to="/aboutus" activeClassName="text-underline">About Us</NavLink></li>
                <li><NavLink to="/road-map" activeClassName="text-underline">Road Map</NavLink></li>
                <li><NavLink to="/privacy-policy" activeClassName="text-underline">Privacy Policy</NavLink></li>
                <li><NavLink to="/term-condition" activeClassName="text-underline">Terms &amp; Conditions</NavLink></li>

              </ul></div></div>




          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12 text">



            <ul>
              <li className="text-uppercase mb-3 font-18"> <a>Community</a></li>
              <li ><a href="https://forum.aladinnetwork.org/" target="_blank">Forum</a></li>
              <li ><a href="http://aladinnetwork.org/community/events/" target="_blank">Events</a></li>
              <li><a href="http://aladinnetwork.org/community/blogs/" target="_blank">Blog</a></li>
              <li className="pt-3"><a href="http://explorer.aladinnetwork.org/" target="_blank">Aladin Explorer</a></li>
            </ul>
          </div>
        </div>
        <hr></hr>
        <div className="row d-flex align-items-center mt-5 flex-column-reverse-mob  ">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
            © 2020 Copyright Aladin
           </div>
          <div
            className="col-lg-4 col-md-12 col-sm-12 col-xs-12"
            id="icon-hover"
          >
            <div className="float-right float-none-mob">
              <a
                href="https://www.facebook.com/Aladinuk-100757154617610/"
                target="_blank"
                style={{ textDecoration: 'none' }}
                rel="noopener noreferrer"
              >
                <Image
                  src={require('../../assets/img/fb.png')}
                  className="mr-2"
                />
              </a>
              <a
                href="https://twitter.com/aladinnetwork"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <Image
                  src={require('../../assets/img/tw.png')}
                  className="mr-2"
                />
              </a>
              <a
                href="https://www.instagram.com/aladinnetwork/"
                target="_blank"
                style={{ textDecoration: 'none' }}
              >
                <Image src={require('../../assets/img/insta.png')} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

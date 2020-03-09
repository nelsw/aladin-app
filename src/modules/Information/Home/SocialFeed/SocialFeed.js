import React from 'react';
import { FacebookProvider, Page } from 'react-facebook';
import { Timeline } from 'react-twitter-widgets';
import YouTube from 'react-youtube-embed';
// import { TwitterTimelineEmbed } from 'react-twitter-embed';

import InstagramEmbed from 'react-instagram-embed';

const SocialFeed = props => (
  <section
    className=" back-color page-section aos-item"
    id="features"
    data-aos="fade-down"
  >
    <div className="bg-img1 p-101 d-flex align-items-center">
      <div className="container-fluid">
        <div className="social-section">
          <h1 className="pad-40 social-head-font">Social Feeds</h1>
          <div className="bor-upper mb-2" />
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-pills" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="pill"
                    href="#menu1"
                  >
                    Social
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="pill" href="#menu5">
                    Github
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div id="menu1" className=" tab-pane active">
                  <div className="row">
                    <ul className="social-section-inner">
                      <li>
                        <h3>Facebook</h3>
                        <div className="card-c height-500">
                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FAladinuk-100757154617610%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=245199429337790" width="300" height="500" style={{border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        {/* <FacebookProvider appId="123456789">
                          <Page href="https://www.facebook.com/aladinnetwork" tabs="timeline" />
                        </FacebookProvider> */}
                          {/* <iframe
                            src="https://www.facebook.com/aladinnetwork"
                            width="100%"
                            height="500"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowTransparency="true"
                            allow="encrypted-media"
                            // allowFullScreen
                          /> */}
                        </div>
                      </li>
                      <li>
                        <h3>Twitter</h3>
                        <div className="card-c height-500">
                          <a
                            className="twitter-timeline"
                            href="https://twitter.com/aladinnetwork?ref_src=twsrc%5Etfw"
                          >
                            Tweets by aladinnetwork
                          </a>
                          <script
                            async
                            src="https://platform.twitter.com/widgets.js"
                            charSet="utf-8"
                          />
                        </div>
                      </li>
                      <li>
                        <h3> Youtube </h3>
                        <div className="card-c height-500">
                        {/* <YouTube id='A71aqufiNtQ' appendSrc='WdiiaeOGgQk' /> */}
                          <iframe
                            width="100%"
                            height="500"
                            src="https://www.youtube.com/embed/WdiiaeOGgQk"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </li>
                      <li>
                        <div className="instagram-main">
                          <h3>Instagram</h3>
                          <div className="card-c height-500">
                            {props.instaData.map(item => (
                              <InstagramEmbed
                                url={item.link}
                                hideCaption={false}
                                containerTagName="div"
                                protocol=""
                                injectScript
                                onLoading={() => {}}
                                onSuccess={() => {}}
                                onAfterRender={() => {}}
                                onFailure={() => {}}
                              />
                            ))}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div id="menu5" className=" tab-pane fade">
                  <div className="row">
                    <div className="col-lg-12 mt-4 text-center">
                      Stay Tune for Our Live Regular Update Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SocialFeed;

import React, { Component } from 'react';
import VideoModal from '../../../components/Modals/VideoModal/VideoModal';

class documentation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      closeVideo: false,
      video: '',
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  openVideoModal = (video) => {
    this.setState({ showVideo: true, closeVideo: true, video: video });
  };
  closeVideoModal = () => {
    this.setState({ showVideo: false });
  };

  render() {
    const { showVideo, closeVideo, video } = this.state;
    return (
      <section className="page-section back-color" id="view" >
        {
          showVideo ?
            <VideoModal
              close={this.closeVideoModal}
              show={showVideo}
              videoLink={video == 1 ? 'https://drive.google.com/file/d/1KHhHREa18KU3tUkBv7qf8O-wVBewaIv9/view' : 'https://drive.google.com/file/d/11Hca8IeHjyU6DcVdAvyqRkLdiOQjTb1t/view'}
              closeModal={closeVideo}
            /> : null
        }

        <div className="bg-img1 padingbt-40 mb-3 ">
          <div className="container">
            <h1 className="pad-40">Aladin Documentation</h1>
            <div className="bor-upper mb-3">
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aos-item mx-auto" data-aos="fade-down">
                <div className="pos-relative text-left">

                  <div className="row ">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <div className="card-c ">

                        <div className="view-pad">
                          <p className="sub-title">User guide</p>
                          <p className="mb-0">Aladin Complete User Guide</p>

                        </div>
                        <a href="pdf/User-Guide.pdf" target="_blank" title="The Aladin User guide" className="hover-link">
                          <div className="border-top view-pad1   qr-back-color clearfix">

                            <div className="sub-title float-left">View</div>
                            <div className="text-right float-right"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></div>

                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <div className="card-c ">
                        <div className="view-pad">
                          <p className="sub-title">Command manual</p>
                          <p className="mb-0">Technical Guide to  build your own Node </p>

                        </div>
                        <a href="pdf/Command-Manual.pdf" target="_blank" title="The Aladin Command manual" className="hover-link">
                          <div className="border-top view-pad1   qr-back-color clearfix">

                            <div className="sub-title float-left">View</div>
                            <div className="text-right float-right"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></div>

                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <div className="card-c ">
                        <div className="view-pad">
                          <p className="sub-title">Oracle guide</p>
                          <p className="mb-0">How to utilize Oracle</p>

                        </div>
                        <a href="pdf/Oracle-guide.pdf" target="_blank" title="Oracle guide" className="hover-link">
                          <div className="border-top view-pad1   qr-back-color clearfix">

                            <div className="sub-title float-left">View</div>
                            <div className="text-right float-right"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></div>

                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <div className="card-c ">

                        <div className="view-pad">
                          <p className="sub-title">Setting up gaia hub</p>
                          <p className="mb-0">User Guide for setting up gaia hub</p>

                        </div>
                        <a href="pdf/Setting-up-gaia-hub.pdf" target="_blank" title="Gaia hub setup" className="hover-link">
                          <div className="border-top view-pad1   qr-back-color clearfix">

                            <div className="sub-title float-left">View</div>
                            <div className="text-right float-right"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></div>

                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* video section */}
            <h1 className="pad-40 mt-5">Videos </h1>
            <div className="bor-upper mb-3">
            </div>
            <div className="row mb-5">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 aos-item mx-auto" data-aos="fade-down">
                <div className="pos-relative text-left">

                  <div className="row ">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <div className="card-c ">

                        <div className="view-pad">

                          <iframe src="https://drive.google.com/file/d/1KHhHREa18KU3tUkBv7qf8O-wVBewaIv9/preview" allowfullscreen="true" width="300" height="180"></iframe>

                        </div>
                        <a href="pdf/Run-alacli-and-Voting-using-the-commands.pdf" target="_blank" title="Run alacli and voting using commands" className="hover-link">
                          <div className="border-top view-pad1   qr-back-color clearfix">
                            <div style={{fontSize: '15px'}} className="sub-title float-left">Alacli commands for voting</div>
                            <div className="text-right float-right"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></div>

                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                      <div className="card-c ">
                        <div className="view-pad">

                          <iframe src="https://drive.google.com/file/d/11Hca8IeHjyU6DcVdAvyqRkLdiOQjTb1t/preview" allowfullscreen="true" width="300" height="180"></iframe>

                        </div>
                        <a href="pdf/Run-alacli-and-Voting-using-the-commands.pdf" target="_blank" title="Run alacli and voting using commands" className="hover-link">
                          <div className="border-top view-pad1   qr-back-color clearfix">

                            <div style={{fontSize: '15px'}} className="sub-title float-left">Alacli commands for voting</div>
                            <div className="text-right float-right"><i className="fa fa-file-pdf-o" aria-hidden="true"></i></div>

                          </div>
                        </a>
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
  }
}

export default documentation;

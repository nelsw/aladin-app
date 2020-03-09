import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ForumTopic from './ForumTopic/ForumTopic';

class Forum extends Component {
  state = {
    ForumData: [
      { id: 1, subTitle: 'Media files in CA', capacity: 'Storage' },
      { id: 2, subTitle: 'Media files in CA', capacity: 'Storage' },
      { id: 3, subTitle: 'Media files in CA', capacity: 'Storage' },
      { id: 4, subTitle: 'Media files in CA', capacity: 'Storage' },
      { id: 5, subTitle: 'Media files in CA', capacity: 'Storage' },
      { id: 6, subTitle: 'Media files in CA', capacity: 'Storage' },
      { id: 7, subTitle: 'Media files in CA', capacity: 'Storage' },
    ],
  };

  render() {
    const { ForumData } = this.state;
    return (
      // <!--start section -->
      <section className="m-50 " id="tab-forum">
        <div className="container">
          <h1 className=" color-black">Aladin Forum</h1>

          <div className="bor-upper" />
          <div className="row ">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
              <div className="">
                <div className="row d-flex align-items-center mb-3  ">
                  <div className="col-lg-6 col-md-12 col-sm-12 col-md-12 flex-wrap d-flex align-items-center col-12">
                    <div>
                      <select className="form-control select-toggle pad-control">
                        <option>All Category</option>
                        <option>Category1</option>
                      </select>
                    </div>
                    <ul
                      className="nav nav-pills d-mob-blocka"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="pills-home-tab"
                          data-toggle="pill"
                          href="#pills-home"
                          role="tab"
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                          Latest
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-profile-tab"
                          data-toggle="pill"
                          href="#pills-profile"
                          role="tab"
                          aria-controls="pills-profile"
                          aria-selected="false"
                        >
                          Top
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-contact-tab"
                          data-toggle="pill"
                          href="#pills-contact"
                          role="tab"
                          aria-controls="pills-contact"
                          aria-selected="false"
                        >
                          New
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-md-12  col-12">
                    <NavLink to="/askQuestion">
                      <button
                        className="btn btn-primary ml-3 meta-btn float-right"
                        type="button"
                      >
                        Add a question
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="">
                    {/* <!-- table  --> */}
                    <p>
                      Online (2) :
                      <span className="round light-green mar-font ">v</span>
                      <span className="round line-22 perot">A</span>
                    </p>
                    <div className="common table-responsive" id="forum-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Topic</th>
                            <th>Replies</th>
                            <th>Views</th>
                            <th>Activity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ForumData.length > 0
                            ? ForumData.map(item => (
                                <ForumTopic
                                  key={item.id}
                                  subTitle={item.subTitle}
                                  capacity={item.capacity}
                                />
                              ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                  {' '}
                  <div className="">
                    {/* <!-- table  --> */}
                    <p>
                      Online (2) :
                      <span className="round light-green mar-font ">v</span>
                      <span className="round line-22 perot">A</span>
                    </p>
                    <div className="common table-responsive" id="forum-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Topic</th>
                            <th>Replies</th>
                            <th>Views</th>
                            <th>Activity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ForumData.length > 0
                            ? ForumData.map(item => (
                                <ForumTopic
                                  key={item.id}
                                  subTitle={item.subTitle}
                                  capacity={item.capacity}
                                />
                              ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                >
                  <div className="">
                    {/* <!-- table  --> */}
                    <p>
                      Online (2) :
                      <span className="round light-green mar-font ">v</span>
                      <span className="round line-22 perot">A</span>
                    </p>
                    <div className="common table-responsive" id="forum-table">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Topic</th>
                            <th>Replies</th>
                            <th>Views</th>
                            <th>Activity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ForumData.length > 0
                            ? ForumData.map(item => (
                                <ForumTopic
                                  key={item.id}
                                  subTitle={item.subTitle}
                                  capacity={item.capacity}
                                />
                              ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--loading text  --> */}
              <div className="text-center mt-3">Loading...</div>
            </div>
          </div>
          {/* <!-- tabele --> */}
        </div>
      </section>
    );
  }
}

export default Forum;

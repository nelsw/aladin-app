 /* eslint-disable */ 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Button from '../../../components/InputControls/Button/Button';
import '../../../assets/css/dataTables.min.css';
import Image from '../../../components/Image/Image';
import * as actions from '../../../actions';
import axois from '../../../Services';
import ReactPaginate from 'react-paginate';
import Input from '../../../components/InputControls/Input/Input';
import { BP_ENDPOINT } from '../../../constants/constants';
import { CopyToClipboard } from 'react-copy-to-clipboard';

let TIMEOUT;
let PAGE_LIMIT = 30;


const sort = (a, b, asc) => {
  var result;

  /* Default ascending order */
  if (typeof asc == "undefined") asc = true;

  if (a === null) return 1;
  if (b === null) return -1;
  if (a === null && b === null) return 0;

  result = a - b;

  if (isNaN(result)) {
    return (asc) ? a.toString().localeCompare(b) : b.toString().localeCompare(a);
  }
  else {
    return (asc) ? result : -result;
  }
}

class Votes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auditTrailData: {},
      openRow: 0,
      page_no: 1,
      // page_limit: 10,
      page_search: '',
      sort_key: '',
      sort_asc: true,
      accept: false,
      votelist: [],
      copied: false,
      currentProducer: '',
    }
  }

  componentWillMount() {
    const { page_no } = this.state;
    clearInterval(TIMEOUT);
    this.getData(page_no);
    TIMEOUT = setInterval(() => {
      const { page_no } = this.state;
      this.getData(page_no);
    }, 6000);
  }

  componentWillUnmount() {
    clearInterval(TIMEOUT);
  }

  getData = async (page_no, no_page_scroll) => {
    const { page_search } = this.state;
    let response = await axois.post('/users/listBPs', {
      page_limit: PAGE_LIMIT,
      page_no,
      reqId: page_search,
    });
    let res;
    // if (response.data.data.page == undefined) {
    //   res = {
    //     data: [response.data.data],
    //     total_pages: 1,
    //     total: 1,
    //   }
    // }
    this.setState({ auditTrailData: res != undefined ? res : response.data.data.paginatedResponse, currentProducer: response.data.data.currentProducer, page_search: '' });
    // if (!no_page_scroll) {
    //   window.scrollTo(0, 0);
    // }
  }

  // sortData = (Key) => {
  //   const { auditTrailData } = this.state;
  //   let sortedData = auditTrailData.data.sort((a, b) => {
  //     return a[Key].toString().localCompare(b[Key], 'en', { sensitivity: 'base' });
  //   });
  //   this.setState({ auditTrailData: sortedData })
  // }

  sortData = (Key) => {
    const { auditTrailData, sort_key, sort_asc } = this.state;
    // let sortedData = auditTrailData.data.sort((a, b) => {
    //   return a[Key].toString().localCompare(b[Key], 'en', { sensitivity: 'base' });
    // });
    let sortAsc;
    let sortedData;
    if (sort_key == Key) {
      if (sort_asc) {
        sortedData = auditTrailData.data.sort((a, b) => b[Key] < a[Key] ? -1 : 1);
        sortAsc = false;
      } else {
        sortedData = auditTrailData.data.sort((a, b) => a[Key] < b[Key] ? -1 : 1);
        sortAsc = true;
      }
    } else {
      sortedData = auditTrailData.data.sort((a, b) => a[Key] < b[Key] ? -1 : 1);
      sortAsc = true;
    }

    // let sortedData = auditTrailData.data.sort(function(a, b){ return sort(a, b)})
    this.setState({ auditTrailData: { ...auditTrailData, data: sortedData }, sort_key: Key, sort_asc: sortAsc });
  }

  onCopyHandler = () => {
    this.setState({ copied: true });

    setTimeout(() => {
      this.setState({ copied: false });
    }, 3000);
  };

  openVoteModal = () => {
    const {
      openModal,
      closeModal,
    } = this.props;
    const { votelist, copied } = this.state;
    const { currentUser } = JSON.parse(localStorage.getItem('userData'));
    let cleos = `alacli -u ${BP_ENDPOINT} system voteproducer prods ${currentUser} ${votelist.join(' ')}`;
    openModal({
      title: 'alacli Command',
      body: [
        <div>
          <p>Copy the below command</p>
        <p className="color-red mt-3">{cleos}</p>
         <CopyToClipboard text={cleos} onCopy={this.onCopyHandler}
         >
              <a
                style={{
                  display: 'block',
                  cursor: 'pointer',
                }}
                title="Copy Code"
              >
                <div className="sub-title margin-stake-top d-flex card-c pad-stake-20 align-items-center justify-content-center text-center">
                  {copied ? 'Copied' : 'Copy'} to clipboard!
                  <svg
                    width="22"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 20 20"
                    style={{
                      enableBackground: 'new 0 0 20 20',
                    }}
                    className="ml-3"
                    xmlSpace="preserve"
                  >
             
                    <g>
                      <g>
                        <path
                          className="st3"
                          d="M19.2,0H5C4.3,0,4.2,0.1,4.2,0.8c0,0.5,0,1,0,1.5l0,1l-1.3,0c-0.3,0-0.6,0-0.9,0c-0.4,0-0.8,0-1.2,0
                                      C0.2,3.4,0,3.5,0,4.2v15.1C0,19.8,0.2,20,0.8,20l14.2,0c0.8,0,0.9-0.1,0.9-0.9l0-2.5l1.2,0c0.7,0,1.4,0,2.1,0
                                      c0.7,0,0.8-0.2,0.8-0.8v-15C20,0.1,19.9,0,19.2,0z M14.7,18.9H1.2V4.5h13.5V18.9z M18.8,15.5h-3l0-11.1c0-0.9-0.1-1-1-1H5.3V1.1
                                      h13.6V15.5z M4.7,15.4c2.2,0,4.3,0,6.5,0c0.2,0,0.4-0.1,0.5-0.2c0.1-0.1,0.1-0.2,0.1-0.4c0-0.2-0.1-0.5-0.7-0.5
                                      c-0.7,0-1.5,0-2.2,0l-1,0l-1,0c-0.3,0-0.7,0-1,0c-0.4,0-0.8,0-1.3,0c-0.4,0-0.7,0.2-0.7,0.5c0,0.2,0.1,0.3,0.2,0.4
                                      C4.3,15.3,4.5,15.4,4.7,15.4z M4.7,9.1C4.7,9.1,4.7,9.1,4.7,9.1c1.4,0,2.8,0,4.2,0l2.1,0c0.6,0,0.7-0.3,0.7-0.5
                                      c0-0.3-0.1-0.5-0.7-0.5c-0.8,0-1.6,0-2.4,0L7.9,8l-1,0C6.6,8,6.3,8,6,8C5.6,8,5.1,8,4.7,8C4.5,8,4.3,8.1,4.2,8.2
                                      C4.1,8.3,4,8.4,4,8.6C4.1,8.7,4.1,9.1,4.7,9.1z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </a>
            </CopyToClipboard>
            <p className="mt-2 mb-4">Please click <a target="_blank" href="pdf/Command-Manual.pdf" className="color-red-1 float-none">here</a> for next steps</p>
          <p style={{color: 'red', fontSize: '12px'}}></p>
        </div>,
      ],
      buttonClick: this.openSuccessModal,
      // buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Send',
      cancelButton: closeModal,
      cancelButtonFlag: false,
      modalName: 'openVoteModal',
      hideButton:true
    });
  };


  render() {
    const { auditTrailData, openRow, page_no, sort_key, sort_asc, accept, votelist, currentProducer } = this.state;
    const { modalName } = this.props;
    if (modalName != '' && this[modalName] != undefined) {
      this[modalName]();
    }
    return (
      <div>
        <section className="m-50 ">
          <div className="container">
            <div className="row ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="">
                  <NavLink to="/manage-resources">
                    <Button className="btn btn-primary mb-2" type="button">Back</Button>
                  </NavLink>
                  <div className="text-center">
                    <h1 className="sub-40 color-black ">Votes</h1>
                    <div className="bor-upper mx-auto"></div>
                  </div>
                  <div className="common" id="datatable">
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="row">
                            <div className="col-12 text-right">
                              <Button className="btn btn-primary mb-2" type="button" disabled={votelist.length == 0} onClick={this.openVoteModal}>Vote</Button>
                            </div>
                          </div>
                          <div className="table-responsive">
                            <table className="table data-table-example dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                              <thead>
                                <tr role="row">
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Transaction ID: activate to sort column descending">Select</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Transaction ID: activate to sort column descending">Rank</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Block Producer: activate to sort column ascending">Name</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Status</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Location</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Block: activate to sort column ascending">Votes</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Smart Contract: activate to sort column ascending">Vote %</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Smart Contract: activate to sort column ascending">Daily Rewards(ALA)</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Smart Contract: activate to sort column ascending">Oracle Rewards(ALA)</th>
                                  <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Total Rewards(ALA)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {auditTrailData.data != undefined ? auditTrailData.data.length != 0 ? auditTrailData.data.map((item, index) => (
                                  <tr role="row" className="even">
                                    <td>
                                      <label className="container-a text-left" htmlFor={`checkbox${index}`}>
                                        <input id={`checkbox${index}`} type="checkbox" className="password-chekbox form-check-input" style={{cursor: 'pointer'}} onChange={()=>{
                                          let voteList = votelist;
                                          let user = `${item.owner}`;
                                          if(voteList.includes(user)) {
                                            let Index = voteList.indexOf(user);
                                            voteList.splice(Index, 1);
                                          } else { 
                                            voteList.push(user);
                                          }
                                          this.setState({ votelist: voteList });
                                        }} />
                                        <span className="checkmark left-align votes" style={{cursor: 'pointer'}}></span>
                                      </label>
                                    </td>
                                    <td>{(auditTrailData.total != undefined && auditTrailData.total != 0 ? PAGE_LIMIT * (auditTrailData.page - 1) + 1 : 0) + index}</td>
                                    <td>{item.owner}</td>
                                    <td>{currentProducer == item.owner ? "Producing" : (index + 1) < 21 ? "Top 21" : "Standby"}</td>
                                    <td>{item.country}</td>
                                    <td>{Number(item.total_votes).toFixed(0)}</td>
                                    <td>{item.votePercentage}%</td>
                                    <td>{Number(item.dailyRewards).toFixed(4)}</td>
                                    <td>{Number(item.oracleReward).toFixed(4)}</td>
                                    <td>{Number(item.totalReward).toFixed(4)}</td>
                                  </tr>
                                )) : <tr><td className="text-center pt-5 pb-5" colspan="7">No Data Available</td></tr> : null}
                              </tbody>
                            </table>
                          </div>
                          <div className="row">
                            <div className="col-sm-12 col-md-5">
                              <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">{`Showing ${auditTrailData.total != undefined && auditTrailData.total != 0 ? PAGE_LIMIT * (page_no - 1) + 1 : 0} to ${auditTrailData.total != undefined ? PAGE_LIMIT * page_no < auditTrailData.total ? PAGE_LIMIT * page_no : auditTrailData.total : 0} of ${auditTrailData.total != undefined ? auditTrailData.total : 0} entries`}</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                <ReactPaginate
                                  previousLabel={'Previous'}
                                  nextLabel={'Next'}
                                  breakLabel={'...'}
                                  breakClassName={'break-me'}
                                  pageCount={auditTrailData.total_pages != undefined ? auditTrailData.total_pages : 0}
                                  marginPagesDisplayed={1}
                                  pageRangeDisplayed={1}
                                  onPageChange={(pagenum) => {
                                    this.setState({ page_no: pagenum.selected + 1 });
                                    clearInterval(TIMEOUT);
                                    this.getData(pagenum.selected + 1, true);
                                    TIMEOUT = setInterval(() => {
                                      this.getData(pagenum.selected + 1, true);
                                    }, 6000);
                                  }}
                                  containerClassName={'pagination mt-3'}
                                  subContainerClassName={'pages pagination'}
                                  activeClassName={'active'}
                                />
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
        </section>
      </div>
    );
  }
}


const mapStateToProps = ({ modal }) => {
  const { modalName } = modal;
  return { modalName };
};

const mapDispatchToProps = dispatch => ({
  openModal : payload => dispatch(actions.openSignInModal(payload)),
  closeModal: () => dispatch(actions.closeSignInModal()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Votes);

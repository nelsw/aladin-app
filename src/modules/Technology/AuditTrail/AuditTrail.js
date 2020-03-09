 /* eslint-disable */ 
import React, { Component } from 'react';
import Button from '../../../components/InputControls/Button/Button';
import './AuditTrail.css';
import '../../../assets/css/dataTables.min.css';
import Image from '../../../components/Image/Image';
import axois from '../../../Services';
import ReactPaginate from 'react-paginate';

let TIMEOUT;


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

class SDK extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auditTrailData: {},
      openRow: 0,
      page_no: 1,
      page_limit: 10,
      page_search: '',
      sort_key: '',
      sort_asc: true,
    }
  }

  componentWillMount() {
    const { page_no, page_limit } = this.state;
    this.getData(page_limit, page_no);
  }

  getData = async (page_limit, page_no, no_page_scroll) => {
    const { page_search } = this.state;
    let response = await axois.post('/users/auditTrailByReqId', {
      page_limit,
      page_no,
      reqId: page_search,
    });
    let res;
    if(response.data.data.page == undefined) {
      res = {
        data: [response.data.data],
        total_pages: 1,
        total: 1,
      }
    }
    this.setState({ auditTrailData: res != undefined ? res : response.data.data, page_search: '' });
    if(!no_page_scroll) {
      window.scrollTo(0, 0);
    }
  }

  getDataSearch = async (page_limit, page_no) => {
    const { page_search } = this.state;
    let response = await axois.post(`/users/auditTrailByReqId`, {
      page_limit,
      page_no,
      reqId: page_search,
    });
    let res = {
      data: [response.data.data],
      total_pages: 1,
      total: 1,
    }
    this.setState({ auditTrailData: res, page_search: '' });
    window.scrollTo(0, 0);
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
    if(sort_key == Key) {
      if(sort_asc) {
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
    this.setState({ auditTrailData: { ...auditTrailData, data: sortedData }, sort_key : Key, sort_asc: sortAsc });
  }

  

  

  render() {
    const { auditTrailData, openRow, page_no, page_limit, sort_key, sort_asc } = this.state;
    return (
      <div>
        <section className="m-50 ">
          <div className="container">
            <div className="row ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className="">
                  <div className="text-center">
                    <h1 className="sub-40 color-black ">Aladin Audit Trail</h1>
                    <div className="bor-upper mx-auto"></div>
                  </div>
                  {openRow != 0 ? (
                    <Button className="btn btn-primary mb-2" type="button" onClick={() => this.setState({ openRow: 0 })}>Back</Button>
                  ) : null}
                  <div className="common" id="datatable">
                  <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                  <div className="row">
                    <div className="col-sm-12">
                    {openRow != 0 ? (
                        <div className="table-responsive">
                          <table className="table data-table-example dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                            <thead>
                              <tr role="row">
                                <th className="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Transaction ID: activate to sort column descending" aria-sort="ascending">Request ID</th>
                                <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Block Producer: activate to sort column ascending">API</th>
                                <th className="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">API Response</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="even">
                                <td>{auditTrailData.data[openRow - 1].request_id}</td>
                                <td></td>
                                <td>{auditTrailData.data[openRow - 1].aggregated_response}</td>
                              </tr>
                              {auditTrailData.data[openRow - 1].api_set.map(api => (
                                <tr role="row" className="odd">
                                  <td></td>
                                  <td colspan="0">{api.api}</td>
                                  <td>{api.response}</td>
                                </tr>
                              ))}      
                            </tbody>  
                          </table>
                        </div>
                      ) : (
                        <>
                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                            <div className="dataTables_length" id="DataTables_Table_0_length"><label>Show 
                              <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm" onChange={(e) => {
                                let curr_limit = page_limit;
                                let newpagenum = Math.floor(((curr_limit * (page_no - 1)) + 1) / Number(e.target.value))
                                this.setState({ page_limit: Number(e.target.value), page_no: newpagenum == 0 ? 1 : newpagenum });
                                this.getData(Number(e.target.value), newpagenum == 0 ? 1 : newpagenum)
                              }}>
                                  <option value="10">10</option>
                                  <option value="25">25</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                              </select> entries</label></div>
                          </div>
                          <div className="col-sm-12 col-md-6">
                            <div id="DataTables_Table_0_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder="Request ID" aria-controls="DataTables_Table_0" onChange={(e) => {
                              this.setState({ page_search: e.target.value });
                              clearTimeout(TIMEOUT);
                              TIMEOUT = setTimeout(() => {
                                this.getData(page_limit, page_no)
                              }, 1000);
                            }} /></label></div>
                          </div>
                        </div>
                      <div className="table-responsive">
                        <table className="table data-table-example dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                          <thead>
                            <tr role="row">
                              <th className={sort_key == 'request_id' ?  sort_asc ? "sorting_asc" : "sorting_desc" : "sorting"} tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Transaction ID: activate to sort column descending" onClick={() => this.sortData('request_id')}>Request ID</th>
                              <th className={sort_key == 'caller' ?  sort_asc ? "sorting_asc" : "sorting_desc" : "sorting"} tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Block Producer: activate to sort column ascending" onClick={() => this.sortData('caller')}>Client Contract</th>
                              <th className={sort_key == 'response_type' ?  sort_asc ? "sorting_asc" : "sorting_desc" : "sorting"} tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending" onClick={() => this.sortData('response_type')}>Response Type</th>
                              <th className={sort_key == 'aggregation_type' ?  sort_asc ? "sorting_asc" : "sorting_desc" : "sorting"} tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending" onClick={() => this.sortData('aggregation_type')}>Aggregation Type</th>
                              <th className={sort_key == 'oracle_account' ?  sort_asc ? "sorting_asc" : "sorting_desc" : "sorting"} tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Block: activate to sort column ascending" onClick={() => this.sortData('oracle_account')}>Block Producer</th>
                              <th className={sort_key == 'time' ?  sort_asc ? "sorting_asc" : "sorting_desc" : "sorting"} tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Smart Contract: activate to sort column ascending" onClick={() => this.sortData('time')}>Time</th>
                              <th className="" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Response</th>
                            </tr>
                          </thead>
                          <tbody>
                            {auditTrailData.data != undefined ? auditTrailData.data.length != 0 ? auditTrailData.data.map((item, index) => (
                              <tr role="row" className="even" onClick={()=>{
                                this.setState({ openRow: index + 1 == openRow ? 0 : index + 1 });
                                window.scrollTo(0, 0);
                              }}>
                                <td className="sorting_1">{item.request_id}</td>
                                <td>{item.caller}</td>
                                <td>{item.response_type}</td>
                                <td>{item.aggregation_type}</td>
                                <td>{item.oracle_account}</td>
                                <td>{item.time}</td>
                                <td>{item.aggregated_response}</td>
                              </tr>
                            )) : <tr><td className="text-center pt-5 pb-5" colspan="7">No Data Available</td></tr> : null}
                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                    <div className="col-sm-12 col-md-5">
                      <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">{`Showing ${auditTrailData.total != undefined && auditTrailData.total != 0 ? page_limit * (page_no - 1) + 1 : 0} to ${auditTrailData.total != undefined ? page_limit * page_no < auditTrailData.total ? page_limit * page_no : auditTrailData.total : 0} of ${auditTrailData.total != undefined ? auditTrailData.total : 0} entries`}</div>
                    </div>
                    <div className="col-sm-12 col-md-7">
                      <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                        {/* <ul className="pagination">
                          <li className={page_no > 1 ? "paginate_button page-item previous" : "paginate_button page-item previous disabled"} id="DataTables_Table_0_previous"><span aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" className="page-link" onClick={() => {
                            this.setState({ page_no: page_no - 1 });
                            this.getData(page_limit, page_no - 1, true);
                          }}>Previous</span></li>
                          <li className="paginate_button page-item active"><span aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" className="page-link">{page_no}</span></li>
                          <li className={page_no < auditTrailData.total_pages ? "paginate_button page-item next" : "paginate_button page-item next disabled"} id="DataTables_Table_0_next"><span aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" className="page-link" onClick={() => {
                            this.setState({ page_no: page_no + 1 });
                            this.getData(page_limit, page_no + 1, true);
                          }}>Next</span></li>
                        </ul> */}
                        <ReactPaginate
                          previousLabel={'Previous'}
                          nextLabel={'Next'}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={auditTrailData.total_pages}
                          marginPagesDisplayed={1}
                          pageRangeDisplayed={1}
                          onPageChange={(pagenum) => {
                            this.setState({ page_no: pagenum.selected + 1 });
                            this.getData(page_limit, pagenum.selected + 1, true);
                          }}
                          containerClassName={'pagination mt-3'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                        />
                      </div>
                      
                    </div>
                  </div>
                  
                      </>
                      )
                    }
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

export default SDK;

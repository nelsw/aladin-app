import React, { Component } from 'react';
import Button from '../../../components/InputControls/Button/Button';
import '../../../assets/css/dataTables.min.css';
import axois from '../../../Services';
import ReactPaginate from 'react-paginate';
import 'react-dropzone-uploader/dist/styles.css';
import { UserSession } from 'aladinjs';
import { appConfig } from '../../../constants/constants'
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { NavLink } from 'react-router-dom';

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
let tokenFiles = [];


class FileManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openRow: 0,
      page_no: 1,
      page_limit: 10,
      page_search: '',
      sort_key: '',
      sort_asc: true,
      showUploader: false,
      flagFile: false,
      fileList: null,
      originalList: null,
      test: false,
      showLoader: false,
      uploadSuccess: false,
      page_search: '',
      fileError: false,
      fileErrorMsg: '',
      loader: false,

    }
    this.refOpenImg = React.createRef();
  }

  componentWillMount() {
    this.listFiles();
  }

  listFiles = async () => {
    // force mainnet addresses
    // TODO
    let count = 0;
    let fileList = [];
    await this.props.userSession.listFiles((name) => {
      // print out incrementally
      let test = name.split("-");
      test.splice(0, 3);
      fileList.push({ index: count + 1, name: test.join('_'), originalName: name, loader: false });
      count += 1;
      return true;
    });
    this.setState({ fileList, originalList: fileList });
  }

  deleteFile = (fileName, file) => {
    const { openModal } = this.props;
    // let file = fileName;
    // let file = value.name;
    // let fileName = value.originalName;
    let name = fileName.split("_");
    name.splice(0, 1);

    openModal({
      title: 'Delete confirmation',
      body: [
        <p>Are you sure you want to delete <strong>{file}</strong>?</p>
      ],
      buttonName: 'Confirm',
      buttonClick: (data) => {
        this.confirmAction(data)
      },
      cancelButton: this.cancelAction,
      modalName: 'deleteFile',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      data: fileName,
    });
  }

  cancelAction = () => {
    const { closeSignInModal } = this.props;
    closeSignInModal();
  }

  confirmAction = async (fileName) => {
    const { openModal, openSuccessModal, closeSuccessModal } = this.props;

    this.props.userSession.deleteFile(fileName).then(() => {
      openSuccessModal({
        title: 'Success',
        message: `File deleted successfully.`,
        modalStatus: 2,
        showIcon: true,
        buttonClick: closeSuccessModal,
      });
      this.listFiles();
      this.props.closeSignInModal();

    });
  }

  getData = async (page_limit, page_no, no_page_scroll) => {
    const { page_search } = this.state;
    let response = await axois.post('/users/auditTrailByReqId', {
      page_limit,
      page_no,
      reqId: page_search,
    });
    let res;
    if (response.data.data.page == undefined) {
      res = {
        data: [response.data.data],
        total_pages: 1,
        total: 1,
      }
    }
    this.setState({ auditTrailData: res != undefined ? res : response.data.data, page_search: '' });
    if (!no_page_scroll) {
      window.scrollTo(0, 0);
    }
  }

  getUploadParams = ({ meta }) => {
    const url = 'https://httpbin.org/post';
    const fileUrl = `${url}/${encodeURIComponent(meta.name)}`;
    return { url, meta: { fileUrl } };
  }

  downloadFile(filename, index) {
    // console.log(name);
    // let filename = name.originalName;
    // let index = name.index;


    let a = this.state.fileList.slice(); //creates the clone of the state
    a[index - 1].loader = true;
    this.setState({ fileList: a });

    const options = { decrypt: true };
    // let test = filename.split("-")[3];
    this.props.userSession.getFile(`${encodeURIComponent(filename)}`, options)
      .then((content) => {
        a[index - 1].loader = false;
        this.setState({ fileList: a });
        // console.log('content', content);
        if (content) {

          var blob = new Blob([content]);
          var url = URL.createObjectURL(blob);

          var element = document.createElement('a');
          // let name = filename.split('_');
          // name.splice(0, 1);
          // // let name = filename.split("-")[3];
          // // name.splice(0, 1);
          // // console.log("name", name)
          element.setAttribute('href', url);
          element.setAttribute('download', filename);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
      });
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

  getResult = (value) => {
    const { originalList } = this.state;
    let result = [];
    // if(value.length > 0) {
    originalList.map(item => {
      if (item.name.toLowerCase().includes(value.toLowerCase())) {
        result.push({ ...item, index: result.length + 1 });
      }
      this.setState({ fileList: result });
    })
    // } else if (value.length == 0) {
    //   this.listFiles();
    // }

  }

  uploadFiles = async (files) => {
    this.props.uploadFile({ files: Array.from(files), closeModal: this.props.closeSuccessModal, listFiles: this.listFiles });
    // let validFiles = [];

    // await Array.from(files).map(item => {
    //   if(
    //     item.name.toLowerCase().split(".")[1] == "psd" ||
    //     item.name.toLowerCase().split(".")[1] == "ppt" 
    //   ) {
    //     this.setState({fileError: true, fileErrorMsg: 'psd or ppt files are not supported'});
    //   } else {
    //     this.setState({fileError: false, fileErrorMsg: ''});
    //     validFiles.push(item);
    //     // this.props.uploadFile({files: Array.from(files), closeModal: this.props.closeSuccessModal, listFiles: this.listFiles});
    //   }
    // });
    // this.props.uploadFile({files: validFiles, closeModal: this.props.closeSuccessModal, listFiles: this.listFiles});
  }


  sortData = (Key) => {
    const { fileList, sort_key, sort_asc } = this.state;
    // let sortedData = auditTrailData.data.sort((a, b) => {
    //   return a[Key].toString().localCompare(b[Key], 'en', { sensitivity: 'base' });
    // });
    let sortAsc;
    let sortedData;
    if (sort_key == Key) {
      if (sort_asc) {
        sortedData = fileList.sort((a, b) => isNaN(b[Key]) ? b[Key].toLowerCase() < a[Key].toLowerCase() ? -1 : 1 : b[Key] < a[Key] ? -1 : 1);
        sortAsc = false;
      } else {
        sortedData = fileList.sort((a, b) => isNaN(a[Key]) ? a[Key].toLowerCase() < b[Key].toLowerCase() ? -1 : 1 : a[Key] < b[Key] ? -1 : 1);
        sortAsc = true;
      }
    } else {
      sortedData = fileList.sort((a, b) => isNaN(a[Key]) ? a[Key].toLowerCase() < b[Key].toLowerCase() ? -1 : 1 : a[Key] < b[Key] ? -1 : 1);
      sortAsc = true;
    }
    // let sortedData = fileList.sort(function(a, b){ return sort(a, b)})
    this.setState({ fileList, sort_key: Key, sort_asc: sortAsc });
  }

  selectFile = (e) => {
    this.setState({ flagFile: true });
  }

  maxFiles = () => {
    this.setState({ fileError: true, fileErrorMsg: 'You can select upto 5 files' })
  }

  render() {
    const { fileList, fileError, fileErrorMsg, sort_key, sort_asc, openRow, page_limit, page_no } = this.state;
    // const { modalName } = this.props;
    console.log('file list', fileList);

    // if (modalName != '' && this[modalName] != undefined && modalName == 'deleteFile') {
    //   this[modalName]();
    // }
    return (
      <div>
        <section className="">
          <div className="container  padingbt-40 back-color">
            <div className="row ">
              <div className="col-lg-7 col-md-9 col-sm-12 col-xs-12 mx-auto">
                <div className="">
                  <NavLink to="/profile">
                    <Button className="btn btn-primary mb-2" type="button">Back</Button>
                  </NavLink>
                  <div className="text-center">
                    <h1 className="sub-40 color-black ">Aladin File Manager</h1>
                    <div className="bor-upper mx-auto"></div>
                  </div>
                  {/* {openRow != 0 ? (
                    <Button className="btn btn-primary mb-2" type="button" onClick={() => this.setState({ openRow: 0 })}>Back</Button>
                  ) : null} */}
                  <p className="text-center"> File Manager allows you to store the files in an encrypted manner.</p>
                  <div className={this.state.showUploader ? "mb-5" : "text-right"}>
                    <div className="text-center">

                      {!this.props.fileLoader ?
                        <div class="input-box">
                          <input type="file" name="file" class="inputfile inputfile-4" multiple onChange={
                            async e => {
                              const { openModal, openSuccessModal, closeSuccessModal } = this.props;
                              let tasks = e.target.files;
                              // console.log(tasks);
                              if (tasks.length != 0 && tasks.length < 6) {
                                // this.setState({showLoader: true});
                                this.uploadFiles(tasks);
                              } else {
                                this.maxFiles();
                              }
                            }
                          } />
                          {/* <input type="file" name="file-5[]" id="file-5" class="inputfile inputfile-4" data-multiple-caption="{count} files selected" multiple=""> */}
                          <label for="file-5"><figure><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg></figure> <span>Choose a file…</span></label>
                        </div>
                        :
                        <div className="mb-2" style={{ display: 'inline-block' }}><i style={{ color: '#bf2227' }} className="fa fa-circle-o-notch fa-spin"></i> <span>Uploading</span> </div>
                      }

                      {fileError ? <p>{fileErrorMsg}</p> : null}

                    </div>

                  </div>

                  <div className="common" id="datatable">
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div className="row">
                        <div className="col-sm-12">
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

                                <div id="DataTables_Table_0_filter" className="dataTables_filter"><label>Search:<input type="search" className="form-control form-control-sm" placeholder="Enter file name" aria-controls="DataTables_Table_0" onChange={(e) => {

                                  this.setState({ page_search: e.target.value });
                                  this.getResult(e.target.value);

                                }} /></label></div>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <table className="table data-table-example dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                <thead>
                                  <tr role="row">
                                    <th className={sort_key == 'index' ? sort_asc ? "sorting_asc" : "sorting_desc" : "sorting"} tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Transaction ID: activate to sort column descending" onClick={() => this.sortData('index')}>No</th>
                                    <th className={sort_key == 'name' ? sort_asc ? "sorting_asc" : "sorting_desc" : "sorting"} tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Block Producer: activate to sort column ascending" onClick={() => this.sortData('name')}>File name</th>
                                    <th className="" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Download</th>

                                    <th className="" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Delete</th>
                                  </tr>
                                </thead>
                                <tbody style={{ maxHeight: '200px', overflow: 'scroll' }}>
                                  {fileList != null ? fileList.length != 0 ? fileList.slice((fileList != null && fileList != 0 ? page_limit * (page_no - 1) + 1 : 0) - 1, fileList != null ? page_limit * page_no < fileList.length ? page_limit * page_no : fileList.length : 0).map((item, index) => (
                                    <tr role="row" className="even" onClick={() => {
                                      this.setState({ openRow: index + 1 == openRow ? 0 : index + 1 });
                                    }}>
                                      <td className="sorting_1">{item.index}</td>
                                      <td>{item.name}</td>
                                      <td className="text-left" onClick={() => this.downloadFile(item.originalName, item.index)}>{item.loader ? <div style={{ display: 'inline-block' }}><i style={{ color: '#38904c' }} className="fa fa-circle-o-notch fa-spin" /> </div> : <i className="fa fa-download fa-lg" style={{ color: '#38904c' }}></i>} </td>

                                      <td className="text-left"><span onClick={() => this.deleteFile(item.originalName, item.name)}><i className="fa fa-trash fa-lg color-red" /></span></td>
                                    </tr>
                                  )) : <tr><td className="text-center pt-5 pb-5" colspan="7">No files available</td></tr>
                                    : <tr><td className="text-center pt-5 pb-5" colspan="7">Fetching your files...</td></tr>}
                                </tbody>
                              </table>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 col-md-5">
                                <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">{`Showing ${fileList != null && fileList != 0 ? page_limit * (page_no - 1) + 1 : 0} to ${fileList != null ? page_limit * page_no < fileList.length ? page_limit * page_no : fileList.length : 0} of ${fileList != null ? fileList.length : 0} entries`}</div>
                                {/* <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">{`Showing ${auditTrailData.total != undefined && auditTrailData.total != 0 ? page_limit * (page_no - 1) + 1 : 0} to ${auditTrailData.total != undefined ? page_limit * page_no < auditTrailData.total ? page_limit * page_no : auditTrailData.total : 0} of ${auditTrailData.total != undefined ? auditTrailData.total : 0} entries`}</div> */}
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
                                    pageCount={fileList != null ? Math.ceil(fileList.length / page_limit) : 0}
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
                            {fileList ? console.log('=>>>>', fileList, (fileList != null && fileList != 0 ? page_limit * (page_no - 1) + 1 : 0) - 1, page_limit, fileList.slice((fileList != null && fileList != 0 ? page_limit * (page_no - 1) + 1 : 0) - 1, page_limit)) : null}
                          </>
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

FileManager.defaultProps = {
  userSession: new UserSession(appConfig)
};

const mapStateToProps = ({ profile, modal }) => {
  const { disabledButton, fileLoader, uploaded } = profile;
  const { modalName } = modal;
  return { disabledButton, modalName, fileLoader, uploaded };
}

const mapDispatchToProps = dispatch => ({
  openModal: payload => dispatch(actions.openSignInModal(payload)),
  closeSignInModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  uploadFile: payload => dispatch(actions.uploadFile(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FileManager);

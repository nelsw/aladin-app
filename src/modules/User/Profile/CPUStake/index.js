import React, { Component } from "react";
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import * as actions from '../../../../actions';
import { Input, FormFeedback } from 'reactstrap';
import Button from '../../../../components/InputControls/Button/Button.jsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {BP_ENDPOINT} from '../../../../constants/constants';
class Stakes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 0,
            secretRecoveryCodeCopied:false,
            copied: false,    
            blockProducerflag: false,
            dappDeveloperFlag: false,
            voterFlag: false,        
        }
    }
    componentWillMount() {
        this.props.getAccountDetails();
    }
    copySecretKey = () => {
        this.setState({ secretRecoveryCodeCopied: true });
        setTimeout(() => {
          this.setState({ secretRecoveryCodeCopied: false });
        }, 1000);
      };
      onCopyHandler = () => {
        this.setState({ copied: true });
    
        setTimeout(() => {
          this.setState({ copied: false });
        }, 1000);
      };
      openStakeModal = () => {
        const {
          openModal,
          closeModal,
          disabledButton,
          onDisabledButton,
          cpuAmount,
          netAmount
        } = this.props;
        const { currentUser } = JSON.parse(localStorage.getItem('userData'));
        const { copied } = this.state;
        let cleos = this.state.currentTab == 0 ?
             `alacli -u ${BP_ENDPOINT} system delegatebw ${currentUser} ${currentUser} "${parseFloat(netAmount.value).toFixed(4)} ALA" "${parseFloat(cpuAmount.value).toFixed(4)} ALA"`
              : this.state.currentTab == 1 ? 
              `alacli -u ${BP_ENDPOINT} system undelegatebw  ${currentUser} ${currentUser} "${parseFloat(netAmount.value).toFixed(4)} ALA" "${parseFloat(cpuAmount.value).toFixed(4)} ALA"`
              :this.state.currentTab == 2 ? `alacli -u ${BP_ENDPOINT} system buyram ${currentUser} ${currentUser} "${parseFloat(netAmount.value).toFixed(4)} ALA"` : "";
        openModal({
          title: 'alacli Command',
          body: [
            <div>
          <p>Copy the below command</p>
            <p className="color-red mt-3">{cleos}</p>
             <CopyToClipboard text={cleos} onCopy={this.onCopyHandler}
            //  onCopy={this.copySecretKey}
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
          buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Send',
          cancelButton: closeModal,
          cancelButtonFlag: false,
          modalName: 'openStakeModal',
          hideButton:true
        });
      };
      onSelectBP = () => {
        this.setState({blockProducerflag: true, dappDeveloperFlag: false, voterFlag: false});
      }
    
      onSelectDP = () => {
        this.setState({blockProducerflag: false, dappDeveloperFlag: true, voterFlag: false});
      }
    
      onSelectVoter = () => {
        this.setState({blockProducerflag: false, dappDeveloperFlag: false, voterFlag: true});
      }

      closeAndClear = () => {
        this.props.closeModal();
        this.setState({blockProducerflag: false, dappDeveloperFlag: false, voterFlag: false});
      };

      claimReward = () => {
        const { openModal } = this.props;
        const { blockProducerflag, dappDeveloperFlag, voterFlag, copied } = this.state; 
        const { currentUser } = JSON.parse(localStorage.getItem('userData'));
        let bpCommand = `alacli -u ${BP_ENDPOINT} system claimrewards ${currentUser}`;
        let dpCommand = `alacli -u ${BP_ENDPOINT} push action alaio claimdapprwd    '["dappregistry", "${currentUser}", "YOUR_DAPP_NAME"]' -p ${currentUser}@active`;
        let voterCommand = `alacli -u ${BP_ENDPOINT} push action alaio claimvoterwd '["${currentUser}"]' -p ${currentUser}`;
    
        openModal({
          title: 'Claim Reward using these commands',
          body: [
            <div>
               <div className="custom-control custom-radio custom-control-inline mr-3 mt-3">
                  <input id="inlineRadio1"
                    className="custom-control-input"
                    defaultChecked={this.state.blockProducerflag}
                    type="radio"
                    name="inlineRadioOptions"
                    style={{ cursor: 'pointer' }}
                    onChange={this.onSelectBP}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="inlineRadio1"
                  >
                    Block Producer
                   </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mr-3 mt-3">
                  <input id="inlineRadio2"
                    className="custom-control-input"
                    defaultChecked={this.state.dappDeveloperFlag}
                    type="radio"
                    name="inlineRadioOptions"
                    style={{ cursor: 'pointer' }}
                    onChange={this.onSelectDP}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="inlineRadio2"
                  >
                    DApp Developer
                   </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline mr-3 mt-3">
                  <input id="inlineRadio3"
                    className="custom-control-input"
                    defaultChecked={this.state.voterFlag}
                    type="radio"
                    name="inlineRadioOptions"
                    style={{ cursor: 'pointer' }}
                    onChange={this.onSelectVoter}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="inlineRadio3"
                  >
                    Voter
                   </label>
                </div>
              {this.state.blockProducerflag ? 
              <div>
              <p className="color-red mt-3"> {bpCommand} </p>
              <CopyToClipboard text={bpCommand} onCopy={this.onCopyHandler}
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
                 </div> : null
              }
              {this.state.dappDeveloperFlag ? 
              <div>
              <p className="color-red mt-3">{dpCommand} </p>
              <CopyToClipboard text={dpCommand} onCopy={this.onCopyHandler}
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
                 </div> : null
              }
              {this.state.voterFlag ? 
              <div>
              <p className="color-red mt-3">{voterCommand} </p>
              <CopyToClipboard text={voterCommand} onCopy={this.onCopyHandler}
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
                 </div> : null
              }
            </div>,
          ],
          buttonClick: this.generateQR,
          // buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Request',
          cancelButton: this.closeAndClear,
          hideButton: true,
          cancelButtonFlag: true,
          cancelButtonName: 'Cancel',
          modalName: 'claimReward',
        });
      }
    
    render() {
        const { accountDetails, cpuAmount, netAmount, cpuStakeAmountChanged, netStakeAmountChanged,clearStakeAmounts, modalName } = this.props;
        if (modalName != '' && this[modalName] != undefined) {
            this[modalName]();
        }

        return (
            <>
             <div class="bg-img1  d-flex align-items-center">
             <div class="container padbt-40 text-center  back-color mng-resrc">
                <div className="width-460">
                  <div className="col-xs-12">
                <div id="resource-btn" className="text-left">
                    <NavLink to="/profile">
                        <Button className="btn btn-primary" type="button">
                            Back
                        </Button>
                    </NavLink>
                    <Button
                          className="btn ml-5 mr-5 btn-secondary"
                          onClick={this.claimReward}
                        >
                          Claim Reward
                        </Button>
                        <Link
                          className="btn btn-secondary"
                          // onClick={()=>this.setState({view: 2})}
                          to="/votes"
                        >
                          Vote
                        </Link>
                </div>
                </div>
                <div class="container mt-3" id="meta-datbp">
                <h4><b>Manage Resources</b></h4>
                <div class="bor-upper mx-auto"></div>
                <div className="width-300">
                    {
                        accountDetails != undefined ?
                            <>
                                <p><label>Liquid Balance:</label>{accountDetails.core_liquid_balance ? accountDetails.core_liquid_balance : '0 ALA'}</p>
                                <p><label> RAM:</label> {(Number(accountDetails.ram_quota))/1000000} kb</p>
                                <p><label> Staked CPU:</label> {(Number(accountDetails.cpu_weight))/10000} ALA</p>
                                <p><label> Staked Net:</label> {(Number(accountDetails.net_weight))/10000} ALA</p>
                            </>
                            : ""
                    }
                </div>
                    {/* <h2>Toggleable Tabs</h2> */}
                    <br />
                    <div className="row" id="stake"><div className="col-lg-12 mx-auto col-sm-12 col-12" >
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#home"
                            onClick={()=> {this.setState({currentTab:0});
                            if(this.state.currentTab != 0)
                            clearStakeAmounts()
                            }}>Stake</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#menu1"
                            onClick={()=> {this.setState({currentTab:1});
                            if(this.state.currentTab !=1)
                            clearStakeAmounts()
                            }}>Unstake</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#menu2"
                             onClick={()=> {this.setState({currentTab:2});
                            if(this.state.currentTab !=2)
                            clearStakeAmounts()
                            }}>Buy RAM</a>
                        </li>
                    </ul>

                    <div class="tab-content" >
                        <div id="home" class="container width-460 tab-pane active"><br />
                            <Input
                                type="number"
                                name="text"
                                placeholder="Amount of CPU to Stake (in ALA)"
                                valid={
                                    cpuAmount.isTouched && cpuAmount.isValid
                                }
                                invalid={
                                    cpuAmount.isTouched && !cpuAmount.isValid
                                }
                                onChange={e => cpuStakeAmountChanged(e.target.value)}
                                value={cpuAmount.value}
                                // disabled={disabledInputs}
                                required
                            />
                            <FormFeedback
                                style={{ textAlign: 'left' }}
                                valid={cpuAmount.isValid}
                                invalid={!cpuAmount.isValid}
                            >
                                {cpuAmount.message}
                            </FormFeedback>
                            <br />
                            <Input
                                type="number"
                                name="text"
                                placeholder="Amount of NET to Stake (in ALA)"
                                valid={
                                    netAmount.isTouched && netAmount.isValid
                                }
                                invalid={
                                    netAmount.isTouched && !netAmount.isValid
                                }
                                onChange={e => netStakeAmountChanged(e.target.value)}
                                value={netAmount.value}
                                // disabled={disabledInputs}
                                required
                            />
                            <FormFeedback
                                style={{ textAlign: 'left' }}
                                valid={netAmount.isValid}
                                invalid={!netAmount.isValid}
                            >
                                {netAmount.message}
                            </FormFeedback>
                            <br />
                            <div id="Storage-pro"><Button
                                className="btn  mt-2 btn-primary"
                                // data-toggle="modal"
                                // data-target="#modalsentForm"
                                type="button"
                                onClick={this.openStakeModal}
                                disabled = {!netAmount.isValid || !cpuAmount.isValid}
                            >
                                Stake
                      </Button></div>
                           
                        </div>
                        <div id="menu1" class="container width-460 tab-pane fade"><br />
                        
                            <Input
                                type="number"
                                name="text"
                                placeholder="Amount of CPU to Unstake (in ALA)"
                                valid={
                                    cpuAmount.isTouched && cpuAmount.isValid
                                }
                                invalid={
                                    cpuAmount.isTouched && !cpuAmount.isValid
                                }
                                onChange={e => cpuStakeAmountChanged(e.target.value)}
                                value={cpuAmount.value}
                                // disabled={disabledInputs}
                                required
                            />
                            <FormFeedback
                                style={{ textAlign: 'left' }}
                                valid={cpuAmount.isValid}
                                invalid={!cpuAmount.isValid}
                            >
                                {cpuAmount.message}
                            </FormFeedback>
                            <br />
                            <Input
                                type="number"
                                name="text"
                                placeholder="Amount of NET to Unstake (in ALA)"
                                valid={
                                    netAmount.isTouched && netAmount.isValid
                                }
                                invalid={
                                    netAmount.isTouched && !netAmount.isValid
                                }
                                onChange={e => netStakeAmountChanged(e.target.value)}
                                value={netAmount.value}
                                // disabled={disabledInputs}
                                required
                            />
                            <FormFeedback
                                style={{ textAlign: 'left' }}
                                valid={netAmount.isValid}
                                invalid={!netAmount.isValid}
                            >
                                {netAmount.message}
                            </FormFeedback>
                            <br />
                            <div id="Storage-pro">
                            <Button
                                className="btn  mt-2 btn-primary"
                                // data-toggle="modal"
                                // data-target="#modalsentForm"
                                type="button"
                                onClick={this.openStakeModal}
                                disabled = {!netAmount.isValid || !cpuAmount.isValid}
                            >
                                Unstake
                      </Button>
                      </div>
                        </div>
                        <div id="menu2" class="container width-460 tab-pane fade"><br />
                        <Input
                                type="number"
                                name="text"
                                placeholder="Amount of RAM to Buy in ALA"
                                valid={
                                    netAmount.isTouched && netAmount.isValid
                                }
                                invalid={
                                    netAmount.isTouched && !netAmount.isValid
                                }
                                onChange={e => netStakeAmountChanged(e.target.value)}
                                value={netAmount.value}
                                // disabled={disabledInputs}
                                required
                            />
                            <FormFeedback
                                style={{ textAlign: 'left' }}
                                valid={netAmount.isValid}
                                invalid={!netAmount.isValid}
                            >
                                {netAmount.message}
                            </FormFeedback>
                            <br />
                            <div id="Storage-pro">
                            <Button
                                className="btn  mt-2 btn-primary"
                                // data-toggle="modal"
                                // data-target="#modalsentForm"
                                type="button"
                                onClick={this.openStakeModal}
                                disabled = {!netAmount.isValid}
                            >
                                BuyRam
                      </Button>
                      </div>
                        </div>
                    </div>

                </div>
                </div></div>
                </div>
           </div>
           </div> </>

        );
    }
}

const mapStateToProps = ({ auth, profile, modal }) => {
    const { balance, qrCode, usdBalance } = auth;
    const { accountDetails, cpuAmount, netAmount } = profile;
    const { modalName } = modal;
    return { balance, qrCode, usdBalance, accountDetails, cpuAmount, netAmount, modalName };
};

const mapDispatchToProps = dispatch => ({
    getAccountDetails: () => dispatch(actions.getAccountDetails()),
    cpuStakeAmountChanged: payload => dispatch(actions.cpuStakeAmountChanged(payload)),
    netStakeAmountChanged: payload => dispatch(actions.netStakeAmountChanged(payload)),
    openModal : payload => dispatch(actions.openSignInModal(payload)),
    closeModal: () => dispatch(actions.closeSignInModal()),
    clearStakeAmounts:() => dispatch(actions.clearStakeAmounts())


});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stakes);
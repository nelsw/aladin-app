/* eslint-disable */ 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, FormFeedback, Form } from 'reactstrap';
import Image from '../../../components/Image/Image';
//import CheckoutForm from '../../Signup/CheckoutForm';
//import { StripeProvider, Elements, } from 'react-stripe-elements';
import Button from '../../../components/InputControls/Button/Button';
// import Input from '../../../components/InputControls/Input/Input';
import * as actions from '../../../actions';
import { USERNAME_POSTFIX, FRONT_URL } from '../../../constants/constants';
import Qrcode from 'qrcode.react';
import { WhatsappShareButton, EmailShareButton, WhatsappIcon, EmailIcon } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BP_ENDPOINT } from '../../../constants/constants';
import ReactPaginate from 'react-paginate';
import axois from '../../../Services';
import { Link,Redirect } from 'react-router-dom';
import moment from 'moment';
var CryptoJS = require("crypto-js");

let TIMEOUT;

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionHistory: null,
      view: 1,
      openRow: 0,
      page_no: 1,
      page_limit: 10,
      total_page:1,
      page_search: '',
      sort_key: '',
      sort_asc: true,
      copied: false,
      blockProducerflag: false,
      dappDeveloperFlag: false,
      voterFlag: false,
      total_trans:0
    };
  }

  handleClick= item => {
   
  }
  componentWillMount = () => {
    const { getBalance, userName, ALAPrice } = this.props;
    const { page_no, page_limit } = this.state;
    getBalance();
    this.getData(10,1);
    this.props.hideLoader();
    this.props.onDisabledButton();
    if (this.props.match.params.data != undefined) {
      // this.props.history.location.pathname
      TIMEOUT = setInterval(() => {
        const { ALAPrice } = this.props;
        if(ALAPrice != 0) {
          let DATA = JSON.parse(CryptoJS.AES.decrypt(this.props.history.location.pathname.replace('/wallet/', ''), 'aladin-2019').toString(CryptoJS.enc.Utf8));
          // let AMOUNT = (CryptoJS.AES.decrypt(this.props.match.params.amount, 'aladin-2019').toString(CryptoJS.enc.Utf8));
    
          
          this.props.onStoreAddressOfReciever(DATA.User);
          this.props.onStoreWalletAmmount( Math.ceil(DATA.Amount / ALAPrice) );
          this.openTokenModal();
          clearInterval(TIMEOUT);
        }
      }, 1000);
    } 
   
  }

  componentDidMount = () => {
    const { userName } = this.props;
    window.scrollTo(0, 0);
  }

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  }

  getData = async (pageLimit,pageNo,Con) => {
    const { page_no, page_limit } = this.state;

    var myHeaders = new Headers();
    const { currentUser } = JSON.parse(localStorage.getItem('userData'));
    myHeaders.append("Content-Type", "text/plain");
    let start = pageLimit*(pageNo - 1);
    let end = pageLimit * pageNo;
    // console.log("TCL: Wallet -> -> end", start,end)
    
    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: JSON.stringify({
    //     name: currentUser,
    //     start,
    //     end
    //   }),
    //   redirect: 'follow'
    // };
    let response = await axois.post('https://api.aladinnetwork.org/users/explorer',{
      name: currentUser,
        start,
        end
      });
      if(response.status == 200 ){
        let totalPages= Math.ceil(response.data.data.total_transaction / pageLimit);
        // console.log("TCL: Wallet -> getData -> totalPages ", totalPages)
      this.setState({ transactionHistory: response.data.data.outTxHistory,total_page:totalPages,total_trans:response.data.data.total_transaction});
    }
    
  }

  closeSuccessModal = () => {
    const { closeSuccessModal } = this.props;
    closeSuccessModal();
  };

  openSuccessModal = () => {
    // console.log('TCL: Wallet -> Success -> click');
    const {
      recieverWalletAddress,
      storeWalletAmmount,
      storePasswordOnSendTokken,
      openSuccessModal,
      closeModal,
      sendTokkenData,
      balance,
      closeSuccessModal,
      onDisabledButton,
    } = this.props;
    onDisabledButton(true);
    if (
      recieverWalletAddress.value.length > 0 &&
      (storeWalletAmmount.value.length > 0 || !isNaN(storeWalletAmmount.value)) &&
      storePasswordOnSendTokken.value.length > 0
    ) {
      sendTokkenData({
        receiver: `${recieverWalletAddress.value.trim()}`,
        amount: `${storeWalletAmmount.value} ALA`,
        password: storePasswordOnSendTokken.value,
        closeModal: this.closeSuccessModal,
        accountNo: this.props.accountNo,
      });
    }
  };

  closeAndClear = () => {
    this.props.clearSendTokkenData();
    this.props.sendTokenError('');
    this.props.onStorePasswordOnSendTokken(null);
    this.props.closeModal();
  };

  openTokenModal = (data) => {
    const {
      openModal,
      recieverWalletAddress,
      storeWalletAmmount,
      storePasswordOnSendTokken,
      onStoreAddressOfReciever,
      onStoreWalletAmmount,
      onStorePasswordOnSendTokken,
      disabledButton,
      onDisabledButton,
    } = this.props;
    if(data != undefined) {
      let amount = Number(data.amount);
    }

    openModal({
      title: 'Send Token',
      body: [
        <div>
          <Input
            type="text"
            name="user"
            className="form-control mt-3  pl-3"
            placeholder="Enter receiver's account"
            valid={
              recieverWalletAddress.isTouched && recieverWalletAddress.isValid
            }
            invalid={
              recieverWalletAddress.isTouched && !recieverWalletAddress.isValid
            }
            onChange={e => {
              onDisabledButton(false);
              onStoreAddressOfReciever(e.target.value);
              if (storePasswordOnSendTokken.value != '') {
                onStorePasswordOnSendTokken(storePasswordOnSendTokken.value);
              }
            }}
            value={recieverWalletAddress.value}
            // value={data != undefined && data.user != undefined ? data.user.split('.')[0] : null}
          />
          <FormFeedback
            style={{ textAlign: 'left' }}
            valid={recieverWalletAddress.isValid}
            invalid={!recieverWalletAddress.isValid}
          >
            {recieverWalletAddress.message}
          </FormFeedback>
          <Input
            type="text"
            name="user"
            className="form-control mt-3  pl-3"
            placeholder="Enter Token Amount"
            valid={storeWalletAmmount.isTouched && storeWalletAmmount.isValid}
            value={data != undefined && data.amount != undefined ? Number(data.amount) : storeWalletAmmount.value}
            invalid={
              storeWalletAmmount.isTouched && !storeWalletAmmount.isValid
            }
            onChange={e => {
              let num = e.target.value;
              onDisabledButton(false);
              // console.log('from number period', num.replace(/!^(?:[1-9]|0[1-9]|10)$/, '/'));
              onStoreWalletAmmount(e.target.value);
              if (storePasswordOnSendTokken.value != '') {
                onStorePasswordOnSendTokken(storePasswordOnSendTokken.value);
              }
            }}
          />
          <FormFeedback
            style={{ textAlign: 'left' }}
            valid={storeWalletAmmount.isValid}
            invalid={!storeWalletAmmount.isValid}
          >
            {storeWalletAmmount.message}
            {/* {password.message} */}
          </FormFeedback>
          <Input
            type="password"
            name="user"
            className="form-control mt-3  pl-3"
            placeholder="Enter password"
            valid={
              storePasswordOnSendTokken.isTouched &&
              storePasswordOnSendTokken.isValid
            }
            invalid={
              storePasswordOnSendTokken.isTouched &&
              !storePasswordOnSendTokken.isValid
            }
            onChange={e => {
              onDisabledButton(false);
              onStorePasswordOnSendTokken(e.target.value);
            }}
          />
          <FormFeedback
            style={{ textAlign: 'left' }}
            valid={storePasswordOnSendTokken.isValid}
            invalid={!storePasswordOnSendTokken.isValid}
          >
            {storePasswordOnSendTokken.message}
            {/* {password.message} */}
          </FormFeedback>
          <p style={{ color: 'red', fontSize: '12px' }}>{this.props.tokenError}</p>
        </div>,
      ],
      buttonClick: this.openSuccessModal,
      buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Send',
      cancelButton: this.closeAndClear,
      cancelButtonFlag: false,
      modalName: 'openTokenModal',
      disabled:
        !(
          recieverWalletAddress.isValid &&
          storeWalletAmmount.isValid &&
          storePasswordOnSendTokken.isValid
        ) || disabledButton,
    });
  };

  openBuyALAModal = () => {
    const { user, openModal, alaAmount, alaAmountChanged, disabledButton, storeWalletAmmount, onStoreWalletAmmount, buyAlaError, ALAPrice } = this.props;
    const { currentUser } = JSON.parse(localStorage.getItem('userData'));
    var objUser = JSON.parse(localStorage.getItem('userData')!=undefined ? localStorage.getItem('userData') : '');
    var today = new Date();
    var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    var objDateTime = date+''+time;
    openModal({
      title: 'Buy ALA for your wallet',
      body: [
        <div>
          <Form action="https://www.coinpayments.net/index.php" method="post" id="payCryptoForm">
          <div className="pos-relative mt-3">
            <Input
              type="text"
              name="user"
              className="form-control mt-3  pl-3"
              placeholder="Enter Token Amount"
              // valid={storeWalletAmmount.isTouched && storeWalletAmmount.isValid}
              value={storeWalletAmmount.value}
              invalid={
                storeWalletAmmount.isTouched && !storeWalletAmmount.isValid
              }
              onChange={e => {
                let num = e.target.value;
                // console.log('from number period', num.replace(/!^(?:[1-9]|0[1-9]|10)$/, '/'));
                onStoreWalletAmmount(e.target.value);
                if (/^[0-9]+$/.test(e.target.value)) {
                  buyAlaError(e.target.value * 105 / 100 <= 999999);
                }
              }}
            />
            <FormFeedback
              style={{ textAlign: 'left' }}
              valid={storeWalletAmmount.isValid}
              invalid={!storeWalletAmmount.isValid}
            >
              {storeWalletAmmount.message}
            </FormFeedback>
            {(storeWalletAmmount.value * ALAPrice) * 105 / 100 <= 999999}
            {((storeWalletAmmount.value * ALAPrice) != '' && !isNaN(storeWalletAmmount.value * ALAPrice)) ?
              <label className={(storeWalletAmmount.value * ALAPrice) * 105 / 100 <= 999999 ? "" : "color-red"}>You will be charged $ {((storeWalletAmmount.value * ALAPrice) * 105 / 100).toFixed(2)} USD for this. <span style={{fontSize: '12px'}}> (5% stripe charge included) </span></label> :
              null
            }
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="mt-3">
              {/*
              <Input type="hidden" name="userAddress" value={objUser.defaultId} />
              <Input type="hidden" name="userId" value={currentUser} />
              */}
              <input type="hidden" name="cmd" value="_pay" />
              <input type="hidden" name="reset" value="1" />
              <input type="hidden" name="merchant" value="61a3b62f76f82bec111ef2ab02940b35" />
              <input type="hidden" name="item_name" value={"BUY ALA for Wallet: " + currentUser} />
              <input type="hidden" name="item_number" value={objDateTime} />
              <input type="hidden" name="invoice" value={objDateTime} />
              <input type="hidden" name="currency" value="USD" />
              <input type="hidden" name="amountf" value={((storeWalletAmmount.value * ALAPrice) * 105 / 100).toFixed(8)} />
              <input type="hidden" name="quantity" value="1" />
              <input type="hidden" name="allow_quantity" value="0" />
              <input type="hidden" name="want_shipping" value="0" />
              <input type="hidden" name="first_name" value="" />
              <input type="hidden" name="last_name" />
              <input type="hidden" name="email" value={objUser.email} />
              {/*}
              <input type="hidden" name="success_url" value="" />
              <input type="hidden" name="cancel_url" value="" />
              <input type="hidden" name="ipn_url" value="" />
              */}
              <input type="hidden" name="allow_extra" value="0" />
              {/*
              <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <Elements>
                  <CheckoutForm username={currentUser} fromWallet={true} amount={storeWalletAmmount} />
                </Elements>
              </StripeProvider>
              */}
            </div>
            </div>
          </div>
          </Form>
        </div>,
      ],
      hideButton: false,
      buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Buy',
      buttonClick: () => { document.getElementById('payCryptoForm').submit(); },
      cancelButton: this.closeAndClear,
      modalName: 'openBuyALAModal',
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      disabled:
        !(
          storeWalletAmmount.isValid
        ) || disabledButton,
    });
  }

  requestModal = () => {
    const { openModal,
      closeModal,
      senderWalletAddress,
      recieverWalletAddress,
      storeWalletAmmount,
      storePasswordOnSendTokken,
      onStoreAddressOfReciever,
      onStoreAddressOfSender,
      onStoreWalletAmmount,
      onStorePasswordOnSendTokken,
      disabledButton,
      onDisabledButton,
      ALAPrice } = this.props;
    openModal({
      title: 'Request for ALA token',
      body: [
        <div>
          <Input
            type="text"
            name="user"
            className="form-control mt-3 pl-3"
            placeholder="Enter Amount in $"
            valid={storeWalletAmmount.isTouched && storeWalletAmmount.isValid}
            value={storeWalletAmmount.value}
            invalid={
              storeWalletAmmount.isTouched && !storeWalletAmmount.isValid
            }
            onChange={e => {
              let num = e.target.value;
              onDisabledButton(false);
              // console.log('from number period', num.replace(/!^(?:[1-9]|0[1-9]|10)$/, '/'));
              onStoreWalletAmmount(e.target.value);
              if (storePasswordOnSendTokken.value != '') {
                onStorePasswordOnSendTokken(storePasswordOnSendTokken.value);
              }
            }}
          />
          <FormFeedback
            style={{ textAlign: 'left' }}
            valid={storeWalletAmmount.isValid}
            invalid={!storeWalletAmmount.isValid}
          >
            {storeWalletAmmount.value != '' ? storeWalletAmmount.message : 'Please enter amount'}
            {/* {password.message} */}
          </FormFeedback>
          {storeWalletAmmount.value != '' ?
              <label>You will receive {(storeWalletAmmount.value / ALAPrice)} ALA token</label> :
              null
            }
        </div>,
      ],
      buttonClick: this.generateQR,
      buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Request',
      cancelButton: this.closeAndClear,
      cancelButtonFlag: false,
      cancelButtonName: 'Cancel',
      modalName: 'requestModal',
      disabled: !storeWalletAmmount.isValid || disabledButton
    });
  }

  hexEncode = dataBuffer => {
    const buffer = new Buffer.from(dataBuffer, 'base64');
    const base = buffer.toString('hex');
    return base;
  };

  hexDecode = dataBuffer => {
    const buffer = new Buffer.from(dataBuffer, 'hex');
    const base = buffer.toString('base64');
    return base;
  };


  generateQR = () => {
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));
    const currentUser = JSON.parse(localStorage.getItem('userData')).currentUser;
    const { openModal, closeModal, disabledButton, onDisabledButton, storeWalletAmmount } = this.props;
    // const hexCode = this.hexEncode(mnemonicCode);
    // let requestData = `${FRONT_URL}/${this.hexEncode(storeWalletAmmount.value)}/${this.hexEncode(currentUser)}`;
    let data = {
      Amount: storeWalletAmmount.value,
      User: currentUser,
    }
    let requestData = `${FRONT_URL}/wallet/${CryptoJS.AES.encrypt(JSON.stringify(data), 'aladin-2019').toString()}`;
    // console.log("TCL: Wallet -> generateQR -> requestData", requestData);

    openModal({
      title: 'Request for ALA token',
      backButton: [
        <p
          className="color-red hover-icon mb-0 text-left back"
          onClick={this.requestModal}
          style={{ cursor: 'pointer' }}
        >
          <i className="fa fa-long-arrow-left back" aria-hidden="true" /> Back
          </p>,
      ],
      body: [
        <div>
        <div className="mt-4" style={{ display: 'flex' }}>
            {/* <p className="col-12">Choose from below options</p> */}
          <div className="shareIconDiv" style={{ flex: 1 }}>
            <WhatsappShareButton
              url={`Please use this link to share ${storeWalletAmmount.value} tokens to ${currentUser}\n\n${requestData}`}
              separator=":: "
              className="shareIconDiv__share-button">
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
          </div>
          <div className="shareIconDiv" style={{ flex: 1 }}>
            <EmailShareButton
              url={`Please use this link to share ${storeWalletAmmount.value} tokens to ${currentUser}\n\n${requestData}`}
              className="shareIconDiv__share-button">
              <EmailIcon
                size={40}
                round />
            </EmailShareButton>
          </div>

          <div className="shareIconDiv" style={{ flex: 1 }}>
            <CopyToClipboard text={requestData} onCopy={this.onCopyHandler}>
              <Button
                className="react-share__ShareButton shareIconDiv__share-button"
                style={{ width: '40px', height: '40px', borderRadius: '20px', backgroundColor: 'gray', border: 'none', padding: '0px', font: 'inherit', color: 'inherit', cursor: 'pointer' }}
              >
                <Image
                  src={require(`../../../assets/img/copy.png`)}
                  // className
                  // alt
                  style={{ width: '22px', marginBottom: '4px' }}
                // height
                // width
                />
              </Button>
              {/* <button class="react-share__ShareButton shareIconDiv__share-button" style="background-color: transparent; border: none; padding: 0px; font: inherit; color: inherit; cursor: pointer;">
              
            </button> */}
            </CopyToClipboard>
          </div>
          </div>
          <p className="m-3">{this.state.copied ? 'Link copied' : null }</p>
        </div>,
      ],
      buttonClick: this.generateQR,
      buttonName: disabledButton ? <i className="fa fa-circle-o-notch fa-spin"></i> : 'Request',
      cancelButton: this.closeAndClear,
      cancelButtonFlag: true,
      cancelButtonName: 'Cancel',
      modalName: 'generateQR',
      disabled: disabledButton,
      hideButton: true,
    });

  }

  onCopyHandler = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 3000);
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
    const { balance, qrCode, modalName, usdBalance, ALAPrice } = this.props;
    const { auditTrailData, view, openRow, page_no, page_limit, sort_key, sort_asc, transactionHistory,total_page,total_trans } = this.state;
    // console.log("PARTH : TCL: Wallet -> render -> transactionHistory", transactionHistory)
    if (modalName != '' && this[modalName] != undefined) {
      this[modalName]();
    }
    const { defaultId } = JSON.parse(localStorage.getItem('userData'));

    let { currentUser } = JSON.parse(localStorage.getItem('userData'));
    // currentUser = currentUser.split('.')[0];
    return (
      <div>
        <section className="page-section" id="view-a">
          <div className="bg-img1  d-flex align-items-center">
            <div className="container padbt-40 text-center  back-color">
              <div className="row  aos-item" data-aos="fade-down">
                <div className="col-12 mx-auto ">
                  {view == 1 ? (
                    <div id="Storage-pro">
                      <h4>
                        <b>Wallet</b>
                      </h4>
                      <div className="bor-upper mx-auto" />
                      <p className="mt-5">Balance</p>
                      <h1 className="mb-1">
                        <b>{balance}</b>
                      </h1>
                      <p className="mb-4">${usdBalance} USD</p>
                      <Image src={qrCode} className="d-block mx-auto mt-3" />
                      <p className="mt-5">{currentUser}</p>

                      <div className="width-460 pt-3 wallet-btn">
                        <div className="d-flex">
                        <Button
                          className="btn  mt-4 btn-secondary"
                          onClick={this.openBuyALAModal}
                        // onClick={() => {
                        //   this.props.openSuccessModal({
                        //     title: 'Info',
                        //     message: 'Coming soon',
                        //     modalStatus: 2,
                        //     closeModal: this.closeSuccessModal,
                        //     // showIcon: true,
                        //   });
                        // }}
                        >
                          Buy
                        </Button>
                        <Button
                          className="btn  mt-4 btn-secondary"
                          // data-toggle="modal"
                          // data-target="#modalsentForm"
                          type="button"
                          onClick={this.openTokenModal}
                        >
                          Send
                        </Button>
                        <Button
                          className="btn mt-4 btn-secondary"
                          // data-toggle="modal"
                          // data-target="#modalsentForm"
                          type="button"
                          onClick={this.requestModal}
                        >
                          Request
                        </Button></div> <div className="d-flex">
                        <Button
                          className="btn  mt-4 btn-secondary"
                          onClick={()=>{
                            this.setState({view: 2});
                            this.getData(10,1);
                          }}
                        >
                          Transaction History
                        </Button>
                        {/* <Button
                          className="btn  mt-4 btn-secondary"
                          onClick={this.claimReward}
                        >
                          Claim Reward
                        </Button>
                        <Link
                          className="btn  mt-4 btn-secondary"
                          // onClick={()=>this.setState({view: 2})}
                          to="/votes"
                        >
                          Vote
                        </Link> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {view != 1 ? (
                        <div className="text-left">
                          <Button className="btn btn-primary mb-2" type="button" onClick={() => this.setState({ view: 1 })}>Back</Button>
                        </div>
                      ) : null}
                      <div id="Storage-pro">
                        
                        <h4>
                          <b>Transaction History</b>
                        </h4>
                        <div className="bor-upper mx-auto" />
                        <div className="common" id="datatable">
                          <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                            <div className="row">
                            <div className="col-sm-12 col-md-6">
                            <div className="dataTables_length" id="DataTables_Table_0_length"><label className="float-left">Show 
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
                              <div className="col-sm-12">
                              {/* ( */}
                                  <>
                                  <div className="row">
                                    
                                  </div>
                                <div className="table-responsive">
                                  <table className="table data-table-example dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                    <thead>
                                      <tr role="row">
                                        <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Transaction ID: activate to sort column descending"></th>
                                        <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Block Producer: activate to sort column ascending">Block ID</th>
                                        <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Transaction ID</th>
                                        <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Sender</th>
                                        <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Receiver</th>
                                        <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Block: activate to sort column ascending">Amount(ALA)</th>
                                        <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Smart Contract: activate to sort column ascending">Timestamp</th>
                                        <th tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Time Stamp: activate to sort column ascending">Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                  {/* {console.log("AAAAA",transactionHistory != undefined)} */}
                                      { transactionHistory != undefined && transactionHistory.length > 0 ? transactionHistory != null? transactionHistory.map((item, index) => {
                                      let url = `https://explorer.aladinnetwork.org/search?q=${item.txId}`;
                                      return (
                                          <tr role="row" className="even">
                                              {/* <td><span className={item.action_trace.act.data.to != undefined ? currentUser == item.action_trace.act.data.to ? "fa fa-arrow-down fa-1" : "fa fa-arrow-up fa-1" : "fa fa-minus fa-1"} style={item.action_trace.act.data.to != undefined ? currentUser == item.action_trace.act.data.to ? {color: '#2c7509'} : {color: '#bf2227'} : {color: '#736f6f'}}></span></td> */}
                                              <td></td>
                                              <td><a style={{ textDecoration: 'none', color: '#000'}} target="_blank" href={url}>{item.blockId}</a></td>
                                              <td><a style={{ textDecoration: 'none', color: '#000'}} target="_blank" href={url}>{item.txId}</a></td>
                                              <td><a style={{ textDecoration: 'none', color: '#000'}} target="_blank" href={url}>{item.sender == "" ? "-" :  item.sender }</a></td>
                                              <td><a style={{ textDecoration: 'none', color: '#000'}} target="_blank" href={url}>{item.receiver == ""? "-" : item.receiver}</a></td>
                                              <td><a style={{ textDecoration: 'none', color: '#000'}} target="_blank" href={url}>{item.amount}</a></td>
                                              <td><a style={{ textDecoration: 'none', color: '#000'}} target="_blank" href={url}>{moment(item.timestamp).format('ll HH:mm:ss')}</a></td>
                                              <td><a style={{ textDecoration: 'none', color: '#000'}} target="_blank" href={url}>{item.action}</a></td>
                                          </tr>
                                        )
                                      } 
                                      ) :  <tr><td className="text-center pt-5 pb-5" colspan="7">Loading...</td></tr> : <tr><td className="text-center pt-5 pb-5" colspan="7">No Transaction Found</td></tr> }
                                    </tbody>
                                  </table>
                                </div>
                                <div className="row">
                                <div className="col-sm-12 col-md-5">
                                  <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                                  {`Showing ${total_trans != undefined && total_trans != 0 ? page_limit * (page_no - 1) + 1 : 0} to ${total_trans != undefined ? page_limit * page_no < total_trans ? page_limit * page_no : total_trans : 0} of ${total_trans != undefined ? total_trans : 0} entries`}
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                  <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                    <ReactPaginate
                                      previousLabel={'Previous'}
                                      nextLabel={'Next'}
                                      breakLabel={'...'}
                                      breakClassName={'break-me'}
                                      pageCount={total_page}
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
                                {/* ) */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Wallet.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  openSuccessModal: PropTypes.func,
  closeSuccessModal: PropTypes.func,
  getBalance: PropTypes.func,
  balance: PropTypes.string,
};
const mapStateToProps = ({ auth, profile, modal }) => {
  const { balance, qrCode, usdBalance, ALAPrice } = auth;
  const {
    senderWalletAddress,
    recieverWalletAddress,
    storeWalletAmmount,
    storePasswordOnSendTokken,
    disabledButton,
    accountNo,
    alaAmount,
    user,
    tokenError,
  } = profile;
  const { modalName } = modal;
  return {
    balance,
    usdBalance,
    qrCode,
    senderWalletAddress,
    recieverWalletAddress,
    storeWalletAmmount,
    storePasswordOnSendTokken,
    modalName,
    disabledButton,
    accountNo,
    alaAmount,
    user,
    tokenError,
    ALAPrice,
  };
};
const mapDisptchToProps = dispatch => ({
  openModal: payload => dispatch(actions.openSignInModal(payload)),
  closeModal: () => dispatch(actions.closeSignInModal()),
  openSuccessModal: payload => dispatch(actions.openSuccessModal(payload)),
  closeSuccessModal: () => dispatch(actions.closeSuccessModal()),
  getBalance: payload => dispatch(actions.getBalance(payload)),
  onStoreAddressOfSender: payload =>
    dispatch(actions.storeAddressOfSender(payload)),
  onStoreAddressOfReciever: payload =>
    dispatch(actions.storeAddressOfReciever(payload)),
  onStoreWalletAmmount: payload =>
    dispatch(actions.storeWalletAmmount(payload)),
  onStorePasswordOnSendTokken: payload =>
    dispatch(actions.storePasswordOnSendTokken(payload)),
  clearSendTokkenData: () => dispatch(actions.clearSendTokkenData()),
  sendTokkenData: payload => dispatch(actions.sendTokkenData(payload)),
  onDisabledButton: payload => dispatch(actions.disabledButton(payload)),
  hideLoader: () => dispatch(actions.showLoader()),
  alaAmountChanged: payload => dispatch(actions.alaAmountChanged(payload)),
  userName: payload => dispatch(actions.userNameChanged(payload)),
  sendTokenError: payload => dispatch(actions.sendTokenError(payload)),
  buyAlaError: payload => dispatch(actions.buyAlaError(payload)),
});
export default connect(mapStateToProps, mapDisptchToProps)(Wallet);

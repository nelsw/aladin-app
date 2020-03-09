import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { randomBytes } from 'crypto';
import { decodeToken, TokenSigner } from 'jsontokens';
import { parseZoneFile } from 'zone-file';
import queryString from 'query-string';
import {
  makeAuthResponse,
  getAuthRequestFromURL,
  redirectUserToApp,
  getAppBucketUrl,
  isLaterVersion,
  updateQueryStringParameter,
  getPublicKeyFromPrivate,
} from 'aladinjs';
import { AppsNode } from 'utils/account-utils';
import {
  fetchProfileLocations,
  getDefaultProfileUrl,
} from 'utils/profile-utils';
import { getTokenFileUrlFromZoneFile } from 'utils/zone-utils';
import { HDNode } from 'bitcoinjs-lib';
// import log4js from 'log4js';
import { signProfileForUpload } from 'utils';
// import Modal from 'react-modal';
import url from 'url';
import { validateScopes, appRequestSupportsDirectHub } from './utils';
import CryptoJS from "crypto-js";
import { decryptAESKey } from '../util/encryption-utils';

import Image from '../components/Image/Image';
import { GAIA_HUB_URL, GAIA_HUB_URL_USER } from '../constants/constants';

const VIEWS = {
  AUTH: 0,
  LEGACY_GAIA: 1,
};

function makeGaiaAssociationToken(
  secretKeyHex: string,
  childPublicKeyHex: string
) {
  const LIFETIME_SECONDS = 365 * 24 * 3600;
  const signerKeyHex = secretKeyHex.slice(0, 64);
  // console.log("PARTH : TCL: signerKeyHex", signerKeyHex)
  const compressedPublicKeyHex = getPublicKeyFromPrivate(signerKeyHex);
  const salt = randomBytes(16).toString('hex');
  const payload = {
    childToAssociate: childPublicKeyHex,
    iss: compressedPublicKeyHex,
    exp: LIFETIME_SECONDS + new Date() / 1000,
    iat: Date.now() / 1000,
    salt,
  };

  const token = new TokenSigner('ES256K', signerKeyHex).sign(payload);
  return token;
}

class AuthPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIdentityIndex: 0,
      authRequest: null,
      echoRequestId: null,
      appManifest: null,
      coreSessionToken: null,
      decodedToken: null,
      storageConnected: true, // need to change
      processing: false,
      refreshingIdentities: true,
      invalidScopes: false,
      sendEmail: false,
      blockchainId: null,
      noCoreStorage: false,
      responseSent: false,
      scopes: {
        email: false,
        publishData: false,
      },
      address: null,
      manifestApp: '',
    };
  }

  componentWillMount() {
    // eslint-disable-next-line no-restricted-globals
    let Location = location.search;
    const queryDict = queryString.parse(Location);
    // console.log('PARTH location.search', Location)
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(userData == null) {
      this.props.history.push(`/signup${Location}`)
    } else {
      const echoRequestId = queryDict.echo;

      const authRequest = getAuthRequestFromURL();
      // console.log('PARTH authRequest', authRequest)
      const decodedToken = decodeToken(authRequest);
      // console.log('PARTH decodedToken', decodedToken)
      this.setState({ decodedToken });
      const { scopes } = decodedToken.payload;
      this.readTextFile(`${decodedToken.payload.manifest_uri}`, (manifestApp) => {
        this.setState({manifestApp: JSON.parse(manifestApp)})
      });
    }
  }

  readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
    callback(rawFile.responseText);
    }
    }
    rawFile.send(null);
  }

  decryptAESKey = async (encryptedKey) => {
    // console.log("INSIDE AES")
    try {
      var bytes = await CryptoJS.AES.decrypt(encryptedKey.toString(), "ALADIN FOREVER");
      // console.log("bytes$$$$$$$$$$", bytes)
      var decryptedData = await bytes.toString(CryptoJS.enc.Utf8);
      // console.log("key!!!!!!!!!!", decryptedData);
      if (decryptedData == "")
        return false

      return decryptedData
    } catch (err) {
      // console.log("EERRRRRRRRRRRRR", err)
      return err
    }

  }

  completeAuthResponse = async () => {
    let userData = JSON.parse(localStorage.getItem('userData'));
    // console.log("PARTH : TCL: userData", userData)
    const { address } = this.state;
    // console.log("PARTH : TCL: address", address)
    let accountDetail = userData.account.filter(item => item.Address == `ID-${address}`)[0];
    // console.log("PARTH : TCL: accountDetail", accountDetail)

    let privateKey = await this.decryptAESKey(accountDetail.privateKey);
    // console.log("PARTH : TCL: privateKey", privateKey)
    let blockchainId = null;
    let coreSessionToken = null;
    
    const profileUrl = `${GAIA_HUB_URL}/${accountDetail.Address}/profile.json`;
    // console.log("PARTH : TCL: profileUrl", profileUrl)
    const { decodedToken } = this.state;
    // console.log("PARTH : TCL: decodedToken", decodedToken)
    const authRequest = getAuthRequestFromURL();
    // console.log("PARTH : TCL: authRequest", authRequest)
    const appsNode = new AppsNode(HDNode.fromBase58(accountDetail.appsNodeKey), accountDetail.salt)
    // console.log("PARTH : TCL: appsNode", appsNode)
    const appDomain = decodedToken.payload.domain_name;
    console.log("TCL: completeAuthResponse -> decodedToken.payload.domain_name", decodedToken.payload.domain_name)
    // console.log("PARTH : TCL: appDomain", appDomain)
    const appPrivateKey = appsNode.getAppNode(appDomain).getAppPrivateKey()
    // console.log("PARTH : TCL: appPrivateKey", appPrivateKey)
    
    const metadata = {
      email: userData.email,
      profileUrl
    };

    const doNoIncludeProfile = decodedToken.payload
      .do_not_include_profile;
    // console.log("PARTH : TCL: doNoIncludeProfile", doNoIncludeProfile)

    let profileResponseData = {
      '@type': 'Person',
      '@context': 'http://schema.org',
      api: {
        gaiaHubConfig: {
          url_prefix: `${userData.gaia.gaiaHubConfig}/hub/`
        },
        gaiaHubUrl: userData.gaia.gaiaHubConfig
      },
      // name: userData.personName != undefined ? userData.personName : null,
    };
    // console.log("PARTH : TCL: profileResponseData", profileResponseData)

    let transitPublicKey;
    let hubUrl;
    let aladinAPIUrl;
    let associationToken;

    let requestVersion = '0';
    if (decodedToken.payload.hasOwnProperty('version')) {
      requestVersion = decodedToken.payload.version;
      // console.log("PARTH : TCL: requestVersion", requestVersion)
    }

    if (
      isLaterVersion(requestVersion, '1.1.0') &&
      decodedToken.payload.public_keys.length > 0
    ) {
      transitPublicKey = decodedToken.payload.public_keys[0];
      // console.log("PARTH : TCL: transitPublicKey", transitPublicKey)
    }
    if (appRequestSupportsDirectHub(decodedToken.payload)) {
      hubUrl = userData.gaia.gaiaHubUrl;
      // console.log("PARTH : TCL: hubUrl", hubUrl)
    }
    if (isLaterVersion(requestVersion, '1.3.0')) {
      const compressedAppPublicKey = getPublicKeyFromPrivate(
        appPrivateKey.slice(0, 64)
      );
      // console.log("PARTH : TCL: compressedAppPublicKey", compressedAppPublicKey)
      // console.log("PARTH : TCL: AuthPage -> compressedAppPublicKey", compressedAppPublicKey)
      const parsedCoreUrl = url.parse("");
      // console.log("PARTH : TCL: parsedCoreUrl", parsedCoreUrl)

      aladinAPIUrl = `${parsedCoreUrl.protocol}//${parsedCoreUrl.host}`;
      // console.log("PARTH : TCL: aladinAPIUrl", aladinAPIUrl)
      associationToken = makeGaiaAssociationToken(
        privateKey,
        compressedAppPublicKey
      );
      // console.log("PARTH : TCL: associationToken", associationToken)
    }
    
    // console.log("PARTH : TCL: completeAuthResponse -> userData.currentUser", userData.currentUser)
    const authResponse = makeAuthResponse(
      privateKey,
      profileResponseData,
      userData.personName != undefined ? userData.personName : null,
      metadata,
      coreSessionToken,
      appPrivateKey,
      undefined,
      transitPublicKey,
      hubUrl,
      aladinAPIUrl,
      associationToken,
      userData.currentUser,
    );
    // console.log("PARTH : TCL: authResponse", authResponse)

    this.setState({ responseSent: true });
    // console.log("PARTH : TCL: authResponse", authResponse)
    // console.log("PARTH : TCL: authRequest", authRequest)
    redirectUserToApp(authRequest, authResponse);
  };

  render() {
    const { address, manifestApp } = this.state;
    let userData = JSON.parse(localStorage.getItem('userData'));
    if(userData != null) {
    if(address == null) {
      this.setState({address: userData.defaultId})
    }
    // console.log('PARTH manifestApp', manifestApp)

    return (
      <div>
        <div className="container p-41 p-41-b">
          <div className="row d-flex justify-content-center m-50">
            <div></div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 d-flex aos-item mx-auto align-items-center justify-content-center aos-init aos-animate auth-box" data-aos="fade-down">
              <div className="text-left">
                <a href={this.state.decodedToken.payload.domain_name} className="color-red"><i className="fa fa-arrow-left"></i> Back to app</a>
                {/* <div className="float-right"><Image width="35" src={require('../assets/img/img-dpp.png')} /> <i className="fa fa-angle-double-right"></i> {manifestApp != '' ? <Image width="35" src={manifestApp.icons[0].src} />: null}</div> */}
                <h1 className="pb-1 mt-3 text-center">Select an ID</h1>
                <div className="bor-upper mx-auto" />
                <p className="text-left text-center mb-4">{`"${manifestApp.name != undefined ? manifestApp.name : "App"}" wants to read your basic info. Select an ID to use:`}</p>
                {/* <select className="form-control pl-3 select-toggle mb-2" defaultValue={userData.defaultId} onChange={(e)=> {
                  this.setState({address: e.target.value})
                }}> */}
                  {/* {userData.address.map(item => ( */}
                    {/* <option value={item.address}> */}
                      <span className="form-control">{`ID-${address}`}</span>
                      {/* </option> */}
                  {/* ))} */}
                {/* </select> */}
                <button className="btn btn-primary mt-3 request_demo_send width-100" type="button" data-dismiss="modal" data-toggle="modal" onClick={this.completeAuthResponse}>Signin in {manifestApp.name != undefined ? manifestApp.name : "App"}</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
    } else {
      return null;
    }
  }
}

export default AuthPage;

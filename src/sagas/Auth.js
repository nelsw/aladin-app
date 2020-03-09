import { takeEvery, put, select } from 'redux-saga/effects';
// import axios from 'axios';

import axios from '../Services';
import * as actions from '../actions';
import * as actionTypes from '../constants/ActionTypes';
import {
  PAYMENT_ADDRESS,
  USERNAME_POSTFIX,
  GAIA_HUB_URL,
  GAIA_HUB_URL_USER,
} from '../constants/constants';
import { getProfile } from '../store';
import { UserSession, getPublicKeyFromPrivate } from 'aladinjs';
import { appConfig } from '../constants/constants';
import { AppsNode } from '../utils/account-utils';
import { HDNode } from 'bitcoinjs-lib';
import { randomBytes } from 'crypto';
import CryptoJS from "crypto-js";
import { decodeToken, TokenSigner } from 'jsontokens';

const token = 'https://handless-dapp.aladinnetwork.org'

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

async function decryptAESKey(encryptedKey) {
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


// FUNCTION FOR CHECKING USERNAME AVALAIBILITY
function* OnCheckUserName(action) {
  // yield console.log(action.payload);
  try {
    const response = yield axios
      .post(`/users/checkAvailability`, {
        bns_name: action.payload,
      })
      .then(res => res)
      .catch(err => err);

    // if (response.status === 200) {
    // const { data } = response;
    // console.log(data);
    const data =
      response.response !== undefined ? response.response.data : response.data;
    // console.log(data);
    yield put(actions.formValidatorOnCheckUser(data));
    // }
  } catch (error) {
    console.log('error', error);
  }
}

// Function for Create UserId

function* onCreatUserId(action) {
  // yield console.log(action);
  try {
    const { username, password, useremail, closeSuccessModal } = action.payload;
    const response = yield axios
      .post('/users/createId', {
        username: '',
        password,
        email: useremail,
        network: '52.15.100.105:3000/',
        arguments: [
          username,
          'aecc242144c615b1a2a0702e433bd74a6e0fdae931f4cde4e4c0bc13a0a8c6a101',
          GAIA_HUB_URL_USER,
        ],
      })
      .then(res => res)
      .catch(err => err);
    const data =
      response.response !== undefined ? response.response.data : response.data;

    if (response.status === 200) {
      const { mnemonicCode, account, mnemonic } = data.data;
      const userData = {};
      const keys = [];
      const aladinSession = {};

      const responseGAIA = yield axios
        .get(`${GAIA_HUB_URL}/${account.Address.slice(3)}/profile.json`, {
          gaiaUrl: account.Address.slice(3),
        })
        .then(res => res)
        .catch(err => err);
      // console.log("PARTH : TCL: function*onCreatUserId -> responseGAIA", responseGAIA)
      
      if(responseGAIA.status == 200) {
        userData.gaia = {
          gaiaHubConfig: responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubConfig.url_prefix,
          gaiaHubUrl: responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubUrl,
        }
      }

      aladinSession.appPrivateKey = 'cf95f438797e36db269646597e7f91cc0b7ad2404a5db554f403e27f0a899e86';
      if (/ID-/g.test(account.Address)) {
        const addresses = [];
        const str = account.Address.slice(3);
        addresses.push({ address: str, username });

        userData.address = addresses;
        userData.defaultId = str;
        userData.currentUser = username;
        userData.email = useremail;
        keys.push({ keys: account.privateKey, userAddress: str });
      }
      userData.privateKey = keys;
      userData.account = [account];
      yield localStorage.setItem('mnemonicCode', JSON.stringify(mnemonicCode));
      yield localStorage.setItem('userData', JSON.stringify(userData));

      yield put(actions.storeUserMnemonicOnSignup(mnemonic));
      // const userSession = new UserSession({ appConfig });
      const appsNode = yield new AppsNode(HDNode.fromBase58(account.appsNodeKey), account.salt);
      const appPrivateKey = appsNode.getAppNode(token).getAppPrivateKey()
      const compressedAppPublicKey = getPublicKeyFromPrivate(
        appPrivateKey.slice(0, 64)
      );
      let privateKey = yield decryptAESKey(account.privateKey);
      let associationToken = makeGaiaAssociationToken(
        privateKey,
        compressedAppPublicKey
      );
      
      //   userSession.handlePendingSignIn().then(() => {
      //     window.location = window.location.origin;
      //   });
      // console.log('data', userData.address);
      let aladinSessionData = JSON.parse(localStorage.getItem('aladin-session'));
      let session = {
        version: "1.0.0",
        userData: {
          username: null,
          profile: {
              "@type": "Person",
              "@context": "http://schema.org",
              api: {
                  gaiaHubConfig: { url_prefix: `${responseGAIA.status == 200 ? responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubUrl : GAIA_HUB_URL_USER}/hub/` },
                  gaiaHubUrl: `${responseGAIA.status == 200 ? responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubUrl : GAIA_HUB_URL_USER}`,
              },
          },
          email: useremail,
          decentralizedID: `did:btc-addr:${userData.address}`,
          identityAddress: privateKey,
          appPrivateKey,
          coreSessionToken: null,
          authResponseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI1ZDM3NTg5YS0xZTE4LTRjM2UtYTMyYy1iYWEwNGFlOWRlNmYiLCJpYXQiOjE1NzkzMjkyOTcsImV4cCI6MTU4MjAwNzY5NywiaXNzIjoiZGlkOmJ0Yy1hZGRyOjFDeDJnemJ3UHZVQmNveVpRZ1BCMXdlVDZQcjNkYnUybm4iLCJwcml2YXRlX2tleSI6IjdiMjI2OTc2MjIzYTIyNjQzODM5MzY2MzYzMzIzNzMwMzQ2MTM0NjUzNjYzNjEzMzMyMzM2MjMxNjEzNjM5MzI2NjY2NjI2NDY0MzkzOTIyMmMyMjY1NzA2ODY1NmQ2NTcyNjE2YzUwNGIyMjNhMjIzMDMzMzIzODY0MzczNTMyNjIzMzY2MzgzMzMyNjMzMzM0MzAzMzYzNjEzNzMyMzYzNjM1NjE2MzM3MzUzNTM0NjY2NDMwMzc2MTM2MzI2NjY1MzgzNzY1MzQ2NTM5NjI2MzM5MzU2MjYyNjE2NjY2NjUzNDY2MzQzNzM0NjM2MTYzMzgyMjJjMjI2MzY5NzA2ODY1NzI1NDY1Nzg3NDIyM2EyMjMxMzgzMDM1MzYzODM4MzEzOTMwNjQ2NDM4NjQzMjM4MzAzOTM5NjMzODMwMzIzNjM3MzgzNDYxNjU2MzYxMzkzNDMwMzAzNDY2MzczMzM3NjQ2NTYxNjE2NDMwMzczNDM4MzEzNDM1NjEzNTM1MzEzODM1NjE2NDM0NjM2MzY1NjM2NTM4NjUzNDY1NjI2NTMzMzMzOTM1NjM2MTY2MzIzMzMwMzQ2NDM2MzIzODM3MzQzNTY1MzAzODM0MzMzNjM5MzYzNTMyMzA2NjYxMzU2NjM2NjU2MTY2MzQzMjMwMzEzODM0MzYzMzY2MzI2NTM5NjM2MzMyMzI2MzYzNjIzNjM3MzYzODYyMzc2MjMxNjQzMDMyMzkzNDY0MzIzNTM0MzE2NjM2NjEzMjM2MzA2NDM3NjEzODMzNjQzNzYxMjIyYzIyNmQ2MTYzMjIzYTIyMzczOTM0NjQ2MzM5MzU2NjY0NjMzMjM2MzQ2MjM1MzIzNTYxMzA2NTMyMzMzODM5NjMzMjM5MzEzMDMxMzgzMDMxNjY2MzY0MzYzOTYxNjYzMDYyMzczNDY0MzA2MTYyNjYzOTM4MzIzOTYzMzgzNDY1MzI2NTY1MzM2NDY1NjUyMjJjMjI3NzYxNzM1Mzc0NzI2OTZlNjcyMjNhNzQ3Mjc1NjU3ZCIsInB1YmxpY19rZXlzIjpbIjAzZDU5Y2E2ZGJhNDk0OTYwMWQ1YjNlOWRkMzA3MTg5NjExNWM0ZWIzMGMzZmM0NGIxNGQ0N2JlOWFhY2RhZTc3MiJdLCJwcm9maWxlIjp7IkB0eXBlIjoiUGVyc29uIiwiQGNvbnRleHQiOiJodHRwOi8vc2NoZW1hLm9yZyIsImFwaSI6eyJnYWlhSHViQ29uZmlnIjp7InVybF9wcmVmaXgiOiJodHRwczovL2ZpbmFsZ2FpYS5hbGFkaW5uZXR3b3JrLm9yZy9odWIvIn0sImdhaWFIdWJVcmwiOiJodHRwczovL2ZpbmFsZ2FpYS5hbGFkaW5uZXR3b3JrLm9yZyJ9fSwidXNlcm5hbWUiOm51bGwsImNvcmVfdG9rZW4iOm51bGwsImVtYWlsIjpudWxsLCJwcm9maWxlX3VybCI6Imh0dHBzOi8vdG9kby1kYXBwLnMzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS9JRC0xQ3gyZ3pid1B2VUJjb3laUWdQQjF3ZVQ2UHIzZGJ1Mm5uL3Byb2ZpbGUuanNvbiIsImh1YlVybCI6Imh0dHBzOi8vZmluYWxnYWlhLmFsYWRpbm5ldHdvcmsub3JnIiwiYWxhZGluQVBJVXJsIjoibnVsbC8vbnVsbCIsImFzc29jaWF0aW9uVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5rc2lmUS5leUpqYUdsc1pGUnZRWE56YjJOcFlYUmxJam9pTUROa09UQm1OVEZsTkRBeE9HVmtPVGxpT1RrMU5UWTROekk1TTJFMk1qUmtPRFkyTWpVd1pUazBZalkxTXpCbE5EWTFPVEE1TVRNMFl6WTNZamRoTkdGaklpd2lhWE56SWpvaU1ETmtOVGxqWVRaa1ltRTBPVFE1TmpBeFpEVmlNMlU1WkdRek1EY3hPRGsyTVRFMVl6UmxZak13WXpObVl6UTBZakUwWkRRM1ltVTVZV0ZqWkdGbE56Y3lJaXdpWlhod0lqb3hOakV3T0RZMU1qazNMamcyTml3aWFXRjBJam94TlRjNU16STVNamszTGpnMk5pd2ljMkZzZENJNkltVTNNVGRpTkRNMk1HVmxObUl4TWpJeE4yTXpOMkUyWmpGaE1HTmlNMlUxSW4wLkhsd2h4cEt2b0k4cGNSeVRHV0hLV2d3UHV5ZjQ5bUE2em53aWxhRlNhNDdBanN3Nm5lN0JjSVg0cks1YzV5YUVPalBaQkg2aXZ4bDRtbkNsMEY4U1JRIiwidmVyc2lvbiI6IjEuMy4xIn0.P1jQMG8DkAj7EcyQ35y5iu9oVA1ovo7UFjM8CRj25yXof5BbT1Hxj7Svm15WMCYBKPEpcjFp78tayvhzIyaqJA",
          hubUrl: `${responseGAIA.status == 200 ? responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubUrl : GAIA_HUB_URL_USER}`,
          gaiaAssociationToken: associationToken,
        }
      }
      // console.log("PARTH : TCL: function*onCreatUserId -> session", session)
      // session.appPrivateKey = 'cf95f438797e36db269646597e7f91cc0b7ad2404a5db554f403e27f0a899e86';
      yield localStorage.setItem('aladin-session', JSON.stringify(session));
      // userSession.redirectToSignIn();
      yield put(actions.showLoader(false));
      yield put(actions.disabledButton());
      yield put(actions.disabledInputs());
    } else {
      yield put(actions.showLoader(false));
      yield put(actions.disabledButton());
      yield put(
        actions.openSuccessModal({
          title: 'Error',
          message: 'Something went wrong',
          modalStatus: 2,
          buttonClick: closeSuccessModal,
          closeModal: closeSuccessModal,
          redirectUrl: '/signup',
          // showIcon: true,
        })
      );
    }
  } catch (error) {
    // console.log('error', error.message);
    yield put(actions.showLoader(false));
    yield put(actions.disabledButton());
  }
}

// function for get balance
function* onGetBalance(action) {
  const currentUser = yield action.payload ||
    JSON.parse(localStorage.getItem('userData')).currentUser;
  try {
    const response = yield axios
      .post(`/users/walletQrCode`, {
        subDomain: currentUser,
      })
      .then(res => res)
      .catch(err => err);
    const getALAPrice = yield axios
      .get(`/admin/getPrice`)
      .then(res => res.data.data[0].price)
      .catch(err => err);
    const data =
      response.response !== undefined ? response.response.data : response.data;

    if (response.status === 200) {
      // console.log('Get Balance, Response: ', data);
      yield put(
        actions.getBalanceSuccess({
          balance: data.data.balance != '' ? data.data.balance : '0.0000 ALA',
          qrcode: data.data.qrcode,
          usdBalance:
            data.data.balance != ''
              ? (
                  getALAPrice * parseFloat(data.data.balance.split(' ')[0])
                ).toFixed(2)
              : 0.0,
          ALAPrice: getALAPrice,
        })
      );
    } else {
      console.log(data);
    }
  } catch (error) {
    console.log('error', error);
  }
}

// function for sign in
function* signIn(action) {
  // yield console.log(action.payload);
  const {
    mnemonic,
    password,
    mnemonic_code,
    onCloseSuccessModal,
    onCloseFailModal,
    Location,
    email,
  } = action.payload;

  try {
    const response = yield axios
      .post(`/users/login`, {
        mnemonic_code:
          mnemonic_code != undefined ? mnemonic_code.trim() : mnemonic_code,
        mnemonic: mnemonic != undefined ? mnemonic.trim() : mnemonic,
        password,
        email,
      })
      .then(res => res)
      .catch(err => err);
    // console.log("TCL: function*signIn -> response", response)
    if (response.status === 200) {
      const { account, mnemonicCode, username } = response.data.data;
      const userData = {};
      const keys = [];
      if (/ID-/g.test(account.Address)) {
        const addresses = [];
        const str = account.Address.slice(3);
        addresses.push({ address: str, username });
        userData.currentUser = username;
        userData.address = addresses;
        userData.defaultId = str;
        userData.currentUser = username;
        userData.account = [account];
        keys.push({ keys: account.privateKey, userAddress: str });
        userData.privateKey = keys;
        userData.email = email;
      }
      const responseProfile = yield axios
        .post('/users/getProfile', {
          gaiaUrl: account.Address.slice(3),
        })
        .then(res => res)
        .catch(err => err);
      const data = yield responseProfile.responseProfile !== undefined
        ? responseProfile.responseProfile.data
        : responseProfile.data;

      if (responseProfile.status === 200 && data.data.name != undefined) {
        userData.personName = data.data.name;
      }

      const responseGAIA = yield axios
        .get(`${GAIA_HUB_URL}/${account.Address.slice(3)}/profile.json`, {
          gaiaUrl: account.Address.slice(3),
        })
        .then(res => res)
        .catch(err => err);

        if(responseGAIA.status == 200) {
          userData.gaia = {
            gaiaHubConfig: responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubConfig.url_prefix,
            gaiaHubUrl: responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubUrl,
          }
        }
      
      // console.log('userData', userData)
      yield localStorage.setItem('mnemonicCode', JSON.stringify(mnemonicCode));
      yield localStorage.setItem('userData', JSON.stringify(userData));
      const appsNode = yield new AppsNode(HDNode.fromBase58(account.appsNodeKey), account.salt);
      const appPrivateKey = appsNode.getAppNode(token).getAppPrivateKey()
      const compressedAppPublicKey = getPublicKeyFromPrivate(
        appPrivateKey.slice(0, 64)
      );
      let privateKey = yield decryptAESKey(account.privateKey);
      let associationToken = makeGaiaAssociationToken(
        privateKey,
        compressedAppPublicKey
      );
      
      //   userSession.handlePendingSignIn().then(() => {
      //     window.location = window.location.origin;
      //   });

      let aladinSessionData = JSON.parse(localStorage.getItem('aladin-session'));
      let session = {
        version: "1.0.0",
        userData: {
          username: null,
          profile: {
              "@type": "Person",
              "@context": "http://schema.org",
              api: {
                  gaiaHubConfig: { url_prefix: `${responseGAIA.status == 200 ? responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubUrl : GAIA_HUB_URL_USER}/hub/` },
                  gaiaHubUrl: `${responseGAIA.status == 200 ? responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubUrl : GAIA_HUB_URL_USER}`,
              },
          },
          email,
          decentralizedID: `did:btc-addr:${userData.address}`,
          identityAddress: privateKey,
          appPrivateKey,
          coreSessionToken: null,
          authResponseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI1ZDM3NTg5YS0xZTE4LTRjM2UtYTMyYy1iYWEwNGFlOWRlNmYiLCJpYXQiOjE1NzkzMjkyOTcsImV4cCI6MTU4MjAwNzY5NywiaXNzIjoiZGlkOmJ0Yy1hZGRyOjFDeDJnemJ3UHZVQmNveVpRZ1BCMXdlVDZQcjNkYnUybm4iLCJwcml2YXRlX2tleSI6IjdiMjI2OTc2MjIzYTIyNjQzODM5MzY2MzYzMzIzNzMwMzQ2MTM0NjUzNjYzNjEzMzMyMzM2MjMxNjEzNjM5MzI2NjY2NjI2NDY0MzkzOTIyMmMyMjY1NzA2ODY1NmQ2NTcyNjE2YzUwNGIyMjNhMjIzMDMzMzIzODY0MzczNTMyNjIzMzY2MzgzMzMyNjMzMzM0MzAzMzYzNjEzNzMyMzYzNjM1NjE2MzM3MzUzNTM0NjY2NDMwMzc2MTM2MzI2NjY1MzgzNzY1MzQ2NTM5NjI2MzM5MzU2MjYyNjE2NjY2NjUzNDY2MzQzNzM0NjM2MTYzMzgyMjJjMjI2MzY5NzA2ODY1NzI1NDY1Nzg3NDIyM2EyMjMxMzgzMDM1MzYzODM4MzEzOTMwNjQ2NDM4NjQzMjM4MzAzOTM5NjMzODMwMzIzNjM3MzgzNDYxNjU2MzYxMzkzNDMwMzAzNDY2MzczMzM3NjQ2NTYxNjE2NDMwMzczNDM4MzEzNDM1NjEzNTM1MzEzODM1NjE2NDM0NjM2MzY1NjM2NTM4NjUzNDY1NjI2NTMzMzMzOTM1NjM2MTY2MzIzMzMwMzQ2NDM2MzIzODM3MzQzNTY1MzAzODM0MzMzNjM5MzYzNTMyMzA2NjYxMzU2NjM2NjU2MTY2MzQzMjMwMzEzODM0MzYzMzY2MzI2NTM5NjM2MzMyMzI2MzYzNjIzNjM3MzYzODYyMzc2MjMxNjQzMDMyMzkzNDY0MzIzNTM0MzE2NjM2NjEzMjM2MzA2NDM3NjEzODMzNjQzNzYxMjIyYzIyNmQ2MTYzMjIzYTIyMzczOTM0NjQ2MzM5MzU2NjY0NjMzMjM2MzQ2MjM1MzIzNTYxMzA2NTMyMzMzODM5NjMzMjM5MzEzMDMxMzgzMDMxNjY2MzY0MzYzOTYxNjYzMDYyMzczNDY0MzA2MTYyNjYzOTM4MzIzOTYzMzgzNDY1MzI2NTY1MzM2NDY1NjUyMjJjMjI3NzYxNzM1Mzc0NzI2OTZlNjcyMjNhNzQ3Mjc1NjU3ZCIsInB1YmxpY19rZXlzIjpbIjAzZDU5Y2E2ZGJhNDk0OTYwMWQ1YjNlOWRkMzA3MTg5NjExNWM0ZWIzMGMzZmM0NGIxNGQ0N2JlOWFhY2RhZTc3MiJdLCJwcm9maWxlIjp7IkB0eXBlIjoiUGVyc29uIiwiQGNvbnRleHQiOiJodHRwOi8vc2NoZW1hLm9yZyIsImFwaSI6eyJnYWlhSHViQ29uZmlnIjp7InVybF9wcmVmaXgiOiJodHRwczovL2ZpbmFsZ2FpYS5hbGFkaW5uZXR3b3JrLm9yZy9odWIvIn0sImdhaWFIdWJVcmwiOiJodHRwczovL2ZpbmFsZ2FpYS5hbGFkaW5uZXR3b3JrLm9yZyJ9fSwidXNlcm5hbWUiOm51bGwsImNvcmVfdG9rZW4iOm51bGwsImVtYWlsIjpudWxsLCJwcm9maWxlX3VybCI6Imh0dHBzOi8vdG9kby1kYXBwLnMzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS9JRC0xQ3gyZ3pid1B2VUJjb3laUWdQQjF3ZVQ2UHIzZGJ1Mm5uL3Byb2ZpbGUuanNvbiIsImh1YlVybCI6Imh0dHBzOi8vZmluYWxnYWlhLmFsYWRpbm5ldHdvcmsub3JnIiwiYWxhZGluQVBJVXJsIjoibnVsbC8vbnVsbCIsImFzc29jaWF0aW9uVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5rc2lmUS5leUpqYUdsc1pGUnZRWE56YjJOcFlYUmxJam9pTUROa09UQm1OVEZsTkRBeE9HVmtPVGxpT1RrMU5UWTROekk1TTJFMk1qUmtPRFkyTWpVd1pUazBZalkxTXpCbE5EWTFPVEE1TVRNMFl6WTNZamRoTkdGaklpd2lhWE56SWpvaU1ETmtOVGxqWVRaa1ltRTBPVFE1TmpBeFpEVmlNMlU1WkdRek1EY3hPRGsyTVRFMVl6UmxZak13WXpObVl6UTBZakUwWkRRM1ltVTVZV0ZqWkdGbE56Y3lJaXdpWlhod0lqb3hOakV3T0RZMU1qazNMamcyTml3aWFXRjBJam94TlRjNU16STVNamszTGpnMk5pd2ljMkZzZENJNkltVTNNVGRpTkRNMk1HVmxObUl4TWpJeE4yTXpOMkUyWmpGaE1HTmlNMlUxSW4wLkhsd2h4cEt2b0k4cGNSeVRHV0hLV2d3UHV5ZjQ5bUE2em53aWxhRlNhNDdBanN3Nm5lN0JjSVg0cks1YzV5YUVPalBaQkg2aXZ4bDRtbkNsMEY4U1JRIiwidmVyc2lvbiI6IjEuMy4xIn0.P1jQMG8DkAj7EcyQ35y5iu9oVA1ovo7UFjM8CRj25yXof5BbT1Hxj7Svm15WMCYBKPEpcjFp78tayvhzIyaqJA",
          hubUrl: `${responseGAIA.status == 200 ? responseGAIA.data[0].decodedToken.payload.claim.api.gaiaHubUrl : GAIA_HUB_URL_USER}`,
          gaiaAssociationToken: associationToken,
        }
      }
      // console.log("PARTH : TCL: function*onCreatUserId -> session", session)
      // session.appPrivateKey = 'cf95f438797e36db269646597e7f91cc0b7ad2404a5db554f403e27f0a899e86';
      yield localStorage.setItem('aladin-session', JSON.stringify(session));
      yield put(
        actions.openSuccessModal({
          title: 'Success',
          message: 'Your ID has been restored.',
          modalStatus: 2,
          buttonClick: onCloseSuccessModal,
          closeModal: onCloseSuccessModal,
          redirectUrl:
            Location != undefined && Location.includes('auth')
              ? `/auth${Location}`
              : Location.includes('wallet/')
              ? `${Location.replace('?redirect=', '')}`
              : '/dappStore',
          showIcon: true,
        })
      );
      yield put(actions.signInRequestSuccess(response.data.data));
      yield put(actions.closeSignInModal());
      yield put(actions.disabledButton(false));
      yield put(actions.recoveryKeyChanged(null));
      yield put(actions.userPasswordChanged(null));
      yield put(actions.createPasswordChanged(null));
      yield put(actions.confirmCreatePasswordChanged(null));
    } else {
      // yield put(actions.recoveryKeyChanged(null));
      yield put(actions.disabledButton(false));
      // yield put(actions.recoveryKeyChanged(null))
      yield put(
        actions.openSuccessModal({
          title: 'Error',
          message: response.response.data.msg,
          modalStatus: 2,
          buttonClick: onCloseFailModal,
          closeModal: onCloseFailModal,
          showIcon: false,
        })
      );
      // yield put(actions.signInRequestError(action.payload));
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* onSetGo(action) {
  yield console.log(action.payload);
  const {
    user,
    email,
    timer,
    isLogin,
    stripePayment,
    password,
  } = action.payload;
  try {
    const response = yield axios
      .post(`/users/setGo`, {
        subDomain: user,
        email,
      })
      .then(res => res)
      .catch(err => err);
    const data =
      response.response !== undefined ? response.response.data : response.data;

    if (response.status === 200) {
      console.log('Set GO, Response: ', data);
      isLogin
        ? stripePayment(password)
        : yield put(actions.displayPayment(true));
      yield put(actions.disabledButton(false));
      // yield timer();
    }
    if (response.status === 500) {
      yield put(actions.disabledButton(false));
      actions.openSuccessModal({
        title: 'Success',
        message: response.data.msg,
        modalStatus: 2,
        showIcon: true,
      });
    } else {
      console.log(data);
      yield put(actions.disabledButton(false));
    }
  } catch (error) {
    console.log('error', error);
    yield put(actions.disabledButton(false));
  }
}

function* getPayment(action) {
  // yield console.log(action.payload);
  const {
    token,
    user,
    username,
    walletSuccess,
    password,
    email,
    isLogin,
    onCreateAccountSuccess,
    isStripe,
    isSufficient,
    selectedUser,
    fromBuyAla,
    accountNo,
    closeSuccessModal,
    fromWallet,
    amount,
  } = action.payload;
  const no = parseInt(accountNo) == 1 ? 0 : parseInt(accountNo);
  const mCode = yield JSON.parse(localStorage.getItem('mnemonicCode'));
  try {
    const profile = yield select(getProfile);
    // console.log('state in saga', profile);
    let response;

    if (fromWallet) {
      const charge = parseFloat(amount.value).toFixed(4);
      let buyALA;
      let price;
      let getALAPrice;

      getALAPrice = yield axios
        .get(`/admin/getPrice`)
        .then(res => {
          // console.log('getala', res);
          price = res.data.data[0].price;
        })
        .catch(err => err);

      buyALA = yield axios
        .post(`/stripe/buyALAToken`, {
          stripeToken: 'tok_visa',
          finalChargeAmount: Number(((charge * price * 105) / 100).toFixed(2)),
          subDomain: username,
          tokensSend: `${parseFloat(charge).toFixed(4)} ALA`,
          alaTokenBuyingPrice: price,
        })
        .then(res => res)
        .catch(err => err);
      if (buyALA.status == 200) {
        yield put(actions.disabledButton(false));
        yield put(actions.closeSignInModal());
        yield put(
          actions.openSuccessModal({
            title: 'Success',
            message: `Successfully added ${
              amount.value.split('.')[0]
            } ALA to your wallet.`,
            modalStatus: 2,
            buttonClick: closeSuccessModal,
            closeModal: closeSuccessModal,
            // redirectUrl: "/signup",
            // showIcon: true,
          })
        );
        yield put(actions.showLoader(false));
        yield put(actions.getBalance());
        yield put(actions.clearAmount());
      }

      if (buyALA.status != 200) {
        yield put(actions.disabledButton(false));
        yield put(actions.showLoader(false));
        yield put(actions.clearAmount());
      }
    }

    if (isStripe) {
      response = yield axios
        .post(`/stripe/getPayment`, {
          stripeToken: 'tok_visa',
          finalChargeAmount: '25',
          subDomain: `${user.value.trim()}`,
        })
        .then(res => res)
        .catch(err => err);
      // const data =
      //   response.response !== undefined ? response.response.data : response.data;
    } else {
      let sendToken;
      let getALA;
      if (isSufficient) {
        sendToken = yield axios
          .post('/users/sendToken', {
            sender: selectedUser,
            receiver: PAYMENT_ADDRESS,
            amount: `10.0000 ALA`,
            mnemonicCode: mCode,
            password,
            accountNo: no,
          })
          .then(async res => {
            getALA = await axios
              .post(`/users/getALAToken`, {
                txId: res.data.data.result.transaction_id,
                subDomain: `${user.value.trim()}`,
              })
              .then(res => res)
              .catch(err => err);
          })
          .catch(err => console.log('SEND TOKEN ERROR'));

        if (getALA.status == 200) {
          yield put(
            actions.checkUserPassword({
              userName: `${user.value.trim()}`,
              password,
              onCreateAccountSuccess,
              closeSuccessModal,
            })
          );
        } else {
          // handle get ala error
          yield put(actions.disabledButton(false));
        }
      }
      if (!isSufficient && !isStripe && !fromWallet) {
        let buyALA;
        let price;
        let getALAPrice;

        getALAPrice = yield axios
          .get(`/admin/getPrice`)
          .then(res => {
            console.log('getala', res);
            price = res.data.data[0].price;
          })
          .catch(err => err);

        buyALA = yield axios
          .post(`/stripe/buyALAToken`, {
            stripeToken: 'tok_visa',
            finalChargeAmount: Number(((10 * price * 105) / 100).toFixed(2)),
            subDomain: selectedUser,
            tokensSend: `10.0000 ALA`,
          })
          .then(res => res)
          .catch(err => err);

        if (buyALA.status == 200) {
          sendToken = yield axios
            .post('/users/sendToken', {
              sender: selectedUser,
              receiver: PAYMENT_ADDRESS,
              // sender_privateKey:
              amount: `10.0000 ALA`,
              mnemonicCode: mCode,
              password,
              accountNo: no,
            })
            .then(async res => {
              getALA = await axios
                .post(`/users/getALAToken`, {
                  txId: res.data.data.result.transaction_id,
                  subDomain: `${user.value.trim()}`,
                })
                .then(res => res)
                .catch(err => err);
            })
            .catch(err => err);
        } else {
          // buy ala error
        }
        if (getALA.status == 200) {
          yield put(
            actions.checkUserPassword({
              userName: `${user.value.trim()}`,
              password,
              onCreateAccountSuccess,
              closeSuccessModal,
            })
          );
        } else {
          yield put(actions.showLoader(false));
          // get ala error
        }
      }
    }

    if (response != undefined) {
      if (response.status === 200) {
        // console.log('Get payment stripe, Response: ', data);

        isLogin
          ? yield put(
              actions.checkUserPassword({
                userName: `${user.value.trim()}`,
                password,
                onCreateAccountSuccess,
                closeSuccessModal,
              })
            )
          : yield put(
              actions.onCreatUserId({
                username: `${user.value.trim()}`,
                password,
                useremail: email,
                closeSuccessModal,
              })
            );

        // yield put(actions.displayPayment(false));
      } else {
        console.log(response.response);
        // yield put(actions.closeSignInModal());
        yield put(actions.paymentMessage(response.response.data.data));
        yield put(actions.disabledButton(false));
        yield put(actions.showLoader(false));
      }
    } else {
      // buy api error
      // console.log('buy api error');
    }
  } catch (error) {
    console.log('error', error);
  }
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.CHECK_USERNAME_AVAILIBILITY, OnCheckUserName);
  yield takeEvery(actionTypes.ON_CREATE_USER_ID, onCreatUserId);
  yield takeEvery(actionTypes.GET_BALANCE, onGetBalance);
  yield takeEvery(actionTypes.SIGN_IN_REQUEST, signIn);
  yield takeEvery(actionTypes.SET_GO_ACTION, onSetGo);
  yield takeEvery(actionTypes.GET_PAYMENT, getPayment);
  // yield takeEvery(actionTypes.GET_DAPPS, getDapps);
}

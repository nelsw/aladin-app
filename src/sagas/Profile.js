import React from 'react';
import { put, takeEvery, select } from 'redux-saga/effects';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from '../Services';
import * as actions from '../actions';
import * as actionTypes from '../constants/ActionTypes';
import { GAIA_HUB_URL, GAIA_HUB_URL_USER } from '../constants/constants';
import { getProfile } from '../store';
import { UserSession, getPublicKeyFromPrivate } from 'aladinjs';
import { appConfig } from '../constants/constants';
import { AppsNode } from '../utils/account-utils';
import { HDNode } from 'bitcoinjs-lib';
import { randomBytes } from 'crypto';
import CryptoJS from "crypto-js";
import { decodeToken, TokenSigner } from 'jsontokens';

const CopyToClipboardImg = require('../assets/img/copy-icon.png');
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
    var decryptedData = await bytes.toString(CryptoJS.enc.Utf8);
    if (decryptedData == "")
      return false

    return decryptedData
  } catch (err) {
    return err
  }

}


function* checkPasswordOnCreatingAnotherAccount(action) {
  try {
    const { password, userName, openSuccessModal, closeSuccessModal, onCreateAccountSuccess } = action.payload;
    const { address } = JSON.parse(localStorage.getItem('userData'));
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));
    // const address = JSON.parse(localStorage.getItem('address')).length + 1;

    const response = yield axios
      .post('/users/createAnotherAccount', {
        mnemonicCode,
        password,
        accountNo: address.length + 1,
        network: '52.15.100.105:3000/',
        arguments: [
          userName,
          'aecc242144c615b1a2a0702e433bd74a6e0fdae931f4cde4e4c0bc13a0a8c6a101',
          GAIA_HUB_URL,
        ],
      })
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;

    if (response.status === 200) {
      const { accounts } = data.data;
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (/ID-/g.test(accounts.Address)) {
        const str = accounts.Address.slice(3);
        userData.address.push({ address: str, username: userName });

        userData.privateKey.push({
          keys: accounts.privateKey,
          userAddress: str,
        });
        userData.account.push(accounts)
      }

      localStorage.setItem('userData', JSON.stringify(userData));

      // console.log(data);
      yield put(actions.closeSignInModal());
      yield put(actions.createAnotherAccountSuccess())
      yield put(actions.openSuccessModal({
        title: 'Success',
        message: 'Your Id has been successfully created.',
        modalStatus: 2,
        closeModal: closeSuccessModal,
        redirectUrl: '',
        showIcon: true,
        buttonClick: closeSuccessModal,
        from: "AnotherID"
      }));
      yield put(actions.clearAnotherIdData());
      yield put(actions.clearStoredUserName());
      yield put(actions.clearPasswordForAnotherAccount());
      yield put(actions.showLoader(false));
      yield put(actions.disabledButton());
      // yield put(actions.clearStoredPassword());
    } else {
      yield put(

        actions.openSuccessModal({
          title: 'Error',
          message: 'Some error occured while creating new ID. Please try again.',
          modalStatus: 2,
          closeModal: closeSuccessModal,
          redirectUrl: '',
          showIcon: false,
          buttonClick: closeSuccessModal,
          from: "AnotherID"
        })
      );
      yield put(actions.showLoader(false));
      yield put(actions.storePasswordForAnotherAccount(data));
      yield put(actions.disabledButton());
      // console.log(data);
      // yield put(actions.storeCurrentPassword(data));
      // yield put(actions.disabledButton());
    }
  } catch (error) {
    yield put(actions.showLoader(false));
    yield put(actions.disabledButton());
  }
}

function* changePassword(action) {
  try {
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));
    // console.log(mnemonicCode);
    const {
      currentPassword,
      newPassword,
      confirmPassword,
      onCloseSuccessModal,
    } = action.payload;
    let email = JSON.parse(localStorage.getItem('userData')).email;
    const response = yield axios
      .post('/users/changePassword', {
        currentPassword,
        mnemonicCode,
        newPassword,
        newPassword2: confirmPassword,
        email,
      })
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;

    if (response.status === 200) {
   
      yield localStorage.setItem('mnemonicCode', JSON.stringify(data.data.hexMnemonic));
      // yield put(console.log(data.data));
      yield put(
        actions.openSuccessModal({
          title: 'Success',
          message: data.data.message,
          modalStatus: 2,
          closeModal: onCloseSuccessModal,
          redirectUrl: '',
          showIcon: true,
        })
      );
      yield put(actions.disabledButton());
      yield put(actions.clearStoredPassword());
    } else {
  
      yield put(actions.storeCurrentPassword(data));
      yield put(actions.disabledButton());
    }
  } catch (error) {
    yield put(actions.disabledButton());
  }
}

function* profileImageChanged(action) {
  let file = action.payload;

  const { defaultId, privateKey } = JSON.parse(
    localStorage.getItem('userData')
  );
  const currentPrivateKey = privateKey
    .filter(item => (item.userAddress === defaultId ? item.keys : null))
    .reduce(item => item);
  // console.log(
  //   'TCL: function*profileImageChanged -> currentPrivateKey',
  //   currentPrivateKey
  // );
  const { keys } = currentPrivateKey;
  // console.log('TCL: function*profileImageChanged -> keys', keys);
  const fd = new FormData();
  fd.append('gaiaUrl', defaultId);
  fd.append('url', GAIA_HUB_URL_USER);
  fd.append('privateKey', keys);
  fd.append(
    'ownerPrivateKey',
    'f84e66defe15b41c709614fe8c431beebe7d5d1381ae7e49cde740f320168a7501'
  );
  fd.append('image', file);
  // console.log(currentPrivateKey.keys, 'This is the curent');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = yield axios
    .post('/users/getUploadPicURL', fd, config)
    .then(res => res)
    .catch(err => err);
  const data = yield response.response !== undefined
    ? response.response.data
    : response.data;
  if (response.status === 200) {
    // yield console.log('TCL: function*profileImageChanged -> response', data);
    yield put(actions.uploadProfilePicture(data.data));
  } else {
    yield console.log(data);
  }
}

// GET PROFILE DATA
function* getProfileData() {
  try {
    const { defaultId } = JSON.parse(localStorage.getItem('userData'));
    const response = yield axios
      .post('/users/getProfile', {
        gaiaUrl: defaultId,
      })
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;

    if (response.status === 200) {
      // yield console.log(data);
      yield put(actions.getProfileDataSuccess(data.data));
    } else {
      yield console.log(data);
    }
  } catch (error) {
    yield console.log(error);
  }
}

function* updateUserProfile(action) {
  try {
      let userData = JSON.parse(localStorage.getItem('userData'));
      const { defaultId, privateKey } = userData;
    const { name, description, imageUrl, closeSuccess } = action.payload;
    const currentPrivateKey = privateKey
      .filter(item => (item.userAddress === defaultId ? item.keys : null))
      .reduce(item => item);
    const response = yield axios
      .post('/users/editProfile', {
        name,
        description,
        gaiaHubUrl: GAIA_HUB_URL_USER,
        privateKey: currentPrivateKey.keys,
        ownerPrivateKey:
          'f84e66defe15b41c709614fe8c431beebe7d5d1381ae7e49cde740f320168a7501',
        gaiaUrl: defaultId,
      })
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;

    if (response.status === 200) {
      // yield console.log(data);
      yield put(actions.openSuccessModal({
        title: 'Success',
        message: 'Profile updated successfully',
        modalStatus: 2,
        closeModal: closeSuccess,
        showIcon: true,
      }));
      yield put(actions.getProfileData());
      yield put(actions.disabledButton(false));
      if(name != '') {
        userData.personName = name;
      }
      localStorage.setItem('userData',JSON.stringify(userData));
    } else {
      yield put(actions.openSuccessModal({
        title: 'Error',
        message: 'Profile update fail',
        modalStatus: 2,
        closeModal: closeSuccess,
        // showIcon: true,
      }));
      yield put(actions.disabledButton(false));
      // yield console.log(data);
    }
  } catch (error) {
    yield put(actions.disabledButton(false));
  }
}

function* recoverWallet(action) {
  try {
    const response = yield axios
      .post('/users/recoverWallet', {
        mnemonicCode: action.payload.code,
        password: action.payload.password,
      })
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;

    if (response.status === 200) {
      // yield console.log(data);
      yield put(actions.disabledButton(false));
      yield put(actions.recoverWalletSuccess(data.data));
      yield put(actions.clearPasswordForAnotherAccount());
    } else {
      // yield console.log(data);
      yield put(actions.disabledButton(false));
      yield put(actions.storePasswordForAnotherAccount(data));
    }
  } catch (error) {
    // yield console.log(error);
    yield put(actions.disabledButton(false));
  }
}

function* onsendTokkenData(action) {
  try {
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));
    const { currentUser } = JSON.parse(localStorage.getItem('userData'));
    const { receiver, amount, password, closeModal, selectedUser, accountNo } = action.payload;
    let no = parseInt(accountNo + 1);
    let senderAddress = yield action.payload.selectedUser || JSON.parse(localStorage.getItem('userData')).currentUser;
    const response = yield axios
      .post('/users/sendToken', {
        sender: senderAddress,
        receiver,
        amount: parseFloat(amount).toFixed(4) + ' ALA',
        mnemonicCode,
        password,
        accountNo: no == 1 ? 0 : no,
      })
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;

    if (response.status === 200) {
  
      yield put(actions.closeSignInModal());
      yield put(actions.clearSendTokkenData());
      yield put(actions.disabledButton());
      yield put(
        actions.openSuccessModal({
          title: 'Success',
          message: data.data.message,
          modalStatus: 2,
          closeModal,
          showIcon: true,
        })
      );
      yield put(actions.storeTransactionId(data.data.result.transaction_id));
      yield put(actions.getBalance());
      yield put(actions.sendTokenError(''));
  
    } else {
      
      yield put(actions.sendTokenError(data));
      yield put(actions.disabledButton());
      yield put(actions.showLoader(false));
   
    }
  } catch (error) {
    yield put(actions.disabledButton());
    yield put(actions.showLoader(false));
  }
}

function* recoverKey(action) {
  try {
    const {
      code,
      password,
      openLoginModal,
      copyHandler,
      copied,
      recoverKeyModal,
    } = action.payload;
    let profile = yield select(getProfile);
    const response = yield axios
      .post('/users/recoverWallet', {
        mnemonicCode: code,
        password,
      })
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;

    if (response.status === 200) {
      yield put(actions.disabledButton(false));
      yield put(actions.recoverKeySuccess(data.data));
   

      yield put(actions.clearPassword());
      yield put(actions.clearPasswordForAnotherAccount());  
      yield recoverKeyModal(data.data);
      
    } else {
      yield put(actions.disabledButton());
      yield put(actions.clearPassword());
      yield put(actions.storePasswordForAnotherAccount(data));
    }
  } catch (error) {
    yield console.log(error);
  }
}

function* checkForAnotherId(action) {
  try {
    const mnemonicCode = JSON.parse(localStorage.getItem('mnemonicCode'));
    const { currentUser, address } = JSON.parse(localStorage.getItem('userData'));
    const { password, createAnotherId, closeSuccessModal } = action.payload;
    const response = yield axios
      .post('/users/restoreAccount', {
        mnemonicCode,
        password,
        accountNo: address.length + 1,
      })
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (response.status === 200) {
      if (data.data.userName.key) {
        const { accounts, userName: UserName } = data.data;
        userData.address.push({ address: UserName.account_id, username: UserName.key });

        userData.privateKey.push({
          keys: accounts.privateKey,
          userAddress: UserName.account_id,
        });
        userData.account.push(accounts);
      }



      localStorage.setItem('userData', JSON.stringify(userData));

      yield put(actions.closeSignInModal());
      yield put(actions.openSuccessModal({
        title: 'Success',
        message: 'Your ID has been successfully restored.',
        modalStatus: 2,
        closeModal: closeSuccessModal,
        redirectUrl: '',
        showIcon: true,
      }));
      yield put(actions.clearCreateIdData());
      yield put(actions.disabledButton(false));

    } else {
      if (data.data.includes('password')) {
        yield put(actions.wrongPasswordAtAddAccount(data.data));
      }
      if (data.data.includes('restore')) {
        yield put(actions.closeSignInModal());
        createAnotherId();
      }
      yield put(actions.disabledButton(false));

    }
  } catch (error) {
    yield console.log(error);
  }
}

function* saveApiEndPoint(action) {
  try {
    const { gaiaHubConfig, gaiaHubUrlUser, openSaveModal } = action.payload;
    const { defaultId, account } = JSON.parse(localStorage.getItem('userData'));
    const currentAccount = account.filter(item => item.Address == `ID-${defaultId}`)[0];
    const response = yield axios
      .post('/users/addHubConfig', {
        gaiaHubConfig,
        gaiaHubUrlUser,
        gaiaHubUrl: GAIA_HUB_URL_USER,
        privateKey: currentAccount.privateKey,
        ownerPrivateKey: '',
        gaiaUrl: defaultId,
      })
      .then(res => res)
      .catch(err => err);

    if (response.status === 200) {
      openSaveModal();
      yield put(actions.disabledButton(false));
      let userData = JSON.parse(localStorage.getItem('userData'));
      userData.gaia = {
        gaiaHubConfig,
        gaiaHubUrl: gaiaHubUrlUser
      }
      const appsNode = yield new AppsNode(HDNode.fromBase58(userData.account[0].appsNodeKey), userData.account[0].salt);
      const appPrivateKey = appsNode.getAppNode(token).getAppPrivateKey()
      const compressedAppPublicKey = getPublicKeyFromPrivate(
        appPrivateKey.slice(0, 64)
      );
      let privateKey = yield decryptAESKey(userData.account[0].privateKey);
      let associationToken = makeGaiaAssociationToken(
        privateKey,
        compressedAppPublicKey
      );
      let session = {
        version: "1.0.0",
        userData: {
          username: null,
          profile: {
              "@type": "Person",
              "@context": "http://schema.org",
              api: {
                  gaiaHubConfig: { url_prefix: `${gaiaHubUrlUser}/hub/` },
                  gaiaHubUrl: `${gaiaHubUrlUser}`,
              },
          },
          email: userData.email,
          decentralizedID: `did:btc-addr:${userData.address}`,
          identityAddress: privateKey,
          appPrivateKey,
          coreSessionToken: null,
          authResponseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI1ZDM3NTg5YS0xZTE4LTRjM2UtYTMyYy1iYWEwNGFlOWRlNmYiLCJpYXQiOjE1NzkzMjkyOTcsImV4cCI6MTU4MjAwNzY5NywiaXNzIjoiZGlkOmJ0Yy1hZGRyOjFDeDJnemJ3UHZVQmNveVpRZ1BCMXdlVDZQcjNkYnUybm4iLCJwcml2YXRlX2tleSI6IjdiMjI2OTc2MjIzYTIyNjQzODM5MzY2MzYzMzIzNzMwMzQ2MTM0NjUzNjYzNjEzMzMyMzM2MjMxNjEzNjM5MzI2NjY2NjI2NDY0MzkzOTIyMmMyMjY1NzA2ODY1NmQ2NTcyNjE2YzUwNGIyMjNhMjIzMDMzMzIzODY0MzczNTMyNjIzMzY2MzgzMzMyNjMzMzM0MzAzMzYzNjEzNzMyMzYzNjM1NjE2MzM3MzUzNTM0NjY2NDMwMzc2MTM2MzI2NjY1MzgzNzY1MzQ2NTM5NjI2MzM5MzU2MjYyNjE2NjY2NjUzNDY2MzQzNzM0NjM2MTYzMzgyMjJjMjI2MzY5NzA2ODY1NzI1NDY1Nzg3NDIyM2EyMjMxMzgzMDM1MzYzODM4MzEzOTMwNjQ2NDM4NjQzMjM4MzAzOTM5NjMzODMwMzIzNjM3MzgzNDYxNjU2MzYxMzkzNDMwMzAzNDY2MzczMzM3NjQ2NTYxNjE2NDMwMzczNDM4MzEzNDM1NjEzNTM1MzEzODM1NjE2NDM0NjM2MzY1NjM2NTM4NjUzNDY1NjI2NTMzMzMzOTM1NjM2MTY2MzIzMzMwMzQ2NDM2MzIzODM3MzQzNTY1MzAzODM0MzMzNjM5MzYzNTMyMzA2NjYxMzU2NjM2NjU2MTY2MzQzMjMwMzEzODM0MzYzMzY2MzI2NTM5NjM2MzMyMzI2MzYzNjIzNjM3MzYzODYyMzc2MjMxNjQzMDMyMzkzNDY0MzIzNTM0MzE2NjM2NjEzMjM2MzA2NDM3NjEzODMzNjQzNzYxMjIyYzIyNmQ2MTYzMjIzYTIyMzczOTM0NjQ2MzM5MzU2NjY0NjMzMjM2MzQ2MjM1MzIzNTYxMzA2NTMyMzMzODM5NjMzMjM5MzEzMDMxMzgzMDMxNjY2MzY0MzYzOTYxNjYzMDYyMzczNDY0MzA2MTYyNjYzOTM4MzIzOTYzMzgzNDY1MzI2NTY1MzM2NDY1NjUyMjJjMjI3NzYxNzM1Mzc0NzI2OTZlNjcyMjNhNzQ3Mjc1NjU3ZCIsInB1YmxpY19rZXlzIjpbIjAzZDU5Y2E2ZGJhNDk0OTYwMWQ1YjNlOWRkMzA3MTg5NjExNWM0ZWIzMGMzZmM0NGIxNGQ0N2JlOWFhY2RhZTc3MiJdLCJwcm9maWxlIjp7IkB0eXBlIjoiUGVyc29uIiwiQGNvbnRleHQiOiJodHRwOi8vc2NoZW1hLm9yZyIsImFwaSI6eyJnYWlhSHViQ29uZmlnIjp7InVybF9wcmVmaXgiOiJodHRwczovL2ZpbmFsZ2FpYS5hbGFkaW5uZXR3b3JrLm9yZy9odWIvIn0sImdhaWFIdWJVcmwiOiJodHRwczovL2ZpbmFsZ2FpYS5hbGFkaW5uZXR3b3JrLm9yZyJ9fSwidXNlcm5hbWUiOm51bGwsImNvcmVfdG9rZW4iOm51bGwsImVtYWlsIjpudWxsLCJwcm9maWxlX3VybCI6Imh0dHBzOi8vdG9kby1kYXBwLnMzLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS9JRC0xQ3gyZ3pid1B2VUJjb3laUWdQQjF3ZVQ2UHIzZGJ1Mm5uL3Byb2ZpbGUuanNvbiIsImh1YlVybCI6Imh0dHBzOi8vZmluYWxnYWlhLmFsYWRpbm5ldHdvcmsub3JnIiwiYWxhZGluQVBJVXJsIjoibnVsbC8vbnVsbCIsImFzc29jaWF0aW9uVG9rZW4iOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5rc2lmUS5leUpqYUdsc1pGUnZRWE56YjJOcFlYUmxJam9pTUROa09UQm1OVEZsTkRBeE9HVmtPVGxpT1RrMU5UWTROekk1TTJFMk1qUmtPRFkyTWpVd1pUazBZalkxTXpCbE5EWTFPVEE1TVRNMFl6WTNZamRoTkdGaklpd2lhWE56SWpvaU1ETmtOVGxqWVRaa1ltRTBPVFE1TmpBeFpEVmlNMlU1WkdRek1EY3hPRGsyTVRFMVl6UmxZak13WXpObVl6UTBZakUwWkRRM1ltVTVZV0ZqWkdGbE56Y3lJaXdpWlhod0lqb3hOakV3T0RZMU1qazNMamcyTml3aWFXRjBJam94TlRjNU16STVNamszTGpnMk5pd2ljMkZzZENJNkltVTNNVGRpTkRNMk1HVmxObUl4TWpJeE4yTXpOMkUyWmpGaE1HTmlNMlUxSW4wLkhsd2h4cEt2b0k4cGNSeVRHV0hLV2d3UHV5ZjQ5bUE2em53aWxhRlNhNDdBanN3Nm5lN0JjSVg0cks1YzV5YUVPalBaQkg2aXZ4bDRtbkNsMEY4U1JRIiwidmVyc2lvbiI6IjEuMy4xIn0.P1jQMG8DkAj7EcyQ35y5iu9oVA1ovo7UFjM8CRj25yXof5BbT1Hxj7Svm15WMCYBKPEpcjFp78tayvhzIyaqJA",
          hubUrl: `${gaiaHubUrlUser}`,
          gaiaAssociationToken: associationToken,
        }
      }
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('aladin-session', JSON.stringify(session));
    } else {
      yield put(actions.disabledButton(false));

    }
  } catch (error) {
    yield console.log(error);
  }
}


function* getAccountDetails(action) {
  try {

    const { currentUser } = JSON.parse(localStorage.getItem('userData'));

    const response = yield axios
      .post('users/getAccountDetails', {
        account_name: currentUser
      })
      .then(res => res)
      .catch(err => err);

    if (response.status === 200) {
      yield put(actions.getAccountDetailsSuccess(response.data.data));
    } else {
      console.log("TCL: function*getAccountDetails -> else")


    }
  } catch (error) {
    yield console.log(error);
  }
}

function* uploadFile(action) {
  try {
    console.log(action.payload);
    yield put(actions.fileLoader({fileLoader: true, uploaded: false}));
    const { files, closeModal, listFiles } = action.payload;
    const { userData } = JSON.parse(localStorage.getItem('aladin-session'));
    const dataParams = new FormData();
    dataParams.append('appPrivateKey', userData.appPrivateKey);
    dataParams.append('hubURL', GAIA_HUB_URL_USER);

    for (let i = 0; i < files.length; i++) {
      dataParams.append('file', files[i]);
    }

    const response = yield axios
      .post(`file-manager/upload`, dataParams)
      .then(res => res)
      .catch(err => err);

    if (response.status === 200) {
      yield put(actions.fileLoader({fileLoader: false, uploaded: true}));
      yield put(actions.openSuccessModal({
        title: 'Success',
        message: 'File uploaded successfully',
        modalStatus: 2,
        closeModal,
        showIcon: true,
      }));
      yield listFiles();
      console.log('success');

    } else {
      yield put(actions.fileLoader({fileLoader: false, uploaded: false}));
      console.log("TCL: function*uploadFile -> else")
    }
  } catch (error) {
    yield console.log(error);
    yield put(actions.fileLoader({fileLoader: false, uploaded: false}));
  }
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.CHECK_USER_PASSWORD, checkPasswordOnCreatingAnotherAccount);
  yield takeEvery(actionTypes.ON_CHANGE_PASSWORD, changePassword);
  yield takeEvery(actionTypes.PROFILE_IMAGE_CHANGED, profileImageChanged);
  yield takeEvery(actionTypes.GET_PROFILE_DATA, getProfileData);
  yield takeEvery(actionTypes.UPDATE_USER_PROFILE, updateUserProfile);
  yield takeEvery(actionTypes.RECOVER_WALLET, recoverWallet);
  yield takeEvery(actionTypes.RECOVER_KEY, recoverKey);
  yield takeEvery(actionTypes.SEND_TOKKEN_DATA, onsendTokkenData);
  yield takeEvery(actionTypes.CHECK_FOR_ANOTHER_ID, checkForAnotherId);
  yield takeEvery(actionTypes.SAVE_API_END_POINT, saveApiEndPoint);
  yield takeEvery(actionTypes.GET_ACCOUNT_DETAILS, getAccountDetails);
  yield takeEvery(actionTypes.UPLOAD_FILE, uploadFile);
}

import { put, takeEvery } from 'redux-saga/effects';
import axios from '../Services';
import * as actions from '../actions';
import * as actionTypes from '../constants/ActionTypes';

function* postRegisterDapp(action) {
  try {
    const {
      dappname,
      dappurl,
      emailid,
      // dappstorage,
      dappcategory,
      dappdetails,
      // token,
      rating,
      dapplogo,
      screenshots,
      closeSuccessModal,
      dappPreference,
    } = action.payload;

    const userData = JSON.parse(localStorage.getItem('userData'));
    const ownerId = userData.currentUser;
    const dataParams = new FormData();
    dataParams.append('dappname', dappname);
    dataParams.append('dappurl', dappurl);
    dataParams.append('emailid', emailid);
    // dataParams.append('dappstorage', dappstorage);
    dataParams.append('dappcategory', dappcategory);
    dataParams.append('dappdetails', dappdetails);
    // dataParams.append('token', token);
    dataParams.append('rating', rating);
    dataParams.append('dappPreference', dappPreference);
    dataParams.append('ownerId', ownerId);
    dataParams.append('devlopername', ownerId);

    for (let i = 0; i < dapplogo.length; i++) {
      dataParams.append('dapplogo', dapplogo[i]);
    }
    for (let i = 0; i < screenshots.length; i++) {
      dataParams.append('screenshots', screenshots[i]);
    }
    const response = yield axios
      .post(`dapps/registerDapp`, dataParams)
      .then(res => res)
      .catch(err => err);

    if (response.status === 200) {
      // handle response accordingly
      yield put(actions.resetDapp());
      yield put(actions.showLoader(false));
      yield put(actions.disabledButton());
      yield put(
        actions.openSuccessModal({
          title: 'Success',
          message: 'Your Dapp has been successfully registered.',
          modalStatus: 2,
          buttonClick: closeSuccessModal,
          // closeModal: closeSuccessModal,
          redirectUrl: '/dappStore',
          showIcon: true,
          cancelIconFlag: false,
        })
      );
    } else {
      // handle response accordingly
      yield put(actions.disabledButton())
      if(response.response.data.data.message.includes('dappurl') && response.response.data.data.message.includes('unique')) {
        yield put(
          actions.openSuccessModal({
            title: 'Error',
            message: 'Dapp url should be unique.',
            modalStatus: 2,
            buttonClick: closeSuccessModal,
            closeModal: closeSuccessModal,
            showIcon: false,
          })
        );
      }
      
      yield put(actions.showLoader(false));
    }
  } catch (error) {
    // console.log('error', error);
    yield put(actions.showLoader(false));
  }
}

function* dappNameAvailability(action) {
  try {
    const {
      dappName,
    } = action.payload;
    console.log("DAPP NAME IN SAGA", dappName)

    const response = yield axios
      .get(`/dapps/searchDapp/` + dappName)
      .then(res => res)
      .catch(err => err);

    if (response.status === 200) {
      // handle response accordingly
      //console.log("MEGHA DAPP NAME RESPONSE", response)
      yield put(actions.dappNameAvailabilitySuccess(true));

    } else {
      // handle response accordingly
      //console.log("DAPP NAME ERROR")
      yield put(actions.dappNameAvailabilitySuccess(false));
    }
  } catch (error) {
    console.log('error', error);
  }
}
export default function* rootsaga() {
  yield takeEvery(actionTypes.POST_REGISTER_DAPP_REQUEST, postRegisterDapp);
  yield takeEvery(actionTypes.DAPP_NAME_AVAILABILITY, dappNameAvailability);
}

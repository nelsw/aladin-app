import { takeEvery, put } from 'redux-saga/effects';
import axios from '../Services';
import * as actions from '../actions';
import * as actionTypes from '../constants/ActionTypes';

function* getDapps(action) {
  try {
    const response = yield axios
      .get('/dapps/getDapps')
      .then(res => res)
      .catch(error => console.log(error));

    if (response.status == 200) {
      // console.log('TCL: function*getDapps -> response', response.data.data);
      yield put(actions.setDapps(response.data.data));
    }
  } catch (error) {
    console.log('TCL: function*getDapps -> error', error);
  }
}

function* getDappDetail(action) {
  try {
    let dappId = action.payload;
    const response = yield axios
      .get(`/dapps/getDappsById/${dappId}`)
      .then(res => res)
      .catch(error => console.log(error));

    if (response.status == 200) {
      // console.log('TCL: function*getDappDetail -> response', response.data.data);
      // yield put(actions.getDappDetailSuccess(response.data.data));
      let dapp = response.data.data;
      yield put(actions.dappNameChanged(dapp.dappname));
      yield put(actions.dappUrlChanged(dapp.dappurl));
      yield put(actions.dappEmailChanged(dapp.emailid));
      yield put(actions.dappCategoryChanged(dapp.dappcategory));
      yield put(actions.dappDetailsChanged(dapp.dappdetails));
      yield put(actions.dappImages({logo: dapp.dapplogo, screenshorts: dapp.productscreenshot != undefined ? dapp.productscreenshot : [], dappPreference: dapp.dappPreference}));
    }
  } catch (error) {
    console.log(error);
  }
}

function* editDapp(action) {
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
      updatedScreenshots,
      closeSuccessModal,
      dappPreference,
      id,
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
    // dataParams.append('rating', rating);
    dataParams.append('dappPreference', dappPreference);
    dataParams.append('devlopername', ownerId);
    // dataParams.append('editedTime', )
    for (let i = 0; i < dapplogo.length; i++) {
      dataParams.append('dapplogo', dapplogo[i]);
    }
    for (let i = 0; i < screenshots.length; i++) {
      dataParams.append('screenshots', screenshots[i]);
    }
    for (let i = 0; i < updatedScreenshots.length; i++) {
      dataParams.append('updateScreenshots', updatedScreenshots[i]);
    }

    const response = yield axios
      .put(`dapps/updateDapp/${id}`, dataParams)
      .then(res => res)
      .catch(err => err);
      console.log('TCL: function*getDapps -> response', response);

    if (response.status == 200) {
      // console.log('TCL: function*getDapps -> response', response.data.data);
      // yield put(actions.setDapps(response.data.data));
      yield put(actions.showLoader(false));
      yield put(actions.disabledButton(false));
      yield put(
        actions.openSuccessModal({
          title: 'Success',
          message: 'Your Dapp has been successfully updated.',
          modalStatus: 2,
          buttonClick: closeSuccessModal,
          // closeModal: closeSuccessModal,
          redirectUrl: '/dappStore',
          showIcon: true,
          cancelIconFlag: false,
        })
      );

    }
  } catch (error) {
    console.log('TCL: function*getDapps -> error', error);
  }
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.GET_DAPPS, getDapps);
  yield takeEvery(actionTypes.GET_DAPP_DETAIL, getDappDetail);
  yield takeEvery(actionTypes.EDIT_DAPP, editDapp);
}

import React from 'react';
import { put, takeEvery } from 'redux-saga/effects';

import axios from 'axios';
import * as actions from '../actions';
import * as actionTypes from '../constants/ActionTypes';

function* getInstaData() {
  try {
    const response = yield axios
      .get(
        'https://api.instagram.com/v1/users/self/media/recent/?access_token=17771447131.0913e68.f3d394bf9efc49d4a02db3761a6ae47b'
      )
      .then(res => res)
      .catch(err => err);
    const data = yield response.response !== undefined
      ? response.response.data
      : response.data;

    if (response.status === 200) {
      // yield console.log(data.data);
      yield put(actions.getInstagramDataSuccess(data.data));

    } else {
      yield console.log(data);
    }
  } catch (error) {
    yield console.log(error);
  }
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.GET_INSTAGRAM_DATA, getInstaData);
}

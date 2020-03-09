import { GET_DAPPS, SET_DAPPS, GET_DAPP_DETAIL, GET_DAPP_DETAIL_SUCCESS, EDIT_DAPP, DAPP_IMAGES } from '../constants/ActionTypes';

export const getDapps = payload => ({
  type: GET_DAPPS,
  payload,
});
export const setDapps = payload => ({
  type: SET_DAPPS,
  payload,
});
export const getDappDetail = payload => ({
  type: GET_DAPP_DETAIL,
  payload,
});
export const getDappDetailSuccess = payload => ({
  type: GET_DAPP_DETAIL_SUCCESS,
  payload,
});
export const editDapp = payload => ({
  type: EDIT_DAPP,
  payload,
});
export const dappImages = payload => ({
  type: DAPP_IMAGES,
  payload,
});

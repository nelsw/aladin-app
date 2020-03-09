import {
  DAPP_NAME_CHANGED,
  DAPP_URL_CHANGED,
  DAPP_EMAIL_ID_CHANGED,
  DAPP_STORAGE_CHANGED,
  DAPP_CATEGORY_CHANGED,
  DAPP_DETAILS_CHANGED,
  DAPP_TOKEN_CHANGED,
  POST_REGISTER_DAPP_REQUEST,
  RESET_DAPP,
  DAPP_NAME_AVAILABILITY,
  DAPP_NAME_AVAILABILITY_SUCCESS
} from '../constants/ActionTypes';

export const dappNameChanged = payload => ({
  type: DAPP_NAME_CHANGED,
  payload,
});
export const dappNameAvailability = payload => ({
  type: DAPP_NAME_AVAILABILITY,
  payload,
});
export const dappNameAvailabilitySuccess = payload => ({
  type: DAPP_NAME_AVAILABILITY_SUCCESS,
  payload,
});
export const dappUrlChanged = payload => ({
  type: DAPP_URL_CHANGED,
  payload,
});

export const dappEmailChanged = payload => ({
  type: DAPP_EMAIL_ID_CHANGED,
  payload,
});

export const dappStorageChanged = payload => ({
  type: DAPP_STORAGE_CHANGED,
  payload,
});

export const dappCategoryChanged = payload => ({
  type: DAPP_CATEGORY_CHANGED,
  payload,
});

export const dappDetailsChanged = payload => ({
  type: DAPP_DETAILS_CHANGED,
  payload,
});

export const dappTokenChanged = payload => ({
  type: DAPP_TOKEN_CHANGED,
  payload,
});

export const postRegisterDapp = payload => ({
  type: POST_REGISTER_DAPP_REQUEST,
  payload,
});

export const resetDapp = payload => ({
  type: RESET_DAPP,
  payload,
});
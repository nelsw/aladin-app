import {
  OPEN_SIGNIN_MODAL,
  CLOSE_SIGNIN_MODAL,
} from '../constants/ActionTypes';

// ACTION FOR THE MODALs

// FOR SIGNINMODAL
export const openSignInModal = payload => ({
  type: OPEN_SIGNIN_MODAL,
  payload,
});

export const closeSignInModal = () => ({
  type: CLOSE_SIGNIN_MODAL,
});

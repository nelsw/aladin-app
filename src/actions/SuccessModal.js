import {
  OPEN_SUCCESS_MODAL,
  CLOSE_SUCCESS_MODAL,
} from '../constants/ActionTypes';

// FOR SET SUCCESS MODAL FLAG
export const openSuccessModal = payload => ({
  type: OPEN_SUCCESS_MODAL,
  payload,
});

export const closeSuccessModal = () => ({
  type: CLOSE_SUCCESS_MODAL,
});

import {
  CHECK_USERNAME_AVAILIBILITY,
  CHECK_USERNAME_AVAILIBILITY_SUCCESS,
  STORE_USERNAME_ON_CHECK_AVAILAIBILITY,
  RECOVERY_KEY_CHANGED,
  STORE_USER_PASSWORD,
  USER_PASSWORD_CHANGED,
  STORE_USER_EMAIL,
  STORE_USER_CONFIRMPASSWORD,
  ON_CREATE_USER_ID,
  CREATE_USER_ID_SUCCESS,
  GET_BALANCE,
  GET_BALANCE_SUCCESS,
  FORM_VALIDATOR_ON_CHECK_USER,
  STORE_USER_MNEMONIC_ON_SIGN_UP,
  SIGN_IN_REQUEST,
  SIGN_IN_REQUEST_SUCCESS,
  DISABLED_INPUTS,
  DISPLAY_ERROR_MESSAGE,
  SIGN_IN_REQUEST_ERROR,
  CREATE_PASSWORD_CHANGED,
  CONFIRM_CREATE_PASSWORD_CHANGED,
  USER_EMAIL_CHANGED,
  CLEAR_STORED_USERNAME,
  CLEAR_CREATE_ID_DATA,
  INCORRECT_RECOVERY_CODE_AT_REDIRECT,
  SET_GO_ACTION,
  SET_GO_ACTION_SUCCESS,
  GET_PAYMENT,
  GET_PAYMENT_SUCCESS,
  STRIPE_TOKEN_CHANGED,
  DISPLAY_PAYMENT,
  PAYMENT_MESSAGE,
  RESET_AUTH
} from '../constants/ActionTypes';

//   ACTIONS FOR CHECKING THE USERNAME AVAILIBILITY

export const checkUserNameAvailibility = payload => {
  // console.log(payload);
  return {
    type: CHECK_USERNAME_AVAILIBILITY,
    payload,
  };
};

export const checkUserNameAvailibilitySuccess = payload => ({
  type: CHECK_USERNAME_AVAILIBILITY_SUCCESS,
  payload,
});

export const storeUserNameOnCheckAvailibility = payload => ({
  type: STORE_USERNAME_ON_CHECK_AVAILAIBILITY,
  payload,
});

export const recoveryKeyChanged = payload => ({
  type: RECOVERY_KEY_CHANGED,
  payload,
});

export const storeUserEmail = payload => ({
  type: STORE_USER_EMAIL,
  payload,
});

export const storeUserPassword = payload => ({
  type: STORE_USER_PASSWORD,
  payload,
});
export const userPasswordChanged = payload => ({
  type: USER_PASSWORD_CHANGED,
  payload,
});

export const storeUserConfirmPassword = payload => ({
  type: STORE_USER_CONFIRMPASSWORD,
  payload,
});

export const onCreatUserId = payload => ({
  type: ON_CREATE_USER_ID,
  payload,
});

export const creatUserIdSuccess = payload => ({
  type: CREATE_USER_ID_SUCCESS,
  payload,
});

export const getBalance = payload => ({
  type: GET_BALANCE,
  payload,
});

export const getBalanceSuccess = payload => ({
  type: GET_BALANCE_SUCCESS,
  payload,
});

export const formValidatorOnCheckUser = payload => ({
  type: FORM_VALIDATOR_ON_CHECK_USER,
  payload,
});

// ON STORE MNEMONIC CODE
export const storeUserMnemonicOnSignup = payload => ({
  type: STORE_USER_MNEMONIC_ON_SIGN_UP,
  payload,
});

export const signInRequest = payload => ({
  type: SIGN_IN_REQUEST,
  payload,
});

export const signInRequestSuccess = payload => ({
  type: SIGN_IN_REQUEST_SUCCESS,
  payload,
});
export const disabledInputs = payload => ({
  type: DISABLED_INPUTS,
  payload,
});
export const displayErrorMessage = payload => ({
  type: DISPLAY_ERROR_MESSAGE,
  payload,
});
export const signInRequestError = payload => ({
  type: SIGN_IN_REQUEST_ERROR,
  payload,
});

export const createPasswordChanged = payload => ({
  type: CREATE_PASSWORD_CHANGED,
  payload,
});

export const confirmCreatePasswordChanged = payload => ({
  type: CONFIRM_CREATE_PASSWORD_CHANGED,
  payload,
});

export const userEmailChanged = payload => ({
  type: USER_EMAIL_CHANGED,
  payload,
});

export const clearStoredUserName = () => ({
  type: CLEAR_STORED_USERNAME,
});

export const clearCreateIdData = () => ({
  type: CLEAR_CREATE_ID_DATA,
});

export const setGoAction = payload => ({
  type: SET_GO_ACTION,
  payload,
});

export const setGoActionSuccess = payload => ({
  type: SET_GO_ACTION_SUCCESS,
  payload,
});

export const getPayment = payload => ({
  type: GET_PAYMENT,
  payload,
});

export const getPaymentSuccess = payload => ({
  type: GET_PAYMENT_SUCCESS,
  payload,
});

export const stripeTokenChanged = payload => ({
  type: STRIPE_TOKEN_CHANGED,
  payload,
});

export const displayPayment = payload => ({
  type: DISPLAY_PAYMENT,
  payload,
});

export const paymentMessage = payload => ({
  type: PAYMENT_MESSAGE,
  payload,
})
export const resetAuth = payload => ({
  type: RESET_AUTH,
  payload,
})
import {
  STORE_PASSWORD_FOR_ANOTHER_ACCOUNT,
  CLEAR_STORE_PASSWORD_FOR_ANOTHER_ACCOUNT,
  SHOW_API_RESPONSE,
  CHECK_USER_PASSWORD,
  STORE_CURRENT_PASSWORD,
  STORE_NEW_PASSWORD,
  STORE_CONFIRM_PASSWORD,
  CLEAR_STORED_PASSWORD,
  ON_CHANGE_PASSWORD,
  DISABLED_BUTTON,
  PROFILE_IMAGE_CHANGED,
  UPLOAD_PROFILE_PICTURE,
  GET_PROFILE_DATA_SUCCESS,
  GET_PROFILE_DATA,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  RECOVER_WALLET,
  RECOVER_WALLET_SUCCESS,
  STORE_ADDRESS_OF_SENDER,
  STORE_ADDRESS_OF_RECIEVER,
  STORE_WALLET_AMMOUNT,
  STORE_PASSWORD_ON_SEND_TOKKEN,
  CLEAR_SEND_TOKKEN_DATA,
  SEND_TOKKEN_DATA,
  INCORRECT_RECOVERY_CODE_AT_REDIRECT,
  RECOVER_KEY,
  RECOVER_KEY_SUCCESS,
  ALA_COIN_ID_CHANGED,
  CHECK_FOR_ANOTHER_ID,
  WRONG_PASSWORD_AT_ADD_ACCOUNT,
  CLEAR_CHANGE_PASSWORD_DATA,
  CLEAR_ANOTHER_ID_DATA,
  CREATE_ANOTHER_ACCOUNT_SUCCESS,
  STORE_TRANSACTION_ID,
  SET_ACCOUNT_NO,
  SHOW_LOADER,
  SAVE_API_END_POINT,
  ALA_AMOUNT_CHANGED,
  USER_NAME_CHANGED,
  SEND_TOKEN_ERROR,
  BUY_ALA_ERROR,
  CLEAR_AMOUNT,
  GET_ACCOUNT_DETAILS,
  GET_ACCOUNT_DETAILS_SUCCESS,
  CPU_STAKE_AMOUNT_CHANGED,
  NET_STAKE_AMOUNT_CHANGED,
  CLEAR_STAKE_AMOUNTS,
  CLEAR_PASSWORD,
  UPLOAD_FILE,
  FILE_LOADER,
} from '../constants/ActionTypes';

// ACTION FOR CREATING ANOTHER ACCOUNT

export const storePasswordForAnotherAccount = payload => ({
  type: STORE_PASSWORD_FOR_ANOTHER_ACCOUNT,
  payload,
});

export const clearPasswordForAnotherAccount = () => ({
  type: CLEAR_STORE_PASSWORD_FOR_ANOTHER_ACCOUNT,
});

export const showApiResponse = payload => ({
  type: SHOW_API_RESPONSE,
  payload,
});

export const checkUserPassword = payload => ({
  type: CHECK_USER_PASSWORD,
  payload,
});

export const storeCurrentPassword = payload => ({
  type: STORE_CURRENT_PASSWORD,
  payload,
});

export const storeNewPassword = payload => ({
  type: STORE_NEW_PASSWORD,
  payload,
});

export const storeConfirmPassword = payload => ({
  type: STORE_CONFIRM_PASSWORD,
  payload,
});

export const clearStoredPassword = payload => ({
  type: CLEAR_STORED_PASSWORD,
  payload,
});

export const onChangePassword = payload => ({
  type: ON_CHANGE_PASSWORD,
  payload,
});

export const disabledButton = payload => ({
  type: DISABLED_BUTTON,
  payload,
});

export const profileImageChanged = payload => ({
  type: PROFILE_IMAGE_CHANGED,
  payload,
});

export const uploadProfilePicture = payload => ({
  type: UPLOAD_PROFILE_PICTURE,
  payload,
});

export const getProfileDataSuccess = payload => ({
  type: GET_PROFILE_DATA_SUCCESS,
  payload,
});

export const getProfileData = () => ({
  type: GET_PROFILE_DATA,
});

export const updateUserProfile = payload => ({
  type: UPDATE_USER_PROFILE,
  payload,
});

export const updateUserProfileSuccess = payload => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload,
});

export const recoverWallet = payload => ({
  type: RECOVER_WALLET,
  payload,
});

export const recoverWalletSuccess = payload => ({
  type: RECOVER_WALLET_SUCCESS,
  payload,
});

export const storeAddressOfSender = payload => ({
  type: STORE_ADDRESS_OF_SENDER,
  payload,
});

export const storeAddressOfReciever = payload => ({
  type: STORE_ADDRESS_OF_RECIEVER,
  payload,
});

export const storeWalletAmmount = payload => ({
  type: STORE_WALLET_AMMOUNT,
  payload,
});

export const storePasswordOnSendTokken = payload => ({
  type: STORE_PASSWORD_ON_SEND_TOKKEN,
  payload,
});

export const clearSendTokkenData = () => ({
  type: CLEAR_SEND_TOKKEN_DATA,
});

export const sendTokkenData = payload => ({
  type: SEND_TOKKEN_DATA,
  payload,
});

export const incorrectRecoveryCodeAtRedirect = () => ({
  type: INCORRECT_RECOVERY_CODE_AT_REDIRECT,
});

export const recoverKey = payload => ({
  type: RECOVER_KEY,
  payload,
});

export const recoverKeySuccess = payload => ({
  type: RECOVER_KEY_SUCCESS,
  payload,
});

export const alaCoinIdChanged = payload => ({
  type: ALA_COIN_ID_CHANGED,
  payload,
});

export const checkForAnotherId = payload => ({
  type: CHECK_FOR_ANOTHER_ID,
  payload,
});

export const wrongPasswordAtAddAccount = payload => ({
  type: WRONG_PASSWORD_AT_ADD_ACCOUNT,
  payload,
});

export const clearChangePasswordData = () => ({
  type: CLEAR_CHANGE_PASSWORD_DATA
});

export const clearAnotherIdData = () => ({
  type: CLEAR_ANOTHER_ID_DATA
});
export const createAnotherAccountSuccess = () => ({
  type: CREATE_ANOTHER_ACCOUNT_SUCCESS
});
export const storeTransactionId = payload => ({
  type: STORE_TRANSACTION_ID,
  payload
});

export const setAccountNo = payload => ({
  type: SET_ACCOUNT_NO,
  payload
});

export const showLoader = payload => ({
  type: SHOW_LOADER,
  payload
});

export const saveApiEndPoint = payload => ({
  type: SAVE_API_END_POINT,
  payload
});

export const alaAmountChanged = payload => ({
  type: ALA_AMOUNT_CHANGED,
  payload
});

export const userNameChanged = payload => ({
  type: USER_NAME_CHANGED,
  payload,
});

export const sendTokenError = payload => ({
  type: SEND_TOKEN_ERROR,
  payload,
});

export const buyAlaError = payload => ({
  type: BUY_ALA_ERROR,
  payload,
});

export const clearAmount = () => ({
  type: CLEAR_AMOUNT,
})

export const getAccountDetails = () => ({
  type: GET_ACCOUNT_DETAILS
})

export const getAccountDetailsSuccess = payload => ({
  type: GET_ACCOUNT_DETAILS_SUCCESS,
  payload
})


export const cpuStakeAmountChanged = payload => ({
  type:CPU_STAKE_AMOUNT_CHANGED,
  payload
})

export const netStakeAmountChanged = payload => ({
  type:NET_STAKE_AMOUNT_CHANGED,
  payload
})

export const clearStakeAmounts = () => ({
  type:CLEAR_STAKE_AMOUNTS
})

export const clearPassword = () => ({
  type: CLEAR_PASSWORD
})

export const uploadFile = payload => ({
  type: UPLOAD_FILE,
  payload,
});

export const fileLoader = payload => ({
  type: FILE_LOADER,
  payload,
});
import * as actions from '../constants/ActionTypes';

export const INITIAL_STATE = {
  dappName: '',
  dappNameAvailability: true,
  dappUrl: '',
  dappEmail: '',
  dappStorage: '',
  dappCategory: '',
  dappDetails: '',
  dappToken: '',
  logo: null,
  screenshorts: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.DAPP_NAME_CHANGED:
      return {
        ...state,
        dappName: action.payload,
        dappNameAvailability: true
      };
    case actions.DAPP_NAME_AVAILABILITY_SUCCESS:
      return {
        ...state,
        dappNameAvailability: action.payload,
      };
    case actions.DAPP_URL_CHANGED:
      return {
        ...state,
        dappUrl: action.payload,
      };

    case actions.DAPP_EMAIL_ID_CHANGED:
      return {
        ...state,
        dappEmail: action.payload,
      };

    case actions.DAPP_STORAGE_CHANGED:
      return {
        ...state,
        dappStorage: action.payload,
      };

    case actions.DAPP_CATEGORY_CHANGED:
      return {
        ...state,
        dappCategory: action.payload,
      };

    case actions.DAPP_DETAILS_CHANGED:
      return {
        ...state,
        dappDetails: action.payload,
      };

    case actions.DAPP_TOKEN_CHANGED:
      return {
        ...state,
        dappToken: action.payload,
      };
    
    case actions.DAPP_IMAGES:
      // console.log('action.payload.screenshorts',action.payload.screenshorts);
      return {
        ...state,
        logo: action.payload.logo,
        screenshorts: action.payload.screenshorts,
        dappPreference: action.payload.dappPreference,
      };

    case actions.RESET_DAPP:
      return {
        ...state,
        dappName: '',
        dappUrl: '',
        dappEmail: '',
        dappStorage: '',
        dappCategory: '',
        dappDetails: '',
        dappToken: '',
        dappNameAvailability: true
      };

    default:
      return state;
  }
};

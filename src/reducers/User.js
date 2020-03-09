import * as actions from '../constants/ActionTypes';

const InitialState = {
  userData: null,
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN_REQUEST_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

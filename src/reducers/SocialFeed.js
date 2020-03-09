import * as actions from '../constants/ActionTypes';

const INITIALSTATE = {
  instaData: [],
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case actions.GET_INSTAGRAM_DATA_SUCCESS:
      return {
        ...state,
        instaData: action.payload,
      };
    default:
      return state;
  }
};

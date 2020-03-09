import {
  GET_INSTAGRAM_DATA,
  GET_INSTAGRAM_DATA_SUCCESS,
} from '../constants/ActionTypes';

export const getInstagramData = () => ({
  type: GET_INSTAGRAM_DATA,
});

export const getInstagramDataSuccess = payload => ({
  type: GET_INSTAGRAM_DATA_SUCCESS,
  payload,
});

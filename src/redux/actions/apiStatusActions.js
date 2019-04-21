import * as types from './actionTypes';

export const beginApiCall = () => {
  return { type: types.BEGIN_API_CALL };
};

export const endApiCall = () => {
  return { type: types.END_API_CALL };
};

export const apiCallError = () => {
  return { type: types.API_CALL_ERROR };
};

// Auth Api Calls
export const loadingUserCompleted = () => {
  return { type: types.LOADING_USER_COMPLETE };
};

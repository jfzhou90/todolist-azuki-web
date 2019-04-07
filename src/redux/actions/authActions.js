import * as types from './actionTypes';
import * as AuthApi from '../../api/authApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const getUser = () => async dispatch => {
  dispatch(beginApiCall());
  return AuthApi.getUser()
    .then(data => {
      dispatch({ type: types.GET_USER_SUCCESS, data });
    })
    .catch(error => {
      dispatch(apiCallError(error));
      console.log(error);
    });
};

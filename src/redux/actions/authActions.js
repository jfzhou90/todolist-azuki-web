import * as types from './actionTypes';
import * as AuthApi from '../../api/authApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const getUserAndLists = () => async dispatch => {
  dispatch(beginApiCall());
  return AuthApi.getUser()
    .then(data => {
      if (data) {
        dispatch({ type: types.GET_LIST_SUCCESS, data: data.list });
      }
      delete data.list;
      dispatch({ type: types.GET_USER_SUCCESS, data });
    })
    .catch(error => {
      dispatch(apiCallError(error));
    });
};

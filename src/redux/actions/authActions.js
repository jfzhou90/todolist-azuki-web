import * as types from './actionTypes';
import * as AuthApi from '../../api/authApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const getUserAndLists = () => async dispatch => {
  dispatch(beginApiCall());
  return AuthApi.getUser()
    .then(data => {
      if (data) {
        dispatch({ type: types.GET_LIST_SUCESS, data: data.list });
      }
      delete data.Lists;
      dispatch({ type: types.GET_USER_SUCCESS, data });
    })
    .catch(error => {
      dispatch(apiCallError(error));
      console.log(error);
    });
};

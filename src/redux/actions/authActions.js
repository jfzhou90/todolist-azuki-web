import * as types from './actionTypes';
import * as AuthApi from '../../api/authApi';
import { loadingUserCompleted } from './apiStatusActions';

export const getUserAndLists = () => async dispatch => {
  return AuthApi.getUser()
    .then(data => {
      if (data) {
        dispatch({ type: types.GET_LIST_SUCCESS, data: data.lists });
      }
      delete data.lists;
      dispatch({ type: types.GET_USER_SUCCESS, data });
    })
    .catch(() => {
      dispatch(loadingUserCompleted());
    });
};

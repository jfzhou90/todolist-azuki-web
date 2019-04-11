import * as types from './actionTypes';
import * as ListApi from '../../api/listApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const addNewList = listName => async dispatch => {
  dispatch(beginApiCall());
  return ListApi.addNewList(listName)
    .then(data => {
      if (data) {
        dispatch({ type: types.ADD_LIST_SUCCESS, data });
      }
    })
    .catch(error => {
      dispatch(apiCallError(error));
      console.log(error);
    });
};

export const deleteList = id => async dispatch => {
  dispatch(beginApiCall());
  return ListApi.deleteList(id)
    .then(data => {
      if (data) {
        dispatch({ type: types.DELETE_LIST_SUCCESS, data });
      }
    })
    .catch(error => {
      dispatch(apiCallError(error));
      console.log(error);
    });
};

export const updateList = (id, name) => async dispatch => {
  dispatch(beginApiCall());
  return ListApi.updateList(id, name)
    .then(data => {
      if (data) {
        dispatch({ type: types.UPDATE_LIST_SUCCESS, data });
      }
    })
    .catch(error => {
      dispatch(apiCallError(error));
      console.log(error);
    });
};

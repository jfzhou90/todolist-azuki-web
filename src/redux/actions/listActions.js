import * as types from './actionTypes';
import * as ListApi from '../../api/listApi';

export const addNewList = listName => async dispatch => {
  return ListApi.addNewList(listName)
    .then(data => {
      if (data) {
        dispatch({ type: types.ADD_LIST_SUCCESS, data });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteList = id => async dispatch => {
  return ListApi.deleteList(id)
    .then(data => {
      if (data) {
        dispatch({ type: types.DELETE_LIST_SUCCESS, data });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const reorderList = listArray => async dispatch => {
  dispatch({ type: types.REORDER_LIST, data: listArray });
};

export const updateList = (id, name) => async dispatch => {
  // return ListApi.updateList(id, name)
  //   .then(data => {
  //     if (data) {
  //       dispatch({ type: types.UPDATE_LIST_SUCCESS, data });
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
};

import * as types from './actionTypes';
import * as ListApi from '../../api/listApi';
import * as AuthApi from '../../api/authApi';

export const addNewList = (listName, socket) => async dispatch => {
  return ListApi.addNewList(listName)
    .then(data => {
      if (data) {
        dispatch({ type: types.ADD_LIST_SUCCESS, data });
        if (socket) {
          socket.emit('updating', 'list');
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteList = (id, socket) => async dispatch => {
  return ListApi.deleteList(id)
    .then(data => {
      if (data) {
        dispatch({ type: types.DELETE_LIST_SUCCESS, data });
        if (socket) {
          socket.emit('updating', 'list');
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateList = (id, name, socket) => async dispatch => {
  return ListApi.updateList(id, name)
    .then(data => {
      if (data) {
        dispatch({ type: types.UPDATE_LIST_SUCCESS, data });
        if (socket) {
          socket.emit('updating', 'list');
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const reorderList = listArray => async dispatch => {
  dispatch({ type: types.REORDER_LIST, data: listArray });
};

export const getList = () => async dispatch => {
  return AuthApi.getUser()
    .then(data => {
      if (data) {
        dispatch({ type: types.GET_LIST_SUCCESS, data: data.list });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

import * as types from './actionTypes';

export const addSocketToApp = socket => async dispatch => {
  dispatch({ type: types.ADD_SOCKET, data: socket });
};

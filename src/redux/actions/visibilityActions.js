import * as types from './actionTypes';

export const updateVisibility = visibility => async dispatch => {
  dispatch({ type: types.UPDATE_VISIBILITY, visibility });
};

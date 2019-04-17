import * as types from './actionTypes';

export const openModal = (modalName, data) => async dispatch => {
  dispatch({ type: types.OPEN_MODAL, payload: { modalName, data } });
};

export const closeModal = () => async dispatch => {
  dispatch({ type: types.CLOSE_MODAL });
};

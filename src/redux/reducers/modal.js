import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function listReducer(state = initialState.lists, action) {
  switch (action.type) {
    case types.OPEN_MODAL:
      return { [action.payload.modalName]: true, data: action.payload.data };
    default:
      return {};
  }
}

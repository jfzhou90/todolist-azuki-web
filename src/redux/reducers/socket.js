import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function socketReducer(state = initialState.socket, action) {
  switch (action.type) {
    case types.ADD_SOCKET:
      return action.data;
    default:
      return state;
  }
}

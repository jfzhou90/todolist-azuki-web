// import * as types from '../actions/actionTypes';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function listReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.GET_LIST_SUCCESS:
      return action.data.sort((a, b) => a.order - b.order);
    case types.ADD_LIST_SUCCESS:
      return [...state, action.data];
    case types.DELETE_LIST_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

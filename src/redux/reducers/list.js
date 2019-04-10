// import * as types from '../actions/actionTypes';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function authReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.GET_LIST_SUCESS:
      return action.data;
    default:
      return state;
  }
}

// import * as types from '../actions/actionTypes';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      let obj = { ...state, id: action.data };
      return obj;
    default:
      return state;
  }
}

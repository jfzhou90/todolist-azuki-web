import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOADING_USER_COMPLETE:
      return { isLoading: false };
    case types.GET_USER_SUCCESS:
      return { ...action.data, isLoading: false };
    default:
      return state;
  }
}

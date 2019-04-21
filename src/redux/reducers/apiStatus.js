import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function apiReducer(state = initialState.apiStatus, action) {
  switch (action.type) {
    case types.BEGIN_API_CALL:
      return { isLoading: true };
    case types.END_API_CALL:
      return { isLoading: false };
    default:
      return state;
  }
}

import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function socketReducer(state = initialState.visibility, action) {
  switch (action.type) {
    case types.UPDATE_VISIBILITY:
      return action.visibility;
    default:
      return state;
  }
}

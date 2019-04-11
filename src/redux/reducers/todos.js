import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default function todosReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.GET_TODOS_SUCCESS:
      return action.data;
    default:
      return state;
  }
}

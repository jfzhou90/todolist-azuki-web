import * as types from './actionTypes';
import * as TodosApi from '../../api/todosApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const getTodosByListId = id => async dispatch => {
  dispatch(beginApiCall());
  return TodosApi.getTodosByListId(id)
    .then(data => {
      if (data) {
        dispatch({ type: types.GET_TODOS_SUCCESS, data });
      }
    })
    .catch(error => {
      dispatch(apiCallError(error));
      console.log(error);
    });
};

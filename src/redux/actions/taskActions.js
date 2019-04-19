import * as types from './actionTypes';
import * as TaskApi from '../../api/taskApi';

export const getTasks = listId => async dispatch => {
  await TaskApi.getTasksByListId(listId).then(data => {
    if (data) {
      dispatch({ type: types.GET_TASK_SUCCESS, data });
    }
  });
};

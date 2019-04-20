import * as types from './actionTypes';
import * as TaskApi from '../../api/taskApi';

export const getTasks = listId => async dispatch => {
  await TaskApi.getTasksByListId(listId).then(data => {
    if (data) {
      dispatch({ type: types.GET_TASK_SUCCESS, data });
    }
  });
};

export const addTask = (listId, name, socket) => async dispatch => {
  await TaskApi.addTask(listId, name).then(data => {
    if (data) {
      dispatch({ type: types.ADD_TASK_SUCCESS, data });
      if (socket) {
        socket.emit('updating', 'tasks');
      }
    }
  });
};

export const toggleTask = (taskId, isCompleted, socket) => async dispatch => {
  await TaskApi.toggleTask(taskId, isCompleted).then(data => {
    if (data) {
      dispatch({ type: types.TOGGLE_TASK_SUCCESS, data });
      if (socket) {
        socket.emit('updating', 'tasks');
      }
    }
  });
};

export const reorderTasks = (taskArray, visibility) => async dispatch => {
  if (visibility === 'active') {
    dispatch({ type: types.UPDATE_ACTIVE_TASK_ORDER, data: taskArray });
  } else {
    dispatch({ type: types.UPDATE_COMPLETED_TASK_ORDER, data: taskArray });
  }
};

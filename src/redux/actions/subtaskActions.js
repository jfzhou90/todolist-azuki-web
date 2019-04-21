import * as types from './actionTypes';
import * as SubtaskApi from '../../api/subtaskApi';

export const addNewSubtask = (taskId, name, socket) => async dispatch => {
  return SubtaskApi.addSubtask(taskId, name).then(data => {
    if (data) {
      dispatch({ type: types.ADD_SUBTASK_SUCCESS, data });
      if (socket) {
        socket.emit('updating', 'tasks');
      }
    }
  });
};

export const updateSubtask = (id, name, socket) => async dispatch => {
  return SubtaskApi.updateSubtask(id, name).then(data => {
    if (data) {
      if (socket) {
        socket.emit('updating', 'tasks');
      }
    }
  });
};

export const deleteSubtask = (id, taskId, socket) => async dispatch => {
  return SubtaskApi.deleteSubtask(id).then(data => {
    if (data) {
      dispatch({ type: types.DELETE_SUBTASK_SUCCESS, data: { id, taskId } });
      if (socket) {
        socket.emit('updating', 'tasks');
      }
    }
  });
};

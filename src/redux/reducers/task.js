import initialState from './initialState';
import * as types from '../actions/actionTypes';
import {
  addNewTask,
  formatTaskStructure,
  updateToggle,
  addSubtask,
  removeSubtask,
  reorderSubtasks,
  toggleSubtask,
} from '../../utils/dataFormat';

export default function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case types.CLEAR_TASKS_SUCCESS:
    case types.GET_TASK_SUCCESS:
      return formatTaskStructure(action.data);
    case types.ADD_TASK_SUCCESS:
      return addNewTask(state, action.data);
    case types.TOGGLE_TASK_SUCCESS:
      return updateToggle(state, action.data);
    case types.ADD_SUBTASK_SUCCESS:
      return addSubtask(state, action.data);
    case types.DELETE_SUBTASK_SUCCESS:
      return removeSubtask(state, action.data);
    case types.REORDER_SUBTASKS_SUCCESS:
      return reorderSubtasks(state, action.taskId, action.subtaskOrder);
    case types.TOGGLE_SUBTASKS_SUCCESS:
      return toggleSubtask(state, action);
    default:
      return state;
  }
}

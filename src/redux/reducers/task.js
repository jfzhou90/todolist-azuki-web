import initialState from './initialState';
import * as types from '../actions/actionTypes';
import { addNewTask, formatTaskStructure, updateToggle } from '../../utils/dataFormat';

export default function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case types.CLEAR_TASKS_SUCCESS:
    case types.GET_TASK_SUCCESS:
      return formatTaskStructure(action.data);
    case types.ADD_TASK_SUCCESS:
      return addNewTask(state, action.data);
    case types.TOGGLE_TASK_SUCCESS:
      return updateToggle(state, action.data);
    default:
      return state;
  }
}

import initialState from './initialState';
import * as types from '../actions/actionTypes';
import { formatDataStructure, addNewData, formatTaskStructure } from '../../utils/dataFormat';

export default function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case types.GET_TASK_SUCCESS:
      return formatTaskStructure(action.data);
    case types.ADD_TASK_SUCCESS:
      return addNewData(action.data);
    default:
      return state;
  }
}

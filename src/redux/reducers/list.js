import initialState from './initialState';
import * as types from '../actions/actionTypes';
import { formatDataStructure, addNewData } from '../../utils/dataFormat';

export default function listReducer(state = initialState.lists, action) {
  switch (action.type) {
    case types.DELETE_LIST_SUCCESS:
    case types.GET_LIST_SUCCESS:
      return formatDataStructure(action.data);
    case types.ADD_LIST_SUCCESS:
      return addNewData(state, action.data);
    case types.REORDER_LIST:
      return { ...state, keyOrder: action.data };
    default:
      return state;
  }
}

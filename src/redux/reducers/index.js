import { combineReducers } from 'redux';
import auth from './auth';
import list from './list';
import todos from './todos';
import { reducer as listMenu } from 'redux-burger-menu';

export default combineReducers({
  auth,
  list,
  todos,
  listMenu,
});

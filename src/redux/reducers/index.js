import { combineReducers } from 'redux';
import auth from './auth';
import lists from './list';
import modals from './modal';
import socket from './socket';
import tasks from './task';
import visibility from './visibility';
import apiStatus from './apiStatus';
import { reducer as sidebar } from 'redux-burger-menu';

export default combineReducers({
  auth,
  sidebar,
  modals,
  lists,
  socket,
  tasks,
  visibility,
  apiStatus,
});

import { combineReducers } from 'redux';
import { projectReducer } from './project';
import { userReducer } from './user';
import { taskReducer } from './task';
import { tokenReducer } from './token';

export const rootReducer = combineReducers({
  task: taskReducer,
  user: userReducer,
  project: projectReducer,
  token: tokenReducer
});

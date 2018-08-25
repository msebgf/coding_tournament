import { combineReducers } from 'redux';

import userReducer from './user';
import eventReducer from './event';

const reducers = {
  user: userReducer,
  event: eventReducer,
};

const createReducers = () => {
  return combineReducers(reducers);
};

const rootReducer = (state, action) => {
  const internalReducers = createReducers();

  return internalReducers(state, action);
};

export { createReducers };

export default rootReducer;

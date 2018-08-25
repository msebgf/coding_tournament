import { combineReducers } from 'redux';

import userReducer from './user';
const reducers = {
  user: userReducer,
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

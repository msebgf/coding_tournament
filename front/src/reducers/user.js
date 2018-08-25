import createReducer from './createReducer';
import * as userActions from '../actions/types/user';

const INITIAL_STATE = {
  load: false,
};

export default createReducer(INITIAL_STATE, {
  [userActions.TEST_USER_ACTION](state, action) {
    return { ...state, load: true };
  },
});

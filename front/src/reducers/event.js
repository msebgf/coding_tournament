import createReducer from './createReducer';
import * as eventActions from '../actions/types/event';

const INITIAL_STATE = {
  selectedLocation: null,
};

export default createReducer(INITIAL_STATE, {
  [eventActions.SELECT_LOCATION](state, action) {
    return { ...state, selectedLocation: action.selectedLocation};
  },
});

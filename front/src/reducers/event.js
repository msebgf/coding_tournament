import createReducer from './createReducer';
import * as eventActions from '../actions/types/event';

const INITIAL_STATE = {
  selectedLocation: null,
  startedReport: false,
};

export default createReducer(INITIAL_STATE, {
  [eventActions.START_REPORT](state, action) {
    return { ...state, selectedLocation: null, startedReport: true};
  },
  [eventActions.SELECT_LOCATION](state, action) {
    return { ...state, selectedLocation: action.coordinates};
  },
});

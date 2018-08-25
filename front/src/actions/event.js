import * as eventActions from './types/event';

export const selectLocation = (coordinates) => {
  return {
    type: eventActions.SELECT_LOCATION,
    value: coordinates,
  };
};
export const startReport = () => {
  return {
    type: eventActions.START_REPORT,
  };
};

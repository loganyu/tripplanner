import merge from 'lodash/merge';

import {
  RECEIVE_TRIPS,
  RECEIVE_TRIP,
  REMOVE_TRIP,
} from '../actions/trip_actions';

const tripsReducer = (state = {}, action) => {
  let nextState = merge({}, state);

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRIPS:
      return action.trips;
    case RECEIVE_TRIP:
      const newTrip = { [action.trip.id]: action.trip };
      return merge({}, state, newTrip);
    case REMOVE_TRIP:
      delete nextState[action.trip.id];
      return nextState;
    default:
      return state;
  }
};

export default tripsReducer;

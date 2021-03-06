import * as APIUtil from '../util/trip_api_util';

export const RECEIVE_TRIPS = 'RECEIVE_TRIPS';
export const RECEIVE_TRIP = 'RECEIVE_TRIP';
export const REMOVE_TRIP = 'REMOVE_TRIP';

export const receiveTrips = trips => ({
  type: RECEIVE_TRIPS,
  trips,
});

export const receiveTrip = ({ trip, user }) => ({
  type: RECEIVE_TRIP,
  trip,
  user,
});

export const removeTrip = tripId => ({
  type: REMOVE_TRIP,
  tripId,
});


export const fetchTrips = (userId) => dispatch => (
  APIUtil.fetchTrips(userId).then(trips => (
    dispatch(receiveTrips(trips))
  ))
);

export const fetchTrip = (userId, tripId) => dispatch => (
  APIUtil.fetchTrip(userId, tripId).then(payload => (
    dispatch(receiveTrip(payload))
  ))
);

export const createTrip = (userId, trip) => dispatch => (
  APIUtil.createTrip(userId, trip).then(tripData => (
    dispatch(receiveTrip(tripData))
  ))
);

export const updateTrip = (userId, tripId, trip) => dispatch => (
  APIUtil.updateTrip(userId, tripId, trip).then(tripData => (
    dispatch(receiveTrip(tripData))
  ))
);

export const destroyTrip = (userId, tripId) => dispatch => (
  APIUtil.destroyTrip(userId, tripId)
    .then(() => dispatch(removeTrip(tripId)))
);
